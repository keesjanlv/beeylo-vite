import type { FC } from 'react'

export const LearnMorePage: FC = () => {
  return (
    <div className="learn-more-page">
      <div className="learn-more-container">
        <div className="learn-more-header">
          <h1>Learn More About Beeylo</h1>
          <p>Discover how Beeylo will revolutionize your email experience</p>
        </div>
        
        <div className="video-section">
          <div className="video-placeholder">
            <div className="video-icon">▶️</div>
            <p>Video Coming Soon</p>
            <span>Watch our demo to see Beeylo in action</span>
          </div>
        </div>
        
        <div className="learn-more-content">
          <div className="feature-highlight">
            <h2>Why Beeylo?</h2>
            <p>Traditional email is broken. Beeylo fixes it with intelligent filtering, beautiful design, and privacy-first approach.</p>
          </div>
          
          <div className="benefits-preview">
            <h3>What makes us different:</h3>
            <ul>
              <li>✨ AI-powered spam filtering</li>
              <li>🎨 Beautiful, distraction-free interface</li>
              <li>🔒 End-to-end encryption</li>
              <li>⚡ Lightning-fast performance</li>
              <li>📱 Perfect mobile experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}