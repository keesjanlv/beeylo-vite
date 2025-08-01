import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TabType } from './types'
import SEO from './components/SEO'
import { Sidebar, TopNavigation } from './components/Navigation'
import formbricks from '@formbricks/js'
import {
  HomePage,
  DashboardPage,
  BenefitsPage,
  GiveawayPage,
  WaitlistPage,
  HowItWorksPage,
  ActionsPage,
  AboutPage, 
  MenuPage,
  FeedbackPage,
  FAQPage,
  LearnMorePage,
  ThankYouPage
} from './pages'
import { UserProvider, useUser } from './contexts/UserContext'
import './index.css'

type ThemeType = 'light' | 'dark'
type StyleType = 'enhanced' | 'minimal'

const AppContent: FC = () => {
  const { isLoggedIn, userData, logout } = useUser()
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [emailFormHighlight, setEmailFormHighlight] = useState(false)

  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType
    return savedTheme || 'light'
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

  // Initialize Formbricks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      formbricks.setup({
        environmentId: 'cmdram4jy3w6euu01p4o3shuh', // User's environment ID
        appUrl: 'https://app.formbricks.com'
      })
    }
  }, [])

  // Auto-navigate to thank you page when user logs in
  useEffect(() => {
    if (isLoggedIn && activeTab === 'home') {
      setActiveTab('thank-you')
    }
  }, [isLoggedIn])

  const handleBackToDashboard = () => {
    setActiveTab('dashboard')
  }

  const handleTabChange = (tab: TabType) => {
    if (!isLoggedIn && (tab === 'home' || tab === 'benefits' || tab === 'giveaway' || tab === 'dashboard')) {
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

  const getSEOMetadata = () => {
    switch (activeTab) {
      case 'home':
        return {
          title: 'Beeylo - Smart Email Management & Waitlist Competition',
          description: 'Join Beeylo\'s exclusive waitlist and compete for early access! Smart email management that transforms your inbox into an organized, efficient workspace.',
          url: '/'
        }
      case 'dashboard':
        return {
          title: 'Dashboard - Beeylo',
          description: 'Your personal Beeylo dashboard. Track your waitlist position, referrals, and competition progress.',
          url: '/dashboard'
        }
      case 'benefits':
        return {
          title: 'Benefits - Beeylo Email Management',
          description: 'Discover Beeylo\'s powerful email management benefits. No spam, no ads, no useless updates - just pure productivity.',
          url: '/benefits'
        }
      case 'giveaway':
        return {
          title: 'Giveaway Competition - Beeylo',
          description: 'Join Beeylo\'s exclusive giveaway competition! Refer friends and climb the leaderboard for early access and amazing prizes.',
          url: '/giveaway'
        }
      case 'waitlist':
        return {
          title: 'Join the Waitlist - Beeylo',
          description: 'Join Beeylo\'s exclusive waitlist and be among the first to experience the future of email management. Early access, exclusive benefits, and founder perks await.',
          url: '/waitlist'
        }
      case 'how-it-works':
        return {
          title: 'How does it work? - Beeylo Giveaway',
          description: 'Learn how Beeylo\'s giveaway works, what you can earn, and how to participate in our reward program.',
          url: '/how-it-works'
        }

      case 'about':
        return {
          title: 'About Beeylo - Smart Email Management',
          description: 'Learn about Beeylo\'s mission to revolutionize email management and productivity for modern professionals.',
          url: '/about'
        }
      case 'faq':
        return {
          title: 'FAQ - Beeylo',
          description: 'Find answers to frequently asked questions about Beeylo email management platform.',
          url: '/faq'
        }
      case 'learn-more':
        return {
          title: 'Learn More - Beeylo',
          description: 'Watch our demo and learn how Beeylo will transform your email experience.',
          url: '/learn-more'
        }
      case 'thank-you':
        return {
          title: 'Welcome to Beeylo!',
          description: 'Thank you for joining Beeylo! Share with friends and participate in our exclusive giveaway.',
          url: '/thank-you'
        }
      default:
        return {
          title: 'Beeylo - Smart Email Management & Waitlist Competition',
          description: 'Join Beeylo\'s exclusive waitlist and compete for early access! Smart email management that transforms your inbox into an organized, efficient workspace.',
          url: '/'
        }
    }
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} />
      case 'dashboard':
        return isLoggedIn ? <DashboardPage userData={userData} onLogout={handleLogout} onTabChange={handleTabChange} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} />
      case 'benefits':
        return <BenefitsPage />
      case 'giveaway':
        return <GiveawayPage onTabChange={handleTabChange} />
      case 'waitlist':
        return <WaitlistPage onTabChange={handleTabChange} />
      case 'how-it-works':
        return <HowItWorksPage onTabChange={handleTabChange} />
      case 'actions':
        return isLoggedIn ? <ActionsPage onBack={handleBackToDashboard} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} />

      case 'feedback':
        return <FeedbackPage onBack={() => setActiveTab('menu')} />
      case 'about':
        return <AboutPage />
      case 'faq':
        return <FAQPage />
      case 'learn-more':
        return <LearnMorePage onTabChange={handleTabChange} />
      case 'thank-you':
        return <ThankYouPage userData={userData} onTabChange={handleTabChange} />
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
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} />
    }
  }

  return (
    <div className="app">
      <SEO {...getSEOMetadata()} />
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLoggedIn={isLoggedIn}
      />
      
      <TopNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLoggedIn={isLoggedIn}
      />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.225, /* 25% faster: 0.3 * 0.75 = 0.225 */
              ease: [0.4, 0.0, 0.2, 1]
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
            }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
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