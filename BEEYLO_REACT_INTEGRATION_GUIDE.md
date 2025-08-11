# 🚀 Beeylo React + Vite + TypeScript Integration Guide

## 🎯 Overview
Complete guide voor het koppelen van een nieuwe React + Vite + TypeScript website aan het bestaande Beeylo Laravel waitlist systeem. Deze guide bevat alle benodigde API's, configuraties, environment variabelen, en implementatie details.

## 🏗️ System Architecture Overview

### Current Beeylo Infrastructure
```
Frontend (Framer) ──→ Laravel API ──→ Database (SQLite)
     ↓                    ↓              ↓
New React App      Security Layers    Redis Cache
     ↓                    ↓              ↓
API Integration    Brevo Email       Points System
```

### New React Integration
```
React + Vite + TS ──→ Laravel API (Existing)
        ↓                    ↓
   Local Development    Production VPS
        ↓                    ↓
   Environment Config   217.154.80.125
```

## 🔑 Required Environment Variables

### React App Environment (.env.local)
```bash
# API Configuration
VITE_API_BASE_URL=https://api.beeylo.com/api
VITE_API_WAITLIST_URL=https://api.beeylo.com/api/waitlist
VITE_API_LEADERBOARD_URL=https://api.beeylo.com/api/leaderboard
VITE_API_SOCIAL_URL=https://api.beeylo.com/api/social-follow

# Frontend URLs
VITE_FRONTEND_URL=https://www.beeylo.com
VITE_REDIRECT_URL=https://your-react-app.com/thank-you

# Security & Analytics
VITE_TURNSTILE_SITE_KEY=0x4AAAAAABgSmPaCXn1R_VSk

# OAuth Redirect URLs (voor social follow buttons)
VITE_OAUTH_LINKEDIN_URL=https://api.beeylo.com/auth/linkedin
VITE_OAUTH_TWITTER_URL=https://api.beeylo.com/auth/twitter
VITE_OAUTH_INSTAGRAM_URL=https://api.beeylo.com/auth/instagram
VITE_OAUTH_TIKTOK_URL=https://api.beeylo.com/auth/tiktok

# Development Settings
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info
```

### Laravel Backend Environment (Already Configured)
```bash
# Core Application
APP_NAME="Beeylo Waitlist"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.beeylo.com

# Database Configuration
DB_CONNECTION=sqlite
DB_DATABASE=/var/www/beeylo-waitlist/database/database.sqlite

# Cache Configuration
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Email Integration - Brevo
BREVO_ENABLED=true
BREVO_API_KEY=your_brevo_api_key_here
BREVO_LIST_ID=5
BREVO_OFFICIAL_API_URL=https://api.brevo.com/v3/contacts

# Security - Turnstile
TURNSTILE_SITE_KEY=0x4AAAAAABgSmPaCXn1R_VSk
TURNSTILE_SECRET_KEY=0x4AAAAAABgSmLKaOkE5274W_rBsbrkuMg8

# Social Media OAuth (Setup Required)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=https://api.beeylo.com/auth/linkedin/callback
LINKEDIN_COMPANY_ID=your_linkedin_company_id

TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_REDIRECT_URI=https://api.beeylo.com/auth/twitter/callback
TWITTER_TARGET_USER_ID=your_twitter_user_id

INSTAGRAM_CLIENT_ID=your_instagram_app_id
INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret
INSTAGRAM_REDIRECT_URI=https://api.beeylo.com/auth/instagram/callback

TIKTOK_CLIENT_ID=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://api.beeylo.com/auth/tiktok/callback

# Points System Configuration
EARLY_ACCESS_THRESHOLD=30
SOCIAL_FOLLOW_POINTS=5
REFERRAL_POINTS=1
```

## 🔗 Complete API Reference

### 1. Waitlist Registration
```typescript
// POST /api/waitlist/register
interface WaitlistRegistrationRequest {
  email: string;
  name?: string;
  phone?: string;
  referral_code?: string;
  source?: string;
  turnstile_token?: string;
  submission_time?: number;
  form_version?: string;
  session_id?: string;
}

interface WaitlistRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    email: string;
    position: number;
    estimated_position: string;
    referral_code: string;
    referral_url: string;
    referral_count: number;
    total_users: number;
    points_system: {
      total_points: number;
      social_follow_points: number;
      referral_points: number;
      early_access_eligible: boolean;
      points_needed_for_early_access: number;
    };
    leaderboard_rank: number;
    security_score: number;
  };
}
```

### 2. User Status Check
```typescript
// POST /api/waitlist/status
interface StatusRequest {
  email: string;
}

interface StatusResponse {
  success: boolean;
  data: {
    user_id: number;
    email: string;
    position: number;
    referral_code: string;
    referral_url: string;
    referral_count: number;
    points_system: {
      total_points: number;
      social_follow_points: number;
      referral_points: number;
      early_access_eligible: boolean;
      points_needed_for_early_access: number;
    };
    leaderboard_rank: number;
    social_follow_status: Record<string, any>;
  };
}
```

### 3. Leaderboard System
```typescript
// GET /api/leaderboard
interface LeaderboardResponse {
  success: boolean;
  data: {
    leaderboard: Array<{
      rank: number;
      masked_email: string;
      total_points: number;
      badge_color: string;
    }>;
    user_rank?: number;
    total_users: number;
  };
}

// GET /api/leaderboard/user-stats?email=user@example.com
interface UserStatsResponse {
  success: boolean;
  data: {
    rank: number;
    total_points: number;
    referral_points: number;
    social_follow_points: number;
    referral_count: number;
    early_access_eligible: boolean;
    points_breakdown: Record<string, number>;
  };
}

// GET /api/leaderboard/prizes
interface PrizesResponse {
  success: boolean;
  data: {
    early_access_threshold: number;
    platforms: Record<string, {
      name: string;
      points: number;
      url: string;
      icon: string;
      oauth_available: boolean;
    }>;
    referral_points: number;
    benefits: string[];
  };
}
```

### 4. Social Follow Tracking
```typescript
// POST /api/social-follow/track
interface SocialFollowRequest {
  user_id: number;
  platform: 'linkedin' | 'instagram' | 'tiktok' | 'x';
  verification_method?: 'manual' | 'oauth';
  platform_user_id?: string;
  platform_username?: string;
}

interface SocialFollowResponse {
  success: boolean;
  message: string;
  data: {
    platform: string;
    points_awarded: number;
    total_points: number;
    early_access_eligible: boolean;
    points_breakdown: Record<string, number>;
  };
}

// GET /api/social-follow/status/{userId}
interface SocialFollowStatusResponse {
  success: boolean;
  data: {
    user_id: number;
    social_follow_status: Record<string, {
      is_following: boolean;
      points_earned: number;
      followed_at: string | null;
      follow_url: string;
      display_name: string;
      icon: string;
    }>;
    points_breakdown: Record<string, number>;
    leaderboard_rank: number;
  };
}

// GET /api/social-follow/platforms
interface PlatformsResponse {
  success: boolean;
  data: Record<string, {
    follow_url: string;
    oauth_url: string;
    display_name: string;
    icon: string;
    points: number;
    oauth_available: boolean;
  }>;
}
```

### 5. OAuth Social Verification
```typescript
// GET /auth/{platform}?user_id={userId}
// Redirects to OAuth provider

// OAuth Callback URLs:
// https://api.beeylo.com/auth/linkedin/callback
// https://api.beeylo.com/auth/twitter/callback  
// https://api.beeylo.com/auth/instagram/callback
// https://api.beeylo.com/auth/tiktok/callback

// After OAuth completion, user is redirected to:
// https://your-frontend.com/thank-you?oauth_success=true&message=Success!
// https://your-frontend.com/thank-you?oauth_error=true&message=Error!
```

### 6. Referral System
```typescript
// GET /r/{referral_code}
// Redirects to: https://www.beeylo.com/?ref={referral_code}
// Or your custom frontend with ref parameter
```

## 🛠️ React Implementation Examples

### 1. API Service Setup
```typescript
// src/services/api.ts
class BeeyloAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'BeeyloReactApp/1.0',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Waitlist registration
  async registerUser(data: WaitlistRegistrationRequest): Promise<WaitlistRegistrationResponse> {
    return this.request('/waitlist/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User status check
  async getUserStatus(email: string): Promise<StatusResponse> {
    return this.request('/waitlist/status', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Leaderboard data
  async getLeaderboard(): Promise<LeaderboardResponse> {
    return this.request('/leaderboard');
  }

  async getUserStats(email: string): Promise<UserStatsResponse> {
    return this.request(`/leaderboard/user-stats?email=${email}`);
  }

  async getPrizes(): Promise<PrizesResponse> {
    return this.request('/leaderboard/prizes');
  }

  // Social follows
  async trackSocialFollow(data: SocialFollowRequest): Promise<SocialFollowResponse> {
    return this.request('/social-follow/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSocialFollowStatus(userId: number): Promise<SocialFollowStatusResponse> {
    return this.request(`/social-follow/status/${userId}`);
  }

  async getPlatforms(): Promise<PlatformsResponse> {
    return this.request('/social-follow/platforms');
  }
}

export const api = new BeeyloAPI();
```

### 2. Registration Form Component
```typescript
// src/components/RegistrationForm.tsx
import React, { useState } from 'react';
import { api } from '../services/api';

interface FormData {
  email: string;
  name: string;
  referralCode: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    referralCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.registerUser({
        email: formData.email,
        name: formData.name,
        referral_code: formData.referralCode || undefined,
        source: 'react_app',
        form_version: '1.0',
        session_id: `react_${Date.now()}`,
        submission_time: Date.now(),
      });

      setResult(response);
      
      // Store user data for thank you page
      localStorage.setItem('beeylo_waitlist', JSON.stringify(response.data));
      
      // Redirect to thank you page
      window.location.href = '/thank-you';
      
    } catch (error) {
      console.error('Registration failed:', error);
      setResult({ success: false, message: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Join Beeylo Waitlist</h2>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          id="referralCode"
          value={formData.referralCode}
          onChange={(e) => setFormData(prev => ({ ...prev, referralCode: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ABC12345"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Registering...' : 'Join Waitlist'}
      </button>

      {result && (
        <div className={`mt-4 p-3 rounded-md ${result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {result.message}
        </div>
      )}
    </form>
  );
};
```

### 3. Thank You Page Component
```typescript
// src/components/ThankYouPage.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface UserData {
  user_id: number;
  email: string;
  position: number;
  referral_code: string;
  referral_url: string;
  referral_count: number;
  points_system: {
    total_points: number;
    social_follow_points: number;
    referral_points: number;
    early_access_eligible: boolean;
    points_needed_for_early_access: number;
  };
  leaderboard_rank: number;
}

export const ThankYouPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [platforms, setPlatforms] = useState<any>({});
  const [followStatus, setFollowStatus] = useState<any>({});

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem('beeylo_waitlist');
    if (storedData) {
      const data = JSON.parse(storedData);
      setUserData(data);
      
      // Load platforms and follow status
      loadPlatforms();
      loadFollowStatus(data.user_id);
    }
  }, []);

  const loadPlatforms = async () => {
    try {
      const response = await api.getPlatforms();
      setPlatforms(response.data);
    } catch (error) {
      console.error('Failed to load platforms:', error);
    }
  };

  const loadFollowStatus = async (userId: number) => {
    try {
      const response = await api.getSocialFollowStatus(userId);
      setFollowStatus(response.data.social_follow_status);
    } catch (error) {
      console.error('Failed to load follow status:', error);
    }
  };

  const handleSocialFollow = async (platform: string) => {
    if (!userData) return;

    try {
      // For OAuth platforms, redirect to OAuth URL
      if (platforms[platform]?.oauth_available) {
        window.location.href = `${platforms[platform].oauth_url}?user_id=${userData.user_id}`;
        return;
      }

      // For manual verification, open platform and track follow
      if (platforms[platform]?.follow_url) {
        window.open(platforms[platform].follow_url, '_blank');
      }

      const response = await api.trackSocialFollow({
        user_id: userData.user_id,
        platform: platform as any,
        verification_method: 'manual',
      });

      if (response.success) {
        // Update local data
        setUserData(prev => prev ? {
          ...prev,
          points_system: {
            ...prev.points_system,
            total_points: response.data.total_points,
            social_follow_points: prev.points_system.social_follow_points + 5,
            early_access_eligible: response.data.early_access_eligible,
            points_needed_for_early_access: Math.max(0, 30 - response.data.total_points),
          }
        } : null);

        // Reload follow status
        loadFollowStatus(userData.user_id);
        
        alert(`Great! You've earned 5 points for following us on ${platforms[platform]?.display_name}!`);
      }
    } catch (error) {
      console.error('Failed to track follow:', error);
    }
  };

  const shareReferralLink = (platform: string) => {
    if (!userData) return;

    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(userData.referral_url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(userData.referral_url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(userData.referral_url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(userData.referral_url)}`,
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Beeylo! 🎉
        </h1>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userData.position}</div>
            <div className="text-gray-600">Your Position</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userData.points_system.total_points}</div>
            <div className="text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">#{userData.leaderboard_rank}</div>
            <div className="text-gray-600">Leaderboard Rank</div>
          </div>
        </div>

        {/* Early Access Status */}
        {userData.points_system.early_access_eligible ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            🎉 Congratulations! You're eligible for early access!
          </div>
        ) : (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
            You need {userData.points_system.points_needed_for_early_access} more points for early access
          </div>
        )}

        {/* Social Follow Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Earn 5 Points Each - Follow Us!</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(platforms).map(([platform, data]: [string, any]) => (
              <button
                key={platform}
                onClick={() => handleSocialFollow(platform)}
                disabled={followStatus[platform]?.is_following}
                className={`p-4 rounded-lg border text-center transition-colors ${
                  followStatus[platform]?.is_following
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-2">{data.icon}</div>
                <div className="font-medium">{data.display_name}</div>
                {data.oauth_available && <div className="text-xs">🔒 Verified</div>}
                {followStatus[platform]?.is_following && (
                  <div className="text-xs text-green-600">✓ Following</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Referral Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Earn 1 Point Each - Share Your Referral Link!
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-600 mb-2">Your referral link:</div>
            <div className="font-mono text-sm break-all">{userData.referral_url}</div>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => shareReferralLink('whatsapp')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              📱 WhatsApp
            </button>
            <button
              onClick={() => shareReferralLink('linkedin')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💼 LinkedIn
            </button>
            <button
              onClick={() => shareReferralLink('twitter')}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              🐦 Twitter
            </button>
            <button
              onClick={() => shareReferralLink('telegram')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ✈️ Telegram
            </button>
          </div>
        </div>

        {/* Referral Stats */}
        {userData.referral_count > 0 && (
          <div className="text-center">
            <div className="text-lg">
              🎉 You've referred <span className="font-bold">{userData.referral_count}</span> people!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

### 4. Leaderboard Component
```typescript
// src/components/Leaderboard.tsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface LeaderboardEntry {
  rank: number;
  masked_email: string;
  total_points: number;
  badge_color: string;
}

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const [leaderboardResponse, statsResponse] = await Promise.all([
        api.getLeaderboard(),
        api.getPrizes()
      ]);

      setLeaderboard(leaderboardResponse.data.leaderboard);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading leaderboard...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h2>
      
      {/* Early Access Info */}
      {stats && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <div className="font-semibold">Early Access Threshold: {stats.early_access_threshold} points</div>
          <div className="text-sm mt-1">
            • {stats.referral_points} point per referral
            • {Object.values(stats.platforms)[0]?.points || 5} points per social follow
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <h3 className="font-semibold text-gray-800">Top 10 Users</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                  entry.rank === 1 ? 'bg-yellow-500' :
                  entry.rank === 2 ? 'bg-gray-400' :
                  entry.rank === 3 ? 'bg-yellow-600' :
                  'bg-blue-500'
                }`}>
                  {entry.rank}
                </div>
                <div>
                  <div className="font-medium">{entry.masked_email}</div>
                  <div className="text-sm text-gray-500">
                    {entry.rank === 1 && '👑 '}
                    Rank #{entry.rank}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{entry.total_points}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## 🔧 Setup Instructions

### 1. React Project Setup
```bash
# Create new Vite + React + TypeScript project
npm create vite@latest beeylo-frontend -- --template react-ts
cd beeylo-frontend

# Install dependencies
npm install

# Install additional packages
npm install @types/node

# Create environment file
touch .env.local
```

### 2. Project Structure
```
src/
├── components/
│   ├── RegistrationForm.tsx
│   ├── ThankYouPage.tsx
│   ├── Leaderboard.tsx
│   └── StatusCheck.tsx
├── services/
│   └── api.ts
├── types/
│   └── api.ts
├── App.tsx
└── main.tsx
```

### 3. Type Definitions
```typescript
// src/types/api.ts
export interface WaitlistRegistrationRequest {
  email: string;
  name?: string;
  phone?: string;
  referral_code?: string;
  source?: string;
  turnstile_token?: string;
  submission_time?: number;
  form_version?: string;
  session_id?: string;
}

export interface WaitlistRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    email: string;
    position: number;
    estimated_position: string;
    referral_code: string;
    referral_url: string;
    referral_count: number;
    total_users: number;
    points_system: {
      total_points: number;
      social_follow_points: number;
      referral_points: number;
      early_access_eligible: boolean;
      points_needed_for_early_access: number;
    };
    leaderboard_rank: number;
    security_score: number;
  };
}

// Add other interfaces as needed...
```

### 4. CORS Configuration (Already Set)
The Laravel backend is already configured to accept requests from your React app. Make sure to add your domain to the CORS configuration if deploying to production:

```php
// config/cors.php - Already configured
'allowed_origins' => [
    'https://www.beeylo.com',
    'https://beeylo.com',
    'https://your-react-app.com', // Add your domain here
    'http://localhost:3000', // For development
],
```

## 🔐 Security Considerations

### 1. Environment Variables
```bash
# Never commit these to git:
VITE_TURNSTILE_SITE_KEY=0x4AAAAAABgSmPaCXn1R_VSk

# Add to .gitignore:
.env.local
.env.production
```

### 2. API Error Handling
```typescript
// src/services/api.ts
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'BeeyloReactApp/1.0',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error', 0, error);
  }
}
```

### 3. Rate Limiting Handling
```typescript
// Add retry logic for rate limiting
private async requestWithRetry<T>(
  endpoint: string, 
  options: RequestInit = {},
  maxRetries = 3
): Promise<T> {
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await this.request<T>(endpoint, options);
    } catch (error) {
      if (error instanceof APIError && error.status === 429) {
        // Rate limited, wait and retry
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, waitTime));
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  
  throw lastError;
}
```

## 📊 Analytics & Monitoring

### 1. User Events Tracking
```typescript
// src/services/analytics.ts
class Analytics {
  track(event: string, properties: Record<string, any> = {}) {
    // Track user events
    console.log('Analytics:', event, properties);
    
    // You can integrate with services like:
    // - Google Analytics
    // - Mixpanel
    // - PostHog
    // - Custom tracking
  }

  trackFormSubmission(email: string, source: string) {
    this.track('waitlist_registration', { email, source });
  }

  trackSocialFollow(platform: string, method: string) {
    this.track('social_follow', { platform, method });
  }

  trackReferralShare(platform: string) {
    this.track('referral_share', { platform });
  }
}

export const analytics = new Analytics();
```

### 2. Performance Monitoring
```typescript
// src/services/performance.ts
class PerformanceMonitor {
  measureApiCall<T>(
    operation: string,
    apiCall: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    
    return apiCall()
      .then(result => {
        const duration = performance.now() - startTime;
        console.log(`API Call ${operation}: ${duration.toFixed(2)}ms`);
        return result;
      })
      .catch(error => {
        const duration = performance.now() - startTime;
        console.error(`API Call ${operation} failed after ${duration.toFixed(2)}ms:`, error);
        throw error;
      });
  }
}

export const performance = new PerformanceMonitor();
```

## 🚀 Deployment

### 1. Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Environment Variables for Production
```bash
# .env.production
VITE_API_BASE_URL=https://api.beeylo.com/api
VITE_FRONTEND_URL=https://your-production-domain.com
VITE_DEBUG_MODE=false
VITE_LOG_LEVEL=error
```

### 3. Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist` folder
- **AWS S3 + CloudFront**: Upload `dist` to S3
- **Your own server**: Copy `dist` to web server

## 🔄 OAuth Setup (Optional)

If you want to implement OAuth social verification:

1. **LinkedIn**: Follow [OAUTH_SETUP_TUTORIALS.md](./OAUTH_SETUP_TUTORIALS.md#linkedin-oauth-setup)
2. **Twitter/X**: Follow [OAUTH_SETUP_TUTORIALS.md](./OAUTH_SETUP_TUTORIALS.md#twitterx-oauth-setup)
3. **Instagram**: Follow [OAUTH_SETUP_TUTORIALS.md](./OAUTH_SETUP_TUTORIALS.md#instagram-oauth-setup)
4. **TikTok**: Follow [OAUTH_SETUP_TUTORIALS.md](./OAUTH_SETUP_TUTORIALS.md#tiktok-oauth-setup)

## 📞 Support & Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure your domain is added to Laravel's CORS configuration
   - Check that you're using the correct API URL

2. **API Rate Limiting**
   - Implement retry logic with exponential backoff
   - Cache responses when possible

3. **OAuth Redirects**
   - Ensure callback URLs match exactly in OAuth app settings
   - Check that user_id is passed correctly in state parameter

### Debug Mode
Enable debug mode in development:
```typescript
// Add to your API service
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  console.log('API Request:', endpoint, options);
  console.log('API Response:', response);
}
```

## 🎯 Next Steps

1. **Set up your React project** using the provided examples
2. **Configure environment variables** with your domain
3. **Test API integration** with the registration form
4. **Implement thank you page** with points system
5. **Add leaderboard component** for competitive engagement
6. **Set up OAuth credentials** for social verification (optional)
7. **Deploy to production** and update CORS settings

This guide provides everything you need to integrate your new React website with the existing Beeylo Laravel system. The API is production-ready and handles 5,137+ users with enterprise-grade security.