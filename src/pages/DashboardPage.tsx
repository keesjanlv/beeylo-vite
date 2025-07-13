import { useState } from 'react'
import type { FC } from 'react'
import type { DashboardProps, DashboardTabType } from '../types'
import { Header } from '../components'

const dashboardTabs: Array<{ id: DashboardTabType, label: string }> = [
  { id: 'share', label: 'Share' },
  { id: 'actions', label: 'Actions' },
  { id: 'follow', label: 'Follow' },
  { id: 'leaderboard', label: 'Leaderboard' }
]





export const DashboardPage: FC<DashboardProps> = ({ userEmail }) => {
  const [activeTab, setActiveTab] = useState<DashboardTabType | null>(null)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'actions':
        return (
          <div className="actions-simple-list">
            <div className="action-simple-item">
              <span className="action-simple-text">Volg op Twitter</span>
              <span className="action-simple-points">+5 pt</span>
            </div>
            <div className="action-simple-item">
              <span className="action-simple-text">Volg op Instagram</span>
              <span className="action-simple-points">+5 pt</span>
            </div>
            <div className="action-simple-item">
              <span className="action-simple-text">Join Discord</span>
              <span className="action-simple-points">+10 pt</span>
            </div>
            <div className="action-simple-item">
              <span className="action-simple-text">Deel op LinkedIn</span>
              <span className="action-simple-points">+8 pt</span>
            </div>
            <div className="action-simple-item">
              <span className="action-simple-text">Schrijf je in voor nieuwsbrief</span>
              <span className="action-simple-points">+3 pt</span>
            </div>
          </div>
        )
      case 'follow':
        return (
          <div className="follow-page">
            <h2>Following</h2>
            <p>Keep track of important updates and notifications.</p>
          </div>
        )
      case 'share':
        return (
          <div className="share-page">
            <h2>Share</h2>
            <p>Share your progress and achievements with others.</p>
          </div>
        )
      case 'leaderboard':
        return (
          <div className="leaderboard-page">
            <h2>Leaderboard</h2>
            <p>See how you rank among your peers.</p>
          </div>
        )
      case null:
        return (
          <div className="dashboard-placeholder">
            <p>Select a tab above to view more details</p>
          </div>
        )
      default:
        return (
          <div className="dashboard-placeholder">
            <p>Select a tab above to view more details</p>
          </div>
        )
    }
  }

  return (
    <div className="page-content">
      <Header userEmail={userEmail} />
      <div className="dashboard-tabs-simple">
        {dashboardTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`dashboard-tab-simple ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="dashboard-tab-content">
        {renderTabContent()}
      </div>
    </div>
  )
} 