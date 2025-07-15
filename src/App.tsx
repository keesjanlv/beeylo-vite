import { useState, useEffect } from 'react'
import type { FC } from 'react'
import type { TabType } from './types'
import { Sidebar, BottomNavigation } from './components'
import { 
  HomePage, 
  DashboardPage, 
  FeaturesPage, 
  GiveawayPage,
  ActionsPage,
  LeaderboardPage,
  PersonalSettingsPage,
  AboutPage, 
  MenuPage,
  FeedbackPage
} from './pages'
import { UserProvider, useUser } from './contexts/UserContext'
import './App.css'

type ThemeType = 'system' | 'light' | 'dark'
type StyleType = 'enhanced' | 'minimal'

const AppContent: FC = () => {
  const { isLoggedIn, userData, logout } = useUser()
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [emailFormHighlight, setEmailFormHighlight] = useState(false)
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType
    return savedTheme || 'system'
  })
  const [style, setStyle] = useState<StyleType>(() => {
    const savedStyle = localStorage.getItem('style') as StyleType
    return savedStyle || 'enhanced'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-style', style)
    localStorage.setItem('style', style)
  }, [style])

  // Auto-navigate to dashboard when user logs in
  useEffect(() => {
    if (isLoggedIn && activeTab === 'home') {
      setActiveTab('dashboard')
    }
  }, [isLoggedIn])

  const handleBackToDashboard = () => {
    setActiveTab('dashboard')
  }

  const handleTabChange = (tab: TabType) => {
    if (!isLoggedIn && (tab === 'home' || tab === 'features' || tab === 'giveaway' || tab === 'dashboard')) {
      // If not logged in and clicking on main navigation items, highlight email form
      setActiveTab('home')
      setEmailFormHighlight(true)
      setTimeout(() => setEmailFormHighlight(false), 2000) // Remove highlight after 2 seconds
    } else {
      setActiveTab(tab)
    }
  }

  const handleLogout = () => {
    logout()
    setActiveTab('home')
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
      case 'dashboard':
        return isLoggedIn ? <DashboardPage userData={userData} onLogout={handleLogout} onTabChange={handleTabChange} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
      case 'features':
        return <FeaturesPage />
      case 'giveaway':
        return <GiveawayPage onTabChange={handleTabChange} />
      case 'actions':
        return isLoggedIn ? <ActionsPage onBack={handleBackToDashboard} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
      case 'leaderboard':
        return isLoggedIn ? <LeaderboardPage onBack={handleBackToDashboard} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
      case 'personal-settings':
        return isLoggedIn ? <PersonalSettingsPage userData={userData} onLogout={handleLogout} onBack={handleBackToDashboard} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
      case 'feedback':
        return <FeedbackPage onBack={() => setActiveTab('menu')} />
      case 'about':
        return <AboutPage />
      case 'menu':
        return <MenuPage 
          theme={theme} 
          onThemeChange={setTheme} 
          style={style} 
          onStyleChange={setStyle}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
      default:
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} />
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLoggedIn={isLoggedIn}
      />
    </div>
  )
}

const App: FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App