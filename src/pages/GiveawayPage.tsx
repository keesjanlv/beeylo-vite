import type { FC } from 'react'
import { useState } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
import giveawayWhyImg from '../assets/giveaway-why.svg'
import { NumberedButton, Button, Container, Stack, Card, CardContent, Input } from '../components/ui'
import { InstagramIcon, TikTokIcon, TwitterIcon, LinkedinIcon } from '../components/Icons'

interface GiveawayPageProps {
  onTabChange: (tab: TabType) => void
}

type ModalType = 'rewards' | 'how-it-works' | null
type RewardsSlide = 'what-you-earn' | 'example'
type HowItWorksSlide = 'steps' | 'why'

export const GiveawayPage: FC<GiveawayPageProps> = ({ onTabChange }) => {
  const { userData } = useUser()
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [rewardsSlide, setRewardsSlide] = useState<RewardsSlide>('what-you-earn')
  const [howItWorksSlide, setHowItWorksSlide] = useState<HowItWorksSlide>('steps')

  const handleCopyReferralLink = () => {
    if (userData?.referral_url) {
      navigator.clipboard.writeText(userData.referral_url)
      // You could add a toast notification here
    }
  }

  const handleSocialFollow = (platform: string) => {
    // Handle social media follow actions
    const urls = {
      instagram: 'https://instagram.com/beeylo',
      tiktok: 'https://tiktok.com/@beeylo',
      twitter: 'https://twitter.com/beeylo',
      linkedin: 'https://linkedin.com/company/beeylo'
    }
    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  const renderRewardsModal = () => {
    if (activeModal !== 'rewards') return null

    return (
      <div className="modal-overlay" onClick={() => setActiveModal(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <Card variant="outline" className="modal-card">
            <CardContent>
              <Stack spacing={4}>
                <div className="modal-header">
                  <h2 className="text-xl font-bold">What can I win?</h2>
                  <button 
                    className="modal-close"
                    onClick={() => setActiveModal(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="rewards-navigation">
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
                  <div className="rewards-content">
                    <h3 className="text-lg font-medium">What you can earn</h3>
                    <p className="text-secondary">We're giving away 2% of everything we raise and earn in the first 6 months to the top 10 people who help us grow.</p>
                    
                    <div className="reward-table">
                      <div className="table-header">
                        <div className="table-cell font-medium">Rank</div>
                        <div className="table-cell font-medium">Reward</div>
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
                      <h4 className="font-medium">Not in the top 10?</h4>
                      <p className="text-secondary">We're randomly selecting 3 people from the top 100 referrers to each win 0.1%.</p>
                    </div>
                  </div>
                ) : (
                  <div className="rewards-content">
                    <h3 className="text-lg font-medium">Example</h3>
                    <div className="example-scenario">
                      <p className="font-medium">Beeylo raises €10 million and earns €500.000 in early profit.</p>
                      <p className="text-accent font-medium">Total reward pool (2%) = €210.000</p>
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
                    
                    <p className="text-secondary text-center">Just for sharing a link.</p>
                  </div>
                )}
              </Stack>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderHowItWorksModal = () => {
    if (activeModal !== 'how-it-works') return null

    return (
      <div className="modal-overlay" onClick={() => setActiveModal(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <Card variant="outline" className="modal-card">
            <CardContent>
              <Stack spacing={4}>
                <div className="modal-header">
                  <h2 className="text-xl font-bold">How does it work?</h2>
                  <button 
                    className="modal-close"
                    onClick={() => setActiveModal(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="how-it-works-navigation">
                  <NumberedButton 
                    number={1}
                    active={howItWorksSlide === 'steps'}
                    onClick={() => setHowItWorksSlide('steps')}
                  >
                    Steps
                  </NumberedButton>
                  <NumberedButton 
                    number={2}
                    active={howItWorksSlide === 'why'}
                    onClick={() => setHowItWorksSlide('why')}
                  >
                    Why
                  </NumberedButton>
                </div>

                {howItWorksSlide === 'steps' ? (
                  <div className="steps-content">
                    <h3 className="text-lg font-medium">How it works</h3>
                    <div className="steps-container">
                      <div className="modal-step-item">
                        <div className="modal-step-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                          </svg>
                        </div>
                        <div className="modal-step-content">
                          <h4>Get your personal link</h4>
                          <p>Receive your unique referral link to start sharing</p>
                        </div>
                      </div>
                      
                      <div className="modal-step-item">
                        <div className="modal-step-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <path d="m8.59 13.51 6.83 3.98"/>
                            <path d="m15.41 6.51-6.82 3.98"/>
                          </svg>
                        </div>
                        <div className="modal-step-content">
                          <h4>Share it</h4>
                          <p>Share your link with friends and family</p>
                        </div>
                      </div>
                      
                      <div className="modal-step-item">
                        <div className="modal-step-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
                            <polyline points="16,7 22,7 22,13"/>
                          </svg>
                        </div>
                        <div className="modal-step-content">
                          <h4>Climb the leaderboard</h4>
                          <p>Watch your ranking rise as more people join</p>
                        </div>
                      </div>
                      
                      <div className="modal-step-item">
                        <div className="modal-step-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-0.74L12 2z"/>
                          </svg>
                        </div>
                        <div className="modal-step-content">
                          <h4>Get rewarded</h4>
                          <p>Earn exclusive rewards and benefits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="why-content">
                    <img src={giveawayWhyImg} alt="Why" className="why-image" />
                    <h3 className="text-lg font-medium">Why?</h3>
                    <p className="text-secondary">Because we're not just launching an inbox. We're starting a shift. For years, companies decided how they talk to us. They send what they want, when they want. Spam. Ads. Useless updates. All dumped in the same inbox. But not anymore. Beeylo flips that script. We're building an inbox that's built around you and only shows what actually matters.</p>
                  </div>
                )}
              </Stack>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content giveaway-page-new">
      <Container size="lg">
        <Stack spacing={3}>
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Giveaway</h1>
            <p className="text-secondary">Join our mission and get rewarded</p>
          </div>

          {/* Main Action Buttons */}
          <div className="main-actions">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => setActiveModal('rewards')}
              className="w-full giveaway-main-button"
            >
              What can I win?
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => setActiveModal('how-it-works')}
              className="w-full giveaway-main-button"
            >
              How does it work?
            </Button>
          </div>

          {/* Enhanced Stats Display */}
          {userData ? (
            <div className="stats-section-enhanced">
              <div className="stats-main-container">
                {/* Progress Bar */}
                <div className="stats-progress-container">
                  <div className="stats-progress-label">Early Access Progress</div>
                  <div className="stats-progress-bar">
                    <div 
                      className="stats-progress-fill"
                      style={{ 
                        width: `${Math.min((userData.points_system?.total_points || 0) / 30 * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="stats-grid">
                  <div className="stats-item">
                    <div className="stats-label">Current Position</div>
                    <div className="stats-number">#{userData.position}</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-label">Total Referrals</div>
                    <div className="stats-number">{userData.referral_count}</div>
                  </div>
                </div>
              </div>
            </div>
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



          {/* Share Link */}
          {userData && (
            <div className="share-link surface-card">
              <div className="section-header">
                <h3 className="text-lg font-medium">Your referral link</h3>
              </div>
              <div className="flex items-center gap-2" style={{ marginTop: '16px' }}>
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
            </div>
          )}

          {/* Social Media Actions - New Layout */}
          <div className="follow-section-container surface-card">
            <div className="follow-section-header">
              <div className="follow-header-left">
                <h3 className="follow-title">Follow us for updates</h3>
                <p className="follow-subtitle">Complete tasks to boost your ranking</p>
              </div>
              <div className="follow-progress">
                <div className="progress-circle">
                  <svg className="progress-svg" viewBox="0 0 36 36">
                    <circle className="progress-bg" cx="18" cy="18" r="16" />
                    <circle className="progress-bar" cx="18" cy="18" r="16" strokeDasharray="25, 100" />
                  </svg>
                  <span className="progress-text">1/4</span>
                </div>
              </div>
            </div>
            
            <div className="follow-tasks-grid">
              <div className="follow-task-item completed">
                <div className="task-icon-holder">
                  <InstagramIcon />
                </div>
                <div className="task-points">+5 points</div>
              </div>
              
              <div className="follow-task-item" onClick={() => handleSocialFollow('tiktok')}>
                <div className="task-icon-holder">
                  <TikTokIcon />
                </div>
                <div className="task-points">+5 points</div>
              </div>
              
              <div className="follow-task-item" onClick={() => handleSocialFollow('twitter')}>
                <div className="task-icon-holder">
                  <TwitterIcon />
                </div>
                <div className="task-points">+5 points</div>
              </div>
              
              <div className="follow-task-item" onClick={() => handleSocialFollow('linkedin')}>
                <div className="task-icon-holder">
                  <LinkedinIcon />
                </div>
                <div className="task-points">+5 points</div>
              </div>
            </div>
          </div>
        </Stack>
      </Container>

      {/* Modals */}
      {renderRewardsModal()}
      {renderHowItWorksModal()}
    </div>
  )
}