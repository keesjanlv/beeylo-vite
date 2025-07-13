export type TabType = 'home' | 'dashboard' | 'features' | 'about' | 'menu'
export type FeatureTabType = 'speed' | 'design' | 'security' | 'mobile'
export type DashboardTabType = 'actions' | 'follow' | 'share' | 'leaderboard'

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