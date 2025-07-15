import { useState, useEffect } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
import beeyloLogo from '../assets/beeylologo.png'
import tripleScreenImg from '../assets/triplescreenhomedef.webp'
import inboxOverloadImg from '../assets/inboxoverload.webp'
import homeDefImg from '../assets/homedef.webp'
import ticketOrderImg from '../assets/ticketorder.webp'

interface HomePageProps {
  isLoggedIn?: boolean
  emailFormHighlight?: boolean
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
    image: homeDefImg // Using placeholder image as requested
  }
]

export const HomePage: FC<HomePageProps> = ({ isLoggedIn = false, emailFormHighlight = false, onTabChange }) => {
  const { login, isLoading, error } = useUser()
  const [email, setEmail] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailToUse = email.trim() || 'sample@beeylo.com' // Use sample account if email is empty
    setLoginError(null)
    const success = await login(emailToUse)
    if (!success) {
      setLoginError(error || 'Login failed. Please try again.')
    }
  }

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
    if (!isLoggedIn) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLoggedIn])

  if (isLoggedIn) {
    // Logged-in user view with slides
    const currentSlideData = slides[currentSlide]
    
    return (
      <div 
        className="page-content home-slides"
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
            <p className="feature-description">{currentSlideData.description}</p>
          </div>
          <div className="feature-image">
            <img src={currentSlideData.image} alt={currentSlideData.title} />
          </div>
        </div>
      </div>
    )
  }

  // Non-logged-in user view
  return (
    <div className="page-content homepage-container">
      <div className="mobile-logo">
        <img src={beeyloLogo} alt="Beeylo" className="logo-image-only" />
      </div>
      
      {/* Desktop: Two columns, Mobile: Single column */}
      <div className="homepage-layout">
        {/* Left column on desktop */}
        <div className="homepage-left">
          <h1 className="homepage-title">
            <span className="title-big">The new free inbox with:</span>
            <br />
            <span className="title-small">No spam, no ads and no useless updates</span>
          </h1>
          
          {/* Login form */}
          <div className="homepage-form">
            <form onSubmit={handleSubmit} className="login-form-compact">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`email-input-compact ${emailFormHighlight ? 'highlight-animation' : ''}`}
                disabled={isLoading}
              />
              <div className="button-group">
                <button type="submit" className="cta-button-compact primary" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'I need this'}
                </button>
                <button 
                  type="button" 
                  className="cta-button-compact secondary" 
                  onClick={() => onTabChange('learn-more')}
                  disabled={isLoading}
                >
                  Learn more
                </button>
              </div>
              {(loginError || error) && (
                <div className="error-message" style={{ color: '#ff4444', fontSize: '0.9rem', marginTop: '8px' }}>
                  {loginError || error}
                </div>
              )}
              <p className="terms-text-compact">
                By clicking submit I agree to Beeylo's Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
        
        {/* Right column on desktop */}
        <div className="homepage-right">
          <div className="homepage-image-container">
            <img src={tripleScreenImg} alt="Beeylo App Interface" className="homepage-image" />
          </div>
        </div>
      </div>
    </div>
  )
}