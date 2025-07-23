import React from 'react'
import type { FC, ReactNode, HTMLAttributes } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  children: ReactNode
  className?: string
}

const Container: FC<ContainerProps> = ({
  size = 'lg',
  padding = true,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'container'
  const sizeClasses = size !== 'full' ? `container-${size}` : ''
  const paddingClasses = padding ? 'px-4' : ''

  const classes = [
    baseClasses,
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

export { Container }
