import type { FC } from 'react'
import { useState } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
import giveawayWhyImg from '../assets/giveaway-why.svg'
import { NumberedButton, Button, Container, Stack, Card, CardContent, Input } from '../components/ui'

interface GiveawayPageProps {
  onTabChange: (tab: TabType) => void
}

type SectionType = 'rewards' | 'why' | 'steps' | 'share'
type RewardsSlide = 'what-you-earn' | 'example'

export const GiveawayPage: FC<GiveawayPageProps> = ({ onTabChange }) => {
  const { userData } = useUser()
  const [activeSection, setActiveSection] = useState<SectionType>('rewards')
  const [rewardsSlide, setRewardsSlide] = useState<RewardsSlide>('what-you-earn')

  const handleCopyReferralLink = () => {
    if (userData?.referral_url) {
      navigator.clipboard.writeText(userData.referral_url)
      // You could add a toast notification here
    }
  }

  const renderRewardsContent = () => {
    return (
      <div className="giveaway-content">
        <div className="rewards-navigation feature-navigation">
          <NumberedButton 
            number={1}
            active={rewardsSlide === 'what-you-earn'}
            onClick={() => setRewardsSlide('what-you-earn')}
          />
          <NumberedButton 
            number={2}
            active={rewardsSlide === 'example'}
            onClick={() => setRewardsSlide('example')}
          />
        </div>
        
        {rewardsSlide === 'what-you-earn' ? (
          <>
            <h3>What you can earn</h3>
            <p className="slide-intro">We're giving away 2% of everything we raise and earn in the first 6 months to the top 10 people who help us grow.</p>
            
            <div className="reward-table">
              <div className="table-header">
                <div className="table-cell">Rank</div>
                <div className="table-cell">Reward</div>
              </div>
              <div className="table-row">
                <div className="table-cell">1st place</div>
                <div className="table-cell">0.5%</div>
              </div>
              <div className="table-row">
                <div className="table-cell">2nd place</div>
                <div className="table-cell">0.3%</div>
              </div>
              <div className="table-row">
                <div className="table-cell">3rd place</div>
                <div className="table-cell">0.2%</div>
              </div>
              <div className="table-row">
                <div className="table-cell">4th-10th place</div>
                <div className="table-cell">0.1% each</div>
              </div>
            </div>
            
            <div className="bonus-section">
              <h4>Not in the top 10?</h4>
              <p>We're randomly selecting 3 people from the top 100 referrers to each win 0.1%.</p>
            </div>
          </>
        ) : (
          <>
            <h3>Example</h3>
            <div className="example-scenario">
              <p className="scenario-title">Beeylo raises €10 million and earns €500.000 in early profit.</p>
              <p className="total-pool">Total reward pool (2%) = €210.000</p>
            </div>
            
            <div className="example-rewards">
              <div className="reward-item">
                <span className="emoji">🥇</span>
                <span className="text">1st place earns €52.500</span>
              </div>
              <div className="reward-item">
                <span className="emoji">🥈</span>
                <span className="text">2nd place earns €31.500</span>
              </div>
              <div className="reward-item">
                <span className="emoji">🥉</span>
                <span className="text">3rd place earns €21.000</span>
              </div>
              <div className="reward-item">
                <span className="emoji">💡</span>
                <span className="text">Places 4–10 each earn €10.500</span>
              </div>
              <div className="reward-item">
                <span className="emoji">🎁</span>
                <span className="text">Top 100 lottery winners (3x) each earn €10.500</span>
              </div>
            </div>
            
            <p className="example-footer">Just for sharing a link.</p>
          </>
        )}
      </div>
    )
  }

  const renderWhyContent = () => (
    <div className="giveaway-content">
      <div className="why-content">
        <img src={giveawayWhyImg} alt="Why" className="why-image" />
        <h3>Why?</h3>
        <p>Because we're not just launching an inbox. We're starting a shift. For years, companies decided how they talk to us. They send what they want, when they want. Spam. Ads. Useless updates. All dumped in the same inbox. But not anymore. Beeylo flips that script. We're building an inbox that's built around you and only shows what actually matters.</p>
      </div>
    </div>
  )

  const renderStepsContent = () => (
    <div className="giveaway-content">
      <h3>How it works</h3>
      <div className="steps-container">
        <div className="step-item">
          <div className="step-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <div className="step-content">
            <h4>Get your personal link</h4>
            <p>Receive your unique referral link to start sharing</p>
          </div>
        </div>
        
        <div className="step-item">
          <div className="step-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <path d="m8.59 13.51 6.83 3.98"/>
              <path d="m15.41 6.51-6.82 3.98"/>
            </svg>
          </div>
          <div className="step-content">
            <h4>Share it</h4>
            <p>Share your link with friends and family</p>
          </div>
        </div>
        
        <div className="step-item">
          <div className="step-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
              <polyline points="16,7 22,7 22,13"/>
            </svg>
          </div>
          <div className="step-content">
            <h4>Climb the leaderboard</h4>
            <p>Watch your ranking rise as more people join</p>
          </div>
        </div>
        
        <div className="step-item">
          <div className="step-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-0.74L12 2z"/>
            </svg>
          </div>
          <div className="step-content">
            <h4>Get rewarded</h4>
            <p>Earn exclusive rewards and benefits</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderShareContent = () => (
    <Stack spacing={6} className="giveaway-content">
      <h3 className="text-2xl font-bold">Share & Earn</h3>
      
      {userData ? (
        <>
          {/* Stats */}
          <Card variant="outline">
            <CardContent>
              <div className="share-stats">
                <div className="stat-item">
                  <div className="stat-number">#{userData.position}</div>
                  <div className="stat-label text-secondary">Position</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{userData.referral_count}</div>
                  <div className="stat-label text-secondary">Referrals</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{userData.points_system.total_points}</div>
                  <div className="stat-label text-secondary">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Early Access Status */}
          {userData.points_system.early_access_eligible && (
            <Card variant="outline" className="early-access-card">
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="early-access-icon">🎉</div>
                  <div className="early-access-text">
                    <strong>Congratulations! You're eligible for early access!</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Referral Link */}
          <Card variant="outline">
            <CardContent>
              <Stack spacing={3}>
                <h4 className="text-lg font-medium">Your referral link</h4>
                <div className="flex items-center gap-2">
                  <Input 
                    value={userData.referral_url} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleCopyReferralLink}
                  >
                    Copy
                  </Button>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card variant="outline">
          <CardContent>
            <Stack spacing={4} className="items-center text-center">
              <p className="text-secondary">Please log in to see your stats and referral link.</p>
              <Button 
                variant="primary"
                onClick={() => onTabChange('home')}
              >
                Go to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'rewards':
        return renderRewardsContent()
      case 'why':
        return renderWhyContent()
      case 'steps':
        return renderStepsContent()
      case 'share':
        return renderShareContent()
      default:
        return renderRewardsContent()
    }
  }

  return (
    <div className="page-content giveaway-new-page">
      <Container size="lg">
        <Stack spacing={6} className="giveaway-new-container">
          {/* 2x2 Button Grid */}
          <Card variant="outline" className="giveaway-button-card">
            <CardContent>
              <div className="giveaway-button-grid">
                <Button 
                  variant={activeSection === 'rewards' ? 'primary' : 'secondary'}
                  onClick={() => setActiveSection('rewards')}
                  className="giveaway-grid-btn"
                >
                  Rewards
                </Button>
                <Button 
                  variant={activeSection === 'why' ? 'primary' : 'secondary'}
                  onClick={() => setActiveSection('why')}
                  className="giveaway-grid-btn"
                >
                  Why
                </Button>
                <Button 
                  variant={activeSection === 'steps' ? 'primary' : 'secondary'}
                  onClick={() => setActiveSection('steps')}
                  className="giveaway-grid-btn"
                >
                  Steps
                </Button>
                <Button 
                  variant={activeSection === 'share' ? 'primary' : 'secondary'}
                  onClick={() => setActiveSection('share')}
                  className="giveaway-grid-btn"
                >
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Area */}
          <Card variant="outline" className="giveaway-content-card">
            <CardContent>
              <div className="giveaway-content-area">
                {renderContent()}
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  )
}