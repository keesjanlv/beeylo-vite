import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Stack, Card, CardContent, Button } from '../components/ui'

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
  <div className="page-content">
    <Container size="lg" className="menu-page-unified">
      <Card variant="outline">
        <CardContent className="menu-items-container">
          {/* Giveaway Campaign */}
          <div className="menu-item">
            <div className="menu-icon giveaway-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 className="text-xl font-medium">Giveaway Campaign</h3>
              <p className="text-secondary">View regulations</p>
            </div>
          </div>

          {/* Submit Feedback */}
          <div 
            className="menu-item" 
            onClick={() => onTabChange?.('feedback')}
            role="button"
            tabIndex={0}
          >
            <div className="menu-icon feedback-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 className="text-xl font-medium">Submit Feedback</h3>
              <p className="text-secondary">Help us improve</p>
            </div>
          </div>

          {/* Component Demo */}
          <div 
            className="menu-item" 
            onClick={() => onTabChange?.('component-demo')}
            role="button"
            tabIndex={0}
          >
            <div className="menu-icon component-demo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <rect x="7" y="7" width="3" height="3"/>
                <rect x="14" y="7" width="3" height="3"/>
                <rect x="7" y="14" width="10" height="3"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 className="text-xl font-medium">Component Demo</h3>
              <p className="text-secondary">View UI components</p>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="menu-item">
            <div className="menu-icon brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 className="text-xl font-medium">Terms of Service</h3>
              <p className="text-secondary">Legal Information</p>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="menu-item">
            <div className="menu-icon community-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 className="text-xl font-medium">Privacy Policy</h3>
              <p className="text-secondary">Data Protection</p>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="menu-item theme-item">
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
              <h3 className="text-xl font-medium">Theme Settings</h3>
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
            </div>
          </div>

          {/* Logout Section - Only show if logged in */}
          {isLoggedIn && onLogout && (
            <div 
              className="menu-item logout-item" 
              onClick={onLogout}
              role="button"
              tabIndex={0}
            >
              <div className="menu-icon logout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div className="menu-content">
                <h3 className="text-xl font-medium text-danger">Logout</h3>
                <p className="text-secondary">Sign out of your account</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  </div>
)