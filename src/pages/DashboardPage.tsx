import type { FC } from 'react'
import type { TabType } from '../types'

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
  social_follow_status?: Record<string, any>;
}

interface DashboardPageProps {
  userData: UserData | null
  onLogout?: () => void
  onTabChange?: (tab: TabType) => void
}

export const DashboardPage: FC<DashboardPageProps> = ({ userData, onLogout, onTabChange }) => {
  const handleMenuClick = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  const handleCopyReferralLink = () => {
    if (userData?.referral_url) {
      navigator.clipboard.writeText(userData.referral_url)
      // You could add a toast notification here
    }
  }

  if (!userData) {
    return (
      <div className="page-content">
        <div className="dashboard-new-layout">
          <div className="dashboard-container">
            <div className="dashboard-welcome-header">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-content">
      <div className="dashboard-new-layout">
        <div className="dashboard-container">
          {/* Welcome Header */}
          <div className="dashboard-welcome-header">
            <h1>Dashboard</h1>
          </div>

          {/* Miniature Stats Cards */}
          <div className="dashboard-stats-mini">
            <div className="stat-card-mini">
              <div className="stat-number-mini">#{userData.position}</div>
              <div className="stat-label-mini">Position</div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-number-mini">{userData.referral_count}</div>
              <div className="stat-label-mini">Referrals</div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-number-mini">{userData.points_system.total_points}</div>
              <div className="stat-label-mini">Points</div>
            </div>
          </div>

          {/* Early Access Status */}
          {userData.points_system.early_access_eligible && (
            <div className="early-access-banner">
              <div className="early-access-content">
                <div className="early-access-icon">
                  🎉
                </div>
                <div className="early-access-text">
                  <strong>Congratulations! You're eligible for early access!</strong>
                </div>
              </div>
            </div>
          )}

          {/* Referral Link Section */}
          <h3 className="referral-header">Your referral link</h3>
          <div className="referral-section">
            <div className="referral-link-container">
              <input 
                type="text" 
                value={userData.referral_url} 
                readOnly 
                className="referral-link-input"
              />
              <button className="copy-link-button" onClick={handleCopyReferralLink}>
                Copy
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="dashboard-menu-section">
            <div className="dashboard-menu-item" onClick={() => handleMenuClick('actions')}>
              <div className="menu-icon actions-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,11 12,14 22,4"/>
                  <path d="M21,12v7a2,2 0,0 1,-2,2H5a2,2 0,0 1,-2,-2V5a2,2 0,0 1,2,-2h11"/>
                </svg>
              </div>
              <div className="menu-content">
                <h3>Actions</h3>
                <p>Complete tasks to earn points</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="dashboard-logout-section">
            <button className="dashboard-logout-button" onClick={onLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}