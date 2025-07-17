import type { FC } from 'react';
import { Spotlight, GlowButton } from '../components/Spotlight';
import type { TabType } from '../types';
import '../styles/pages/logged-in-home.css';
import homeDefImg from '../assets/homedef.webp';

interface LoggedInHomePageProps {
  onTabChange: (tab: TabType) => void;
}

export const LoggedInHomePage: FC<LoggedInHomePageProps> = ({ onTabChange }) => {
  return (
    <Spotlight className="page-content logged-in-home">
      <div className="logged-in-home-container">
        <div className="logged-in-home-content">
          <h1 className="logged-in-home-title">Welcome to Beeylo</h1>
          <p className="logged-in-home-description">
            Your new inbox experience starts here. Discover how Beeylo transforms your email management
            with smart organization and powerful features.
          </p>
          
          <div className="logged-in-home-buttons">
            <GlowButton 
              onClick={() => onTabChange('features-overview')} 
              variant="primary"
              className="logged-in-home-button"
            >
              Tell me more
            </GlowButton>

          </div>
        </div>
        
        <div className="logged-in-home-image">
          <img src={homeDefImg} alt="Beeylo Interface" />
        </div>
      </div>
    </Spotlight>
  );
};