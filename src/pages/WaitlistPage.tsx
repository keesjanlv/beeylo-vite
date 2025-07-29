import { useState } from 'react'
import type { FC } from 'react'
import { Button, Typography, Card, CardContent, Stack, Container } from '../components/ui'
import { PageBadge } from '../components'

interface WaitlistPageProps {
  onTabChange?: (tab: string) => void
}

export const WaitlistPage: FC<WaitlistPageProps> = ({ onTabChange }) => {
  const [activeContent, setActiveContent] = useState<string>('position') // Default to position tab
  
  // Mock data - in real app, this would come from API
  const totalWaitlist = 15847
  const userPosition = 1234

  const handleContentToggle = (content: string) => {
    setActiveContent(content)
  }

  const shareUrl = `https://beeylo.com/waitlist?ref=${userPosition}`;

  const renderContent = () => {
    switch (activeContent) {
      case 'position':
        return (
          <Stack spacing={6}>
            {/* Waitlist Stats Card */}
            <Card>
              <CardContent>
                <div className="stats-section-enhanced">
                  <div className="stat-item text-center">
                    <Typography variant="h1" className="stat-number text-center">
                      {userPosition.toLocaleString()}/{totalWaitlist.toLocaleString()}
                    </Typography>
                    <Typography variant="body" color="secondary" className="stat-label text-center">
                      Your Position
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Link */}
            <div className="text-center">
              <Typography variant="body" color="secondary" className="mb-2">
                Your referral link:
              </Typography>
              <div className="flex items-center gap-2 justify-center">
                <Typography variant="body" className="font-mono text-sm bg-surface p-2 rounded border flex-1 max-w-md">
                  {shareUrl}
                </Typography>
                <Button 
                  variant="outline" 
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="buttonv2"
                >
                  Copy
                </Button>
              </div>
            </div>
          </Stack>
        )
      
      case 'benefits':
        return (
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant="h3">Your Benefits</Typography>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <Typography variant="h4" className="mb-1">Early Access</Typography>
                    <Typography variant="body" color="secondary">
                      Be among the first to experience Beeylo when we launch
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💎</span>
                  <div>
                    <Typography variant="h4" className="mb-1">Founding Member Status</Typography>
                    <Typography variant="body" color="secondary">
                      Special badge and exclusive features for early supporters
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <Typography variant="h4" className="mb-1">Shape the Platform</Typography>
                    <Typography variant="body" color="secondary">
                      Your feedback directly influences our development roadmap
                    </Typography>
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>
        )
      
      case 'timeline':
        return (
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant="h3">Launch Timeline</Typography>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-1">Beta Testing (Q1 2024)</Typography>
                    <Typography variant="body" color="secondary">
                      Top 500 waitlist members get exclusive beta access
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-1">Early Access (Q2 2024)</Typography>
                    <Typography variant="body" color="secondary">
                      All waitlist members receive invitations in order
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-1">Public Launch (Q3 2024)</Typography>
                    <Typography variant="body" color="secondary">
                      Platform opens to everyone with full feature set
                    </Typography>
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>
        )
      
      case 'boost':
        return (
          <Stack spacing={6}>
            {/* Referral Link Row */}
            <div>
              <Typography variant="h3" className="mb-4 text-center">
                Invite Friends
              </Typography>
              <div className="flex items-center gap-2 justify-center">
                <Typography variant="body" className="font-mono text-sm bg-surface p-2 rounded border flex-1 max-w-md">
                  {shareUrl}
                </Typography>
                <Button 
                  variant="outline" 
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="buttonv2"
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Social Sharing Row */}
            <div>
              <Typography variant="h3" className="mb-4 text-center">
                Share on Social Media
              </Typography>
              <Card>
                <CardContent>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=Join me on the Beeylo waitlist!&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/?text=Join me on the Beeylo waitlist! ${shareUrl}`, '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Follow Us Row */}
            <div>
              <Typography variant="h3" className="mb-4 text-center">
                Follow Us for Extra Points
              </Typography>
              <Card>
                <CardContent>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => window.open('https://twitter.com/beeylo', '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open('https://instagram.com/beeylo', '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.608c-.807 0-1.418-.612-1.418-1.418s.612-1.418 1.418-1.418 1.418.612 1.418 1.418-.611 1.418-1.418 1.418zm0 0"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open('https://linkedin.com/company/beeylo', '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open('https://youtube.com/@beeylo', '_blank')}
                      className="p-3 rounded-lg hover:bg-surface transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Stack>
        )
      
      default:
        return null
    }
  };

  return (
    <div className="page-container">
      <div className="page-content layout-scroll">
        <Container size="md">
          <Stack spacing={8}>
            {/* Welcome Content - Outside Card */}
            <Stack spacing={4}>
              <PageBadge>Waitlist Dashboard</PageBadge>
              <Typography variant="h2" className="text-center">
                You're on the list!
              </Typography>
              <Typography variant="body" color="secondary" className="text-center">
                Thanks for joining our waitlist. Here's your current status and what you can do while you wait.
              </Typography>
            </Stack>

            {/* Action Buttons - 2x2 on mobile, 4 in a row on desktop */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleContentToggle('position')}
                className={`buttonv2 ${activeContent === 'position' ? 'buttonv2-yellow' : ''} w-24 h-24 flex flex-col items-center justify-center`}
              >
                Position
              </Button>
              <Button
                onClick={() => handleContentToggle('benefits')}
                className={`buttonv2 ${activeContent === 'benefits' ? 'buttonv2-yellow' : ''} w-24 h-24 flex flex-col items-center justify-center`}
              >
                Your Benefits
              </Button>
              <Button
                onClick={() => handleContentToggle('timeline')}
                className={`buttonv2 ${activeContent === 'timeline' ? 'buttonv2-yellow' : ''} w-24 h-24 flex flex-col items-center justify-center`}
              >
                Launch Timeline
              </Button>
              <Button
                onClick={() => handleContentToggle('boost')}
                className={`buttonv2 ${activeContent === 'boost' ? 'buttonv2-yellow' : ''} w-24 h-24 flex flex-col items-center justify-center`}
              >
                Boost Position
              </Button>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
            </Stack>
          </Container>
      </div>
    </div>
  );
};