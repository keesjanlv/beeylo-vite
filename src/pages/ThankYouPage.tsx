import type { FC } from 'react'
import type { TabType } from '../types'
import { Container, Stack, Input, Typography, Button } from '../components/ui'

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
    <div className="page-container">
      <div className="page-content content-scrollable">
        <div className="content-center-scroll">
          <Container size="xl">
            <Stack spacing={6} className="thank-you-content items-center text-center">
              {/* Message Surface Card */}
              <div className="card card-default card-md card-padding-md">
                <Stack spacing={4} className="items-center">
                  <Typography variant="h1" className="text-center">You're in!</Typography>
                  <Typography variant="body" color="secondary" className="max-w-lg mx-auto text-center">
                    Help us grow faster by sharing. As a thank you, we've created a one-of-a-kind giveaway. Something never done before.
                  </Typography>
                </Stack>
              </div>
              
              {/* Form Surface Card */}
               <div className="card card-default card-md card-padding-md">
                 <Stack spacing={4} className="items-center text-center">
                   <Typography variant="h3" className="text-center">Your Share Link</Typography>
                   <div className="flex items-center gap-2 w-full">
                     <Input 
                       value={shareUrl} 
                       readOnly 
                       className="flex-1 w-full"
                     />
                   </div>
                   
                   <div className="action-buttons flex gap-3 w-full">
                     <Button 
                       variant="primary"
                       onClick={copyToClipboard}
                       className="flex-1 buttonv2 buttonv2-yellow"
                     >
                       Copy Link
                     </Button>
                     <Button 
                       variant="secondary"
                       onClick={() => onTabChange('giveaway')}
                       className="flex-1 buttonv2"
                     >
                       See giveaway
                     </Button>
                   </div>
                 </Stack>
               </div>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  )
}