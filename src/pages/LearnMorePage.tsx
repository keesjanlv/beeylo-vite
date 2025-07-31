import { useState, useEffect } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { NumberedButton, Container, Stack, Card, CardContent, Typography, Button } from '../components/ui'
import inboxOverloadImg from '../assets/inboxoverload.webp'
import homeDefImg from '../assets/homedef.webp'
import ticketOrderImg from '../assets/ticketorder.webp'
import orderSpamImg from '../assets/orderspam.webp'

interface LearnMorePageProps {
  onTabChange: (tab: TabType) => void
}

const slides = [
  {
    id: 1,
    title: "You get 40+ emails a day — but only 4 actually matter.",
    description: "You get 40+ emails a day — but only 4 actually matter. And they get lost in the noise.",
    image: inboxOverloadImg
  },
  {
    id: 2,
    title: "You order one thing... and your inbox explodes with 10 separate emails.",
    description: "Every purchase becomes a flood of confirmations, shipping updates, and promotional follow-ups.",
    image: orderSpamImg
  },
  {
    id: 3,
    title: "Meet your new inbox.",
    description: "Beeylo only shows you the 10% that actually matters. The rest? Gone.",
    image: homeDefImg
  },
  {
    id: 4,
    title: "One order = one smart overview.",
    description: "Every update is added to that same view. No more hunting through dozens of emails.",
    image: ticketOrderImg
  }
]

export const LearnMorePage: FC<LearnMorePageProps> = ({ onTabChange }) => {
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

  const currentSlideData = slides[currentSlide]
  
  return (
    <div 
      className="page-container home-slides"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Container size="lg">
        <Card variant="outline" className="feature-card">
          <CardContent>
            <Stack spacing={6} className="feature-content">
                    <Stack spacing={4} className="feature-text">
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
                      <Typography variant="h3" className="feature-title text-center-mobile-left-desktop">{currentSlideData.title}</Typography>
                      {currentSlide === 3 && (
                        <Button 
                          variant="primary"
                          onClick={() => onTabChange('benefits')}
                          className="buttonv2"
                        >
                          See benefits
                        </Button>
                      )}
                    </Stack>
                    <div className="feature-image">
                      <img 
                        src={currentSlideData.image} 
                        alt={currentSlideData.title} 
                        className="feature-img" 
                      />
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Container>
    </div>
  )
}