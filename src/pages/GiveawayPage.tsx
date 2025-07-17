import type { FC } from 'react';
import { useState } from 'react';

import { useUser } from '../contexts/UserContext';
import giveawayWhyImg from '../assets/giveaway-why.svg';
import '../styles/pages/giveaway.css';



type RewardsSlide = 'what-you-earn' | 'example';
type HowItWorksSlide = 'why' | 'steps';

const RewardsModalContent: FC = () => {
    const [rewardsSlide, setRewardsSlide] = useState<RewardsSlide>('what-you-earn');

    return (
        <div className="giveaway-content">
            <div className="rewards-navigation">
                <button 
                    className={`rewards-nav-btn ${rewardsSlide === 'what-you-earn' ? 'active' : ''}`}
                    onClick={() => setRewardsSlide('what-you-earn')}
                >
                    What you can earn
                </button>
                <button 
                    className={`rewards-nav-btn ${rewardsSlide === 'example' ? 'active' : ''}`}
                    onClick={() => setRewardsSlide('example')}
                >
                    Example
                </button>
            </div>
            
            {rewardsSlide === 'what-you-earn' ? (
              <>
                <h3>What you can earn</h3>
                <p className="slide-intro">We're giving away 2% of everything we raise and earn in the first 6 months to the top 10 people who help us grow.</p>
                
                <div className="reward-table">
                  <div className="table-header">
                    <div className="table-cell">Rank</div>
                    <div className="table-cell">Reward</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">1st place</div>
                    <div className="table-cell">0.5%</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">2nd place</div>
                    <div className="table-cell">0.3%</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">3rd place</div>
                    <div className="table-cell">0.2%</div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">4th-10th place</div>
                    <div className="table-cell">0.1% each</div>
                  </div>
                </div>
                
                <div className="bonus-section">
                  <h4>Not in the top 10?</h4>
                  <p>We're randomly selecting 3 people from the top 100 referrers to each win 0.1%.</p>
                </div>
              </>
            ) : (
              <>
                <h3>Example</h3>
                <div className="example-scenario">
                  <p className="scenario-title">Beeylo raises €10 million and earns €500.000 in early profit.</p>
                  <p className="total-pool">Total reward pool (2%) = €210.000</p>
                </div>
                
                <div className="example-rewards">
                  <div className="reward-item">
                    <span className="emoji">🥇</span>
                    <span className="text">1st place earns €52.500</span>
                  </div>
                  <div className="reward-item">
                    <span className="emoji">🥈</span>
                    <span className="text">2nd place earns €31.500</span>
                  </div>
                  <div className="reward-item">
                    <span className="emoji">🥉</span>
                    <span className="text">3rd place earns €21.000</span>
                  </div>
                  <div className="reward-item">
                    <span className="emoji">💡</span>
                    <span className="text">Places 4–10 each earn €10.500</span>
                  </div>
                </div>
              </>
            )}
        </div>
    );
};

const HowItWorksModalContent: FC = () => {
    const [howItWorksSlide, setHowItWorksSlide] = useState<HowItWorksSlide>('why');

    return (
        <div className="giveaway-content">
            <div className="rewards-navigation">
                <button 
                    className={`rewards-nav-btn ${howItWorksSlide === 'why' ? 'active' : ''}`}
                    onClick={() => setHowItWorksSlide('why')}
                >
                    Why
                </button>
                <button 
                    className={`rewards-nav-btn ${howItWorksSlide === 'steps' ? 'active' : ''}`}
                    onClick={() => setHowItWorksSlide('steps')}
                >
                    Steps
                </button>
            </div>

            {howItWorksSlide === 'why' ? (
                <div className="why-content">
                    <img src={giveawayWhyImg} alt="Why Beeylo" className="why-image" />
                    <div>
                        <h3>Why we're doing this</h3>
                        <p>We're not just building another inbox. We're starting a movement to take back control from companies that flood our digital lives with noise. We believe in a focused, productive, and respectful communication experience. And we're rewarding the. community that helps us build it.</p>
                    </div>
                </div>
            ) : (
                <div className="steps-content">
                    <h3>How to participate</h3>
                    <div className="steps-grid">
                        <div className="step-item">
                            <div className="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                            </div>
                            <div className="step-content">
                                <h4>Create an account</h4>
                                <p>It's free and takes less than a minute</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>
                            </div>
                            <div className="step-content">
                                <h4>Share your link</h4>
                                <p>Share your unique link with friends</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-0.74L12 2z"/></svg>
                            </div>
                            <div className="step-content">
                                <h4>Get rewarded</h4>
                                <p>Earn exclusive rewards and benefits</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const GiveawayPage: FC = () => {
  const { userData } = useUser();
  const [modalContent, setModalContent] = useState<null | 'rewards' | 'how-it-works'>(null);

  const handleCopyReferralLink = () => {
    if (userData?.referral_url) {
      navigator.clipboard.writeText(userData.referral_url);
      // You could add a toast notification here
    }
  };

  const renderModal = () => {
    if (!modalContent) return null;

    const content = modalContent === 'rewards' ? <RewardsModalContent /> : <HowItWorksModalContent />;

    return (
      <div className="giveaway-modal-overlay" onClick={() => setModalContent(null)}>
        <div className="giveaway-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal-btn" onClick={() => setModalContent(null)}>X</button>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="page-content giveaway-page-new">
      {renderModal()}
      <div className="giveaway-main-content">
        <div className="giveaway-actions">
          <button className="main-action-btn" onClick={() => setModalContent('rewards')}>
            What can I win?
          </button>
          <button className="main-action-btn" onClick={() => setModalContent('how-it-works')}>
            How does it work?
          </button>
        </div>

        <div className="giveaway-card">
          {userData ? (
            <div className="user-stats-section">
              <div className="stat-card">
                <div className="stat-value">#{userData.position}</div>
                <div className="stat-label">Your Position</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{userData.referral_count}</div>
                <div className="stat-label">Referrals</div>
              </div>
            </div>
          ) : (
              <div className="login-prompt-card">
                  <p>Log in to see your position and referrals.</p>
              </div>
          )}
        </div>

        <div className="giveaway-card share-section">
          <h4>Share your link</h4>
          <div className="referral-link-container">
            <input 
              type="text" 
              value={userData?.referral_url || ''} 
              readOnly 
              placeholder="Log in to get your link"
              className="referral-link-input"
            />
            <button className="copy-link-button" onClick={handleCopyReferralLink} disabled={!userData}>
              Copy
            </button>
          </div>
        </div>

        <div className="giveaway-card">
          <div className="social-actions-grid">
              <a href="https://www.instagram.com/beeylo" target="_blank" rel="noopener noreferrer" className="social-task-button">
                <div className="icon">IG</div>
                <span>Follow on Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@beeylo" target="_blank" rel="noopener noreferrer" className="social-task-button">
                <div className="icon">TT</div>
                <span>Follow on TikTok</span>
              </a>
              <a href="https://twitter.com/beeylo" target="_blank" rel="noopener noreferrer" className="social-task-button">
                <div className="icon">X</div>
                <span>Follow on X</span>
              </a>
              <a href="https://www.linkedin.com/company/beeylo" target="_blank" rel="noopener noreferrer" className="social-task-button">
                <div className="icon">LI</div>
                <span>Follow on LinkedIn</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};
