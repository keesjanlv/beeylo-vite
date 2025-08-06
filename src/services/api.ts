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
    
    // More explicit development detection:
    // ONLY use mock API for localhost, 127.0.0.1, or staging.beeylo.com
    // NEVER use mock API for production beeylo.com
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isStaging = hostname === 'staging.beeylo.com';
    const isProduction = hostname === 'beeylo.com' || hostname === 'www.beeylo.com';
    
    // Force production mode for beeylo.com domains
    if (isProduction) {
      this.isDevelopment = false;
    } else {
      this.isDevelopment = import.meta.env.DEV === true || isLocalhost || isStaging;
    }
    
    // Debug information
    console.log('API Base URL:', this.baseURL);
    console.log('Is Development Mode:', this.isDevelopment);
    console.log('Window Location:', hostname);
    console.log('DEV env variable:', import.meta.env.DEV);
    console.log('Mode:', import.meta.env.MODE);
  }

  // Track retry attempts for rate limiting
  private retryCount = 0;
  private maxRetries = 2; // Allow up to 2 automatic retries
  
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
        // Handle rate limiting specifically
        if (response.status === 429) {
          // Try to get response body for retry_after value
          let retryAfter = response.headers.get('Retry-After');
          let waitTime = 10; // Default fallback
          
          try {
            const errorData = await response.json();
            // Backend documentation shows retry_after in response body
            if (errorData.retry_after) {
              waitTime = errorData.retry_after;
            } else if (retryAfter) {
              waitTime = parseInt(retryAfter, 10);
            }
          } catch (e) {
            // If we can't parse the response, use header or default
            waitTime = retryAfter ? parseInt(retryAfter, 10) : 10;
          }
          
          // Try to automatically retry a few times with exponential backoff
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            const backoffTime = Math.min(waitTime, Math.pow(2, this.retryCount) * 2); // Exponential backoff, but respect server limits
            console.log(`Rate limited. Retrying in ${backoffTime} seconds (attempt ${this.retryCount}/${this.maxRetries})`);
            
            // Wait and retry
            await new Promise(resolve => setTimeout(resolve, backoffTime * 1000));
            return this.request<T>(endpoint, options);
          }
          
          // If we've exhausted retries, store the rate limit info
          const adjustedWaitTime = Math.max(5, waitTime); // Ensure minimum 5 seconds wait
          sessionStorage.setItem('beeylo_rate_limited', 'true');
          sessionStorage.setItem('beeylo_rate_limit_reset', String(Date.now() + adjustedWaitTime * 1000));
          
          throw new Error(`API Error: 429 - Rate limited. Please wait ${adjustedWaitTime} seconds before trying again.`);
        }
        
        // Handle 500 errors with retry logic (common for new user registration)
        if (response.status === 500) {
          let errorMessage = 'Server error';
          try {
            const errorData = await response.json();
            if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (e) {
            errorMessage = response.statusText || 'Internal server error';
          }
          
          // Retry 500 errors automatically for registration endpoints
          if (endpoint.includes('/waitlist/register') && this.retryCount < this.maxRetries) {
            this.retryCount++;
            const backoffTime = Math.pow(2, this.retryCount); // 2, 4, 8 seconds
            console.log(`Server error (500). Retrying in ${backoffTime} seconds (attempt ${this.retryCount}/${this.maxRetries})`);
            
            // Wait and retry
            await new Promise(resolve => setTimeout(resolve, backoffTime * 1000));
            return this.request<T>(endpoint, options);
          }
          
          throw new Error(`API Error: 500 - ${errorMessage}`);
        }
        
        // Handle other HTTP errors
        let errorMessage = `API Error: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          }
        } catch (e) {
          errorMessage += ` - ${response.statusText || 'Unknown error'}`;
        }
        
        throw new Error(errorMessage);
      }

      // Reset retry count on success
      this.retryCount = 0;
      
      // Clear rate limit flags on successful request
      sessionStorage.removeItem('beeylo_rate_limited');
      sessionStorage.removeItem('beeylo_rate_limit_reset');

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
    
    try {
      // Try GET method first (as documented)
      return await this.request(`/waitlist/status?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // If GET fails, try POST method as fallback
      if (error instanceof Error && error.message.includes('404')) {
        try {
          return await this.request('/waitlist/status', {
            method: 'POST',
            body: JSON.stringify({ email }),
          });
        } catch (postError) {
          // If both methods fail with 404, return a proper "not found" response
          if (postError instanceof Error && postError.message.includes('404')) {
            return {
              success: false,
              data: null as any // This will be handled by the calling code
            };
          }
          throw postError;
        }
      }
      throw error;
    }
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