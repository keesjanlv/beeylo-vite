import { useState, useEffect } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { NumberedButton, Container, Stack, Card, CardContent, Button, Typography } from '../components/ui'

interface HowItWorksPageProps {
  onTabChange: (tab: TabType) => void
}

interface HowItWorksSlide {
  id: number
  title: string
  content: React.ReactNode
}

const slides: HowItWorksSlide[] = [
  {
    id: 1,
    title: 'What you can earn',
    content: (
      <div className="how-it-works-content">
        <p className="slide-intro">We're giving away 2% of everything we raise and earn in the first 6 months to the top 10 people who help us grow.</p>
        
        <h3>Here's how it's divided:</h3>
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
            <div className="table-cell">4th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">5th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">6th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">7th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">8th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">9th place</div>
            <div className="table-cell">0.1%</div>
          </div>
          <div className="table-row">
            <div className="table-cell">10th place</div>
            <div className="table-cell">0.1%</div>
          </div>
        </div>
        
        <div className="bonus-section">
          <h4>Not in the top 10?</h4>
          <p>No worries — Even if you don't make the top 10, you could still walk away with a serious reward.</p>
          <p>We will randomly selecting 3 people from the top 100 referrers to each win 0.1%.</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Example',
    content: (
      <div className="how-it-works-content">
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
      </div>
    )
  },
  {
    id: 3,
    title: 'Why',
    content: (
      <div className="how-it-works-content">
        <p>We're not building this behind closed doors. We're building it with the people who believe in it</p>
        
        <p>That's why we're giving 2% of what we raise and earn back to the people who help us grow it.</p>
        
        <p>Not because we have to. But because we believe in doing things differently.</p>
        
        <p>And that starts with rewarding those who build with us.</p>
      </div>
    )
  },
  {
    id: 4,
    title: 'How it works',
    content: (
      <div className="how-it-works-content">
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
  }
]

export const HowItWorksPage: FC<HowItWorksPageProps> = ({ onTabChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Handle touch events for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Handle keyboard events for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle mouse wheel for desktop
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) {
        e.preventDefault()
        if (wheelEvent.deltaX > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
    }

    const container = document.querySelector('.how-it-works-page')
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <div className="page-container">
      <div className="page-content content-scrollable">
        <div className="layout-scroll">
          <div 
            className="how-it-works-page"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Container size="lg">
              <Card variant="outline" className="feature-card">
                <CardContent>
                  <Stack spacing={6}>
                    <Stack spacing={4} className="feature-text">
                      <Button 
                        variant="ghost" 
                        onClick={() => onTabChange('giveaway')} 
                        className="back-button"
                        aria-label="Go back to giveaway"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5"/>
                          <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        <span className="ml-2">Back to Giveaway</span>
                      </Button>
                      
                      <div className="feature-navigation">
                        {slides.map((_, index) => (
                          <NumberedButton
                            key={index}
                            number={index + 1}
                            active={currentSlide === index}
                            onClick={() => handleSlideChange(index)}
                          />
                        ))}
                      </div>
                      
                      <Typography variant="h2" className="feature-title">{currentSlideData.title}</Typography>
                      
                      <div className="feature-description">
                        {currentSlideData.content}
                      </div>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}