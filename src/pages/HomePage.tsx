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
import cloudflareIcon from '../assets/cloudflare-icon.svg'

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
  const { login, isLoading, error } = useUser()

  const [email, setEmail] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [fingerprint, setFingerprint] = useState('')
  const [honeypot, setHoneypot] = useState('') // Honeypot veld
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const turnstileRef = useRef<TurnstileRef>(null)
  const pageLoadTime = useRef<number>(Date.now())
  
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
  const handleTurnstileVerify = async (token: string) => {
    setTurnstileToken(token)
    setIsTurnstileLoading(false)
    setLoginError(null)
    
    // Automatically proceed with submission once token is received
    try {
      await proceedWithSubmission(token)
    } catch (error) {
      console.error('Submission failed:', error)
      setLoginError('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTurnstileError = (error?: any) => {
    setTurnstileToken(null)
    setIsTurnstileLoading(false)
    setIsSubmitting(false)
    console.error('Turnstile verification failed:', error)
    
    // Check for script loading failures (ad blocker, network issues)
    if (typeof error === 'string' && error.includes('Script loading failed')) {
      console.warn('Turnstile script blocked - likely by ad blocker or network restrictions')
      setLoginError('Security verification is required but blocked. Please disable ad blockers and refresh the page.')
      return
    }
    
    // Simplified error handling
    setLoginError('Security verification failed. Please try again.')
  }

  const handleTurnstileExpire = () => {
    setTurnstileToken(null)
    setIsTurnstileLoading(false)
  }

  const handleTurnstileTimeout = () => {
    setTurnstileToken(null)
    setIsTurnstileLoading(false)
    setIsSubmitting(false)
    setLoginError('Security verification timed out. Please try again.')
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
           turnstile_token: tokenToUse || undefined // Turnstile token is verplicht
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
       turnstile_token: tokenToUse || undefined // Turnstile token is verplicht
    })
    if (!success) {
      setLoginError(error || 'Login failed. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isSubmitting || isTurnstileLoading) {
      return
    }
    
    // Honeypot check
    if (honeypot) {
      return
    }
    
    if (!email) {
      setLoginError('Please enter your email address')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setLoginError('Please enter a valid email address')
      return
    }
    
    setLoginError(null)
    setIsSubmitting(true)
    setIsTurnstileLoading(true)
    
    // Load Turnstile script if not already loaded
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.onload = () => {
        // Script loaded, now execute Turnstile
        if (turnstileRef.current) {
          turnstileRef.current.execute()
        }
      }
      script.onerror = () => {
        setIsTurnstileLoading(false)
        setIsSubmitting(false)
        setLoginError('Security verification failed to load. Please check your connection and try again.')
      }
      document.head.appendChild(script)
    } else {
      // Script already loaded, execute Turnstile immediately
      if (turnstileRef.current) {
        turnstileRef.current.execute()
      }
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
                    
                    {/* Invisible Turnstile Widget - only rendered when needed */}
                    {(isTurnstileLoading || turnstileToken) && (
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAABgSmPaCXn1R_VSk"}
                        onVerify={handleTurnstileVerify}
                        onError={handleTurnstileError}
                        onExpire={handleTurnstileExpire}
                        onTimeout={handleTurnstileTimeout}
                        theme="light"
                        className="turnstile-invisible"
                        id="turnstile-homepage"
                      />
                    )}
                    
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
                        loading={isSubmitting || isLoading || isTurnstileLoading}
                        disabled={isSubmitting || isLoading || isTurnstileLoading}
                        className="no-scroll-button buttonv2 buttonv2-yellow"
                      >
                        {isTurnstileLoading ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Verifying security..
                            <img 
                              src={cloudflareIcon} 
                              alt="Cloudflare" 
                              style={{ width: '16px', height: '16px', opacity: 0.8 }}
                            />
                          </span>
                        ) : isSubmitting ? 'Processing...' : 'Get early access'}
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