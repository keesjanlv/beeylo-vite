import { useState, useEffect } from 'react';
import '../styles/pages/home.css';
import '../styles/components/slider.css';
import type { FC } from 'react'
import type { TabType } from '../types'
import { Spotlight, GlowButton } from '../components/Spotlight'
import tripleScreenImg from '../assets/triplescreenhomedef.webp'
import inboxOverloadImg from '../assets/inboxoverload.webp'
import homeDefImg from '../assets/homedef.webp'
import ticketOrderImg from '../assets/ticketorder.webp'

interface FeaturesOverviewPageProps {
  onTabChange: (tab: TabType) => void
}

const slides = [
  {
    id: 1,
    title: "Welcome to your inbox without the noise.",
    description: "No spam, no ads and no useless updates. Beeylo only shows you the 10% that actually matters.",
    image: tripleScreenImg
  },
  {
    id: 2,
    title: "What's wrong with your inbox?",
    description: "You get 40+ emails a day — but only 4 actually matter. And they get lost in the noise.",
    image: inboxOverloadImg
  },
  {
    id: 3,
    title: "You order one thing... and your inbox explodes with 10 separate emails.",
    description: "Every purchase becomes a flood of confirmations, shipping updates, and promotional follow-ups.",
    image: ticketOrderImg
  },
  {
    id: 4,
    title: "Meet your new inbox.",
    description: "Beeylo only shows you the 10% that actually matters. The rest? Gone.",
    image: homeDefImg
  },
  {
    id: 5,
    title: "One order = one smart overview.",
    description: "Every update is added to that same view. No more hunting through dozens of emails.",
    image: homeDefImg
  }
]

export const FeaturesOverviewPage: FC<FeaturesOverviewPageProps> = ({ onTabChange }) => {
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

  // Slides view
  const currentSlideData = slides[currentSlide]
  
  return (
    <Spotlight className="page-content home-slides">
      <div 
        className="feature-content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="feature-text">
          <button 
            className="back-button"
            onClick={() => onTabChange('home')}
            style={{ marginBottom: '16px' }}
          >
            ←
          </button>
          <div className="feature-navigation">
            {slides.map((_, index) => (
              <GlowButton
                key={index}
                onClick={() => handleSlideChange(index)}
                variant={currentSlide === index ? 'primary' : 'outline'}
                size="sm"
                className="feature-nav-button"
              >
                {index + 1}
              </GlowButton>
            ))}
          </div>
          <h2 className="feature-title">{currentSlideData.title}</h2>
          <p className="feature-description">{currentSlideData.description}</p>
        </div>
        <div className="feature-image">
          <img src={currentSlideData.image} alt={currentSlideData.title} />
        </div>
      </div>
    </Spotlight>
  )
}