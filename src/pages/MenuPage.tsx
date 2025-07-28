import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Card, CardContent, Button, Typography, Stack } from '../components/ui'

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
          <Stack spacing={4} className="feature-content menu-items-list">
              {/* Giveaway Campaign */}
              <Card variant="outline" className="menu-card">
                <CardContent className="menu-item">
                  <div className="menu-icon giveaway-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold">Giveaway Campaign</Typography>
                    <Typography variant="body" color="secondary">View regulations</Typography>
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
                    <Typography variant="body" className="font-semibold">Submit Feedback</Typography>
                    <Typography variant="body" color="secondary">Help us improve</Typography>
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
                    <Typography variant="body" className="font-semibold">Terms of Service</Typography>
                    <Typography variant="body" color="secondary">Legal Information</Typography>
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
                    <Typography variant="body" className="font-semibold">Privacy Policy</Typography>
                    <Typography variant="body" color="secondary">Data Protection</Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card variant="outline" className="menu-card theme-card">
                <CardContent className="menu-item">
                  <div className="menu-icon theme-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  </div>
                  <div className="menu-content">
                    <Typography variant="body" className="font-semibold">Theme Settings</Typography>
                  </div>
                  <div className="theme-options">
                    <Button 
                      variant={theme === 'light' ? 'primary' : 'secondary'}
                      onClick={() => onThemeChange('light')}
                      size="sm"
                      className="theme-option"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
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
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'primary' : 'secondary'}
                      onClick={() => onThemeChange('dark')}
                      size="sm"
                      className="theme-option"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                      Dark
                    </Button>
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
                      <Typography variant="body" className="font-semibold text-danger">Logout</Typography>
                      <Typography variant="body" color="secondary">Sign out of your account</Typography>
                    </div>
                  </CardContent>
                </Card>
              )}
            </Stack>
        </Container>
      </div>
    </div>
  </div>
)