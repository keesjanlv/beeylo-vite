import type { FC } from 'react'
import { useState, useEffect } from 'react'
import type { GiveawayTabType } from '../types'
import giveawayWhyImg from '../assets/giveaway-why.svg'
import giveawayPeopleImg from '../assets/giveaway-people.svg'
import giveawayChanceImg from '../assets/giveaway-chance.svg'

interface GiveawayPageProps {
  onTabChange: (tab: 'dashboard') => void
}

interface GiveawaySlide {
  id: GiveawayTabType
  image: string
  title: string
  description: string
  cta?: boolean
}

const slides: GiveawaySlide[] = [
  {
    id: 'why',
    image: giveawayWhyImg,
    title: 'Why?',
    description: 'Because we\'re not just launching an inbox. We\'re starting a shift. For years, companies decided how they talk to us. They send what they want, when they want. Spam. Ads. Useless updates. All dumped in the same inbox. But not anymore. Beeylo flips that script. We\'re building an inbox that\'s built around you and only shows what actually matters.'
  },
  {
    id: 'built-by-people',
    image: giveawayPeopleImg,
    title: 'Built by the people.',
    description: 'We\'re not building this behind closed doors. We\'re building it with the people who believe in it. That\'s why we\'re giving 2% of what we raise and earn back to the people who help us grow it. Not because we have to. But because we believe in doing things differently. And that starts with rewarding those who build with us.'
  },
  {
    id: 'your-chance',
    image: giveawayChanceImg,
    title: 'Your chance',
    description: 'This is your chance to shape the future of communication. Not just to use it — but to influence it. Join now. Share it. And take your place in what\'s next.',
    cta: true
  }
]

export const GiveawayPage: FC<GiveawayPageProps> = ({ onTabChange }) => {
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

    const container = document.querySelector('.giveaway-page')
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <div 
      className="page-content giveaway-page"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="feature-content">
        <div className="feature-text">
          <div className="feature-navigation">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`feature-nav-button ${currentSlide === index ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <h2 className="feature-title">{currentSlideData.title}</h2>
          <p className="feature-description">
            {currentSlideData.description}
          </p>
          {currentSlideData.cta && (
            <button 
              className="cta-button"
              onClick={() => onTabChange('dashboard')}
              style={{ marginTop: '24px' }}
            >
              Go to Dashboard
            </button>
          )}
        </div>
        <div className="feature-image">
          <img src={currentSlideData.image} alt={currentSlideData.title} />
        </div>
      </div>
    </div>
  )
}