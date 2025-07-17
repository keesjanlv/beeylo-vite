import type { FC, ReactNode } from 'react'
import { AnimatedCard } from './Spotlight'

interface CardProps {
  className?: string
  size?: "1x1" | "1x2" | "2x1" | "2x2"
  children: ReactNode
  title?: string
  subtitle?: string
  interactive?: boolean
  onClick?: () => void
}

export const Card: FC<CardProps> = ({ 
  className = "", 
  size = "1x1", 
  children, 
  title, 
  subtitle,
  interactive = false,
  onClick
}) => (
  <AnimatedCard 
    className={`card-${size} ${className}`}
    interactive={interactive}
    onClick={onClick}
  >
    {title && (
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    )}
    <div className="card-content">
      {children}
    </div>
  </AnimatedCard>
)