import type { FC } from 'react'
import type { Tab, TabType } from '../types'
import { Logo } from './Logo'

interface NavigationProps {
  tabs: Tab[]
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  isLoggedIn: boolean
  userEmail: string
  onLogout: () => void
}

export const Sidebar: FC<NavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  isLoggedIn,
  userEmail,
  onLogout
}) => (
  <nav className="sidebar">
    <div className="sidebar-header">
      <Logo />
      {isLoggedIn && (
        <div className="user-info">
          <span className="user-email">{userEmail}</span>
          <button onClick={onLogout} className="logout-button">
            Log out
          </button>
        </div>
      )}
    </div>
    <div className="sidebar-tabs">
      {tabs.filter(tab => tab.id !== 'menu').map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
    <div className="sidebar-footer">
      {tabs.filter(tab => tab.id === 'menu').map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  </nav>
)

export const BottomNavigation: FC<Pick<NavigationProps, 'tabs' | 'activeTab' | 'onTabChange'>> = ({
  tabs,
  activeTab,
  onTabChange
}) => (
  <nav className="bottom-nav">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`bottom-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
      >
        {tab.icon}
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>
) 