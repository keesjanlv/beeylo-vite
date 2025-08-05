import type { FC } from 'react'
import { useState } from 'react'
import type { TabType } from '../types'
import { Card, CardContent, Typography } from '../components/ui'
import { Sun, Moon, StickyNote } from 'lucide-react'
import { TermsOfServiceModal } from '../components/TermsOfServiceModal'
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal'

type ThemeType = 'light' | 'dark'
type StyleType = 'enhanced' | 'minimal'

interface MenuPageProps {
  theme: ThemeType
  onThemeChange: (theme: ThemeType) => void
  style?: StyleType
  onStyleChange?: (style: StyleType) => void
  onTabChange?: (tab: TabType) => void
  onLogout?: () => void
  isLoggedIn?: boolean
}

export const MenuPage: FC<MenuPageProps> = ({ 
  theme, 
  onThemeChange, 
  onTabChange, 
  onLogout, 
  isLoggedIn = false 
}) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  return (
  <div className="no-scroll-page">
    <div className="no-scroll-content">
      <div className="no-scroll-stack">
        <div className="no-scroll-section">
          <div className="no-scroll-menu-grid">
              {/* Blog */}
              <Card className="menu-card">
                <CardContent className="menu-item">
                  <div className="menu-icon blog-icon">
                    <StickyNote size={20} />
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Blog</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">Coming Soon</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Feedback */}
              <Card 
                className="menu-card" 
                onClick={() => onTabChange?.('feedback')}
                role="button"
                tabIndex={0}
              >
                <CardContent className="menu-item">
                  <div className="menu-icon feedback-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Submit Feedback</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">Help us improve</Typography>
                  </div>
                </CardContent>
              </Card>





              {/* Terms of Service */}
              <Card 
                className="menu-card"
                onClick={() => setIsTermsModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                <CardContent className="menu-item">
                  <div className="menu-icon brand-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                    </svg>
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Terms of Service</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">Legal Information</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Policy */}
              <Card 
                className="menu-card"
                onClick={() => setIsPrivacyModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                <CardContent className="menu-item">
                  <div className="menu-icon privacy-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Privacy Policy</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">Data Protection</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Switch */}
              <Card 
                className="menu-card"
                onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
                role="button"
                tabIndex={0}
              >
                <CardContent className="menu-item">
                  <div className="menu-icon theme-icon">
                    {theme === 'light' ? (
                      <Sun size={20} />
                    ) : (
                      <Moon size={20} />
                    )}
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Theme</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">{theme === 'light' ? 'Light' : 'Dark'}</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Logout Section - Only show if logged in */}
              {isLoggedIn && onLogout && (
                <Card 
                  className="menu-card logout-item" 
                  onClick={onLogout}
                  role="button"
                  tabIndex={0}
                >
                  <CardContent className="menu-item">
                    <div className="menu-icon logout-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16,17 21,12 16,7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                    </div>
                    <div className="menu-content">
                      <Typography variant="body" className="font-semibold text-danger menu-text-small">Logout</Typography>
                      <Typography variant="body" color="secondary" className="menu-text-small">Sign out of your account</Typography>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Social Media Icons Section */}
            <div className="no-scroll-share-social-section">
              <div className="social-icons-simple">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on TikTok"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on X"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                  </svg>
                </a>
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