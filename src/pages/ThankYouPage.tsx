import type { FC } from 'react'
import type { TabType } from '../types'
import { Input, Card, CardContent, Typography, Button } from '../components/ui'
import { InstagramIcon, LinkedinIcon, TwitterIcon, TikTokIcon } from '../components/Icons'
import { ArrowLeft } from 'lucide-react'

interface ThankYouPageProps {
  userData?: any
  onTabChange: (tab: TabType) => void
}

export const ThankYouPage: FC<ThankYouPageProps> = ({ userData, onTabChange }) => {
  const shareUrl = userData?.referral_url || 'https://beeylo.com/ref/sample'
  
  // Mock data - in real app, this would come from API
  // const totalWaitlist = 15847  // Commented out as it's not used
  const userPosition = 1234
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="no-scroll-page thank-you">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Return Button */}
          <button 
            type="button"
            className="no-scroll-return-btn"
            onClick={() => onTabChange('home')}
            aria-label="Return to home"
          >
            <ArrowLeft size={16} />
            <span>Close</span>
          </button>

          {/* Welcome Message */}
          <div className="no-scroll-welcome">
            <h1 className="no-scroll-title">Thank you!</h1>
            <p className="no-scroll-body">
              You have successfully joined the waitlist.
            </p>
          </div>

          {/* Waitlist Position Card with Waitlist Button */}
          <div className="no-scroll-position-waitlist-section">
            <div className="no-scroll-position-card">
              <Card>
                <CardContent>
                  <div className="stats-section-enhanced">
                    <div className="stat-item text-center">
                      <Typography variant="h1" className="stat-number text-center font-roboto font-bold text-sm">
                        {userPosition.toLocaleString()}
                      </Typography>
                      <Typography variant="body" color="secondary" className="stat-label text-center">
                        Your Position
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button 
              variant="secondary"
              onClick={() => onTabChange('waitlist')}
              className="no-scroll-button buttonv2 no-scroll-waitlist-button"
            >
              Waitlist
            </Button>
          </div>

          {/* Early Access Header */}
          <div className="no-scroll-early-access">
            <h2 className="no-scroll-subtitle">Want early access?</h2>
            <p className="no-scroll-body">
              Move up by referring your friends. Share your personal link directly or use your favorite platform.
            </p>
          </div>

          {/* Share and Social Section - Combined */}
          <div className="no-scroll-share-social-section">
            <div className="simple-input-copy">
              <Input 
                value={shareUrl} 
                readOnly 
                className="simple-input"
              />
              <Button 
                variant="primary"
                onClick={copyToClipboard}
                className="buttonv2 buttonv2-yellow"
              >
                Copy Link
              </Button>
            </div>

            {/* Social Sharing */}
            <div className="social-cards-container">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on Instagram">
                <InstagramIcon />
                <span className="platform-name">instagram</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on TikTok">
                <TikTokIcon />
                <span className="platform-name">tiktok</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on LinkedIn">
                <LinkedinIcon />
                <span className="platform-name">linkedin</span>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on X">
                <TwitterIcon />
                <span className="platform-name">x</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}