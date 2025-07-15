import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { InstagramIcon, TikTokIcon, TwitterIcon, LinkedinIcon } from '../components/Icons'

interface ActionsPageProps {
  onBack: () => void
}

interface SocialAction {
  id: string;
  title: string;
  icon: React.ReactElement;
  url: string;
  points: number;
  completed?: boolean;
}

export const ActionsPage: FC<ActionsPageProps> = ({ onBack }) => {
  const { userData } = useUser()
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<string | null>(null)

  const socialActions: SocialAction[] = [
    {
      id: 'instagram',
      title: 'Follow us on Instagram',
      icon: <InstagramIcon />,
      url: 'https://instagram.com/beeylo',
      points: 50
    },
    {
      id: 'tiktok',
      title: 'Follow us on TikTok',
      icon: <TikTokIcon />,
      url: 'https://tiktok.com/@beeylo',
      points: 50
    },
    {
      id: 'twitter',
      title: 'Follow us on X',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/beeylo',
      points: 50
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      icon: <LinkedinIcon />,
      url: 'https://linkedin.com/company/beeylo',
      points: 50
    }
  ]

  useEffect(() => {
    // For now, we'll track completed actions in local state
    // In a real implementation, this would come from the API
    const completed = new Set<string>()
    setCompletedActions(completed)
  }, [userData])

  const handleActionClick = async (action: SocialAction) => {
    if (!userData || completedActions.has(action.id)) return

    // Open the social media link
    window.open(action.url, '_blank', 'noopener,noreferrer')

    // For now, we'll simulate tracking the social follow
    // In the real implementation, this would call the API
    setLoading(action.id)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update local state to show as completed
      setCompletedActions(prev => new Set([...prev, action.id]))
      
      // In real implementation, you would call:
      // const response = await api.trackSocialFollow({
      //   user_id: userData.user_id,
      //   platform: action.id as 'linkedin' | 'instagram' | 'tiktok' | 'x',
      //   verification_method: 'manual'
      // })
    } catch (error) {
      console.error('Failed to track social follow:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="page-content">
      <div className="dashboard-new-layout">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <button className="back-button" onClick={onBack}>
              ←
            </button>
            <h1>Actions</h1>
            <p>Complete these actions to earn points and help us grow</p>
          </div>

          <div className="dashboard-menu-section">
            {socialActions.map((action) => {
              const isCompleted = completedActions.has(action.id)
              const isLoading = loading === action.id
              
              return (
                <div 
                  key={action.id}
                  className={`action-item-compact ${isCompleted ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
                  onClick={() => handleActionClick(action)}
                  style={{ 
                    cursor: isCompleted ? 'default' : 'pointer',
                    opacity: isCompleted ? 0.7 : 1
                  }}
                >
                  <div className="action-left">
                    <div className="action-icon">
                      {action.icon}
                    </div>
                    <div className="action-content">
                      <h4>{action.title}</h4>
                      {isCompleted && <span style={{ color: '#4CAF50', fontSize: '12px' }}>✓ Completed</span>}
                      {isLoading && <span style={{ color: '#2196F3', fontSize: '12px' }}>Processing...</span>}
                    </div>
                  </div>
                  <div className="action-right">
                    <div className="action-points">
                      {isCompleted ? '✓' : `+${action.points}`}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="actions-info">
            <div className="info-card">
              <h4>How it works</h4>
              <p>Follow us on social media platforms to earn points. Each follow gives you 50 points that count towards your leaderboard position.</p>
            </div>
            <div className="info-card">
              <h4>Why follow us?</h4>
              <p>Stay updated with the latest Beeylo news, product updates, and be part of our growing community building the future of communication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}