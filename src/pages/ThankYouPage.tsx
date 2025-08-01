import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Stack, Input, Typography, Button, Card, CardContent } from '../components/ui'
import { InstagramIcon, LinkedinIcon, TwitterIcon, TikTokIcon } from '../components/Icons'

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
    <div className="page-container smart-container">
      <div className="page-content layout-fit thankyou-adaptive">
        <div className="content-center-scroll adaptive-content">
          <Container size="xl" padding={false}>
            <Stack spacing={6} className="thank-you-content items-center text-center">
              {/* Close Button */}
              <div className="flex justify-center">
                <button 
                  type="button"
                  className="numbered-button"
                  onClick={() => onTabChange('home')}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Welcome Message */}
              <Stack spacing={4} className="items-center">
                <Typography variant="h1" className="text-center">Thank you!</Typography>
                <Typography variant="body" color="secondary" className="max-w-lg mx-auto text-center">
                  You have successfully joined the waitlist.
                </Typography>
              </Stack>

              {/* Waitlist Position Card */}
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

              {/* Early Access Header */}
              <Stack spacing={2} className="items-center">
                <Typography variant="h3" className="text-center">Want early access?</Typography>
                <Typography variant="body" color="secondary" className="text-center">
                  Move up by referring your friends. Share your personal link directly or use your favorite platform.
                </Typography>
              </Stack>

              {/* Share Link Card */}
              <div className="card card-default card-md card-padding-md">
                <Stack spacing={4} className="items-center text-center">
                  {/* Share Link header removed */}
                  <div className="flex items-center gap-2 w-full">
                    <Input 
                      value={shareUrl} 
                      readOnly 
                      className="flex-1 w-full"
                    />
                  </div>
                  
                  <div className="action-buttons flex gap-3 w-full">
                    <Button 
                      variant="primary"
                      onClick={copyToClipboard}
                      className="flex-1 buttonv2 buttonv2-yellow"
                    >
                      Copy Link
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => onTabChange('waitlist')}
                      className="flex-1 buttonv2"
                    >
                      See waitlist
                    </Button>
                  </div>
                </Stack>
              </div>

              {/* Social Sharing */}
              <div className="text-center">
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
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  )
}