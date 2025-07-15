import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { api } from '../services/api'

interface LeaderboardPageProps {
  onBack: () => void
}

interface LeaderboardEntry {
  rank: number;
  masked_email: string;
  total_points: number;
  badge_color: string;
}

export const LeaderboardPage: FC<LeaderboardPageProps> = ({ onBack }) => {
  const { userData } = useUser()
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeaderboardData()
  }, [userData])

  const loadLeaderboardData = async () => {
    if (!userData) return

    setLoading(true)
    setError(null)

    try {
      // Load leaderboard data
      const leaderboardResponse = await api.getLeaderboard()

      if (leaderboardResponse.success) {
        setLeaderboardData(leaderboardResponse.data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to load leaderboard data:', error)
      setError('Failed to load leaderboard data')
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  if (loading) {
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

  if (error) {
    return (
      <div className="page-content">
        <div className="dashboard-new-layout">
          <div className="dashboard-container">
            <div className="dashboard-header">
              <button className="back-button" onClick={onBack}>
                ←
              </button>
              <h1>Leaderboard</h1>
              <p style={{ color: '#ff4444' }}>{error}</p>
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
            <h1>Leaderboard</h1>
            <p>See how you rank among our community members</p>
          </div>

          <div className="leaderboard-stats">
            <div className="stat-card-mini">
              <div className="stat-value">{userData?.leaderboard_rank || 'N/A'}</div>
              <div className="stat-label">Your Position</div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-value">{userData?.points_system?.total_points || 0}</div>
              <div className="stat-label">Your Points</div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-value">{userData?.referral_count || 0}</div>
              <div className="stat-label">Your Referrals</div>
            </div>
          </div>

          <div className="leaderboard-section">
            <h3>Top Contributors</h3>
            <div className="leaderboard-list compact">
              {leaderboardData.map((user) => {
                const isCurrentUser = userData && user.masked_email === userData.email
                return (
                  <div 
                    key={user.rank}
                    className={`leaderboard-item-compact ${isCurrentUser ? 'current-user' : ''}`}
                  >
                    <span className="rank-compact">{getRankIcon(user.rank)}</span>
                    <span className="name-compact">
                      {isCurrentUser ? 'You' : user.masked_email}
                    </span>
                    <span className="points-compact">{user.total_points.toLocaleString()} pts</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}