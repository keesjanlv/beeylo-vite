import { useState } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
import { Button, Typography } from '../components/ui'
import beeyloLogo from '../assets/beeylologo.png'
import tripleScreenImg from '../assets/triplescreenhomedef.webp'

interface HomePageProps {
  isLoggedIn?: boolean
  emailFormHighlight?: boolean
  onTabChange: (tab: TabType) => void
}

export const HomePage: FC<HomePageProps> = ({ isLoggedIn = false, emailFormHighlight = false, onTabChange }) => {
  const { login, isLoading, error } = useUser()
  const [email, setEmail] = useState('')
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

  if (isLoggedIn) {
    // Logged-in view - No-scroll system
    return (
      <div className="no-scroll-page homepage">
        <div className="no-scroll-content">
          <div className="no-scroll-stack">
            {/* Beautiful Logo Row - Uses same element as non-logged-in view */}
            <div className="no-scroll-logo-row-sidebar">
              <img 
                src={beeyloLogo} 
                alt="Beeylo Logo" 
                className="no-scroll-logo-row-image"
              />
              <span className="no-scroll-logo-row-text">Beeylo</span>
            </div>
            
            {/* Hero Section */}
            <div className="no-scroll-hero">
              <div className="no-scroll-hero-content">
                {/* Text Content */}
                <div className="no-scroll-hero-text">
                  <Typography variant="h1" className="no-scroll-hero-title text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
                    Your inbox, without the noise
                  </Typography>
                  <Typography variant="body" className="no-scroll-hero-subtitle text-center-mobile-left-desktop">
                    No more spam, ads or useless updates
                  </Typography>
                  
                  <div className="no-scroll-button-group">
                    <Button 
                      variant="brand"
                      size="lg"
                      onClick={() => onTabChange('learn-more')}
                      className="no-scroll-button buttonv2 buttonv2-yellow"
                    >
                      Discover
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => onTabChange('benefits')}
                      className="no-scroll-button buttonv2"
                    >
                      Benefits
                    </Button>
                  </div>
                </div>
                
                {/* Image Content */}
                <div className="no-scroll-hero-image">
                  <img 
                    src={tripleScreenImg} 
                    alt="Beeylo App Interface" 
                    className="no-scroll-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Non-logged-in view - No-scroll system
  return (
    <div className="no-scroll-page homepage">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Beautiful Logo Row - Uses same element as logged-in view */}
          <div className="no-scroll-logo-row-sidebar">
            <img 
              src={beeyloLogo} 
              alt="Beeylo Logo" 
              className="no-scroll-logo-row-image"
            />
            <span className="no-scroll-logo-row-text">Beeylo</span>
          </div>
          
          {/* Hero Section */}
          <div className="no-scroll-hero">
            <div className="no-scroll-hero-content">
              {/* Text Content */}
              <div className="no-scroll-hero-text">
                <Typography variant="h1" className="no-scroll-hero-title text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
                  Your inbox, without the noise
                </Typography>
                <Typography variant="body" className="no-scroll-hero-subtitle text-center-mobile-left-desktop">
                  No more spam, ads or useless updates
                </Typography>
                
                {/* Login form - Back in the hero text section */}
                <div className="no-scroll-form-section">
                  <form onSubmit={handleSubmit} className="no-scroll-form">
                    <div className="no-scroll-input-group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`no-scroll-input ${emailFormHighlight ? 'no-scroll-input-highlight' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="no-scroll-button-group">
                      <Button 
                        type="submit" 
                        variant="brand" 
                        size="lg" 
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                        className="no-scroll-button buttonv2 buttonv2-yellow"
                      >
                        {isLoading ? 'Loading...' : 'End my inbox chaos'}
                      </Button>
                    </div>
                    {(loginError || error) && (
                      <Typography variant="small" color="error" className="no-scroll-error">
                        {loginError || error}
                      </Typography>
                    )}
                  </form>
                  
                  {/* Disclaimer text */}
                  <Typography variant="caption" color="muted" className="no-scroll-disclaimer">
                    By clicking submit I agree to Beeylo's Terms of Service and Privacy Policy.
                  </Typography>
                </div>
              </div>
              
              {/* Image Content */}
              <div className="no-scroll-hero-image">
                <img 
                  src={tripleScreenImg} 
                  alt="Beeylo App Interface" 
                  className="no-scroll-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}