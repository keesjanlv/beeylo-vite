import type { FC } from 'react'
import { useState } from 'react'
import { Logo } from '../components/Logo'

// Enhanced Glass Button Component with custom styling
const GlassButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  const [isActive, setIsActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyle: React.CSSProperties = {
    // reset
    border: 'none',
    
    // gradient "border" - grijs aan zijkanten, wit onder
    padding: '2px', // border thickness
    borderRadius: '14px',
    background: `
      linear-gradient(to right, 
        rgba(180, 180, 180, 0.7) 0%,
        rgba(255, 255, 255, 0) 20%,
        rgba(255, 255, 255, 0) 80%,
        rgba(180, 180, 180, 0.7) 100%
      ),
      linear-gradient(to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0.9) 100%
      )
    `,
    
    // meer shadow aan de buitenkant voor diepte
    boxShadow: `
      0 10px 25px -5px rgba(0, 0, 0, 0.15),
      0 4px 10px -4px rgba(0, 0, 0, 0.1),
      inset 0 -1px 1px rgba(255, 255, 255, 0.3)
    `,
    
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    transform: isActive ? 'scale(.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
  }

  const surfaceStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 32px',
    borderRadius: '12px', // 14px – 2px padding
    
    // witte achtergrond met heel lichte grijs gradient
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(248, 248, 248, 1) 50%,
        rgba(245, 245, 245, 1) 100%
      )
    `,

    color: '#1a1a1a', // zwarte tekst
    fontSize: '1rem',
    fontWeight: '500',
    textShadow: 'none',
    transition: 'all 0.2s ease',
  }

  return (
    <button 
      style={buttonStyle}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsActive(false)
        setIsHovered(false)
      }}
      {...rest}
    >
      <span style={surfaceStyle}>{children}</span>
    </button>
  )
}

export const ComponentDemoPage: FC = () => {
  return (
    <div className="page-container" style={{ background: '#ffffff' }}>
      <div className="page-content content-scrollable">
        <div className="layout-scroll">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              {/* Header */}
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '1rem' }}>
                Enhanced Glass Button Demo
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#4a4a4a', marginBottom: '2rem' }}>
                Verfijnde glasknop met aangepaste border gradient en subtiele styling
              </p>
            </div>

            {/* Enhanced Glass Button Demo */}
            <div style={{ 
              marginBottom: '4rem', 
              padding: '3rem', 
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h2 style={{ color: '#1a1a1a', fontSize: '1.8rem', marginBottom: '1rem', textAlign: 'center' }}>
                Enhanced Glass Button
              </h2>
              <p style={{ color: '#666', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '600px', lineHeight: '1.6' }}>
                Witte achtergrond met zwarte tekst, licht grijze gradient, en aangepaste border met donkerder grijs aan de zijkanten
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlassButton onClick={() => alert('Enhanced Glass Button clicked!')}>
                  <Logo />
                </GlassButton>
                <GlassButton onClick={() => console.log('Console log from enhanced glass button')}>
                  Console Log
                </GlassButton>
                <GlassButton>
                  Hover Effect
                </GlassButton>
                <GlassButton disabled>
                  Disabled
                </GlassButton>
              </div>
            </div>

            {/* Technical Details Section */}
            <div style={{ 
              padding: '2.5rem', 
              background: '#fafafa',
              borderRadius: '20px',
              marginBottom: '2rem',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                Technische Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#333' }}>
                    Border Gradient Techniek
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>• Gebruikt padding techniek voor gradient border</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Horizontale gradient: wit → donker grijs → licht grijs → wit</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Verticale gradient: wit boven en onder</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Links iets donkerder dan rechts voor asymmetrie</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#333' }}>
                    Styling Features
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>• Witte achtergrond met subtiele grijze gradient</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Zwarte tekst voor optimale leesbaarheid</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Hover en active state animaties</li>
                    <li style={{ marginBottom: '0.5rem' }}>• Subtiele shadow voor diepte-effect</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            <div style={{ 
              padding: '2.5rem', 
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
            }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                Gebruiksinstructies
              </h2>
              <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Deze verbeterde glasknop component is geïmplementeerd met inline CSS en kan eenvoudig 
                gekopieerd worden naar je project. De component gebruikt React hooks voor state management 
                en biedt een moderne, verfijnde benadering van glassmorphism design.
              </p>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                border: '1px solid rgba(0,0,0,0.06)',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: '#333' }}>
                  Key Features:
                </h3>
                <ul style={{ color: '#666', lineHeight: '1.6', margin: 0, paddingLeft: '1.2rem' }}>
                  <li>Aangepaste border gradient met asymmetrische grijstinten</li>
                  <li>Witte achtergrond met subtiele gradient voor diepte</li>
                  <li>Zwarte tekst voor optimale contrast en leesbaarheid</li>
                  <li>Smooth hover en active state animaties</li>
                </ul>
              </div>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                <strong>Toegang tot deze pagina:</strong> Navigeer naar <code style={{ 
                  background: '#e9ecef', 
                  padding: '0.3rem 0.6rem', 
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: '#495057'
                }}>/component-demo</code> in de URL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentDemoPage
