import { useState } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { Button, Typography, Card, CardContent, Stack, Container } from '../components/ui'
import { PageBadge } from '../components'
import { Link, Hand, Rocket, Gem, Target } from 'lucide-react'

interface WaitlistPageProps {
  onTabChange?: (tab: TabType) => void
}

export const WaitlistPage: FC<WaitlistPageProps> = ({ onTabChange: _onTabChange }) => {
  const [activeContent, setActiveContent] = useState<string>('position') // Default to position tab
  
  // Mock data - in real app, this would come from API
  // const totalWaitlist = 15847  // Commented out as it's not used
  const userPosition = 1234

  const handleContentToggle = (content: string) => {
    setActiveContent(content)
  }

  const shareUrl = `https://beeylo.com/waitlist?ref=${userPosition}`;

  const renderContent = () => {
    switch (activeContent) {
      case 'position':
        return (
          <div className="no-scroll-content-wrapper">
            {/* Waitlist Stats Card */}
            <div className="no-scroll-position-card">
              <div className="stats-section-enhanced">
                <div className="stat-item text-center">
                  <Typography variant="h1" className="stat-number text-center font-roboto font-bold">
                    {userPosition.toLocaleString()}
                  </Typography>
                  <Typography variant="body" color="secondary" className="stat-label text-center">
                    Your Position
                  </Typography>
                </div>
              </div>
            </div>

            {/* Share Link */}
            <div className="text-center">
              <Typography variant="body" color="secondary" className="no-scroll-body mb-2">
                Your referral link:
              </Typography>
              <div className="no-scroll-input-group">
                <div className="flex items-center gap-2 justify-center">
                  <Typography variant="body" className="font-mono no-scroll-body bg-surface p-2 rounded border flex-1 max-w-md">
                    {shareUrl}
                  </Typography>
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="no-scroll-button buttonv2"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'benefits':
        return (
          <div className="no-scroll-content-wrapper">
            <div className="steps-container">
              <div className="modal-step-item">
                <div className="modal-step-icon"><Rocket size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Early Access</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Be among the first to experience Beeylo when we launch.</Typography>
                </div>
              </div>
              <div className="modal-step-item">
                <div className="modal-step-icon"><Gem size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Founding Member Status</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Special badge and exclusive features for early supporters.</Typography>
                </div>
              </div>
              <div className="modal-step-item">
                <div className="modal-step-icon"><Target size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Shape the Platform</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Your feedback directly influences our development roadmap.</Typography>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'timeline':
        return (
          <div className="no-scroll-content-wrapper">
            <div className="steps-container">
              <div className="modal-step-item">
                <div className="modal-step-icon"><Link size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Connect</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Join our waitlist and connect with the community</Typography>
                </div>
              </div>
              <div className="modal-step-item">
                <div className="modal-step-icon"><Hand size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Engage</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Share feedback and help shape the platform</Typography>
                </div>
              </div>
              <div className="modal-step-item">
                <div className="modal-step-icon"><Rocket size={20} /></div>
                <div className="modal-step-content">
                  <Typography variant="h4" className="no-scroll-subtitle">Launch</Typography>
                  <Typography variant="body" color="secondary" className="no-scroll-body">Get early access when we go live</Typography>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'boost':
        return (
          <div className="no-scroll-content-wrapper">
            <div className="no-scroll-share-social-section">
              {/* Social Sharing Row */}
              <div>
                <div className="social-section-header">
                  <Typography variant="h5" className="no-scroll-subtitle">
                    Share on Social Media
                  </Typography>
                  <span className="social-section-bonus">+1% each</span>
                </div>
                <div className="social-cards-container">
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=Join me on the Beeylo waitlist!&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="social-card"
                  aria-label="Share on X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="platform-name">x</span>
                </button>
                
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="social-card"
                  aria-label="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="platform-name">facebook</span>
                </button>
                
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="social-card"
                  aria-label="Share on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="platform-name">linkedin</span>
                </button>
                
                <button 
                  onClick={() => window.open(`https://wa.me/?text=Join me on the Beeylo waitlist! ${shareUrl}`, '_blank')}
                  className="social-card"
                  aria-label="Share on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="platform-name">whatsapp</span>
                </button>
              </div>
            </div>

            {/* Follow Us Row */}
            <div>
              <div className="social-section-header">
                <Typography variant="h5" className="no-scroll-subtitle">
                  Follow Us for Extra Points
                </Typography>
                <span className="social-section-bonus">+5% each</span>
              </div>
              <div className="social-cards-container">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on Instagram">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span className="platform-name">instagram</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on TikTok">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                  <span className="platform-name">tiktok</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on LinkedIn">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  <span className="platform-name">linkedin</span>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-card" aria-label="Follow us on X">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                  </svg>
                  <span className="platform-name">x</span>
                </a>
              </div>
            </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  };

  return (
    <div className="no-scroll-page">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Welcome Content */}
          <div className="no-scroll-welcome">
            <PageBadge>Waitlist Dashboard</PageBadge>
            <Typography variant="h2" className="no-scroll-title text-center">
              Want early access?
            </Typography>
            <Typography variant="body" color="secondary" className="no-scroll-body text-center">
              Boost your position by sharing.
            </Typography>
          </div>

          {/* Action Buttons - 1x2 grid layout */}
          <div className="no-scroll-action-buttons">
            {/* Position and Boost Position */}
            <Button
              variant={activeContent === 'position' ? 'brand' : 'outline'}
              onClick={() => handleContentToggle('position')}
              className={`no-scroll-button buttonv2 ${activeContent === 'position' ? 'buttonv2-yellow' : ''}`}
            >
              Position
            </Button>
            <Button
              variant={activeContent === 'boost' ? 'brand' : 'outline'}
              onClick={() => handleContentToggle('boost')}
              className={`no-scroll-button buttonv2 ${activeContent === 'boost' ? 'buttonv2-yellow' : ''}`}
            >
              Boost Position
            </Button>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};