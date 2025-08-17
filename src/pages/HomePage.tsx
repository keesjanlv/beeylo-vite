import { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { useUser } from '../contexts/UserContext'
import { Button, Typography } from '../components/ui'
import { TermsOfServiceModal } from '../components/TermsOfServiceModal'
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal'
import { Logo } from '../components/Logo'
import Turnstile, { type TurnstileRef } from '../components/Turnstile'
import beeyloLogo from '../assets/beeylologo.png'
import tripleScreenImg from '../assets/triplescreenhomedef.webp'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Enhanced Glass Button Component with custom styling
const GlassButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  const [isActive, setIsActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyle: React.CSSProperties = {
    // reset
    border: 'none',
    
    // gradient "border" - grijs aan zijkanten, wit onder
    padding: '2px', // border thickness
    borderRadius: '14px',
    background: `
      linear-gradient(to right, 
        rgba(180, 180, 180, 0.7) 0%,
        rgba(255, 255, 255, 0) 20%,
        rgba(255, 255, 255, 0) 80%,
        rgba(180, 180, 180, 0.7) 100%
      ),
      linear-gradient(to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0.9) 100%
      )
    `,
    
    // meer shadow aan de buitenkant voor diepte
    boxShadow: `
      0 10px 25px -5px rgba(0, 0, 0, 0.15),
      0 4px 10px -4px rgba(0, 0, 0, 0.1),
      inset 0 -1px 1px rgba(255, 255, 255, 0.3)
    `,
    
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    transform: isActive ? 'scale(.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
  }

  const surfaceStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 32px',
    borderRadius: '12px', // 14px – 2px padding
    
    // witte achtergrond met heel lichte grijs gradient
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(248, 248, 248, 1) 50%,
        rgba(245, 245, 245, 1) 100%
      )
    `,

    color: '#1a1a1a', // zwarte tekst
    fontSize: '1rem',
    fontWeight: '500',
    textShadow: 'none',
    transition: 'all 0.2s ease',
  }

  return (
    <button 
      style={buttonStyle}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsActive(false)
        setIsHovered(false)
      }}
      {...rest}
    >
      <span style={surfaceStyle}>{children}</span>
    </button>
  )
}

interface HomePageProps {
  isLoggedIn?: boolean
  emailFormHighlight?: boolean
  onTabChange: (tab: TabType) => void
}

export const HomePage: FC<HomePageProps> = ({ isLoggedIn = false, emailFormHighlight = false, onTabChange }) => {
  const { login, isLoading, error, loadingMessage } = useUser()

  const [email, setEmail] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [fingerprint, setFingerprint] = useState('')
  const [honeypot, setHoneypot] = useState('') // Honeypot veld
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isWaitingForTurnstile, setIsWaitingForTurnstile] = useState(false)
  const turnstileRef = useRef<TurnstileRef>(null)
  const pageLoadTime = useRef<number>(Date.now())
  const waitingTimeoutRef = useRef<number | null>(null)
  const gracePeriodTimeoutRef = useRef<number | null>(null)
  
  // Genereer fingerprint bij het laden van de pagina
  useEffect(() => {
    const generateFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        setFingerprint(result.visitorId)
      } catch (error) {
        console.error('FingerprintJS error:', error)
      }
    }
    generateFingerprint()
  }, [])

  // Turnstile event handlers
  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token)
    console.log('Turnstile verified:', token)
    
    // If we were waiting for Turnstile, proceed with form submission
    if (isWaitingForTurnstile) {
      console.log('Turnstile token received while waiting, proceeding with submission')
      setIsWaitingForTurnstile(false)
      
      // Clear any pending timeouts
      if (waitingTimeoutRef.current) {
        clearTimeout(waitingTimeoutRef.current)
        waitingTimeoutRef.current = null
      }
      if (gracePeriodTimeoutRef.current) {
        clearTimeout(gracePeriodTimeoutRef.current)
        gracePeriodTimeoutRef.current = null
      }
      
      // Trigger form submission after token is received
      setTimeout(() => {
        proceedWithSubmission(token)
      }, 100)
    }
  }

  const handleTurnstileError = (error?: any) => {
    setTurnstileToken(null)
    setIsWaitingForTurnstile(false)
    console.error('Turnstile verification failed:', error)
    
    // Clear any pending timeouts
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current)
      waitingTimeoutRef.current = null
    }
    if (gracePeriodTimeoutRef.current) {
      clearTimeout(gracePeriodTimeoutRef.current)
      gracePeriodTimeoutRef.current = null
    }
    
    // Check for specific Error 600010 (Invalid widget configuration)
    if (error === 600010 || error === '600010') {
      console.warn('Turnstile Error 600010 detected - Configuration issue, attempting immediate retry')
      setLoginError('Security verification initializing...')
      
      // Immediate retry for 600010 errors - often resolves on second attempt
      setTimeout(() => {
        console.log('Retrying Turnstile after 600010 error')
        turnstileRef.current?.reset()
      }, 500)
      return
    }
    
    // Handle network-related errors
    if (error === 600020 || error === '600020') {
      console.warn('Turnstile network error detected')
      setLoginError('Network error during security verification. Please check your connection and try again.')
    } else {
      // Handle other Turnstile errors normally
      setLoginError('Security verification failed. Please try again.')
    }
    
    // Auto-retry after a short delay
    setTimeout(() => {
      console.log('Auto-retrying Turnstile after error')
      turnstileRef.current?.reset()
    }, 1000)
  }

  const handleTurnstileExpire = () => {
    setTurnstileToken(null)
    setIsWaitingForTurnstile(false)
    console.log('Turnstile token expired')
    // Auto-retry immediately on expiration
    turnstileRef.current?.reset()
  }

  const handleTurnstileTimeout = () => {
    setTurnstileToken(null)
    setIsWaitingForTurnstile(false)
    console.error('Turnstile timeout - taking too long')
    setLoginError('Security verification timed out. Please try again.')
    
    // Clear any pending timeout
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current)
      waitingTimeoutRef.current = null
    }
    
    // Reset and try again immediately for timeouts
    setTimeout(() => {
      console.log('Retrying Turnstile after timeout')
      turnstileRef.current?.reset()
    }, 500)
  }

  // Function to proceed with submission once we have a Turnstile token
  const proceedWithSubmission = async (token?: string) => {
    const tokenToUse = token || turnstileToken
    
    // Check if email is empty
    if (!email.trim()) {
      // In development, use a sample account for quick testing
      if (import.meta.env.DEV || window.location.hostname === 'localhost') {
        setLoginError(null);
        const success = await login('sample@beeylo.com', {
          fingerprint, // Voeg fingerprint toe
          submission_time: Date.now() - pageLoadTime.current, // Voeg submission time toe
          turnstile_token: tokenToUse || undefined // Voeg Turnstile token toe
        });
        if (!success) {
          setLoginError(error || 'Login failed. Please try again.');
        }
      } else {
        // In production, if the email is empty, just show an error and do nothing.
        // This prevents the accidental API call on page load.
        setLoginError('Please enter your email address');
      }
      return; // Crucially, we exit the function here for empty emails in production.
    }
    
    // Process valid email
    setLoginError(null)
    const success = await login(email.trim(), {
      fingerprint, // Voeg fingerprint toe
      submission_time: Date.now() - pageLoadTime.current, // Voeg submission time toe
      turnstile_token: tokenToUse || undefined // Voeg Turnstile token toe
    })
    if (!success) {
      setLoginError(error || 'Login failed. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check - als dit veld is ingevuld, is het een bot
    if (honeypot.trim() !== '') {
      console.log('Bot detected via honeypot')
      setLoginError('Security check failed. Please try again.')
      return // Stop hier, geen API call
    }
    
    // Turnstile check - ensure we have a valid token
    if (!turnstileToken) {
      console.log('No Turnstile token available')
      
      // In development, be more lenient with Turnstile
      if (import.meta.env.DEV || window.location.hostname === 'localhost') {
        console.warn('Development mode: Proceeding without Turnstile token')
        await proceedWithSubmission()
      } else {
        // In production, wait for Turnstile token
        console.log('Waiting for Turnstile token...')
        setIsWaitingForTurnstile(true)
        setLoginError(null) // Clear any previous errors
        
        // Check if Turnstile widget exists and try to get current response first
        const currentToken = turnstileRef.current?.getToken()
        if (currentToken) {
          console.log('Found existing token, using it')
          setTurnstileToken(currentToken)
          setIsWaitingForTurnstile(false)
          await proceedWithSubmission(currentToken)
          return
        }
        
        // Implement 10-second grace period: wait for token before resetting
        console.log('No token available, waiting 10 seconds for token generation...')
        
        // Clear any existing grace period timeout
        if (gracePeriodTimeoutRef.current) {
          clearTimeout(gracePeriodTimeoutRef.current)
        }
        
        // Wait 10 seconds for token to be generated naturally
        gracePeriodTimeoutRef.current = setTimeout(() => {
          // After 10 seconds, check again for token
          const delayedToken = turnstileRef.current?.getToken()
          if (delayedToken) {
            console.log('Token found after grace period, using it')
            setTurnstileToken(delayedToken)
            setIsWaitingForTurnstile(false)
            proceedWithSubmission(delayedToken)
            gracePeriodTimeoutRef.current = null
            return
          }
          
          // Still no token after grace period, reset to generate new one
          console.log('No token found after grace period, resetting widget')
          turnstileRef.current?.reset()
          gracePeriodTimeoutRef.current = null
          
          // DON'T clear isWaitingForTurnstile here - keep waiting for the token from reset
          // Set main timeout for reset attempt (but keep waiting state active)
          if (waitingTimeoutRef.current) {
            clearTimeout(waitingTimeoutRef.current)
          }
          waitingTimeoutRef.current = setTimeout(() => {
            console.log('Turnstile verification timeout reached after reset')
            setIsWaitingForTurnstile(false)
            setLoginError('Security verification timed out. Please try again.')
            waitingTimeoutRef.current = null
          }, 20000) // 20 second timeout for reset attempt (longer to allow for token generation)
        }, 10000) // 10 second grace period
      }
      return
    }
    
    // If we have a token, proceed immediately
    console.log('Using existing Turnstile token for submission')
    await proceedWithSubmission()
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
                  {/* Glass Button - only visible on mobile breakpoints with top navigation */}
                  <div className="glass-button-mobile-container">
                    <GlassButton onClick={() => onTabChange('learn-more')}>
                      <Logo />
                      <span>Beeylo</span>
                    </GlassButton>
                  </div>
                  
                  <Typography variant="h1" className="no-scroll-hero-title text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
                    Your inbox, without the noise
                  </Typography>
                  <Typography variant="body" className="no-scroll-hero-subtitle text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
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
                  {/* Glass Button - only visible on mobile breakpoints with top navigation */}
                  <div className="glass-button-mobile-container">
                    <GlassButton onClick={() => onTabChange('learn-more')}>
                      <Logo />
                      <span>Beeylo</span>
                    </GlassButton>
                  </div>
                  
                  <Typography variant="h1" className="no-scroll-hero-title text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
                    Your inbox, without the noise
                  </Typography>
                  <Typography variant="body" className="no-scroll-hero-subtitle text-center-mobile-left-desktop" style={{ textWrap: 'balance' }}>
                    No more spam, ads or useless updates
                  </Typography>
                  
                  {/* Glass Button - only visible on mobile breakpoints with top navigation */}
                  <div className="glass-button-mobile-container">
                    <GlassButton onClick={() => onTabChange('learn-more')}>
                      <Logo />
                      <span>Beeylo</span>
                    </GlassButton>
                  </div>
                
                {/* Login form - Back in the hero text section */}
                <div className="no-scroll-form-section">
                  <form onSubmit={handleSubmit} className="no-scroll-form">
                    {/* Honeypot veld - onzichtbaar voor gebruikers, maar zichtbaar voor bots */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ 
                        position: 'absolute', 
                        left: '-9999px', 
                        opacity: 0, 
                        pointerEvents: 'none' 
                      }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    
                    {/* Invisible Turnstile Widget */}
                    <Turnstile
                      ref={turnstileRef}
                      siteKey="0x4AAAAAABgSmPaCXn1R_VSk"
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      onTimeout={handleTurnstileTimeout}
                      theme="light"
                      className="turnstile-invisible"
                      id="turnstile-homepage"
                    />
                    
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
                        loading={isLoading || isWaitingForTurnstile}
                        disabled={isLoading || isWaitingForTurnstile}
                        className="no-scroll-button buttonv2 buttonv2-yellow"
                      >
                        {isWaitingForTurnstile 
                          ? 'Looking for your reservation...' 
                          : isLoading 
                            ? (loadingMessage || 'Loading...') 
                            : 'Discover Beeylo'
                        }
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
                    By clicking submit I agree to Beeylo's{' '}
                    <span 
                      className="disclaimer-link" 
                      onClick={() => setIsTermsModalOpen(true)}
                      role="button"
                      tabIndex={0}
                    >
                      Terms of Service
                    </span>
                    {' '}and{' '}
                    <span 
                      className="disclaimer-link" 
                      onClick={() => setIsPrivacyModalOpen(true)}
                      role="button"
                      tabIndex={0}
                    >
                      Privacy Policy
                    </span>
                    .
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

      {/* Modals */}
      <TermsOfServiceModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  )
}