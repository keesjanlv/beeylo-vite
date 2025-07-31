import type { FC } from 'react'
import { useState } from 'react'
import { Container, Stack, Card, CardContent, Button, Input, Typography } from '../components/ui'
import { PageBadge } from '../components'
import formbricks from '@formbricks/js'

interface FeedbackPageProps {
  onBack?: () => void
}

export const FeedbackPage: FC<FeedbackPageProps> = ({ onBack }) => {
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
        name: formData.name,
        email: formData.email,
        message: formData.message
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
    <div className="page-container">
      <div className="page-content content-scrollable">
        <div className="layout-scroll">
          <Container size="md">
            <Stack spacing={6}>
              {/* Header */}
              <Stack spacing={2}>
                <div className="header-with-back">
                  {onBack && (
                    <Button 
                      variant="ghost" 
                      onClick={onBack} 
                      className="back-button"
                      aria-label="Go back"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5"/>
                        <path d="M12 19l-7-7 7-7"/>
                      </svg>
                    </Button>
                  )}
                  <div className="text-center">
                    <PageBadge>Feedback</PageBadge>
                    <Typography variant="h2" className="text-center">Submit Feedback</Typography>
                  </div>
                </div>
                <Typography variant="body" color="secondary" className="text-center">
                  Help us improve Beeylo by sharing your thoughts and suggestions
                </Typography>
              </Stack>

              {/* Feedback Form */}
              <Card>
                <CardContent>
                  {isSubmitted ? (
                    <div className="feedback-success text-center">
                      <div className="success-icon mb-4">
                        <div style={{ width: '48px', height: '48px', margin: '0 auto', backgroundColor: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22,4 12,14.01 9,11.01"/>
                          </svg>
                        </div>
                      </div>
                      <Typography variant="h3" className="mb-2">Thank you for your feedback!</Typography>
                      <Typography variant="body" color="secondary">We appreciate your input and will review it carefully.</Typography>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4}>
                        {/* Name Field */}
                        <div>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            label="Name"
                            placeholder="Your full name"
                            style={{ 
                              width: '100%', 
                              padding: '8px 12px', 
                              border: '1px solid var(--border)', 
                              borderRadius: 'var(--radius-md)', 
                              background: 'var(--surface)',
                              color: 'var(--text-primary)',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        {/* Email Field */}
                        <div>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            label="Email"
                            placeholder="your.email@example.com"
                            style={{ 
                              width: '100%', 
                              padding: '8px 12px', 
                              border: '1px solid var(--border)', 
                              borderRadius: 'var(--radius-md)', 
                              background: 'var(--surface)',
                              color: 'var(--text-primary)',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        {/* Message Field */}
                        <div>
                          <label htmlFor="message" className="form-label" style={{ marginBottom: '8px', display: 'block', fontWeight: '500' }}>Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Please share your feedback, suggestions, or report any issues you've encountered..."
                            rows={6}
                            style={{ 
                              width: '100%', 
                              padding: '12px', 
                              border: '1px solid var(--border)', 
                              borderRadius: 'var(--radius-md)', 
                              background: 'var(--surface)',
                              color: 'var(--text-primary)',
                              fontSize: '14px',
                              resize: 'vertical',
                              fontFamily: 'inherit'
                            }}
                          />
                        </div>

                        <Button 
                          type="submit" 
                          variant="primary"
                          disabled={isSubmitting}
                          className="buttonv2 buttonv2-yellow"
                          style={{ width: '100%', marginTop: '16px' }}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </Button>
                      </Stack>
                    </form>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  )
}