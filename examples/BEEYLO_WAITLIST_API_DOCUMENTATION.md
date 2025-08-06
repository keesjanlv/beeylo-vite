# Beeylo Waitlist API - Complete Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture & Infrastructure](#architecture--infrastructure)
3. [Database Schema](#database-schema)
4. [Position Calculation Algorithm](#position-calculation-algorithm)
5. [API Endpoints](#api-endpoints)
6. [Security System](#security-system)
7. [Rate Limiting](#rate-limiting)
8. [Environment Configuration](#environment-configuration)
9. [Frontend Integration](#frontend-integration)
10. [Troubleshooting](#troubleshooting)
11. [Performance & Monitoring](#performance--monitoring)

## System Overview

The Beeylo Waitlist API is a sophisticated Laravel 10.x-based backend system that manages user registration, authentication, and dynamic waitlist positioning. The system implements a revolutionary **boost-based ranking algorithm** that replaces traditional point systems with percentage-based position improvements.

### Key Features
- **Boost-Based Positioning**: Users improve their position through referrals (1% boost each) and social follows (5% boost each)
- **Advanced Security**: Multi-layer security with IP reputation checking, behavioral analysis, and rate limiting
- **Real-time Position Updates**: Dynamic position recalculation based on user actions
- **Social Integration**: LinkedIn, Instagram, TikTok, and X (Twitter) follow tracking
- **Email Marketing**: Dual Brevo API integration (official + legacy)
- **Admin Tools**: Comprehensive debugging and management endpoints

### Technology Stack
- **Backend**: Laravel 10.x (PHP 8.1+)
- **Database**: MySQL 8.0+
- **Cache**: Redis (for rate limiting and sessions)
- **Email**: Brevo (SendinBlue) API
- **Security**: Cloudflare Turnstile (optional)
- **Server**: Nginx + PHP-FPM

## Architecture & Infrastructure

### Server Configuration
- **Domain**: `api.beeylo.com`
- **SSL**: Cloudflare SSL/TLS
- **Web Server**: Nginx with reverse proxy
- **PHP**: PHP-FPM 8.1+
- **Database**: MySQL 8.0 with optimized indexes
- **Cache**: Redis for session storage and rate limiting

### Directory Structure
```
/var/www/waitlist/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── WaitlistController.php      # Main API controller
│   │   ├── ReferralController.php      # Referral handling
│   │   ├── SocialController.php        # Social media integration
│   │   ├── SocialFollowController.php  # Social follow tracking
│   │   └── LeaderboardController.php   # Leaderboard functionality
│   ├── Models/
│   │   ├── WaitlistUser.php            # Primary user model
│   │   ├── Referral.php                # Referral tracking
│   │   ├── SocialFollow.php            # Social follow tracking
│   │   └── SocialShare.php             # Social sharing
│   ├── Services/
│   │   └── BrevoService.php            # Email service integration
│   └── Console/Commands/               # Artisan commands
├── database/migrations/                # Database schema
├── routes/api.php                      # API routes
└── config/                            # Configuration files
```

### Base Configuration

#### API Base URL
- **Production**: `https://api.beeylo.com/api`
- **Development**: `http://localhost:8000/api`

#### Authentication
- **Public Endpoints**: No authentication required
- **Admin Endpoints**: Require `X-Admin-Key` header

#### Content Type
```http
Content-Type: application/json
Accept: application/json
```

#### CORS Configuration
Allowed origins:
- `https://beeylo.com`
- `https://www.beeylo.com`

## Database Schema

### Tables Overview

#### 1. waitlist_users (Primary Table)
```sql
CREATE TABLE waitlist_users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NULL,
    phone VARCHAR(255) NULL,
    
    -- Position Fields
    position_in_queue INT DEFAULT 0,           -- Legacy field
    original_position INT NOT NULL,            -- Never changes, signup order
    fair_position INT NULL,                    -- Current calculated position
    boosted_position INT NULL,                 -- Position after boost calculation
    
    -- Boost System Fields
    referral_boost_percentage DECIMAL(8,2) DEFAULT 0,      -- 1% per referral
    social_follow_boost_percentage DECIMAL(8,2) DEFAULT 0, -- 5% per follow
    total_boost_percentage DECIMAL(8,2) DEFAULT 0,         -- Combined boost
    
    -- Legacy Points Fields (maintained for compatibility)
    early_adopter_points INT DEFAULT 0,       -- 1000000 / original_position
    referral_bonus_points INT DEFAULT 0,      -- Legacy referral points
    total_score DECIMAL(10,2) DEFAULT 0,      -- Legacy total score
    social_follow_points INT DEFAULT 0,       -- Points from social follows
    total_points INT DEFAULT 0,               -- Combined points
    
    -- Referral System
    unique_referral_code VARCHAR(10) UNIQUE NOT NULL,
    referral_count INT DEFAULT 0,
    referred_by BIGINT UNSIGNED NULL,
    
    -- Status & Access
    priority_level ENUM('normal', 'early_access') DEFAULT 'normal',
    status ENUM('waiting', 'invited', 'activated') DEFAULT 'waiting',
    early_access_eligible BOOLEAN DEFAULT FALSE,
    early_access_granted_at TIMESTAMP NULL,
    invited_at TIMESTAMP NULL,
    
    -- Metadata
    metadata JSON NULL,                        -- Additional data (source, etc.)
    
    -- Timestamps
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    -- Foreign Keys
    FOREIGN KEY (referred_by) REFERENCES waitlist_users(id) ON DELETE SET NULL,
    
    -- Indexes for Performance
    INDEX idx_position_in_queue (position_in_queue),
    INDEX idx_original_position (original_position),
    INDEX idx_fair_position (fair_position),
    INDEX idx_boosted_position (boosted_position),
    INDEX idx_total_boost_percentage (total_boost_percentage),
    INDEX idx_priority_level (priority_level),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email),
    INDEX idx_referral_code (unique_referral_code)
);
```

#### 2. referrals (Referral Tracking)
```sql
CREATE TABLE referrals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    referrer_id BIGINT UNSIGNED NOT NULL,      -- User who made the referral
    referred_email VARCHAR(255) NOT NULL,      -- Email of referred user
    referred_user_id BIGINT UNSIGNED NULL,     -- ID when user registers
    completed BOOLEAN DEFAULT FALSE,           -- Whether referral is complete
    completed_at TIMESTAMP NULL,               -- When referral was completed
    source VARCHAR(255) NULL,                  -- Referral source
    metadata JSON NULL,                        -- Additional referral data
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    FOREIGN KEY (referrer_id) REFERENCES waitlist_users(id) ON DELETE CASCADE,
    FOREIGN KEY (referred_user_id) REFERENCES waitlist_users(id) ON DELETE SET NULL,
    
    INDEX idx_referrer_id (referrer_id),
    INDEX idx_referred_email (referred_email),
    INDEX idx_referred_user_id (referred_user_id),
    INDEX idx_completed (completed),
    INDEX idx_created_at (created_at)
);
```

#### 3. social_follows (Social Media Follow Tracking)
```sql
CREATE TABLE social_follows (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,          -- Waitlist user ID
    platform VARCHAR(50) NOT NULL,             -- 'linkedin', 'instagram', 'tiktok', 'x'
    platform_user_id VARCHAR(255) NULL,        -- User ID on the platform
    platform_username VARCHAR(255) NULL,       -- Username on the platform
    is_following BOOLEAN DEFAULT FALSE,        -- Currently following status
    followed_at TIMESTAMP NULL,                -- When user started following
    verified_at TIMESTAMP NULL,                -- When follow was verified
    points_awarded INT DEFAULT 0,              -- Points awarded (5 per follow)
    metadata JSON NULL,                        -- Additional platform data
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES waitlist_users(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_platform (user_id, platform),
    INDEX idx_user_id (user_id),
    INDEX idx_platform (platform),
    INDEX idx_is_following (is_following),
    INDEX idx_verified_at (verified_at),
    INDEX idx_followed_at (followed_at)
);
```

#### 4. social_shares (Social Sharing Tracking)
```sql
CREATE TABLE social_shares (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    platform VARCHAR(50) NOT NULL,             -- 'twitter', 'facebook', 'linkedin'
    shared_at TIMESTAMP NULL,
    metadata JSON NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES waitlist_users(id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_platform (platform),
    INDEX idx_shared_at (shared_at)
);
```

#### 5. form_debug_logs (Optional - Performance Monitoring)
```sql
CREATE TABLE form_debug_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    log_type VARCHAR(50) NOT NULL,              -- 'error', 'slow_operation', etc.
    step VARCHAR(100) NULL,                     -- Form step
    duration DECIMAL(8,2) NULL,                 -- Operation duration
    error_message TEXT NULL,                    -- Error details
    ip_address VARCHAR(45) NULL,                -- User IP
    user_agent TEXT NULL,                       -- Browser info
    created_at TIMESTAMP NULL,
    
    INDEX idx_session_id (session_id),
    INDEX idx_log_type (log_type),
    INDEX idx_created_at (created_at),
    INDEX idx_ip_address (ip_address)
);
```

### Data Relationships

```
waitlist_users (1) ←→ (many) referrals (referrer_id)
waitlist_users (1) ←→ (many) referrals (referred_user_id)
waitlist_users (1) ←→ (many) social_follows
waitlist_users (1) ←→ (many) social_shares
waitlist_users (1) ←→ (many) waitlist_users (self-referencing via referred_by)
```

## Position Calculation Algorithm

### Overview
The Beeylo waitlist uses a **boost-based ranking system** that replaces traditional point systems. Users improve their position through percentage-based boosts rather than accumulating points.

### Boost Calculation

#### 1. Referral Boost
- **Rate**: 1% boost per successful referral
- **Calculation**: `referral_boost_percentage = referral_count * 1.0`
- **Maximum**: No limit (unlimited referrals)

#### 2. Social Follow Boost
- **Rate**: 5% boost per verified social media follow
- **Platforms**: LinkedIn, Instagram, TikTok, X (Twitter)
- **Verification**: 24-hour delay before boost is applied
- **Calculation**: `social_follow_boost_percentage = verified_follows_count * 5.0`
- **Maximum**: 20% (4 platforms × 5%)

#### 3. Total Boost
```php
$total_boost_percentage = $referral_boost_percentage + $social_follow_boost_percentage;
```

### Position Calculation Logic

#### Step 1: Calculate Boosted Position
```php
if ($total_boost_percentage >= 100) {
    $boosted_position = 0; // User has ≥100% boost
} else {
    $boost_factor = 1 - ($total_boost_percentage / 100);
    $boosted_position = ceil($original_position * $boost_factor);
}
```

#### Step 2: Calculate Final Fair Position

**For users with ≥100% boost:**
```php
// Rank by boost percentage (higher = better position)
$users_with_higher_boost = count(users where total_boost_percentage > current_user_boost);
$same_boost_earlier_signup = count(users where total_boost_percentage == current_user_boost AND original_position < current_user_original_position);
$fair_position = $users_with_higher_boost + $same_boost_earlier_signup + 1;
```

**For users with <100% boost:**
```php
// Count all users with ≥100% boost (they rank higher)
$high_boost_users = count(users where boosted_position == 0);

// Count users with better boosted position
$users_ahead = count(users where boosted_position > 0 AND boosted_position < current_user_boosted_position);

// Tiebreaker: earlier signup wins
$same_position_earlier = count(users where boosted_position == current_user_boosted_position AND original_position < current_user_original_position);

$fair_position = $high_boost_users + $users_ahead + $same_position_earlier + 1;
```

### Algorithm Examples

#### Example 1: New User
- **Original Position**: 1000
- **Referrals**: 0
- **Social Follows**: 0
- **Total Boost**: 0%
- **Boosted Position**: 1000 (no change)
- **Fair Position**: Based on how many users are ahead

#### Example 2: Active User
- **Original Position**: 1000
- **Referrals**: 10 (10% boost)
- **Social Follows**: 2 (10% boost)
- **Total Boost**: 20%
- **Boosted Position**: 1000 × (1 - 0.20) = 800
- **Fair Position**: Calculated based on other users' boosted positions

#### Example 3: Super User
- **Original Position**: 1000
- **Referrals**: 120 (120% boost)
- **Social Follows**: 4 (20% boost)
- **Total Boost**: 140%
- **Boosted Position**: 0 (≥100% boost)
- **Fair Position**: Ranked among other ≥100% boost users by boost percentage

### Position Update Triggers

Positions are recalculated when:
1. New user registers
2. Referral is completed
3. Social follow is verified (after 24-hour delay)
4. Social follow is removed/unfollowed
5. Manual admin position update

### Performance Optimizations

1. **Batch Updates**: Position recalculation runs in background jobs
2. **Selective Updates**: Only recalculate when relevant fields change
3. **Database Indexes**: Optimized indexes on position and boost fields
4. **Caching**: Redis caching for frequently accessed position data

## API Endpoints

### Route Structure

All API routes are prefixed with `/api` and have both prefixed and direct versions:

```php
// Prefixed routes (recommended)
POST /api/waitlist/register
GET  /api/waitlist/status
POST /api/waitlist/status
GET  /api/waitlist/stats
POST /api/waitlist/early-access
POST /api/waitlist/debug-log
POST /api/waitlist/clear-rate-limits

// Direct routes (legacy compatibility)
POST /api/waitlist/register
GET  /api/waitlist/status
POST /api/waitlist/status
GET  /api/waitlist/stats
POST /api/waitlist/early-access
POST /api/waitlist/debug-log
POST /api/waitlist/clear-rate-limits
```

## Core Endpoints

### 1. User Registration/Login
**Endpoint**: `POST /waitlist/register`

This is the primary endpoint that handles both new user registration and existing user authentication in a single call.

#### Request Body
```json
{
  "email": "user@example.com",           // Required: Valid email address
  "name": "John Doe",                    // Optional: User's full name
  "phone": "+1234567890",                // Optional: Phone number
  "referral_code": "ABC123",             // Optional: Referral code from another user
  "source": "homepage",                  // Optional: Traffic source
  "turnstile_token": "token123",         // Optional: Cloudflare Turnstile token
  "submission_time": 1234567890,         // Optional: Form submission timestamp
  "form_version": "v2.1",                // Optional: Frontend form version
  "session_id": "sess_123",              // Optional: Session identifier
  "skip_brevo": false                    // Optional: Skip email service integration
}
```

#### Success Response (200)
For new users:
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "user_id": 123,
    "email": "user@example.com",
    "position": 1500,
    "leaderboard_rank": 750,
    "original_position": 1500,
    "referral_code": "USER123",
    "referral_count": 0,
    "referral_url": "https://beeylo.com/r/USER123",
    "share_urls": {
      "twitter": "https://twitter.com/intent/tweet?text=...",
      "facebook": "https://www.facebook.com/sharer/sharer.php?u=...",
      "linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=..."
    },
    "people_ahead": 1499,
    "people_behind": 0,
    "ranking_details": {
      "fair_position": 1500,
      "points_based_position": 1500,
      "early_access_eligible": false
    },
    "points_system": {
      "total_points": 0,
      "referral_points": 0,
      "social_follow_points": 0,
      "early_access_eligible": false,
      "points_needed_for_early_access": 30,
      "points_breakdown": {
        "referrals": 0,
        "social_follows": 0,
        "bonus_points": 0
      }
    }
  }
}
```

For existing users:
```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    // Same structure as new users but with updated values
    "user_id": 123,
    "email": "user@example.com",
    "position": 1200,
    "referral_count": 5,
    "total_points": 15,
    // ... etc
  }
}
```

#### Error Responses

**Validation Error (422)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

**Rate Limit Exceeded (429)**:
```json
{
  "success": false,
  "message": "Too many attempts. Please try again later.",
  "retry_after": 3600
}
```

**Security Block (422)**:
```json
{
  "success": false,
  "message": "Security validation failed. Please try again."
}
```

**Invalid Origin (403)**:
```json
{
  "success": false,
  "message": "Invalid request origin."
}
```

### 2. Get User Status
**Endpoint**: `GET /waitlist/status?email=user@example.com` or `POST /waitlist/status`

Retrieve current status for an existing user.

#### GET Request
```
GET /waitlist/status?email=user@example.com
```

#### POST Request Body
```json
{
  "email": "user@example.com"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "data": {
    "user_id": 123,
    "email": "user@example.com",
    "position": 1200,
    "leaderboard_rank": 600,
    "original_position": 1500,
    "referral_code": "USER123",
    "referral_count": 5,
    "referral_url": "https://beeylo.com/r/USER123",
    "people_ahead": 1199,
    "people_behind": 300,
    "points_system": {
      "total_points": 15,
      "early_access_eligible": false,
      "points_needed_for_early_access": 15
    },
    "boost_details": {
      "current_position": 600,
      "position_without_boost": 1000,
      "original_position": 1000,
      "boosted_position": 800,
      "position_improvement": 400,
      "referral_count": 5,
      "social_follows_count": 2,
      "referral_boost_percentage": 5.00,
      "social_follow_boost_percentage": 10.00,
      "total_boost_percentage": 15.00,
      "early_access_eligible": false
    }
  }
}
```

#### Error Response (200 with success: false)
```json
{
  "success": false,
  "message": "User not found"
}
```

### 3. Get Waitlist Statistics
**Endpoint**: `GET /waitlist/stats`

Get overall waitlist statistics.

#### Response (200)
```json
{
  "success": true,
  "data": {
    "total_users": 15000,
    "total_referrals": 3500,
    "average_position_improvement": 250,
    "top_referrer_count": 50,
    "early_access_users": 120
  }
}
```

### 4. Grant Early Access (Admin Only)
**Endpoint**: `POST /waitlist/early-access`

Grant early access to a specific user.

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Early access granted",
  "data": {
    "new_position": 1,
    "priority_level": "early_access"
  }
}
```

### 5. Debug Logging
**Endpoint**: `POST /waitlist/debug-log`

Log frontend performance and error data.

#### Request Body
```json
{
  "log_type": "error",
  "form_version": "v2.1",
  "session_id": "sess_123",
  "step": "form_submission",
  "action": "submit",
  "duration": 1500,
  "error": "Network timeout",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### Response (200)
```json
{
  "success": true
}
```

### 6. Clear Rate Limits (Admin Only)
**Endpoint**: `POST /waitlist/clear-rate-limits`

Clear rate limits for debugging purposes.

#### Headers
```
X-Admin-Key: your_admin_api_key
```

#### Request Body
```json
{
  "ip": "192.168.1.1",        // Optional: specific IP to clear
  "email": "user@example.com" // Optional: specific email to clear
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Rate limits cleared",
  "cleared_keys": 3
}
```

## Security System

### Multi-Layer Security Architecture

The Beeylo API implements a comprehensive security system with multiple validation layers:

#### 1. Origin Validation
```php
// Validates request origin against allowed domains
private function validateOrigin(Request $request): bool
{
    $allowedOrigins = [
        'https://beeylo.com',
        'https://www.beeylo.com',
        'http://localhost:3000', // Development only
    ];
    
    $origin = $request->header('Origin');
    $referer = $request->header('Referer');
    
    return in_array($origin, $allowedOrigins) || 
           str_starts_with($referer, 'https://beeylo.com') ||
           str_starts_with($referer, 'https://www.beeylo.com');
}
```

#### 2. IP Reputation Checking
```php
// Checks IP against multiple threat intelligence sources
private function checkIpReputation(string $ip): array
{
    $sources = [
        'https://api.abuseipdb.com/api/v2/check',
        'https://api.virustotal.com/vtapi/v2/ip-address/report',
        // Additional threat intelligence APIs
    ];
    
    // Returns reputation score and threat indicators
    return [
        'is_malicious' => false,
        'confidence_score' => 95,
        'threat_types' => [],
        'country_code' => 'US'
    ];
}
```

#### 3. Behavioral Analysis
```php
// Analyzes user behavior patterns
private function analyzeBehavior(array $behaviorData): array
{
    $suspiciousPatterns = [
        'mouse_movement' => $behaviorData['mouse_events'] ?? 0,
        'keyboard_events' => $behaviorData['keyboard_events'] ?? 0,
        'form_interaction_time' => $behaviorData['interaction_time'] ?? 0,
        'scroll_behavior' => $behaviorData['scroll_events'] ?? 0,
    ];
    
    $suspicionScore = 0;
    
    // Too fast submission (< 3 seconds)
    if ($suspiciousPatterns['form_interaction_time'] < 3000) {
        $suspicionScore += 30;
    }
    
    // No mouse movement
    if ($suspiciousPatterns['mouse_movement'] === 0) {
        $suspicionScore += 25;
    }
    
    // No keyboard events
    if ($suspiciousPatterns['keyboard_events'] === 0) {
        $suspicionScore += 20;
    }
    
    return [
        'suspicion_score' => $suspicionScore,
        'is_suspicious' => $suspicionScore > 50,
        'patterns' => $suspiciousPatterns
    ];
}
```

#### 4. Email Validation
```php
// Advanced email validation
private function analyzeEmail(string $email): array
{
    $domain = substr(strrchr($email, '@'), 1);
    
    // Check against blocked domains
    $blockedDomains = [
        '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
        'tempmail.org', 'throwaway.email', 'yopmail.com'
    ];
    
    // Check MX record
    $hasMxRecord = $this->hasMxRecord($domain);
    
    return [
        'is_disposable' => in_array($domain, $blockedDomains),
        'has_mx_record' => $hasMxRecord,
        'domain_age' => $this->getDomainAge($domain),
        'is_suspicious' => in_array($domain, $blockedDomains) || !$hasMxRecord
    ];
}
```

#### 5. Browser Fingerprinting
```php
// Analyzes browser fingerprint for bot detection
private function analyzeFingerprint(array $fingerprint): array
{
    $suspiciousIndicators = [
        'headless_browser' => $fingerprint['webdriver'] ?? false,
        'automation_tools' => $fingerprint['automation'] ?? false,
        'missing_plugins' => empty($fingerprint['plugins']),
        'suspicious_user_agent' => $this->isSuspiciousUserAgent($fingerprint['user_agent'] ?? ''),
    ];
    
    $suspicionScore = array_sum($suspiciousIndicators) * 25;
    
    return [
        'suspicion_score' => $suspicionScore,
        'indicators' => $suspiciousIndicators,
        'is_bot' => $suspicionScore > 50
    ];
}
```

#### 6. Cloudflare Turnstile Integration
```php
// Verifies Turnstile token (optional)
private function verifyTurnstileToken(?string $token): bool
{
    if (!$token || !config('services.turnstile.secret_key')) {
        return true; // Optional verification
    }
    
    $response = Http::post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
        'secret' => config('services.turnstile.secret_key'),
        'response' => $token,
        'remoteip' => request()->ip()
    ]);
    
    return $response->successful() && $response->json('success');
}
```

### Security Constants
```php
class WaitlistController {
    // Rate limiting
    private const MAX_ATTEMPTS_PER_IP_HOUR = 50;
    private const MAX_ATTEMPTS_PER_IP_MINUTE = 10;
    private const MAX_ATTEMPTS_PER_EMAIL_HOUR = 8;
    
    // Suspicious countries (higher scrutiny)
    private const SUSPICIOUS_COUNTRIES = ['CN', 'RU', 'KP', 'IR'];
    
    // Blocked email domains
    private const BLOCKED_EMAIL_DOMAINS = [
        '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
        'tempmail.org', 'throwaway.email', 'yopmail.com'
    ];
}
```

### Security Scoring

The system calculates a security score (0-100) based on:
- **IP Reputation**: 0-30 points
- **Behavioral Analysis**: 0-25 points
- **Email Validation**: 0-20 points
- **Browser Fingerprint**: 0-25 points

**Blocking Threshold**: Score > 70 results in request blocking

## Rate Limiting

### Current Limits (Updated for Better UX)
- **Per IP Address**: 10 requests per minute, 50 requests per hour
- **Per Email**: 8 requests per hour
- **429 Response**: Includes `retry_after` field in seconds

### Rate Limit Implementation
```php
private function checkRateLimit(Request $request): array
{
    $ip = $this->getClientIp($request);
    $email = $request->input('email');
    
    // IP-based rate limiting
    $ipHourKey = "rate_limit:ip_hour:{$ip}";
    $ipMinuteKey = "rate_limit:ip_minute:{$ip}";
    $ipHourCount = Cache::get($ipHourKey, 0);
    $ipMinuteCount = Cache::get($ipMinuteKey, 0);
    
    if ($ipHourCount >= self::MAX_ATTEMPTS_PER_IP_HOUR) {
        return ['allowed' => false, 'reason' => 'ip_hour_limit', 'retry_after' => 3600];
    }
    
    if ($ipMinuteCount >= self::MAX_ATTEMPTS_PER_IP_MINUTE) {
        return ['allowed' => false, 'reason' => 'ip_minute_limit', 'retry_after' => 60];
    }
    
    // Email-based rate limiting
    if ($email) {
        $emailHourKey = "rate_limit:email_hour:" . md5($email);
        $emailHourCount = Cache::get($emailHourKey, 0);
        
        if ($emailHourCount >= self::MAX_ATTEMPTS_PER_EMAIL_HOUR) {
            return ['allowed' => false, 'reason' => 'email_hour_limit', 'retry_after' => 3600];
        }
    }
    
    return ['allowed' => true];
}
```

### Rate Limit Headers
The API returns these headers with each response:
- `X-RateLimit-Limit`: Maximum attempts allowed
- `X-RateLimit-Remaining`: Remaining attempts
- `Retry-After`: Seconds to wait (only on 429 responses)

### IP Address Detection
```php
private function getClientIp(Request $request): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',     // Cloudflare
        'HTTP_X_FORWARDED_FOR',      // Load balancer/proxy
        'HTTP_X_FORWARDED',          // Proxy
        'HTTP_X_CLUSTER_CLIENT_IP',  // Cluster
        'HTTP_FORWARDED_FOR',        // Proxy
        'HTTP_FORWARDED',            // Proxy
        'REMOTE_ADDR'                // Standard
    ];
    
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ips = explode(',', $_SERVER[$header]);
            return trim($ips[0]);
        }
    }
    
    return $request->ip();
}
```

## Environment Configuration

### Required Environment Variables

#### Core Application
```env
# Application Configuration
APP_NAME="Beeylo Waitlist API"
APP_ENV=production
APP_KEY=base64:your_32_character_key_here
APP_DEBUG=false
APP_URL=https://api.beeylo.com

# Logging
LOG_CHANNEL=daily
LOG_LEVEL=info
LOG_DEPRECATIONS_CHANNEL=null
```

#### Database Configuration
```env
# MySQL Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=beeylo_waitlist
DB_USERNAME=waitlist_user
DB_PASSWORD=secure_password_here

# Database Connection Pool
DB_POOL_MIN=5
DB_POOL_MAX=20
```

#### Cache & Session
```env
# Redis Configuration
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=redis_password_here
REDIS_PORT=6379
REDIS_DB=0

# Session Configuration
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.beeylo.com
```

#### Email Service (Brevo)
```env
# Brevo API Configuration
BREVO_ENABLED=true
BREVO_API_KEY=your_brevo_api_key_here
BREVO_LIST_ID=5
BREVO_OFFICIAL_API_URL=https://api.brevo.com/v3/contacts

# Legacy Brevo API (fallback)
BREVO_LEGACY_ENABLED=false
BREVO_API_URL=https://your-legacy-brevo-endpoint.com/api/subscribe
```

#### Security & Anti-Spam
```env
# Admin API Key for protected endpoints
ADMIN_API_KEY=your_secure_admin_key_here

# Cloudflare Turnstile (optional)
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# IP Reputation APIs (optional)
ABUSEIPDB_API_KEY=your_abuseipdb_key
VIRUSTOTAL_API_KEY=your_virustotal_key
```

#### File System & Storage
```env
# File System
FILESYSTEM_DISK=local

# AWS S3 (if using for file storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=beeylo-waitlist-storage
AWS_USE_PATH_STYLE_ENDPOINT=false
```

#### Broadcasting & Queues
```env
# Queue Configuration
QUEUE_CONNECTION=redis
QUEUE_FAILED_DRIVER=database

# Broadcasting (for real-time updates)
BROADCAST_DRIVER=redis
PUSHER_APP_ID=your_pusher_app_id
PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_SECRET=your_pusher_secret
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1
```

#### Mail Configuration
```env
# SMTP Configuration (backup to Brevo)
MAIL_MAILER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your_brevo_smtp_username
MAIL_PASSWORD=your_brevo_smtp_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@beeylo.com
MAIL_FROM_NAME="Beeylo Waitlist"
```

### Configuration Files

#### config/services.php
```php
<?php
return [
    'brevo' => [
        'enabled' => env('BREVO_ENABLED', true),
        'api_key' => env('BREVO_API_KEY'),
        'list_id' => env('BREVO_LIST_ID', 5),
        'official_api_url' => env('BREVO_OFFICIAL_API_URL', 'https://api.brevo.com/v3/contacts'),
        'legacy_enabled' => env('BREVO_LEGACY_ENABLED', false),
        'api_url' => env('BREVO_API_URL'),
    ],
    
    'turnstile' => [
        'site_key' => env('TURNSTILE_SITE_KEY'),
        'secret_key' => env('TURNSTILE_SECRET_KEY'),
    ],
    
    'security' => [
        'admin_api_key' => env('ADMIN_API_KEY'),
        'abuseipdb_key' => env('ABUSEIPDB_API_KEY'),
        'virustotal_key' => env('VIRUSTOTAL_API_KEY'),
    ],
];
```

#### config/database.php (MySQL Optimization)
```php
'mysql' => [
    'driver' => 'mysql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => 'InnoDB',
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        PDO::ATTR_TIMEOUT => 60,
        PDO::ATTR_PERSISTENT => true,
        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
    ]) : [],
],
```

## Security Features

### 1. Rate Limiting
- **IP-based**: 10 requests/minute, 50 requests/hour
- **Email-based**: 8 requests/hour
- **Automatic increment**: Counters increment on both success and failure

### 2. Origin Validation
- Validates request origin against allowed domains
- Blocks requests from unauthorized domains

### 3. IP Reputation Checking
- Checks IP against threat intelligence databases
- Blocks requests from suspicious IP addresses
- Geolocation-based filtering for suspicious countries

### 4. Email Validation
- Advanced email format validation
- Domain MX record verification
- Blocks disposable email services

### 5. Behavioral Analysis
- Analyzes user interaction patterns
- Detects automated/bot behavior
- Browser fingerprinting validation

### 6. Turnstile Integration (Optional)
- Cloudflare Turnstile CAPTCHA support
- Optional verification for enhanced security

## Data Models

### WaitlistUser
```php
{
  "id": integer,
  "email": string,
  "name": string,
  "phone": string,
  "position_in_queue": integer,
  "fair_position": integer,
  "original_position": integer,
  "unique_referral_code": string,
  "referral_count": integer,
  "total_points": integer,
  "social_follow_points": integer,
  "early_access_eligible": boolean,
  "priority_level": enum('normal', 'early_access'),
  "source": string,
  "created_at": timestamp,
  "updated_at": timestamp
}
```

### Referral
```php
{
  "id": integer,
  "referrer_id": integer,
  "referred_email": string,
  "referred_user_id": integer,
  "status": enum('pending', 'completed'),
  "created_at": timestamp,
  "updated_at": timestamp
}
```

## Frontend Integration Guide

### 1. Basic Implementation

```javascript
class BeeyloAPI {
  constructor() {
    this.baseURL = 'https://api.beeylo.com/api';
    this.isDevelopment = false; // Set to true for local development
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          throw new Error(`Rate limit exceeded. Try again in ${data.retry_after} seconds.`);
        }
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async registerUser(userData) {
    return this.request('/waitlist/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getUserStatus(email) {
    try {
      return await this.request(`/waitlist/status?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error.message.includes('404')) {
        return { success: false, message: 'User not found' };
      }
      throw error;
    }
  }

  async getStats() {
    return this.request('/waitlist/stats');
  }
}

// Usage example
const api = new BeeyloAPI();

// Register/login user
try {
  const result = await api.registerUser({
    email: 'user@example.com',
    name: 'John Doe',
    source: 'homepage'
  });
  
  if (result.success) {
    console.log('User registered/logged in:', result.data);
    // Update UI with user data
  }
} catch (error) {
  console.error('Registration failed:', error.message);
  // Handle error in UI
}
```

### 2. Error Handling Best Practices

```javascript
async function handleUserRegistration(formData) {
  try {
    const result = await api.registerUser(formData);
    
    if (result.success) {
      // Success - update UI
      updateUserDashboard(result.data);
      showSuccessMessage(result.message);
    } else {
      // API returned success: false
      showErrorMessage(result.message);
    }
    
  } catch (error) {
    if (error.message.includes('Rate limit exceeded')) {
      showRateLimitError(error.message);
    } else if (error.message.includes('Security validation failed')) {
      showSecurityError();
    } else {
      showGenericError('Registration failed. Please try again.');
    }
  }
}
```

### 3. Rate Limit Handling

```javascript
class RateLimitHandler {
  constructor() {
    this.retryAttempts = new Map();
  }

  async makeRequestWithRetry(requestFn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (error.message.includes('Rate limit exceeded') && attempt < maxRetries) {
          const waitTime = this.extractWaitTime(error.message) || 60;
          await this.wait(waitTime * 1000);
          continue;
        }
        throw error;
      }
    }
  }

  extractWaitTime(errorMessage) {
    const match = errorMessage.match(/(\d+) seconds/);
    return match ? parseInt(match[1]) : null;
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Environment Variables

Add these to your `.env` file:

```env
# Admin API Key for protected endpoints
ADMIN_API_KEY=your_secure_admin_key_here

# Cloudflare Turnstile (optional)
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=waitlist_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

# Cache Configuration (Redis recommended for production)
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## Troubleshooting

### Common Issues

1. **429 Rate Limit Errors**
   - **Cause**: Too many requests from same IP/email
   - **Solution**: Implement exponential backoff, use the clear rate limits endpoint for debugging

2. **403 Invalid Origin**
   - **Cause**: Request not coming from allowed domain
   - **Solution**: Ensure requests come from `beeylo.com` or `www.beeylo.com`

3. **422 Security Validation Failed**
   - **Cause**: Request flagged by security system
   - **Solution**: Check IP reputation, user agent, and behavioral data

4. **404 User Not Found** (on status endpoint)
   - **Cause**: User doesn't exist in database
   - **Solution**: This is normal for new users, redirect to registration

### Debugging Tools

1. **Clear Rate Limits**:
   ```bash
   curl -X POST https://api.beeylo.com/api/waitlist/clear-rate-limits \
     -H "X-Admin-Key: your_admin_key" \
     -H "Content-Type: application/json" \
     -d '{"ip": "192.168.1.1"}'
   ```

2. **Check Logs**:
   - Application logs: `/var/www/waitlist/storage/logs/`
   - Form debug logs: `/var/www/waitlist/storage/logs/form-debug-*.log`

3. **Test Endpoints**:
   ```bash
   # Test registration
   curl -X POST https://api.beeylo.com/api/waitlist/register \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "name": "Test User"}'
   
   # Test status
   curl "https://api.beeylo.com/api/waitlist/status?email=test@example.com"
   ```

## Performance Considerations

1. **Caching**: Uses Redis for rate limiting and session storage
2. **Database Indexing**: Optimized indexes on email, referral codes, and positions
3. **Response Compression**: Enable gzip compression on your web server
4. **CDN**: Consider using a CDN for static assets

## Security Recommendations

1. **HTTPS Only**: Always use HTTPS in production
2. **Rate Limiting**: Monitor and adjust rate limits based on usage patterns
3. **Log Monitoring**: Set up alerts for suspicious activity
4. **Regular Updates**: Keep Laravel and dependencies updated
5. **Backup Strategy**: Implement regular database backups

## Frontend Integration

### Complete JavaScript SDK

```javascript
class BeeyloWaitlistAPI {
    constructor(options = {}) {
        this.baseURL = options.baseURL || 'https://api.beeylo.com/api';
        this.isDevelopment = options.isDevelopment || false;
        this.sessionId = this.generateSessionId();
        this.formVersion = options.formVersion || 'v2.1';
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000;
    }

    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin,
                ...options.headers
            },
            ...options
        };

        let lastError;
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const response = await fetch(url, config);
                
                if (!response.ok) {
                    if (response.status === 429) {
                        const data = await response.json();
                        const retryAfter = data.retry_after || 60;
                        
                        if (attempt < this.retryAttempts) {
                            await this.wait(retryAfter * 1000);
                            continue;
                        }
                        
                        throw new Error(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
                    }
                    
                    if (response.status === 403) {
                        throw new Error('Request blocked by security system.');
                    }
                    
                    if (response.status === 422) {
                        const data = await response.json();
                        throw new Error(data.message || 'Validation failed');
                    }
                    
                    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
                }

                return await response.json();
                
            } catch (error) {
                lastError = error;
                
                if (attempt < this.retryAttempts && this.isRetryableError(error)) {
                    await this.wait(this.retryDelay * attempt);
                    continue;
                }
                
                break;
            }
        }
        
        // Log error for debugging
        this.logError('api_request_failed', {
            endpoint,
            error: lastError.message,
            attempts: this.retryAttempts
        });
        
        throw lastError;
    }

    isRetryableError(error) {
        return error.message.includes('fetch') || 
               error.message.includes('network') ||
               error.message.includes('timeout');
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // User Registration/Login
    async registerUser(userData, behaviorData = {}) {
        const startTime = Date.now();
        
        try {
            const payload = {
                ...userData,
                session_id: this.sessionId,
                form_version: this.formVersion,
                submission_time: Date.now(),
                behavior_data: behaviorData
            };

            const result = await this.request('/waitlist/register', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            // Log successful registration
            this.logDebug('registration_success', {
                duration: Date.now() - startTime,
                user_id: result.data?.user_id
            });

            return result;
            
        } catch (error) {
            // Log failed registration
            this.logError('registration_failed', {
                duration: Date.now() - startTime,
                error: error.message,
                email: userData.email
            });
            
            throw error;
        }
    }

    // Get User Status
    async getUserStatus(email) {
        try {
            const result = await this.request(`/waitlist/status?email=${encodeURIComponent(email)}`);
            return result;
        } catch (error) {
            if (error.message.includes('404') || error.message.includes('User not found')) {
                return { success: false, message: 'User not found' };
            }
            throw error;
        }
    }

    // Get Waitlist Statistics
    async getStats() {
        return this.request('/waitlist/stats');
    }

    // Debug Logging
    async logDebug(logType, data = {}) {
        try {
            await this.request('/waitlist/debug-log', {
                method: 'POST',
                body: JSON.stringify({
                    log_type: logType,
                    form_version: this.formVersion,
                    session_id: this.sessionId,
                    timestamp: new Date().toISOString(),
                    ...data
                })
            });
        } catch (error) {
            // Silent fail for debug logging
            console.warn('Debug logging failed:', error.message);
        }
    }

    async logError(logType, data = {}) {
        await this.logDebug(logType, { ...data, level: 'error' });
    }

    // Behavior Tracking
    trackBehavior() {
        const behaviorData = {
            mouse_events: 0,
            keyboard_events: 0,
            scroll_events: 0,
            interaction_time: 0,
            start_time: Date.now()
        };

        // Track mouse movement
        document.addEventListener('mousemove', () => {
            behaviorData.mouse_events++;
        });

        // Track keyboard events
        document.addEventListener('keydown', () => {
            behaviorData.keyboard_events++;
        });

        // Track scroll events
        document.addEventListener('scroll', () => {
            behaviorData.scroll_events++;
        });

        return () => {
            behaviorData.interaction_time = Date.now() - behaviorData.start_time;
            return behaviorData;
        };
    }

    // Form Validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        if (!phone) return true; // Optional field
        const phoneRegex = /^[\+]?[1-9][\d]{1,14}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Utility Methods
    formatPosition(position) {
        if (position < 1000) return position.toString();
        if (position < 1000000) return (position / 1000).toFixed(1) + 'K';
        return (position / 1000000).toFixed(1) + 'M';
    }

    calculateTimeToAccess(position, averageInvitesPerDay = 100) {
        const daysToAccess = Math.ceil(position / averageInvitesPerDay);
        if (daysToAccess < 30) return `${daysToAccess} days`;
        if (daysToAccess < 365) return `${Math.ceil(daysToAccess / 30)} months`;
        return `${Math.ceil(daysToAccess / 365)} years`;
    }
}

// Usage Example
const api = new BeeyloWaitlistAPI({
    formVersion: 'v2.1',
    retryAttempts: 3
});

// Complete form submission example
async function handleFormSubmission(formData) {
    const getBehaviorData = api.trackBehavior();
    
    try {
        // Validate form data
        if (!api.validateEmail(formData.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        if (formData.phone && !api.validatePhone(formData.phone)) {
            throw new Error('Please enter a valid phone number');
        }
        
        // Get behavior data
        const behaviorData = getBehaviorData();
        
        // Submit registration
        const result = await api.registerUser(formData, behaviorData);
        
        if (result.success) {
            // Handle successful registration
            displaySuccessMessage(result.data);
            updateUserDashboard(result.data);
        } else {
            // Handle API-level failure
            displayErrorMessage(result.message);
        }
        
    } catch (error) {
        // Handle network/validation errors
        if (error.message.includes('Rate limit exceeded')) {
            displayRateLimitError(error.message);
        } else if (error.message.includes('security')) {
            displaySecurityError();
        } else {
            displayGenericError(error.message);
        }
    }
}

function displaySuccessMessage(userData) {
    const position = api.formatPosition(userData.position);
    const timeToAccess = api.calculateTimeToAccess(userData.position);
    
    console.log(`Welcome! You're #${position} in line.`);
    console.log(`Estimated access time: ${timeToAccess}`);
    console.log(`Referral code: ${userData.referral_code}`);
}
```

### React Hook Example

```javascript
import { useState, useEffect, useCallback } from 'react';

const useBeeyloWaitlist = () => {
    const [api] = useState(() => new BeeyloWaitlistAPI());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await api.registerUser(userData);
            if (result.success) {
                setUser(result.data);
                localStorage.setItem('beeylo_user_email', userData.email);
            } else {
                setError(result.message);
            }
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api]);

    const getUserStatus = useCallback(async (email) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await api.getUserStatus(email);
            if (result.success) {
                setUser(result.data);
            }
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api]);

    // Auto-load user on mount if email exists
    useEffect(() => {
        const savedEmail = localStorage.getItem('beeylo_user_email');
        if (savedEmail) {
            getUserStatus(savedEmail);
        }
    }, [getUserStatus]);

    return {
        user,
        loading,
        error,
        registerUser,
        getUserStatus,
        api
    };
};

export default useBeeyloWaitlist;
```

## Troubleshooting

### Common Issues & Solutions

#### 1. 429 Rate Limit Errors
**Symptoms**: Users getting "Too many attempts" errors

**Causes**:
- Multiple users behind same IP (office/school networks)
- Aggressive retry logic in frontend
- Bot/automated traffic

**Solutions**:
```bash
# Check current rate limits
curl "https://api.beeylo.com/api/waitlist/stats"

# Clear rate limits for specific IP (admin only)
curl -X POST https://api.beeylo.com/api/waitlist/clear-rate-limits \
  -H "X-Admin-Key: your_admin_key" \
  -H "Content-Type: application/json" \
  -d '{"ip": "192.168.1.1"}'

# Clear rate limits for specific email
curl -X POST https://api.beeylo.com/api/waitlist/clear-rate-limits \
  -H "X-Admin-Key: your_admin_key" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

**Prevention**:
- Implement exponential backoff in frontend
- Add user-friendly rate limit messaging
- Monitor rate limit metrics

#### 2. 403 Invalid Origin Errors
**Symptoms**: "Invalid request origin" errors

**Causes**:
- Requests from unauthorized domains
- Missing or incorrect Origin header
- Development vs production domain mismatch

**Solutions**:
```php
// Check allowed origins in WaitlistController.php
private function validateOrigin(Request $request): bool
{
    $allowedOrigins = [
        'https://beeylo.com',
        'https://www.beeylo.com',
        'http://localhost:3000', // Add for development
    ];
    // ...
}
```

#### 3. 422 Security Validation Failed
**Symptoms**: Legitimate users blocked by security system

**Debugging**:
```bash
# Check security logs
tail -f /var/www/waitlist/storage/logs/laravel.log | grep "security validation"

# Check IP reputation
curl "https://api.abuseipdb.com/api/v2/check?ipAddress=1.2.3.4" \
  -H "Key: your_abuseipdb_key"
```

**Solutions**:
- Whitelist known good IPs
- Adjust security thresholds
- Review behavioral analysis parameters

#### 4. Database Connection Issues
**Symptoms**: 500 errors, "Connection refused"

**Debugging**:
```bash
# Check MySQL status
sudo systemctl status mysql

# Check database connections
SHOW PROCESSLIST;

# Check Laravel logs
tail -f /var/www/waitlist/storage/logs/laravel.log
```

**Solutions**:
```bash
# Restart MySQL
sudo systemctl restart mysql

# Clear Laravel cache
php artisan cache:clear
php artisan config:clear

# Run database migrations
php artisan migrate --force
```

#### 5. Redis Connection Issues
**Symptoms**: Rate limiting not working, session issues

**Debugging**:
```bash
# Check Redis status
sudo systemctl status redis

# Test Redis connection
redis-cli ping

# Check Redis memory usage
redis-cli info memory
```

**Solutions**:
```bash
# Restart Redis
sudo systemctl restart redis

# Clear Redis cache
redis-cli FLUSHDB

# Check Redis configuration
sudo nano /etc/redis/redis.conf
```

### Log Analysis

#### Application Logs
```bash
# Real-time error monitoring
tail -f /var/www/waitlist/storage/logs/laravel.log

# Filter by error level
grep "ERROR" /var/www/waitlist/storage/logs/laravel-$(date +%Y-%m-%d).log

# Security-related logs
grep "security\|rate.limit\|suspicious" /var/www/waitlist/storage/logs/laravel.log
```

#### Form Debug Logs
```bash
# View form performance logs
tail -f /var/www/waitlist/storage/logs/form-debug-$(date +%Y-%m-%d).log

# Analyze slow operations
grep "slow_operation" /var/www/waitlist/storage/logs/form-debug-*.log

# Error analysis
grep "error" /var/www/waitlist/storage/logs/form-debug-*.log | jq '.'
```

#### Nginx Access Logs
```bash
# Monitor API requests
tail -f /var/log/nginx/access.log | grep "api.beeylo.com"

# Analyze response codes
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# Find slow requests
awk '$NF > 1000 {print}' /var/log/nginx/access.log
```

### Database Maintenance

#### Position Recalculation
```bash
# Recalculate all positions
php artisan waitlist:recalculate-positions

# Migrate to boost system
php artisan waitlist:migrate-to-boost-system

# Award pending social follow boosts
php artisan waitlist:award-pending-boosts
```

#### Database Optimization
```sql
-- Analyze table performance
ANALYZE TABLE waitlist_users, referrals, social_follows;

-- Optimize tables
OPTIMIZE TABLE waitlist_users, referrals, social_follows;

-- Check index usage
SHOW INDEX FROM waitlist_users;

-- Find slow queries
SELECT * FROM information_schema.processlist WHERE time > 10;
```

## Performance & Monitoring

### Key Performance Metrics

#### API Response Times
- **Target**: < 200ms for 95% of requests
- **Monitoring**: Nginx access logs, APM tools

#### Database Performance
- **Query Time**: < 50ms average
- **Connection Pool**: 5-20 connections
- **Index Usage**: > 95% of queries using indexes

#### Cache Hit Rates
- **Redis**: > 90% hit rate
- **Application Cache**: > 85% hit rate

#### Security Metrics
- **Blocked Requests**: < 5% of total traffic
- **False Positives**: < 1% of legitimate requests
- **Rate Limit Hits**: < 2% of requests

### Monitoring Setup

#### Application Monitoring
```bash
# Install monitoring tools
composer require laravel/telescope
php artisan telescope:install
php artisan migrate

# Enable query logging
php artisan vendor:publish --tag=telescope-config
```

#### Server Monitoring
```bash
# Install system monitoring
sudo apt install htop iotop nethogs

# Monitor disk usage
df -h
du -sh /var/www/waitlist/storage/logs/*

# Monitor memory usage
free -h
ps aux --sort=-%mem | head

# Monitor network
netstat -tulpn | grep :80
ss -tulpn | grep :3306
```

#### Database Monitoring
```sql
-- Monitor slow queries
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Check table sizes
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'beeylo_waitlist'
ORDER BY (data_length + index_length) DESC;

-- Monitor connections
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';
```

### Performance Optimization

#### Database Optimizations
```sql
-- Add missing indexes
CREATE INDEX idx_created_at_email ON waitlist_users(created_at, email);
CREATE INDEX idx_boost_position ON waitlist_users(total_boost_percentage, boosted_position);

-- Partition large tables (if needed)
ALTER TABLE form_debug_logs PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);
```

#### Application Optimizations
```php
// Enable query caching
config(['database.redis.options.prefix' => 'beeylo_cache:']);

// Optimize position calculations
WaitlistUser::whereIn('id', $userIds)
    ->select(['id', 'original_position', 'total_boost_percentage'])
    ->chunk(1000, function ($users) {
        // Process in batches
    });
```

#### Caching Strategy
```php
// Cache frequently accessed data
Cache::remember('waitlist_stats', 300, function () {
    return [
        'total_users' => WaitlistUser::count(),
        'total_referrals' => Referral::where('completed', true)->count(),
        'average_position_improvement' => WaitlistUser::avg('position_improvement'),
    ];
});

// Cache user positions
Cache::remember("user_position:{$userId}", 60, function () use ($userId) {
    return WaitlistUser::find($userId)->getPositionWithBoostDetails();
});
```

### Scaling Considerations

#### Horizontal Scaling
- **Load Balancer**: Nginx/HAProxy for multiple app servers
- **Database**: Read replicas for status queries
- **Cache**: Redis cluster for high availability

#### Vertical Scaling
- **CPU**: 4+ cores for position calculations
- **Memory**: 8GB+ for Redis and MySQL
- **Storage**: SSD for database performance

#### Queue Processing
```php
// Background job for position recalculation
class RecalculatePositionsJob implements ShouldQueue
{
    public function handle()
    {
        WaitlistUser::recalculateAllFairPositions();
    }
}

// Dispatch job
RecalculatePositionsJob::dispatch()->onQueue('high');
```

## Support & Maintenance

### Regular Maintenance Tasks

#### Daily
- Monitor error logs
- Check API response times
- Verify email delivery rates
- Review security alerts

#### Weekly
- Analyze user growth trends
- Review position calculation accuracy
- Check database performance
- Update security threat intelligence

#### Monthly
- Database optimization and cleanup
- Security audit and updates
- Performance benchmarking
- Backup verification

### Emergency Procedures

#### API Downtime
1. Check server status and logs
2. Verify database connectivity
3. Check Redis availability
4. Review recent deployments
5. Implement emergency maintenance page

#### Security Incident
1. Identify attack vector
2. Block malicious IPs
3. Review and tighten security rules
4. Analyze affected user data
5. Notify users if necessary

#### Data Corruption
1. Stop write operations
2. Restore from latest backup
3. Verify data integrity
4. Recalculate positions if needed
5. Resume normal operations

### Contact Information

For technical support:
- **System Logs**: `/var/www/waitlist/storage/logs/`
- **Error Reporting**: Use debug logging endpoint
- **Emergency**: Check server status and recent deployments

---

**Last Updated**: August 2024  
**API Version**: 2.1  
**Laravel Version**: 10.x  
**Documentation Version**: 3.0 (Comprehensive)  
**System Status**: Production Ready
