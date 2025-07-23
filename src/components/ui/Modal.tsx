import { useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Function to call when the modal is closed
   */
  onClose: () => void
  /**
   * The title of the modal
   */
  title?: string
  /**
   * The content of the modal
   */
  children: ReactNode
  /**
   * The footer content of the modal
   */
  footer?: ReactNode
  /**
   * The size of the modal
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnClickOutside?: boolean
  /**
   * Whether to close the modal when pressing Escape
   */
  closeOnEscape?: boolean
  /**
   * Additional CSS class names
   */
  className?: string
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnClickOutside = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Handle Escape key press
  useEffect(() => {
    if (!closeOnEscape) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeOnEscape, onClose, open])
  
  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside) return
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && open) {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeOnClickOutside, onClose, open])
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  
  if (!open) return null
  
  const baseClasses = 'modal-overlay'
  const sizeClasses = `modal-${size}`
  
  const overlayClasses = [
    baseClasses,
    className
  ].filter(Boolean).join(' ')
  
  const modalClasses = [
    'modal',
    sizeClasses
  ].filter(Boolean).join(' ')
  
  return (
    <div className={overlayClasses} role="dialog" aria-modal="true">
      <div className={modalClasses} ref={modalRef}>
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button 
              className="modal-close" 
              onClick={onClose}
              aria-label="Close modal"
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
        )}
        <div className="modal-content">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
