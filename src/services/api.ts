// API Service for Beeylo Laravel Backend Integration

import { mockApi } from './mockApi';

// Types based on the Laravel API responses
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
  skip_brevo?: boolean; // Flag to skip sending to Brevo API for existing users
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

export interface StatusRequest {
  email: string;
}

export interface StatusResponse {
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

export interface LeaderboardResponse {
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

export interface UserStatsResponse {
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

export interface SocialFollowRequest {
  user_id: number;
  platform: 'linkedin' | 'instagram' | 'tiktok' | 'x';
  verification_method?: 'manual' | 'oauth';
  platform_user_id?: string;
  platform_username?: string;
}

export interface SocialFollowResponse {
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

export interface SocialFollowStatusResponse {
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

export interface PlatformsResponse {
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

class BeeyloAPI {
  private baseURL: string;
  private isDevelopment: boolean;

  constructor() {
    // Use Vite environment variable for the API base URL, with a fallback
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.beeylo.com/api';
    this.isDevelopment = import.meta.env.DEV || 
                        window.location.hostname === 'localhost' ||
                        window.location.hostname === 'staging.beeylo.com';
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
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
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Waitlist registration
  async registerUser(data: WaitlistRegistrationRequest): Promise<WaitlistRegistrationResponse> {
    if (this.isDevelopment) {
      console.log('Using mock API for development');
      return mockApi.registerUser(data);
    }
    
    return this.request('/waitlist/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User status check
  async getUserStatus(email: string): Promise<StatusResponse> {
    if (this.isDevelopment) {
      console.log('Using mock API for development');
      return mockApi.getUserStatus(email);
    }
    
    return this.request('/waitlist/status', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Leaderboard data
  async getLeaderboard(): Promise<LeaderboardResponse> {
    if (this.isDevelopment) {
      console.log('Using mock API for development');
      return mockApi.getLeaderboard();
    }
    
    return this.request('/leaderboard');
  }

  async getUserStats(email: string): Promise<UserStatsResponse> {
    if (this.isDevelopment) {
      console.log('Using mock API for development');
      return mockApi.getUserStats(email);
    }
    
    return this.request(`/leaderboard/user-stats?email=${encodeURIComponent(email)}`);
  }

  // Social follows
  async trackSocialFollow(data: SocialFollowRequest): Promise<SocialFollowResponse> {
    if (this.isDevelopment) {
      console.log('Using mock API for development');
      return mockApi.trackSocialFollow(data);
    }
    
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