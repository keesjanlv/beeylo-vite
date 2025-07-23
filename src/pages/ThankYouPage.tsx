import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Stack, Card, CardContent, Button, Input } from '../components/ui'

interface ThankYouPageProps {
  userData?: any
  onTabChange: (tab: TabType) => void
}

export const ThankYouPage: FC<ThankYouPageProps> = ({ userData, onTabChange }) => {
  const shareUrl = userData?.referral_url || 'https://beeylo.com/ref/sample'
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="page-content thank-you-page">
      <Container size="lg">
        <Card variant="outline">
          <CardContent>
            <Stack spacing={6} className="thank-you-content items-center text-center">
              <h1 className="text-3xl font-bold">You're in!</h1>
              <p className="text-secondary max-w-lg mx-auto">
                Help us grow faster by sharing. As a thank you, we’ve created a one-of-a-kind giveaway. Something never done before.
              </p>
              
              <Card variant="outline" className="w-full max-w-lg">
                <CardContent>
                  <Stack spacing={3}>
                    <h3 className="text-xl font-medium">Your Share Link</h3>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={shareUrl} 
                        readOnly 
                        className="flex-1"
                      />
                      <Button 
                        variant="primary"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        Copy
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
              
              <div className="action-buttons">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={() => onTabChange('giveaway')}
                >
                  Check Out Giveaway
                </Button>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}