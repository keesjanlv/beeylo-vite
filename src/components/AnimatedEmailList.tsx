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
  priority: 'high' | 'urgent'
}

const importantEmails: Email[] = [
  {
    id: 1,
    sender: 'Dr. Sarah Chen',
    subject: 'Appointment Confirmation - Tomorrow 2:30 PM',
    priority: 'urgent'
  },
  {
    id: 2,
    sender: 'WorkSpace Team',
    subject: 'Meeting Link - Project Review in 30 mins',
    priority: 'urgent'
  },
  {
    id: 3,
    sender: 'City Bank',
    subject: 'Security Alert: Login from new device',
    priority: 'high'
  },
  {
    id: 4,
    sender: 'Flight Central',
    subject: 'Gate Change: Flight AC123 now at Gate B7',
    priority: 'urgent'
  },
  {
    id: 5,
    sender: 'Emma Rodriguez',
    subject: 'Urgent: Contract deadline moved to Friday',
    priority: 'high'
  }
]

export const AnimatedEmailList: FC<AnimatedEmailListProps> = ({ 
  autoStart = true, 
  className = '' 
}) => {
  const [visibleEmails, setVisibleEmails] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setVisibleEmails([])
    
    // Show emails one by one with a faster delay
    importantEmails.forEach((email, index) => {
      setTimeout(() => {
        setVisibleEmails(prev => [...prev, email.id])
        
        // Animation is complete when all emails are shown
        if (index === importantEmails.length - 1) {
          setTimeout(() => {
            setIsAnimating(false)
          }, 500)
        }
      }, index * 400) // 400ms delay between each email
    })
  }

  useEffect(() => {
    if (autoStart) {
      // Start animation immediately
      startAnimation()
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
        }

        .email-item {
          padding: 8px 12px;
          margin-bottom: 2px;
          background: #f9fafb;
          border-radius: 4px;
          transition: all 0.2s ease;
          animation: slideInFromRight 0.5s ease-out;
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 40px;
          cursor: pointer;
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

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
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
        {importantEmails.map((email) => (
          <div
            key={email.id}
            className="email-item"
            style={{
              display: visibleEmails.includes(email.id) ? 'flex' : 'none'
            }}
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
  )
}