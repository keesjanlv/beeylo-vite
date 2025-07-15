import type { FC } from 'react'
import { useState } from 'react'

interface FeedbackPageProps {
  onBack?: () => void
}

export const FeedbackPage: FC<FeedbackPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        category: 'general',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="page-content">
      <div className="dashboard-new-layout">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-welcome-header">
            <div className="header-with-back">
              {onBack && (
                <button className="back-button" onClick={onBack}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              )}
              <h1>Submit Feedback</h1>
            </div>
            <p className="feedback-subtitle">Help us improve Beeylo by sharing your thoughts and suggestions</p>
          </div>

          {/* Feedback Form */}
          <div className="feedback-form-container">
            {isSubmitted ? (
              <div className="feedback-success">
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <h3>Thank you for your feedback!</h3>
                <p>We appreciate your input and will review it carefully.</p>
              </div>
            ) : (
              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="ui">UI/UX Improvement</option>
                    <option value="performance">Performance Issue</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    placeholder="Please share your feedback, suggestions, or report any issues you've encountered..."
                    rows={6}
                  />
                </div>

                <button 
                  type="submit" 
                  className="feedback-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}