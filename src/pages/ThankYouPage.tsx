import type { FC } from 'react'
import type { TabType } from '../types'

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
    <div className="thank-you-page">
      <div className="thank-you-container">
        <div className="thank-you-content">
          <div className="success-icon">🎉</div>
          <h1>You're in!</h1>
          <p className="thank-you-message">
            Help us grow even faster and bigger by sharing. To thank you for your part in this, 
            we have also created a special giveaway, something that has never been done before.
          </p>
          
          <div className="share-section">
            <h3>Your Share Link</h3>
            <div className="share-link-container">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="share-link-input"
              />
              <button 
                onClick={copyToClipboard}
                className="copy-button"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={() => onTabChange('giveaway')}
              className="giveaway-button primary-button"
            >
              Check Out Giveaway
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}