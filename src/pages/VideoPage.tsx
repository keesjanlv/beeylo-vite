import { useState, useRef } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { Button, Typography } from '../components/ui'
import { TermsOfServiceModal } from '../components/TermsOfServiceModal'
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal'
import { useUser } from '../contexts/UserContext'
import Turnstile, { type TurnstileRef } from '../components/Turnstile'
import explainerVideo from '../assets/explainer.mp4'
import explainerVideoWebm from '../assets/explainer.webm'
import explainerVideoOptimized from '../assets/explainer_optimized.mp4'
import cloudflareIcon from '../assets/cloudflare-icon.svg'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useEffect } from 'react'

interface VideoPageProps {
  onTabChange: (tab: TabType) => void
}

export const VideoPage: FC<VideoPageProps> = ({ onTabChange }) => {
  const { login, isLoading, error } = useUser()
  
  const [email, setEmail] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [fingerprint, setFingerprint] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const turnstileRef = useRef<TurnstileRef>(null)
  const pageLoadTime = useRef<number>(Date.now())
  
  // Generate fingerprint on page load
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
    
    if (typeof error === 'string' && error.includes('Script loading failed')) {
      console.warn('Turnstile script blocked - likely by ad blocker or network restrictions')
      setLoginError('Security verification is required but blocked. Please disable ad blockers and refresh the page.')
      return
    }
    
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

  const proceedWithSubmission = async (token?: string) => {
    const tokenToUse = token || turnstileToken
    
    if (!email.trim()) {
      if (import.meta.env.DEV || window.location.hostname === 'localhost') {
        setLoginError(null)
        const success = await login('sample@beeylo.com', {
          fingerprint,
          submission_time: Date.now() - pageLoadTime.current,
          turnstile_token: tokenToUse || undefined
        })
        if (!success) {
          setLoginError(error || 'Login failed. Please try again.')
        }
      } else {
        setLoginError('Please enter your email address')
      }
      return
    }
    
    setLoginError(null)
    const success = await login(email.trim(), {
      fingerprint,
      submission_time: Date.now() - pageLoadTime.current,
      turnstile_token: tokenToUse || undefined
    })
    if (!success) {
      setLoginError(error || 'Login failed. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting || isTurnstileLoading) {
      return
    }
    
    if (honeypot) {
      return
    }
    
    if (!email) {
      setLoginError('Please enter your email address')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setLoginError('Please enter a valid email address')
      return
    }
    
    setLoginError(null)
    setIsSubmitting(true)
    setIsTurnstileLoading(true)
    
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.onload = () => {
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
      if (turnstileRef.current) {
        turnstileRef.current.execute()
      }
    }
  }

  return (
    <div className="no-scroll-page video">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Welcome Section */}
          <div className="no-scroll-welcome video2">
            <Typography 
              variant="h2" 
              className="no-scroll-title text-center"
            >
              Get to know Beeylo
            </Typography>
            
            <Typography 
              variant="body" 
              color="secondary" 
              className="no-scroll-body text-center"
            >
              And secure your spot right now.
            </Typography>
          </div>

          {/* Video Section */}
          <div className="video-section">
            <video 
              controls 
              className="video-player"
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
              }}
            >
              <source src={explainerVideoWebm} type="video/webm" />
              <source src={explainerVideoOptimized} type="video/mp4" />
              <source src={explainerVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Sign-up Form Section */}
          <div className="no-scroll-form-section">
            <form onSubmit={handleSubmit} className="no-scroll-form">
                {/* Honeypot field */}
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
                    id="turnstile-videopage"
                  />
                )}
                
                <div className="no-scroll-input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="no-scroll-input"
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

export default VideoPage