import type { FC } from 'react'
import type { NavigationProps, TabType } from '../types'
import { Logo } from './Logo'
import { ThreeDotsIcon, DashboardIcon } from './Icons'

const allTabs: Array<{ id: TabType, label: string, requiresLogin?: boolean }> = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'giveaway', label: 'Giveaway' },
  { id: 'dashboard', label: 'Dashboard', requiresLogin: true }
]



interface SidebarProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const Sidebar: FC<SidebarProps> = ({ activeTab, onTabChange, isLoggedIn = false }) => {
  const mainTabs = allTabs.filter(tab => tab.id !== 'dashboard' && (!tab.requiresLogin || isLoggedIn))
  const dashboardTab = allTabs.find(tab => tab.id === 'dashboard')

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo />
      </div>
      <nav className="sidebar-tabs">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        {isLoggedIn && dashboardTab && (
          <button
            className={`sidebar-tab dashboard-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
            title="Dashboard"
          >
            <DashboardIcon />
            <span className="dashboard-text">Dashboard</span>
          </button>
        )}
        <button
          className={`sidebar-tab menu-button ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => onTabChange('menu')}
          title="More"
        >
          <ThreeDotsIcon />
        </button>
      </div>
    </div>
  )
}

interface BottomNavigationProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const BottomNavigation: FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  isLoggedIn = false
}) => {
  const mainTabs = allTabs.filter(tab => tab.id !== 'dashboard' && (!tab.requiresLogin || isLoggedIn))
  const dashboardTab = allTabs.find(tab => tab.id === 'dashboard')

  return (
    <nav className="top-navigation">
      <div className="mobile-nav-container">
        <div className="mobile-nav-left">
          <div className="mobile-logo">
            <Logo />
          </div>
        </div>
        <div className="mobile-nav-middle">
          <div className="mobile-nav-tabs">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`top-nav-tab ${activeTab === tab.id ? 'active' : ''} ${!isLoggedIn ? 'logged-out' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mobile-nav-right">
          {dashboardTab && (
            <button
              className={`top-nav-tab icon-tab ${activeTab === 'dashboard' ? 'active' : ''} ${!isLoggedIn ? 'logged-out' : ''}`}
              onClick={() => onTabChange('dashboard')}
              title="Dashboard"
            >
              <DashboardIcon />
            </button>
          )}
          <button
            className={`top-nav-tab icon-tab menu-button ${activeTab === 'menu' ? 'active' : ''} ${!isLoggedIn ? 'logged-out' : ''}`}
            onClick={() => onTabChange('menu')}
            title="More"
          >
            <ThreeDotsIcon />
          </button>
        </div>
      </div>
    </nav>
  )
}