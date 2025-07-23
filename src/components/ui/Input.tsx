import type { FC, InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  error?: string | boolean
  label?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

const Input: FC<InputProps> = ({
  size = 'md',
  error,
  label,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'input'
  const sizeClasses = `input-${size}`
  const errorClasses = error ? 'input-error' : ''
  const iconClasses = leftIcon ? 'input-with-left-icon' : rightIcon ? 'input-with-right-icon' : ''

  const inputClasses = [
    baseClasses,
    sizeClasses,
    errorClasses,
    iconClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      
      <div className="input-wrapper">
        {leftIcon && (
          <div className="input-icon input-icon-left">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="input-icon input-icon-right">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="input-feedback">
          {error && typeof error === 'string' && (
            <span className="input-error-message">
              {error}
            </span>
          )}
          {helperText && !error && (
            <span className="input-helper-text">
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { Input }
