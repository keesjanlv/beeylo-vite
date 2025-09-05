import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TabType } from './types'
import SEO from './components/SEO'
import { Sidebar, TopNavigation } from './components/Navigation'
import formbricks from '@formbricks/js'
import { X } from 'lucide-react'
import explainerVideoWebm from './assets/explainer.webm'
import explainerVideoOptimized from './assets/explainer_optimized.mp4'
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
  ThankYouPage,
  ComponentDemoPage,
  VideoPage
} from './pages'
import { UserProvider, useUser } from './contexts/UserContext'
import './index.css'

type ThemeType = 'light' | 'dark'
type StyleType = 'enhanced' | 'minimal'

const AppContent: FC = () => {
  const { isLoggedIn, userData, logout } = useUser()
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/dashboard': return 'dashboard';
      case '/benefits': return 'benefits';
      case '/giveaway': return 'giveaway';
      case '/waitlist': return 'waitlist';
      case '/how-it-works': return 'how-it-works';
      case '/about': return 'about';
      case '/faq': return 'faq';
      case '/learn-more': return 'learn-more';
      case '/thank-you': return 'thank-you';
      case '/video': return 'video';
      case '/actions': return 'actions';
      case '/feedback': return 'feedback';
      case '/menu': return 'menu';
      case '/component-demo': return 'component-demo';
      default: return 'home';
    }
  });
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

  // Auto-navigate to thank you page only after form submission
  useEffect(() => {
    const formSubmitted = sessionStorage.getItem('beeylo_form_submitted') === 'true';
    
    if (isLoggedIn && activeTab === 'home' && formSubmitted) {
      setActiveTab('thank-you');
      // Clear the flag after navigating to thank you page
      sessionStorage.removeItem('beeylo_form_submitted');
    }
  }, [isLoggedIn, activeTab])

  // Show video modal for logged out users
  useEffect(() => {
    if (!isLoggedIn && activeTab === 'home') {
      const timer = setTimeout(() => {
        setIsVideoModalOpen(true)
      }, 1000) // Show after 1 second
      
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, activeTab])

  // Add no-scroll-container class for browser compatibility
  useEffect(() => {
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      // Pages that use the no-scroll system
      const noScrollPages = ['waitlist', 'thank-you']
      
      if (noScrollPages.includes(activeTab)) {
        mainContent.classList.add('no-scroll-container')
      } else {
        mainContent.classList.remove('no-scroll-container')
      }
    }
  }, [activeTab])

  const handleBackToDashboard = () => {
    setActiveTab('dashboard')
  }

  const handleTabChange = (tab: TabType) => {
    if (!isLoggedIn && (tab === 'home' || tab === 'benefits' || tab === 'giveaway' || tab === 'dashboard')) {
      // If not logged in and clicking on main navigation items, highlight email form
      setActiveTab('home')
      setEmailFormHighlight(true)
      setTimeout(() => setEmailFormHighlight(false), 2000) // Remove highlight after 2 seconds
      window.history.pushState({}, '', '/'); // Update URL to home
    } else {
      setActiveTab(tab)
      window.history.pushState({}, '', tab === 'home' ? '/' : `/${tab}`); // Update URL based on activeTab
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
          title: 'Beeylo - Your new inbox',
          description: 'Join Beeylo\'s exclusive waitlist for early access! Smart email management that transforms your inbox into an organized, efficient workspace.',
          url: '/'
        }
      case 'dashboard':
        return {
          title: 'Dashboard - Beeylo',
          description: 'Your personal Beeylo dashboard. Track your waitlist position, referrals and progress.',
          url: '/dashboard'
        }
      case 'benefits':
        return {
          title: 'Benefits - Beeylo Email Management',
          description: 'Discover Beeylo\'s powerful benefits. No spam, no ads, no useless updates - just pure calm.',
          url: '/benefits'
        }
      case 'giveaway':
        return {
          title: 'Giveaway Competition - Beeylo',
          description: 'Join Beeylo\'s exclusive giveaway competition! Refer friends and climb the leaderboard for early access and crazy rewards.',
          url: '/giveaway'
        }
      case 'waitlist':
        return {
          title: 'Waitlist Dashboard - Beeylo',
          description: 'Your new free inbox, without the noise. No more spam, ads and useless updates. Join the waitlist today and claim your chance at early access.',
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
          title: 'About Beeylo',
          description: 'Learn about Beeylo\'s mission to revolutionize communication between you and your favorite brands.',
          url: '/about'
        }
      case 'faq':
        return {
          title: 'FAQ - Beeylo',
          description: 'Find answers to frequently asked questions about Beeylo.',
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
          description: 'Thank you for joining Beeylo! Share with friends and get early access.',
          url: '/thank-you'
        }
      case 'video':
        return {
          title: 'Get to know Beeylo - Video Explainer',
          description: 'Watch our explainer video to see how Beeylo transforms your experience.',
          url: '/video'
        }
      default:
        return {
          title: 'Beeylo - Your new inbox',
          description: 'Join Beeylo\'s exclusive waitlist for early access! Smart email management that transforms your inbox into an organized, efficient workspace.',
          url: '/'
        }
    }
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} onShowVideoModal={() => setIsVideoModalOpen(true)} />
      case 'dashboard':
        return isLoggedIn ? <DashboardPage userData={userData} onLogout={handleLogout} onTabChange={handleTabChange} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} onShowVideoModal={() => setIsVideoModalOpen(true)} />
      case 'benefits':
        return <BenefitsPage onTabChange={handleTabChange} />
      case 'giveaway':
        return <GiveawayPage onTabChange={handleTabChange} />
      case 'waitlist':
        return <WaitlistPage onTabChange={handleTabChange} />
      case 'how-it-works':
        return <HowItWorksPage onTabChange={handleTabChange} />
      case 'actions':
        return isLoggedIn ? <ActionsPage onBack={handleBackToDashboard} /> : <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} onShowVideoModal={() => setIsVideoModalOpen(true)} />

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
      case 'component-demo':
        return <ComponentDemoPage />
      case 'video':
        return <VideoPage />
      default:
        return <HomePage isLoggedIn={isLoggedIn} emailFormHighlight={emailFormHighlight} onTabChange={handleTabChange} onShowVideoModal={() => setIsVideoModalOpen(true)} />
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
              duration: 0.225, /* Page transitions */
              ease: [0.4, 0.0, 0.2, 1]
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
              height: '100%'
            }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Video Modal - Rendered outside main-content to appear above sidebar/topnav */}
      {isVideoModalOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <button 
            className="video-modal-return-btn"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <X size={16} />
                <span>Close</span>
          </button>
          
          <video 
            className="video-player" 
            controls 
            autoPlay
            muted
            onClick={(e) => e.stopPropagation()}
          >
            <source src={explainerVideoWebm} type="video/webm" />
            <source src={explainerVideoOptimized} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
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