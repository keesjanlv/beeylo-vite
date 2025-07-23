import type { FC, ReactNode } from 'react'

interface PageBadgeProps {
  children: ReactNode
  className?: string
}

export const PageBadge: FC<PageBadgeProps> = ({ children, className = '' }) => {
  return (
    <div className={`page-badge ${className}`}>
      {children}
    </div>
  )
}