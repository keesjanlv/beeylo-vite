import { useState } from 'react'
import type { FC } from 'react'
import type { LoginProps } from '../types'
import { Card } from '../components'

export const HomePage: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onLogin(email)
    }
  }

  return (
    <div className="page-content">
      <div className="hero-grid">
        <Card className="hero-card" size="2x1">
          <div className="hero-content">
            <h1 className="hero-title">
              Inbox noise is a choice
            </h1>
            <div></div>
          </div>
        </Card>
        
        <Card className="login-card" size="1x1" title="Register or log in to your dashboard">
          <div className="login-card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                required
              />
              <button type="submit" className="cta-button">
                Get Started
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
} 