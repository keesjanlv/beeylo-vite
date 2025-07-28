import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Card, CardContent, Typography } from '../components/ui'

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
}) => (
  <div className="page-container">
    <div className="page-content content-scrollable viewport-constrained">
      <div className="layout-scroll">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 menu-items-grid">
              {/* Giveaway Campaign */}
              <Card variant="outline" className="menu-card">
                <CardContent className="menu-item">
                  <div className="menu-icon giveaway-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Giveaway Campaign</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">View regulations</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Feedback */}
              <Card 
                variant="outline" 
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
              <Card variant="outline" className="menu-card">
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
              <Card variant="outline" className="menu-card">
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
                variant="outline" 
                className="menu-card theme-switch-card"
                onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
                role="button"
                tabIndex={0}
              >
                <CardContent className="menu-item">
                  <button 
                    className={`theme-switch ${theme === 'dark' ? 'dark' : 'light'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onThemeChange(theme === 'light' ? 'dark' : 'light');
                    }}
                    aria-label="Toggle theme"
                  >
                    <div className="switch-track">
                      <div className="switch-thumb">
                        {theme === 'light' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold menu-text-small">Theme</Typography>
                    <Typography variant="body" color="secondary" className="menu-text-small">{theme === 'light' ? 'Light' : 'Dark'}</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Logout Section - Only show if logged in */}
              {isLoggedIn && onLogout && (
                <Card 
                  variant="outline" 
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
            <div className="social-icons-section">
              <div className="social-icons-grid">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on Instagram"
                >
                  <div className="social-icon instagram-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </div>
                </a>
                
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on TikTok"
                >
                  <div className="social-icon tiktok-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                    </svg>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on LinkedIn"
                >
                  <div className="social-icon linkedin-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </div>
                </a>
                
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Follow us on X"
                >
                  <div className="social-icon x-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
        </Container>
      </div>
    </div>
  </div>
)