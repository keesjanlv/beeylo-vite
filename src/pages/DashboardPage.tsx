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

            <div className="dashboard-menu-item" onClick={() => handleMenuClick('leaderboard')}>
              <div className="menu-icon leaderboard-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4"/>
                  <rect x="4" y="12" width="16" height="2"/>
                  <rect x="8" y="8" width="8" height="2"/>
                  <rect x="10" y="4" width="4" height="2"/>
                </svg>
              </div>
              <div className="menu-content">
                <h3>Leaderboard</h3>
                <p>See your ranking</p>
              </div>
            </div>

            <div className="dashboard-menu-item" onClick={() => handleMenuClick('personal-settings')}>
              <div className="menu-icon settings-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4,15a1.65,1.65,0,0,0,.33,1.82l.06.06a2,2,0,0,1,0,2.83,2,2,0,0,1-2.83,0l-.06-.06a1.65,1.65,0,0,0-1.82-.33,1.65,1.65,0,0,0-1,1.51V21a2,2,0,0,1-2,2,2,2,0,0,1-2-2v-.09A1.65,1.65,0,0,0,9,19.4a1.65,1.65,0,0,0-1.82.33l-.06.06a2,2,0,0,1-2.83,0,2,2,0,0,1,0-2.83l.06-.06a1.65,1.65,0,0,0,.33-1.82,1.65,1.65,0,0,0-1.51-1H3a2,2,0,0,1-2-2,2,2,0,0,1,2-2h.09A1.65,1.65,0,0,0,4.6,9a1.65,1.65,0,0,0-.33-1.82L4.21,7.11a2,2,0,0,1,0-2.83,2,2,0,0,1,2.83,0L7.11,4.34A1.65,1.65,0,0,0,9,4.6a1.65,1.65,0,0,0,1-1.51V3a2,2,0,0,1,2-2,2,2,0,0,1,2,2v.09a1.65,1.65,0,0,0,1,1.51,1.65,1.65,0,0,0,1.82-.33l.06-.06a2,2,0,0,1,2.83,0,2,2,0,0,1,0,2.83L19.65,7.11A1.65,1.65,0,0,0,19.4,9a1.65,1.65,0,0,0,1.51,1H21a2,2,0,0,1,2,2,2,2,0,0,1-2,2h-.09A1.65,1.65,0,0,0,19.4,15Z"/>
                </svg>
              </div>
              <div className="menu-content">
                <h3>Personal Settings</h3>
                <p>Manage your account</p>
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