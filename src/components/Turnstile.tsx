import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react'

// Define the Turnstile window object
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
      execute?: (widgetId?: string) => void
    }
  }
}

// Define Turnstile options interface
interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  'error-callback'?: (error?: any) => void
  'expired-callback'?: () => void
  'timeout-callback'?: () => void
  theme?: 'light' | 'dark'
  size?: 'normal' | 'compact' | 'invisible'
  tabindex?: number
  action?: string
  cData?: string
  execution?: string
  retry?: string
  'retry-interval'?: number
  'refresh-expired'?: string
}

// Define Turnstile component props
export interface TurnstileProps {
  siteKey: string
  onVerify?: (token: string) => void
  onError?: (error?: any) => void
  onExpire?: () => void
  onTimeout?: () => void
  theme?: 'light' | 'dark'
  className?: string
  id?: string
}

// Define Turnstile ref methods
export interface TurnstileRef {
  reset: () => void
  getToken: () => string | undefined
  execute: () => void
}

// Turnstile component using explicit rendering approach
const Turnstile = forwardRef<TurnstileRef, TurnstileProps>((
  {
    siteKey,
    onVerify,
    onError,
    onExpire,
    onTimeout,
    theme = 'light',
    className = '',
    id = 'turnstile-invisible'
  },
  ref
) => {
  const [widgetId, setWidgetId] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [initializeOnLoad, setInitializeOnLoad] = useState(false)
  
  // Initialize Turnstile widget
  const initializeTurnstile = useCallback(() => {
    if (!window.turnstile) {
      return
    }
    
    // Check if DOM element exists
    const element = document.getElementById(id)
    if (!element) {
      setTimeout(() => initializeTurnstile(), 50) // Retry after 50ms
      return
    }
    
    try {
      // Enhanced Turnstile configuration with minimal logging
      const widgetConfig: TurnstileOptions = {
        sitekey: siteKey,
        theme: theme,
        size: 'invisible',
        retry: 'auto',
        'retry-interval': 2000,
        'refresh-expired': 'auto',
        callback: (token: string) => {
          // Silent success to reduce console noise
          onVerify?.(token)
        },
        'error-callback': (error?: any) => {
          console.error('❌ Turnstile error:', error)
          onError?.(error)
        },
        'expired-callback': () => {
          onExpire?.()
        },
        'timeout-callback': () => {
          console.error('⏱️ Turnstile timed out')
          onTimeout?.()
        }
      }
      
      const newWidgetId = window.turnstile.render(element, widgetConfig)
      setWidgetId(newWidgetId)
      
    } catch (error) {
      console.error('Failed to initialize Turnstile:', error)
      onError?.(error)
    }
  }, [siteKey, theme, id, onVerify, onError, onExpire, onTimeout])
  
  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.turnstile && widgetId) {
        try {
          window.turnstile.reset(widgetId)
        } catch (error) {
          console.error('Failed to reset Turnstile:', error)
        }
      } else {
        // Try to re-initialize
        initializeTurnstile()
      }
    },
    getToken: () => {
      if (window.turnstile && widgetId) {
        return window.turnstile.getResponse(widgetId)
      }
      return undefined
    },
    execute: () => {
      if (!isLoaded) {
        // If not loaded yet, initialize when ready
        setInitializeOnLoad(true)
        return
      }
      
      if (window.turnstile && widgetId) {
        // Reset and execute existing widget
        window.turnstile.reset(widgetId)
      } else {
        // Initialize new widget
        initializeTurnstile()
      }
    }
  }), [isLoaded, widgetId, initializeTurnstile])

  // Load Turnstile script
  useEffect(() => {
    // Check if script is already loaded
    if (window.turnstile) {
      setIsLoaded(true)
      return
    }
    
    // Check if script element already exists
    const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')
    if (existingScript) {
      // Script exists but window.turnstile might not be ready yet
      const checkTurnstile = () => {
        if (window.turnstile) {
          setIsLoaded(true)
        } else {
          setTimeout(checkTurnstile, 100)
        }
      }
      checkTurnstile()
      return
    }
    
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setIsLoaded(true)
    }
    
    script.onerror = (error) => {
      console.error('Failed to load Turnstile script:', error)
      onError?.('Script loading failed')
    }
    
    document.head.appendChild(script)
    
    // Cleanup function
    return () => {
      // Don't remove the script as it might be used by other components
      // script.remove()
    }
  }, [])
  
  // Initialize widget when script is loaded and execute was called
  useEffect(() => {
    if (isLoaded && window.turnstile && initializeOnLoad) {
      initializeTurnstile()
      setInitializeOnLoad(false)
    }
  }, [isLoaded, siteKey, initializeOnLoad, initializeTurnstile])

  return (
    <div 
      id={id} 
      className={className}
      style={{ 
        width: '0px', 
        height: '0px', 
        overflow: 'hidden',
        position: 'absolute',
        left: '-9999px'
      }}
    />
  )
})

Turnstile.displayName = 'Turnstile'

export default Turnstile
