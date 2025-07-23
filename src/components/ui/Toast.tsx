import { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

export interface ToastProps {
  /**
   * The variant of the toast
   */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /**
   * The title of the toast
   */
  title?: string
  /**
   * The description content of the toast
   */
  children: ReactNode
  /**
   * Whether the toast is open
   */
  open: boolean
  /**
   * Function to call when the toast is closed
   */
  onClose: () => void
  /**
   * Duration in milliseconds before the toast auto-closes
   * Set to 0 to disable auto-closing
   */
  duration?: number
  /**
   * Additional CSS class names
   */
  className?: string
}

export const Toast: FC<ToastProps> = ({
  variant = 'default',
  title,
  children,
  open,
  onClose,
  duration = 5000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(open)

  // Handle open state changes
  useEffect(() => {
    setIsVisible(open)
  }, [open])

  // Auto-close timer
  useEffect(() => {
    if (!isVisible || duration === 0) return
    
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)
    
    return () => clearTimeout(timer)
  }, [isVisible, duration, onClose])

  // Handle close animation
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  if (!open && !isVisible) return null

  const baseClasses = 'toast'
  const variantClasses = `toast-${variant}`
  const visibilityClasses = isVisible ? 'toast-visible' : 'toast-hidden'

  const classes = [
    baseClasses,
    variantClasses,
    visibilityClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} role="alert" aria-live="assertive">
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-description">{children}</div>
      </div>
      <button 
        className="toast-close" 
        onClick={handleClose}
        aria-label="Close toast"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  )
}

// Toast Provider and Context for managing multiple toasts
export interface ToastProviderProps {
  children: ReactNode
}

export interface ToastContextProps {
  showToast: (props: Omit<ToastProps, 'open' | 'onClose'>) => string
  hideToast: (id: string) => void
}
