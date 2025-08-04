import { useEffect, useState } from 'react'
import type { FC } from 'react'

interface AnimatedEmailListProps {
  autoStart?: boolean
  className?: string
}

interface Email {
  id: number
  sender: string
  subject: string
  priority: 'spam' | 'promotional' | 'social' | 'newsletter' | 'notification'
}

const diverseEmails: Email[] = [
  { id: 1, sender: 'Facebook', subject: '👥 Sarah posted 47 new photos from her vacation', priority: 'social' },
  { id: 2, sender: 'MegaDeals Store', subject: '🔥 FLASH SALE: 90% OFF Everything Must Go!', priority: 'promotional' },
  { id: 3, sender: 'LinkedIn', subject: 'You have 12 new connection requests waiting', priority: 'social' },
  { id: 4, sender: 'CryptoWin Casino', subject: 'You\'ve Won $50,000! Claim Now Before It Expires', priority: 'spam' },
  { id: 5, sender: 'TechCrunch Daily', subject: 'The latest in AI, startups, and venture capital', priority: 'newsletter' },
  { id: 6, sender: 'Instagram', subject: '📸 Your friend Jake shared a story', priority: 'social' },
  { id: 7, sender: 'FastLoan Express', subject: 'Pre-Approved for $25,000 Instant Cash Loan', priority: 'spam' },
  { id: 8, sender: 'Morning Brew', subject: '☕ Your daily dose of business news', priority: 'newsletter' },
  { id: 9, sender: 'Twitter', subject: '🐦 You have 23 new notifications', priority: 'social' },
  { id: 10, sender: 'ShopMania', subject: 'Limited Time: iPhone 15 for $99 - Only Today!', priority: 'promotional' },
  { id: 11, sender: 'Spotify', subject: '🎵 Your Discover Weekly is ready', priority: 'notification' },
  { id: 12, sender: 'WeightLoss Pro', subject: 'Lose 30 Pounds in 30 Days - Guaranteed Results', priority: 'spam' },
  { id: 13, sender: 'The Hustle', subject: 'Why everyone is talking about this new trend', priority: 'newsletter' },
  { id: 14, sender: 'YouTube', subject: '🎬 New video from your favorite creator', priority: 'social' },
  { id: 15, sender: 'TechDeals Hub', subject: 'MacBook Pro M3 - 95% Discount Ends Tonight', priority: 'promotional' },
  { id: 16, sender: 'Reddit', subject: '🔥 Trending posts in your favorite communities', priority: 'social' },
  { id: 17, sender: 'MoneyMaker Bot', subject: 'Make $500/Day Working From Home - No Experience', priority: 'spam' },
  { id: 18, sender: 'Substack Weekly', subject: '📚 Top stories from writers you follow', priority: 'newsletter' },
  { id: 19, sender: 'TikTok', subject: '💃 Your For You page has new videos', priority: 'social' },
  { id: 20, sender: 'Fashion Outlet', subject: 'Designer Bags $19.99 - Authentic Luxury Brands', priority: 'promotional' },
  { id: 21, sender: 'Netflix', subject: '🍿 New shows added to your watchlist', priority: 'notification' },
  { id: 22, sender: 'PillsRUs', subject: 'FDA Approved Weight Loss Pills - Free Trial', priority: 'spam' },
  { id: 23, sender: 'Product Hunt', subject: '🚀 Today\'s top products you might like', priority: 'newsletter' },
  { id: 24, sender: 'Discord', subject: '💬 You have unread messages in 5 servers', priority: 'social' },
  { id: 25, sender: 'GadgetWorld', subject: 'Samsung Galaxy S24 Ultra - $99 Final Hours', priority: 'promotional' },
  { id: 26, sender: 'Duolingo', subject: '🦉 Your streak is about to break!', priority: 'notification' },
  { id: 27, sender: 'InvestSmart', subject: 'Turn $100 into $10,000 in 30 Days - Secret Method', priority: 'spam' },
  { id: 28, sender: 'Hacker News Digest', subject: '💻 This week\'s top programming discussions', priority: 'newsletter' },
  { id: 29, sender: 'Snapchat', subject: '👻 Your friend sent you a snap', priority: 'social' },
  { id: 30, sender: 'BeautyBox', subject: 'Anti-Aging Cream That Makes You Look 20 Years Younger', priority: 'promotional' },
  { id: 31, sender: 'Goodreads', subject: '📖 Your friend finished reading a book', priority: 'social' },
  { id: 32, sender: 'LotteryWinner', subject: 'Congratulations! You\'ve Won the International Lottery', priority: 'spam' },
  { id: 33, sender: 'Medium Daily Digest', subject: '✍️ Stories picked just for you', priority: 'newsletter' },
  { id: 34, sender: 'WhatsApp', subject: '💬 You have 15 unread messages', priority: 'social' },
  { id: 35, sender: 'ElectronicsPlus', subject: 'PlayStation 5 + Xbox Series X Bundle - $199', priority: 'promotional' },
  { id: 36, sender: 'Strava', subject: '🏃‍♂️ Your weekly running summary', priority: 'notification' },
  { id: 37, sender: 'HealthMiracle', subject: 'This One Weird Trick Doctors Don\'t Want You to Know', priority: 'spam' },
  { id: 38, sender: 'Axios AM', subject: '📰 What you need to know today', priority: 'newsletter' },
  { id: 39, sender: 'Pinterest', subject: '📌 New pins in your home feed', priority: 'social' },
  { id: 40, sender: 'TravelDeals', subject: 'Free Vacation to Hawaii - You\'ve Been Selected!', priority: 'promotional' },
  { id: 41, sender: 'Fitbit', subject: '⌚ You\'re close to your daily step goal!', priority: 'notification' },
  { id: 42, sender: 'CashNow', subject: 'Get $5000 Cash Advance in Your Account Today', priority: 'spam' },
  { id: 43, sender: 'The Skimm', subject: '📱 Your daily news briefing', priority: 'newsletter' },
  { id: 44, sender: 'Twitch', subject: '🎮 Your favorite streamer is live', priority: 'social' },
  { id: 45, sender: 'FashionSale', subject: 'Gucci, Prada, Louis Vuitton - 99% Off Everything', priority: 'promotional' },
  { id: 46, sender: 'Apple News', subject: '📱 Stories trending in your area', priority: 'notification' },
  { id: 47, sender: 'MiracleSupplements', subject: 'Grow 6 Inches Taller in 90 Days - Proven Formula', priority: 'spam' },
  { id: 48, sender: 'Pocket Casts', subject: '🎧 New episodes from your subscriptions', priority: 'notification' },
  { id: 49, sender: 'Telegram', subject: '💬 You have new messages in 3 chats', priority: 'social' },
  { id: 50, sender: 'ElectroMart', subject: 'Tesla Model 3 - $9,999 Limited Time Offer', priority: 'promotional' }
]

export const AnimatedEmailList: FC<AnimatedEmailListProps> = ({ 
  autoStart = true, 
  className = '' 
}) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0)

  // Get 10 emails starting from currentStartIndex
  const getEmailsToShow = () => {
    const emails = []
    for (let i = 0; i < 10; i++) {
      const emailIndex = (currentStartIndex + i) % diverseEmails.length
      emails.push(diverseEmails[emailIndex])
    }
    return emails
  }

  useEffect(() => {
    if (autoStart) {
      // Move emails up every 500ms
      const interval = setInterval(() => {
        setCurrentStartIndex(prev => (prev + 1) % diverseEmails.length)
      }, 500)
      
      return () => clearInterval(interval)
    }
  }, [autoStart])

  return (
    <div className={`animated-email-list-container ${className}`}>
      <style>{`
        .animated-email-list-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease-out;
        }

        .email-list {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e5e7eb;
          padding: 8px;
          width: 100%;
          max-width: 600px;
          position: relative;
          height: 420px;
        }

        .email-container {
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        .email-list-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transition: transform 0.3s ease-out;
        }

        .email-item {
          padding: 8px 12px;
          margin-bottom: 2px;
          background: #f9fafb;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 40px;
          cursor: pointer;
          position: relative;
        }

        .email-item:last-child {
          margin-bottom: 0;
        }

        .email-item:hover {
          background: #f3f4f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .email-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border: 2px solid #d1d5db;
          border-radius: 2px;
          background: #ffffff;
          flex-shrink: 0;
        }

        .star {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: #d1d5db;
        }

        .email-content {
          flex: 1;
          font-size: 13px;
          color: #374151;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .email-sender {
          font-weight: 500;
          color: #111827;
          margin-right: 8px;
        }

        .email-subject {
          color: #6b7280;
          font-weight: 400;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .animated-email-list-container {
            max-width: 100%;
          }
          
          .email-list {
            padding: 6px;
            max-width: 100%;
          }
          
          .email-item {
            padding: 6px 8px;
            margin-bottom: 1px;
            min-height: 36px;
          }
          
          .email-content {
            font-size: 12px;
          }
          
          .checkbox, .star {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
      
      <div className="email-list">
        <div className="email-container">
          <div className="email-list-track">
            {getEmailsToShow().map((email, index) => (
              <div
                key={`${email.id}-${currentStartIndex}-${index}`}
                className="email-item"
              >
                <div className="email-controls">
                  <div className="checkbox"></div>
                  <svg className="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                  </svg>
                </div>
                <div className="email-content">
                  <span className="email-sender">{email.sender}</span>
                  <span className="email-subject">{email.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}