import React from 'react'
import type { FC, ReactNode, HTMLAttributes } from 'react'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  children: ReactNode
  className?: string
}

const Stack: FC<StackProps> = ({
  direction = 'column',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'stack'
  const directionClasses = direction === 'row' ? 'flex-row' : 'flex-col'
  const spacingClasses = `gap-${spacing}`
  const alignClasses = `items-${align}`
  const justifyClasses = `justify-${justify}`
  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap'

  const classes = [
    baseClasses,
    'flex',
    directionClasses,
    spacingClasses,
    alignClasses,
    justifyClasses,
    wrapClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export { Stack }
