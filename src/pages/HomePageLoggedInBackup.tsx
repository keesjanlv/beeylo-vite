import type { FC } from 'react'
import type { TabType } from '../types'
import { Button, Typography } from '../components/ui'
import tripleScreenImg from '../assets/triplescreenhomedef.webp'

interface HomePageLoggedInBackupProps {
  onTabChange: (tab: TabType) => void
}

// BACKUP: This was the original logged-in homepage content
// To restore this as the logged-in homepage:
// 1. Import this component in App.tsx
// 2. Replace the LearnMorePage call in the 'home' case when isLoggedIn is true
// 3. Update the route to use this component instead

export const HomePageLoggedInBackup: FC<HomePageLoggedInBackupProps> = ({ onTabChange }) => {
  return (
    <div className="page-container">
      <div className="page-content content-center-screen">
        <div className="container max-w-6xl">
          <div className="home-content-wrapper">
            {/* Text Content */}
            <div className="home-text-section">
              <Typography variant="h1" className="home-title text-center-mobile-left-desktop">
                Welcome to Beeylo
              </Typography>
              <Typography variant="body" color="secondary" className="home-subtitle text-center-mobile-left-desktop">
                No more spam, ads or useless updates
              </Typography>
              
              <div className="home-actions">
                <Button 
                  variant="brand"
                  size="lg"
                  onClick={() => onTabChange('learn-more')}
                  className="buttonv2 buttonv2-yellow"
                >
                  Discover
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onTabChange('benefits')}
                  className="buttonv2"
                >
                  Features
                </Button>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="home-image-section">
              <img 
                src={tripleScreenImg} 
                alt="Beeylo App Interface" 
                className="home-hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}