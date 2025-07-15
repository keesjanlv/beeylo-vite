import type { FC } from 'react'
import type { DashboardProps } from '../types'

interface HeaderProps extends DashboardProps {
  onLogout?: () => void
}

export const Header: FC<HeaderProps> = ({ userEmail, onLogout }) => {
  const firstName = userEmail.split('@')[0]
  
  return (
    <div className="dashboard-stats-container">
      <div className="dashboard-stats-card">
        <div className="dashboard-welcome">
          <h2>Welcome back, {firstName}.</h2>
          <button className="logout-button" onClick={onLogout}>
            LOG OUT
          </button>
        </div>
        <div className="dashboard-stats-grid">
          <div className="stat-box">
            <div className="stat-number">#247</div>
            <div className="stat-label">Position</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">12</div>
            <div className="stat-label">Referrals</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">1,240</div>
            <div className="stat-label">Points</div>
          </div>
        </div>
      </div>
    </div>
  )
}