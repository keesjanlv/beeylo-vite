# Social Follow Reward System Implementation

## Overview
This document outlines the implementation of a social follow reward system for the Beeylo waitlist. Users can earn a 5% position boost by following Beeylo on social media platforms (LinkedIn, Instagram, TikTok, X/Twitter). The system includes verification delays, one-time rewards per email, and visual feedback.

## Frontend Implementation

### 1. Core Features Implemented

#### State Management
- **Social Follow State**: Tracks follow status for each platform per user
- **Feedback Messages**: Clean notification system for user feedback
- **Persistent Storage**: Uses localStorage to maintain state across sessions

#### User Experience
- **One-time Rewards**: Each platform can only be claimed once per email
- **Visual States**: Cards show different states (normal, processing, completed)
- **Verification Delay**: 5 minutes in production, 10 seconds in development
- **Feedback Messages**: Clear notifications about follow status and verification

#### Security & UX Features
- **Disabled State**: Cards become unclickable after reward claimed
- **Processing State**: Visual indication during verification period
- **Error Handling**: Graceful error handling with user feedback
- **Auto-hide Messages**: Feedback messages auto-dismiss after 5 seconds

### 2. Files Modified

#### `src/pages/WaitlistPage.tsx`
- Added social follow state management
- Implemented click handlers for social media cards
- Added feedback message system
- Integrated with UserContext for position updates

#### `src/styles/no-scroll-system.css`
- Added feedback message styling (success, info, error states)
- Added social card state styling (processing, completed)
- Responsive design for mobile and desktop

### 3. Testing Implementation

#### Development Mode
- **Quick Testing**: 10-second verification instead of 5 minutes
- **Mock API**: Uses existing mock API for offline testing
- **State Persistence**: localStorage maintains state across page reloads

#### How to Test
1. Navigate to the waitlist page
2. Click "Submit" without entering an email (uses existing login method)
3. Go to the "Boost" tab
4. Click any social media icon in the "Follow" section
5. Observe the feedback message and card state changes
6. Wait 10 seconds to see the completion process
7. Try clicking the same icon again to see the "already claimed" message

## Backend Integration Guide for VPS

### 1. Required API Endpoints

#### Social Follow Tracking Endpoint
```php
POST /api/social-follow
Content-Type: application/json

{
    "user_id": 123,
    "platform": "linkedin|instagram|tiktok|x",
    "verification_method": "manual"
}

Response:
{
    "success": true,
    "message": "Social follow tracked successfully",
    "data": {
        "platform": "linkedin",
        "points_awarded": 50,
        "total_points": 400,
        "new_position": 38,
        "early_access_eligible": true
    }
}
```

#### Social Follow Status Endpoint
```php
GET /api/social-follow-status/{user_id}

Response:
{
    "success": true,
    "data": {
        "linkedin": true,
        "instagram": false,
        "tiktok": false,
        "x": false
    }
}
```

### 2. Database Schema Updates

#### Add Social Follow Tracking Table
```sql
CREATE TABLE social_follows (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    platform ENUM('linkedin', 'instagram', 'tiktok', 'x') NOT NULL,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP NULL,
    points_awarded INT DEFAULT 0,
    verification_method ENUM('manual', 'api') DEFAULT 'manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_platform (user_id, platform)
);
```

#### Update Users Table
```sql
ALTER TABLE users ADD COLUMN social_follow_points INT DEFAULT 0;
ALTER TABLE users ADD COLUMN total_points INT DEFAULT 0;
```

### 3. Laravel Implementation

#### Controller: SocialFollowController.php
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SocialFollow;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SocialFollowController extends Controller
{
    public function trackFollow(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'platform' => 'required|in:linkedin,instagram,tiktok,x',
            'verification_method' => 'string|in:manual,api'
        ]);

        $user = User::find($request->user_id);
        
        // Check if already followed this platform
        $existingFollow = SocialFollow::where('user_id', $user->id)
            ->where('platform', $request->platform)
            ->first();
            
        if ($existingFollow) {
            return response()->json([
                'success' => false,
                'message' => 'Already followed this platform'
            ], 400);
        }

        // Create social follow record
        $socialFollow = SocialFollow::create([
            'user_id' => $user->id,
            'platform' => $request->platform,
            'verification_method' => $request->verification_method ?? 'manual',
            'verified_at' => now(), // Immediate verification for manual method
            'points_awarded' => 50
        ]);

        // Update user points and recalculate position
        $user->social_follow_points += 50;
        $user->total_points = $user->referral_points + $user->social_follow_points;
        $user->save();

        // Recalculate waitlist position (5% boost)
        $this->recalculateWaitlistPosition($user);

        return response()->json([
            'success' => true,
            'message' => "Successfully tracked follow on {$request->platform}",
            'data' => [
                'platform' => $request->platform,
                'points_awarded' => 50,
                'total_points' => $user->total_points,
                'new_position' => $user->position,
                'early_access_eligible' => $user->total_points >= 300
            ]
        ]);
    }

    public function getFollowStatus($userId): JsonResponse
    {
        $follows = SocialFollow::where('user_id', $userId)
            ->pluck('platform')
            ->toArray();

        $status = [
            'linkedin' => in_array('linkedin', $follows),
            'instagram' => in_array('instagram', $follows),
            'tiktok' => in_array('tiktok', $follows),
            'x' => in_array('x', $follows)
        ];

        return response()->json([
            'success' => true,
            'data' => $status
        ]);
    }

    private function recalculateWaitlistPosition(User $user): void
    {
        // Get all users ordered by total points (descending) and registration date (ascending)
        $users = User::orderBy('total_points', 'desc')
            ->orderBy('created_at', 'asc')
            ->get();

        foreach ($users as $index => $u) {
            $u->position = $index + 1;
            $u->save();
        }
    }
}
```

#### Model: SocialFollow.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialFollow extends Model
{
    protected $fillable = [
        'user_id',
        'platform',
        'followed_at',
        'verified_at',
        'points_awarded',
        'verification_method'
    ];

    protected $casts = [
        'followed_at' => 'datetime',
        'verified_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

#### Routes: api.php
```php
Route::prefix('api')->group(function () {
    Route::post('/social-follow', [SocialFollowController::class, 'trackFollow']);
    Route::get('/social-follow-status/{userId}', [SocialFollowController::class, 'getFollowStatus']);
});
```

### 4. Environment Configuration

#### Update .env
```env
# Social Media Configuration
SOCIAL_FOLLOW_POINTS=50
SOCIAL_FOLLOW_VERIFICATION_DELAY=300  # 5 minutes in seconds
EARLY_ACCESS_THRESHOLD=300
```

### 5. Frontend Configuration for Production

#### Update API Base URL
In `src/services/api.ts`, ensure the base URL points to your VPS:
```typescript
const API_BASE_URL = 'https://your-domain.com/api';
```

#### Environment Variables
Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-domain.com/api
VITE_SOCIAL_FOLLOW_VERIFICATION_DELAY=300000  # 5 minutes in milliseconds
```

### 6. Deployment Steps

#### Backend (Laravel on VPS)
1. Run database migrations
2. Deploy the new controller and model files
3. Update API routes
4. Test endpoints with Postman/curl

#### Frontend (React)
1. Update API base URL for production
2. Build the application: `npm run build`
3. Deploy to your hosting service

### 7. Testing the Integration

#### Manual Testing
1. Register a test user
2. Navigate to waitlist page
3. Click social media icons
4. Verify database records are created
5. Check position updates
6. Test duplicate follow prevention

#### API Testing with curl
```bash
# Track social follow
curl -X POST https://your-domain.com/api/social-follow \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "platform": "linkedin", "verification_method": "manual"}'

# Get follow status
curl https://your-domain.com/api/social-follow-status/1
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on social follow endpoints
2. **Validation**: Strict input validation for all parameters
3. **Duplicate Prevention**: Database constraints prevent duplicate follows
4. **User Verification**: Ensure user_id belongs to authenticated user
5. **CORS Configuration**: Proper CORS setup for frontend domain

## Monitoring & Analytics

1. **Track Follow Rates**: Monitor which platforms get the most follows
2. **Position Impact**: Analyze how social follows affect waitlist positions
3. **User Engagement**: Track user interaction with the boost features
4. **Error Monitoring**: Log and monitor API errors and failures

This implementation provides a complete social follow reward system that's ready for production deployment on your VPS.