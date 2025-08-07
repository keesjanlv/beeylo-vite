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
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        'timeout-callback': onTimeout,
        theme,
        size,
        appearance: 'execute', // This makes it invisible
        execution: 'render'
      })

      widgetIdRef.current = widgetId
      isRenderedRef.current = true
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
