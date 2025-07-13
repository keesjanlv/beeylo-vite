import { useState } from 'react'
import type { FC } from 'react'
import type { Tab, TabType } from './types'
import { HomeIcon, DashboardIcon, FeaturesIcon, AboutIcon, MenuIcon } from './components'
import { Sidebar, BottomNavigation } from './components'
import { HomePage, DashboardPage, FeaturesPage, AboutPage, MenuPage } from './pages'
import './App.css'

const tabs: Tab[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, requiresAuth: true },
  { id: 'features', label: 'Features', icon: <FeaturesIcon /> },
  { id: 'about', label: 'About', icon: <AboutIcon /> },
  { id: 'menu', label: 'Menu', icon: <MenuIcon /> }
]

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleLogin = (email: string) => {
    setIsLoggedIn(true)
    setUserEmail(email)
    setActiveTab('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    setActiveTab('home')
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onLogin={handleLogin} />
      case 'dashboard':
        return isLoggedIn ? <DashboardPage userEmail={userEmail} /> : <HomePage onLogin={handleLogin} />
      case 'features':
        return <FeaturesPage />
      case 'about':
        return <AboutPage />
      case 'menu':
        return <MenuPage />
      default:
        return <HomePage onLogin={handleLogin} />
    }
  }

  const availableTabs = isLoggedIn ? tabs : tabs.filter(tab => !tab.requiresAuth)

  return (
    <div className="app">
      <Sidebar
        tabs={availableTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <BottomNavigation
        tabs={availableTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}

export default App 