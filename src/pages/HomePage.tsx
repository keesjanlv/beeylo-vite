import { useState } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
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
    // New simple logged-in user view
    return (
      <div className="page-content logged-in-home">
        <div className="logged-in-home-container">
          <div className="logged-in-home-content">
            <div className="logged-in-home-text">
              <h1 className="logged-in-home-title">Welcome to Beeylo</h1>
              <p className="logged-in-home-subtitle">No more spam, ads or useless updates</p>
              
              <div className="logged-in-home-buttons">
                <button 
                  className="button-exp"
                  onClick={() => onTabChange('learn-more')}
                >
                  <div className="icon">
                    <svg strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={24} width={24} viewBox="0 0 24 24">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="title">Learn more</span>
                </button>
                <button 
                  className="button-exp"
                  onClick={() => onTabChange('benefits')}
                >
                  <div className="icon">
                    <svg strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={24} width={24} viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="title">See benefits</span>
                </button>
              </div>
            </div>
            
            <div className="logged-in-home-image">
              <img src={tripleScreenImg} alt="Beeylo App Interface" />
            </div>
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