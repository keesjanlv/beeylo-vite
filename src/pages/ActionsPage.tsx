import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { InstagramIcon, TikTokIcon, TwitterIcon, LinkedinIcon } from '../components/Icons'
import { Container, Stack, Card, CardContent, Button, Typography } from '../components/ui'

interface ActionsPageProps {
  onBack: () => void
}

interface SocialAction {
  id: string;
  title: string;
  icon: React.ReactElement;
  url: string;
  points: number;
  completed?: boolean;
}

export const ActionsPage: FC<ActionsPageProps> = ({ onBack }) => {
  const { userData } = useUser()
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<string | null>(null)

  const socialActions: SocialAction[] = [
    {
      id: 'instagram',
      title: 'Follow us on Instagram',
      icon: <InstagramIcon />,
      url: 'https://instagram.com/beeylo',
      points: 50
    },
    {
      id: 'tiktok',
      title: 'Follow us on TikTok',
      icon: <TikTokIcon />,
      url: 'https://tiktok.com/@beeylo',
      points: 50
    },
    {
      id: 'twitter',
      title: 'Follow us on X',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/beeylo',
      points: 50
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      icon: <LinkedinIcon />,
      url: 'https://linkedin.com/company/beeylo',
      points: 50
    }
  ]

  useEffect(() => {
    // For now, we'll track completed actions in local state
    // In a real implementation, this would come from the API
    const completed = new Set<string>()
    setCompletedActions(completed)
  }, [userData])

  const handleActionClick = async (action: SocialAction) => {
    if (!userData || completedActions.has(action.id)) return

    // Open the social media link
    window.open(action.url, '_blank', 'noopener,noreferrer')

    // For now, we'll simulate tracking the social follow
    // In the real implementation, this would call the API
    setLoading(action.id)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update local state to show as completed
      setCompletedActions(prev => new Set([...prev, action.id]))
      
      // In real implementation, you would call:
      // const response = await api.trackSocialFollow({
      //   user_id: userData.user_id,
      //   platform: action.id as 'linkedin' | 'instagram' | 'tiktok' | 'x',
      //   verification_method: 'manual'
      // })
    } catch (error) {
      console.error('Failed to track social follow:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="page-container">
      <div className="page-content content-scrollable">
        <div className="layout-scroll">
          <Container size="lg">
            <Stack spacing={6}>
              {/* Header */}
              <Stack spacing={4}>
                <Button 
                  variant="ghost" 
                  onClick={onBack} 
                  className="back-button"
                  aria-label="Go back"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                  </svg>
                  <span className="ml-2">Back</span>
                </Button>
                
                <Stack spacing={2}>
                  <Typography variant="h1">Actions</Typography>
                  <Typography variant="body" color="secondary">Complete these actions to earn points and help us grow</Typography>
                </Stack>
              </Stack>

          {/* Social Actions */}
          <Card variant="outline">
            <CardContent>
              <Stack spacing={4}>
                {socialActions.map((action) => {
                  const isCompleted = completedActions.has(action.id)
                  const isLoading = loading === action.id
                  
                  return (
                    <div 
                      key={action.id}
                      className={`action-item ${isCompleted ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
                      onClick={() => !isCompleted && handleActionClick(action)}
                      role="button"
                      tabIndex={isCompleted ? -1 : 0}
                      style={{ 
                        cursor: isCompleted ? 'default' : 'pointer',
                        opacity: isCompleted ? 0.7 : 1
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="action-icon">
                            {action.icon}
                          </div>
                          <div>
                            <Typography variant="h4">{action.title}</Typography>
                            {isCompleted && <span className="text-success text-xs">✓ Completed</span>}
                            {isLoading && <span className="text-primary text-xs">Processing...</span>}
                          </div>
                        </div>
                        <div className="action-points">
                          {isCompleted ? '✓' : `+${action.points}`}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>

              {/* Info Cards */}
              <Stack spacing={4} direction="row" className="actions-info">
                <Card variant="outline" className="flex-1">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h4">How it works</Typography>
                      <Typography variant="body" color="secondary">Follow us on social media platforms to earn points. Each follow gives you 50 points that count towards your leaderboard position.</Typography>
                    </Stack>
                  </CardContent>
                </Card>
                <Card variant="outline" className="flex-1">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h4">Why follow us?</Typography>
                      <Typography variant="body" color="secondary">Stay updated with the latest Beeylo news, product updates, and be part of our growing community building the future of communication.</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  )
}