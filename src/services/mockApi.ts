// Mock API for local development
import type { 
  WaitlistRegistrationRequest, 
  WaitlistRegistrationResponse, 
  StatusResponse, 
  LeaderboardResponse 
} from './api';

// Mock data
const mockUserData = {
  user_id: 1,
  email: 'test@beeylo.com',
  position: 42,
  estimated_position: '42nd',
  referral_code: 'BEEYLO42',
  referral_url: 'https://beeylo.com/ref/BEEYLO42',
  referral_count: 5,
  total_users: 1250,
  points_system: {
    total_points: 350,
    social_follow_points: 200,
    referral_points: 150,
    early_access_eligible: true,
    points_needed_for_early_access: 0,
  },
  leaderboard_rank: 8,
  security_score: 95,
  social_follow_status: {
    instagram: false,
    tiktok: false,
    twitter: false,
    linkedin: false,
  }
};

const mockLeaderboard = [
  { rank: 1, masked_email: 'alex***@gmail.com', total_points: 850, badge_color: '#FFD700' },
  { rank: 2, masked_email: 'sarah***@yahoo.com', total_points: 720, badge_color: '#C0C0C0' },
  { rank: 3, masked_email: 'mike***@hotmail.com', total_points: 680, badge_color: '#CD7F32' },
  { rank: 4, masked_email: 'emma***@gmail.com', total_points: 620, badge_color: '#4CAF50' },
  { rank: 5, masked_email: 'david***@outlook.com', total_points: 580, badge_color: '#4CAF50' },
  { rank: 6, masked_email: 'lisa***@gmail.com', total_points: 520, badge_color: '#4CAF50' },
  { rank: 7, masked_email: 'james***@yahoo.com', total_points: 480, badge_color: '#4CAF50' },
  { rank: 8, masked_email: 'test@beeylo.com', total_points: 350, badge_color: '#4CAF50' },
  { rank: 9, masked_email: 'anna***@gmail.com', total_points: 320, badge_color: '#4CAF50' },
  { rank: 10, masked_email: 'tom***@hotmail.com', total_points: 280, badge_color: '#4CAF50' },
];

export class MockAPI {
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async registerUser(data: WaitlistRegistrationRequest): Promise<WaitlistRegistrationResponse> {
    await this.delay();
    
    return {
      success: true,
      message: 'Successfully registered for the waitlist!',
      data: {
        ...mockUserData,
        email: data.email,
      }
    };
  }

  async getUserStatus(email: string): Promise<StatusResponse> {
    await this.delay();
    
    return {
      success: true,
      data: {
        ...mockUserData,
        email: email,
      }
    };
  }

  async getLeaderboard(): Promise<LeaderboardResponse> {
    await this.delay();
    
    return {
      success: true,
      data: {
        leaderboard: mockLeaderboard,
        user_rank: 8,
        total_users: 1250,
      }
    };
  }

  async getUserStats(_email: string) {
    await this.delay();
    
    return {
      success: true,
      data: {
        rank: 8,
        total_points: 350,
        referral_points: 150,
        social_follow_points: 200,
        referral_count: 5,
        early_access_eligible: true,
        points_breakdown: {
          referrals: 150,
          instagram: 50,
          tiktok: 50,
          twitter: 50,
          linkedin: 50,
        }
      }
    };
  }

  async trackSocialFollow(data: { user_id: number; platform: string; verification_method?: string }) {
    await this.delay();
    
    return {
      success: true,
      message: `Successfully followed on ${data.platform}!`,
      data: {
        platform: data.platform,
        points_awarded: 50,
        total_points: 400,
        early_access_eligible: true,
        points_breakdown: {
          referrals: 150,
          [data.platform]: 50,
        }
      }
    };
  }
}

export const mockApi = new MockAPI();