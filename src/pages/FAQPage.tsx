import type { FC } from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';
import '../styles/pages/faq.css';

export const FAQPage: FC = () => {
  const faqs = [
    {
      question: "So what exactly is Beeylo?",
      answer: "Beeylo is your inbox — but redesigned for real life. It pulls the 10% that matters from all your emails — packages, appointments, replies — and ignores the rest. No clutter. No chaos. Just clarity."
    },
    {
      question: "Does it cost anything to join?",
      answer: "Nope. Beeylo is and will always be free to use."
    },
    {
      question: "How does early access work?",
      answer: "You'll be among the first to try Beeylo. As an early access member, you get to test new features, share feedback and reserve your username before the public launch."
    },
    {
      question: "Can I use my current email with Beeylo?",
      answer: "Absolutely. Beeylo connects to your existing email address and turns scattered messages into one smart, organized ticket."
    },
    {
      question: "Can I use beeylo on desktop?",
      answer: "Beeylo is currently optimized for mobile, but we're working on a full desktop version."
    },
    {
      question: "What happens to my data?",
      answer: "We only use your name and email to keep you informed about Beeylo. We will never share your information."
    }
  ]

  return (
    <div className="page-content faq-page">
      <div 
        className="faq-container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px 16px'
        }}
      >
        <div 
          className="faq-header"
          style={{
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          <h1 
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}
          >
            FAQ
          </h1>
          <p 
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem'
            }}
          >
            Frequently Asked Questions
          </p>
        </div>
        
        <Card 
          style={{ marginBottom: '32px' }}
          hover={false}
        >
          <CardContent 
            style={{ padding: '24px' }}
          >
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={faq.question}
                  style={{
                    border: 'none',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <AccordionTrigger 
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      padding: '16px 20px'
                    }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    style={{
                      padding: '0 20px 20px 20px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontSize: '1rem'
                    }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <div 
          className="faq-footer"
          style={{ textAlign: 'center' }}
        >
          <Card style={{ display: 'inline-block' }}>
            <CardContent style={{ padding: '24px' }}>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Have more questions?{' '}
                <a 
                  href="mailto:support@beeylo.com" 
                  style={{
                    color: 'var(--primary)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  Contact our support team
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}