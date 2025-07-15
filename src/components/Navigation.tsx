import type { FC } from 'react'
import type { NavigationProps, TabType } from '../types'
import { Logo } from './Logo'
import { ThreeDotsIcon } from './Icons'

const allTabs: Array<{ id: TabType, label: string, requiresLogin?: boolean }> = [
  { id: 'home', label: 'Home' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'giveaway', label: 'Giveaway' },
  { id: 'about', label: 'About us' },
  { id: 'faq', label: 'FAQ' }
]



interface SidebarProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const Sidebar: FC<SidebarProps> = ({ activeTab, onTabChange, isLoggedIn = false }) => {
  const mainTabs = allTabs.filter(tab => !tab.requiresLogin || isLoggedIn)

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

interface TopNavigationProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const TopNavigation: FC<TopNavigationProps> = ({ activeTab, onTabChange, isLoggedIn = false }) => {
  const mainTabs = allTabs.filter(tab => !tab.requiresLogin || isLoggedIn)

  return (
    <div className="top-navigation">
      <div className="mobile-nav-logo">
        <Logo />
      </div>
      <div className="top-nav-tabs">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`top-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        className={`top-nav-tab menu-button ${activeTab === 'menu' ? 'active' : ''}`}
        onClick={() => onTabChange('menu')}
        title="More"
      >
        <ThreeDotsIcon />
      </button>
    </div>
  )
}