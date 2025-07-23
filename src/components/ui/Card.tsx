
import type { FC, ReactNode, HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const Card: FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'card'
  const variantClasses = `card-${variant}`
  const sizeClasses = `card-${size}`
  const paddingClasses = `card-padding-${padding}`

  const classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    paddingClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

const CardHeader: FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardContent: FC<CardContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter: FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardContent, CardFooter }
