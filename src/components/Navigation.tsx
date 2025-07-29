import type { FC } from 'react'
import type { NavigationProps, TabType } from '../types'
import { Logo } from './Logo'
import { ThreeDotsIcon, HomeIcon, WaitlistIcon, AboutIcon, FAQIcon } from './Icons'
import { SidebarButton } from './ui'

const allTabs: Array<{ id: TabType, label: string, requiresLogin?: boolean, hiddenOnMobile?: boolean, icon?: React.ReactNode }> = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'benefits', label: 'Benefits', icon: <WaitlistIcon /> },
  { id: 'waitlist', label: 'Waitlist', icon: <WaitlistIcon /> },
  { id: 'about', label: 'Our story', icon: <AboutIcon /> },
  { id: 'faq', label: 'FAQ', icon: <FAQIcon /> }
]



interface SidebarProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const Sidebar: FC<SidebarProps> = ({ activeTab, onTabChange, isLoggedIn = false }) => {
  const mainTabs = allTabs.filter(tab => !tab.requiresLogin || isLoggedIn)

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo onClick={() => onTabChange('home')} />
      </div>
      <nav className="sidebar-tabs">
        {mainTabs.map((tab) => (
          <SidebarButton
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            active={activeTab === tab.id}
            icon={tab.icon}
          >
            {tab.label}
          </SidebarButton>
        ))}
      </nav>
      <div className="sidebar-footer">
        <SidebarButton
          active={activeTab === 'menu'}
          onClick={() => onTabChange('menu')}
          title="More"
          icon={<ThreeDotsIcon />}
        >
          Menu
        </SidebarButton>
      </div>
    </div>
  )
}

interface TopNavigationProps extends Pick<NavigationProps, 'activeTab' | 'onTabChange'> {
  isLoggedIn?: boolean
}

export const TopNavigation: FC<TopNavigationProps> = ({ activeTab, onTabChange, isLoggedIn = false }) => {
  const mainTabs = allTabs.filter(tab => {
    // Filter out tabs that require login when not logged in
    if (tab.requiresLogin && !isLoggedIn) return false
    
    // Filter out tabs that are hidden on mobile (TopNavigation is used on mobile)
    if (tab.hiddenOnMobile) return false
    
    return true
  })

  return (
    <div className="top-navigation">
      <div className="mobile-nav-logo">
        <Logo onClick={() => onTabChange('home')} />
      </div>
      <div className="top-nav-tabs">
        {mainTabs.map((tab) => (
          <SidebarButton
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            active={activeTab === tab.id}
            className="top-nav-button"
          >
            {tab.label}
          </SidebarButton>
        ))}
      </div>
      <SidebarButton
        active={activeTab === 'menu'}
        onClick={() => onTabChange('menu')}
        title="More"
        icon={<ThreeDotsIcon />}
        className="top-nav-button menu-button"
      >
        <span className="sr-only">Menu</span>
      </SidebarButton>
    </div>
  )
}