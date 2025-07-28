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
    // Logged-in view - Clean vertical centering
    return (
      <div className="page-container">
        <div className="page-content content-center-screen">
          <div className="container max-w-6xl">
            <div className="home-content-wrapper">
              {/* Text Content */}
              <div className="home-text-section">
                <Typography variant="h1" className="home-title text-center-mobile-left-desktop">
                  Welcome to Beeylo
                </Typography>
                <Typography variant="body" color="secondary" className="home-subtitle text-center-mobile-left-desktop">
                  No more spam, ads or useless updates
                </Typography>
                
                <div className="home-actions">
                  <Button 
                    variant="brand"
                    size="lg"
                    onClick={() => onTabChange('learn-more')}
                  >
                    Discover Beeylo
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => onTabChange('benefits')}
                  >
                    See benefits
                  </Button>
                </div>
              </div>
              
              {/* Image Content */}
              <div className="home-image-section">
                <img 
                  src={tripleScreenImg} 
                  alt="Beeylo App Interface" 
                  className="home-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Non-logged-in view - Clean vertical centering
  return (
    <div className="page-container">
      <div className="page-content content-center-screen">
        {/* Mobile logo */}
        <div className="home-mobile-logo">
          <img src={beeyloLogo} alt="Beeylo" className="w-16 h-16" />
        </div>
        
        <div className="container max-w-6xl">
          <div className="home-content-wrapper">
            {/* Text and Form Content */}
            <div className="home-text-section">
              <Typography variant="h1" className="home-title-large text-center-mobile-left-desktop">
                <span className="home-title-main">
                  The new free inbox
                </span>
                <span className="home-title-sub" >
                  No more spam, ads or useless updates
                </span>
              </Typography>
              
              {/* Login form */}
              <div className="home-form-section">
                <form onSubmit={handleSubmit} className="home-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`home-input ${emailFormHighlight ? 'home-input-highlight' : ''}`}
                    disabled={isLoading}
                  />
                  <div className="home-form-actions">
                    <Button 
                      type="submit" 
                      variant="brand" 
                      size="lg" 
                      fullWidth
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'I want in'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      fullWidth
                      onClick={() => onTabChange('learn-more')}
                      disabled={isLoading}
                    >
                      Learn more
                    </Button>
                  </div>
                  {(loginError || error) && (
                    <Typography variant="small" color="error" className="home-error">
                      {loginError || error}
                    </Typography>
                  )}
                  <Typography variant="caption" color="muted" className="home-disclaimer">
                    By clicking submit I agree to Beeylo's Terms of Service and Privacy Policy.
                  </Typography>
                </form>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="home-image-section">
              <img 
                src={tripleScreenImg} 
                alt="Beeylo App Interface" 
                className="home-hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}