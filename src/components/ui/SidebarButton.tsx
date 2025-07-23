import type { FC, ButtonHTMLAttributes } from 'react'

export interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the button is active
   */
  active?: boolean
  /**
   * Icon element to display before the button text
   */
  icon?: React.ReactNode
  /**
   * Additional CSS class names
   */
  className?: string
}

export const SidebarButton: FC<SidebarButtonProps> = ({
  active = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'sidebar-button'
  const activeClasses = active ? 'sidebar-button-active' : ''
  
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
      {icon && <span className="sidebar-button-icon">{icon}</span>}
      <span className="sidebar-button-text">{children}</span>
    </button>
  )
}
