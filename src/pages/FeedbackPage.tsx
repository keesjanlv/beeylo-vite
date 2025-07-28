import type { FC } from 'react'
import { useState } from 'react'
import { Container, Stack, Card, CardContent, Button, Input, Typography } from '../components/ui'

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
                  <Typography variant="h1">Submit Feedback</Typography>
                </div>
                <Typography variant="body" color="secondary">Help us improve Beeylo by sharing your thoughts and suggestions</Typography>
              </Stack>

          {/* Feedback Form */}
          <Card variant="outline">
            <CardContent>
              {isSubmitted ? (
                <div className="feedback-success">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                  <Typography variant="h3">Thank you for your feedback!</Typography>
                  <Typography variant="body" color="secondary">We appreciate your input and will review it carefully.</Typography>
                </div>
              ) : (
                <form className="feedback-form" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      label="Name"
                      placeholder="Your full name"
                    />

                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      label="Email"
                      placeholder="your.email@example.com"
                    />

                    <div className="form-group">
                      <label htmlFor="category" className="form-label">Category</label>
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
                      <label htmlFor="message" className="form-label">Message</label>
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

                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={isSubmitting}
                      className="mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="spinner mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 11-6.219-8.56"/>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Feedback'
                      )}
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