import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'

interface AnimatedInboxProps {
  autoStart?: boolean
  className?: string
}

export const AnimatedInbox: FC<AnimatedInboxProps> = ({ 
  autoStart = true, 
  className = '' 
}) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  const startAnimation = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCount(0)
    
    // Increasing delays: 500-700-900-1100-1300 ms
    const delays = [500, 700, 900, 1100, 1300]
    
    // Remove any existing animation from bubble during counting
    if (bubbleRef.current) {
      bubbleRef.current.style.animation = 'none'
    }
    
    let currentCount = 0
    
    const scheduleNextCount = () => {
      if (currentCount < 5) {
        setTimeout(() => {
          currentCount++
          setCount(currentCount)
          
          // Add a subtle scale effect for each number change
          if (counterRef.current) {
            counterRef.current.style.transform = 'scale(1.2)'
            setTimeout(() => {
              if (counterRef.current) {
                counterRef.current.style.transform = 'scale(1)'
              }
            }, 50)
          }
          
          if (currentCount >= 5) {
            setIsAnimating(false)
            
            // Keep bubble animation off
            if (bubbleRef.current) {
              bubbleRef.current.style.animation = 'none'
            }
          } else {
            scheduleNextCount()
          }
        }, delays[currentCount - 1] || 500)
      }
    }
    
    scheduleNextCount()
  }

  useEffect(() => {
    if (autoStart) {
      // Start animation after a short delay
      const timer = setTimeout(() => {
        startAnimation()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [autoStart])

  return (
    <div className={`animated-inbox-container ${className}`}>
      <style>{`
        .animated-inbox-container {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.6s ease-out;
        }

        .inbox-icon {
          width: 120px;
          height: 120px;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3));
          transition: transform 0.2s ease;
        }

        .inbox-icon:hover {
          transform: scale(1.05);
        }

        .envelope {
          fill: #ffffff;
          stroke: #e2e8f0;
          stroke-width: 1;
        }

        .envelope-flap {
          fill: #f8fafc;
        }

        .notification-bubble {
          position: absolute;
          top: 8px;
          right: -2px;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #FCB425, #f59e0b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(252, 180, 37, 0.4);
        }

        .notification-count {
          color: white;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          transition: transform 0.1s ease;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(252, 180, 37, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(252, 180, 37, 0.6);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(252, 180, 37, 0.4);
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
      `}</style>
      
      <div className="inbox-container">
        <svg className="inbox-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          
          {/* Envelope body */}
          <rect x="20" y="35" width="80" height="50" rx="6" ry="6" className="envelope"/>
          
          {/* Envelope flap back */}
          <path d="M20 35 L60 65 L100 35 Z" className="envelope-flap"/>
          
          {/* Envelope flap front */}
          <path d="M20 35 L60 55 L100 35 L100 39 L60 59 L20 39 Z" fill="#fcd34d"/>
        </svg>
        
        <div className="notification-bubble" ref={bubbleRef}>
          <span className="notification-count" ref={counterRef}>{count}</span>
        </div>
      </div>
    </div>
  )
}