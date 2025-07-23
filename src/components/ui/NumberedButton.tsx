import type { FC, ButtonHTMLAttributes } from 'react'

export interface NumberedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The number to display in the button
   */
  number: number
  /**
   * Whether the button is active
   */
  active?: boolean
  /**
   * Additional CSS class names
   */
  className?: string
}

export const NumberedButton: FC<NumberedButtonProps> = ({
  number,
  active = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'numbered-button'
  const activeClasses = active ? 'numbered-button-active' : ''
  
  const classes = [
    baseClasses,
    activeClasses,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button 
      type="button"
      className={classes}
      {...props}
    >
      {number}
    </button>
  )
}
