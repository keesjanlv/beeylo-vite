import type { FC } from 'react'
import { useState } from 'react'

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

interface PersonalSettingsPageProps {
  userData: UserData | null
  onLogout: () => void
  onBack: () => void
}

export const PersonalSettingsPage: FC<PersonalSettingsPageProps> = ({ userData, onLogout, onBack }) => {
  const [profile, setProfile] = useState({
    displayName: 'Your Name',
    bio: '',
    shareProfile: true
  })

  const handleProfileChange = (key: keyof typeof profile, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!userData) {
    return (
      <div className="page-content">
        <div className="dashboard-new-layout">
          <div className="dashboard-container">
            <div className="dashboard-header">
              <button className="back-button" onClick={onBack}>
                ←
              </button>
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
          <div className="dashboard-header">
            <button className="back-button" onClick={onBack}>
              ←
            </button>
            <h1>Personal Settings</h1>
            <p>Manage your account preferences and privacy settings</p>
          </div>

          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={userData.email} 
                  disabled 
                  className="setting-input disabled"
                />
              </div>
              <div className="setting-item">
                <label>Display name</label>
                <input 
                  type="text" 
                  value={profile.displayName}
                  onChange={(e) => handleProfileChange('displayName', e.target.value)}
                  className="setting-input"
                  placeholder="How others see your name"
                />
              </div>
              <div className="setting-item">
                <label>Bio</label>
                <textarea 
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="setting-textarea"
                  placeholder="Tell others about yourself"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Privacy Settings</h3>
            <div className="settings-group">
              <div className="setting-item toggle-item">
                <div className="setting-info">
                  <label>Share Profile on Leaderboard</label>
                  <p>Allow others to see your name and stats on the public leaderboard</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={profile.shareProfile}
                    onChange={(e) => handleProfileChange('shareProfile', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Account Actions</h3>
            <div className="settings-group">
              <button className="setting-button primary">
                Save Changes
              </button>
              <button className="setting-button secondary">
                Export My Data
              </button>
              <button 
                className="setting-button danger"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}