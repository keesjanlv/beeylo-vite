import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

// Extend the Window interface to include turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
      getResponse: (widgetId?: string) => string | undefined
    }
  }
}

interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  'timeout-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
  retry?: 'auto' | 'never'
  'retry-interval'?: number
  'refresh-expired'?: 'auto' | 'manual' | 'never'
  language?: string
  appearance?: 'always' | 'execute' | 'interaction-only'
  execution?: 'render' | 'execute'
}

interface TurnstileProps {
  siteKey: string
  onVerify?: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  onTimeout?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
  className?: string
  id?: string
}

export interface TurnstileRef {
  reset: () => void
  getResponse: () => string | undefined
}

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(({
  siteKey,
  onVerify,
  onError,
  onExpire,
  onTimeout,
  theme = 'light',
  size = 'normal',
  className = '',
  id = 'turnstile-widget'
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const isRenderedRef = useRef(false)

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
      }
    },
    getResponse: () => {
      if (window.turnstile && widgetIdRef.current) {
        return window.turnstile.getResponse(widgetIdRef.current)
      }
      return undefined
    }
  }))

  const renderTurnstile = () => {
    if (!window.turnstile || !containerRef.current || isRenderedRef.current) {
      return
    }

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          console.log('Turnstile verification successful')
          onVerify?.(token)
        },
        'error-callback': () => {
          console.error('Turnstile verification failed')
          onError?.()
        },
        'expired-callback': () => {
          console.log('Turnstile token expired')
          onExpire?.()
        },
        'timeout-callback': () => {
          console.error('Turnstile timeout - widget took too long')
          onTimeout?.()
        },
        theme,
        size,
        appearance: 'execute', // Invisible mode
        execution: 'execute', // Execute immediately
        retry: 'auto',
        'retry-interval': 8000,
        'refresh-expired': 'auto'
      })

      widgetIdRef.current = widgetId
      isRenderedRef.current = true
      
      // Set a fallback timeout in case Turnstile hangs
      setTimeout(() => {
        if (widgetIdRef.current && !onVerify) {
          console.warn('Turnstile taking too long, attempting reset')
          try {
            window.turnstile?.reset(widgetIdRef.current)
          } catch (resetError) {
            console.error('Failed to reset Turnstile:', resetError)
          }
        }
      }, 10000) // 10 second fallback timeout
      
    } catch (error) {
      console.error('Failed to render Turnstile:', error)
      onError?.()
    }
  }

  useEffect(() => {
    // Check if Turnstile is already loaded
    if (window.turnstile) {
      renderTurnstile()
      return
    }

    // Wait for Turnstile to load
    const checkTurnstile = () => {
      if (window.turnstile) {
        renderTurnstile()
      } else {
        setTimeout(checkTurnstile, 100)
      }
    }

    checkTurnstile()

    // Cleanup function
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (error) {
          console.error('Failed to remove Turnstile widget:', error)
        }
      }
      isRenderedRef.current = false
      widgetIdRef.current = null
    }
  }, [siteKey, theme, size])

  return (
    <div 
      ref={containerRef} 
      id={id}
      className={className}
      style={{ 
        minHeight: '65px', // Reserve space for the widget
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  )
})

Turnstile.displayName = 'Turnstile'
