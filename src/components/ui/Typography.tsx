import type { FC, HTMLAttributes, ReactNode, ElementType } from 'react'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption'
  color?: 'primary' | 'secondary' | 'muted' | 'brand' | 'success' | 'warning' | 'error'
  align?: 'left' | 'center' | 'right' | 'justify'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  as?: ElementType
  children?: ReactNode
  className?: string
}

const Typography: FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  as,
  children,
  className = '',
  ...props
}) => {
  // Determine the HTML element to render
  const getDefaultElement = (): ElementType => {
    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return variant
      case 'body':
        return 'p'
      case 'small':
        return 'small'
      case 'caption':
        return 'span'
      default:
        return 'p'
    }
  }

  // Build CSS classes
  const baseClasses = 'typography'
  const variantClasses = `text-${variant}`
  const colorClasses = `text-${color}`
  const alignClasses = `text-${align}`
  const weightClasses = weight ? `font-${weight}` : ''

  const classes = [
    baseClasses,
    variantClasses,
    colorClasses,
    alignClasses,
    weightClasses,
    className
  ].filter(Boolean).join(' ')

  const Component = as || getDefaultElement()

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export { Typography }
