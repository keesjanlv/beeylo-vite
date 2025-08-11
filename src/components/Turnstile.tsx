import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

// Define the Turnstile window object
declare global {
  interface Window {
    turnstile?: {
      render: (container: string, options: TurnstileOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
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
  onError?: () => void
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
  
  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      console.log('Resetting Turnstile widget')
      if (window.turnstile && widgetId) {
        try {
          window.turnstile.reset(widgetId)
          console.log('Turnstile widget reset successfully')
        } catch (error) {
          console.error('Failed to reset Turnstile:', error)
        }
      } else {
        console.warn('Cannot reset Turnstile: widget not initialized')
        // Try to re-initialize
        initializeTurnstile()
      }
    },
    getToken: () => {
      if (window.turnstile && widgetId) {
        return window.turnstile.getResponse(widgetId)
      }
      return undefined
    }
  }))

  const initializeTurnstile = () => {
    console.log('Initializing Turnstile...')
    
    if (!window.turnstile) {
      console.warn('Turnstile not available yet')
      return
    }
    
    try {
      // Using explicit rendering with element ID
      // Enhanced Turnstile configuration with better error handling
      const widgetConfig: TurnstileOptions = {
        sitekey: siteKey,
        theme: theme,
        // Use invisible mode for automatic token generation
        size: 'invisible',
        // Add execution mode to fix configuration issues
        execution: 'execute',
        retry: 'auto',
        'retry-interval': 8000,
        'refresh-expired': 'auto',
        callback: (token: string) => {
          console.log('✅ Turnstile token received:', token.substring(0, 20) + '...')
          onVerify?.(token)
        },
        'error-callback': (error?: any) => {
          console.error('❌ Turnstile error:', error)
          console.error('Error details:', { error, sitekey: siteKey, hostname: window.location.hostname })
          onError?.()
        },
        'expired-callback': () => {
          console.log('⚠️ Turnstile token expired')
          onExpire?.()
        },
        'timeout-callback': () => {
          console.error('⏱️ Turnstile timed out')
          onTimeout?.()
        }
      }
      
      console.log('Turnstile config:', widgetConfig)
      const newWidgetId = window.turnstile.render(`#${id}`, widgetConfig)
      
      console.log('Turnstile widget initialized with ID:', newWidgetId)
      setWidgetId(newWidgetId)
    } catch (error) {
      console.error('Failed to initialize Turnstile:', error)
      onError?.()
    }
  }
  
  // Load Turnstile script
  useEffect(() => {
    console.log('Loading Turnstile script...')
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="turnstile/v0/api.js"]')
    if (existingScript) {
      console.log('Turnstile script already exists in the DOM')
      setIsLoaded(true)
      return
    }
    
    // Create and load script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      console.log('Turnstile script loaded successfully')
      setIsLoaded(true)
    }
    
    script.onerror = (error) => {
      console.error('Failed to load Turnstile script:', error)
    }
    
    document.body.appendChild(script)
    
    // Cleanup
    return () => {
      if (widgetId && window.turnstile) {
        console.log('Cleaning up Turnstile widget')
        try {
          window.turnstile.remove(widgetId)
        } catch (error) {
          console.error('Error removing Turnstile widget:', error)
        }
      }
    }
  }, [])
  
  // Initialize widget when script is loaded
  useEffect(() => {
    if (isLoaded && window.turnstile) {
      console.log('Turnstile script loaded, initializing widget...')
      initializeTurnstile()
    }
  }, [isLoaded, siteKey])

  return (
    <div 
      id={id} 
      className={className} 
      data-testid="turnstile-container" 
      style={{ 
        minHeight: '1px',
        opacity: 0,
        position: 'absolute',
        left: '-9999px'
      }}
    />
  )
})

Turnstile.displayName = 'Turnstile'

export default Turnstile
