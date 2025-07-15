import type { FC } from 'react'
import type { TabType } from '../types'

type ThemeType = 'system' | 'light' | 'dark'
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
  <div className="modern-menu">
    <div className="menu-container">
      <div className="menu-section">
        <div className="menu-item">
          <div className="menu-icon giveaway-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="menu-content">
            <h3>Giveaway Campaign</h3>
            <p>View regulations</p>
          </div>
        </div>

        <div className="menu-item" onClick={() => onTabChange?.('feedback')}>
          <div className="menu-icon feedback-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div className="menu-content">
            <h3>Submit Feedback</h3>
            <p>Help us improve</p>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item">
          <div className="menu-icon brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          </div>
          <div className="menu-content">
            <h3>Terms of Service</h3>
            <p>Legal Information</p>
          </div>
        </div>

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
            <h3>Privacy Policy</h3>
            <p>Data Protection</p>
          </div>
        </div>
      </div>

      <div className="menu-section">
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
            <h3>Theme Settings</h3>
            <div className="theme-options">
              <button 
                className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                onClick={() => onThemeChange('system')}
                title="System Theme"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                System
              </button>
              <button 
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => onThemeChange('light')}
                title="Light Theme"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              </button>
              <button 
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => onThemeChange('dark')}
                title="Dark Theme"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Section - Only show if logged in */}
      {isLoggedIn && onLogout && (
        <div className="menu-section">
          <div className="menu-item logout-item" onClick={onLogout}>
            <div className="menu-icon logout-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <div className="menu-content">
              <h3 style={{ color: '#ef4444' }}>Logout</h3>
              <p>Sign out of your account</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)