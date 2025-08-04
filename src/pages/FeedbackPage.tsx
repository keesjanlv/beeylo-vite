import type { FC } from 'react'
import { useState } from 'react'
import { Container, Stack, Card, CardContent, Button, Input, Typography } from '../components/ui'
import { PageBadge } from '../components'
import formbricks from '@formbricks/js'

export const FeedbackPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit to Formbricks
      formbricks.track('feedback_submitted', {
        hiddenFields: {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      })
      
      // Form successfully submitted
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      alert('There was a problem submitting your feedback. Please try again.')
    }
  }

  return (
    <div className="no-scroll-page">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Header */}
          <div className="no-scroll-welcome">
            <div className="text-center">
              <PageBadge>Feedback</PageBadge>
              <h1 className="no-scroll-welcome-title">Submit Feedback</h1>
            </div>
            <p className="no-scroll-welcome-description">
              Help us improve Beeylo by sharing your thoughts and suggestions
            </p>
          </div>

          {/* Feedback Form */}
          <div className="no-scroll-form-section">
            {isSubmitted ? (
              <div className="no-scroll-feedback-success">
                <div className="success-icon">
                  <div style={{ width: '48px', height: '48px', margin: '0 auto', backgroundColor: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                </div>
                <h2 className="no-scroll-feedback-success-title">Thank you for your feedback!</h2>
                <p className="no-scroll-feedback-success-description">We appreciate your input and will review it carefully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="no-scroll-form">
                <div className="no-scroll-form-stack">
                  {/* Name Field */}
                  <div className="no-scroll-input-group">
                    <label htmlFor="name" className="no-scroll-input-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="no-scroll-input"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="no-scroll-input-group">
                    <label htmlFor="email" className="no-scroll-input-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="no-scroll-input"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="no-scroll-input-group">
                    <label htmlFor="message" className="no-scroll-input-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please share your feedback, suggestions, or report any issues you've encountered..."
                      rows={4}
                      className="no-scroll-input no-scroll-textarea"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div className="no-scroll-button-group">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="no-scroll-button buttonv2 buttonv2-yellow"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}