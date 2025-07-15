export type TabType = 'home' | 'dashboard' | 'benefits' | 'giveaway' | 'about' | 'faq' | 'menu' | 'actions' | 'leaderboard' | 'personal-settings' | 'feedback' | 'learn-more' | 'thank-you' | 'how-it-works'
export type FeatureTabType = 'speed' | 'design' | 'security' | 'mobile'
export type DashboardTabType = 'intro' | 'actions' | 'share' | 'leaderboard'
export type GiveawayTabType = 'why' | 'built-by-people' | 'your-chance'

export interface Tab {
  id: TabType
  label: string
  icon: React.ReactNode
  requiresAuth?: boolean
}

export interface FeatureTab {
  id: FeatureTabType
  label: string
}

export interface ActionItem {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
}

export interface FeatureData {
  title: string
  subtitle: string
  description: string
  benefits: string[]
}

export interface LoginProps {
  onLogin: (email: string) => void
}

export interface DashboardProps {
  userEmail: string
}

export interface NavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  userEmail?: string
  onLogout?: () => void
}