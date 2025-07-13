import type { FC } from 'react'

export const Logo: FC = () => (
  <div className="logo">
    <span className="logo-text">Beeylo</span>
  </div>
)

export const SingleHexagon: FC<{ className?: string, children?: React.ReactNode }> = ({ 
  className = "", 
  children = null 
}) => (
  <div className={`hexagon ${className}`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 21,7 21,17 13,22 5,17 5,7"/>
    </svg>
    {children && <span className="hexagon-content">{children}</span>}
  </div>
) 