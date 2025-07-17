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
      <div className="faq-container">
        <div className="faq-header">
          <h1>FAQ</h1>
          <p>Frequently Asked Questions</p>
        </div>
        
        <Card className="faq-main-card" hover={false}>
          <CardContent className="faq-main-card-content">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={faq.question}
                  className="faq-accordion-item"
                >
                  <AccordionTrigger className="faq-accordion-trigger">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="faq-accordion-content">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <div className="faq-footer">
          <Card className="faq-footer-card">
            <CardContent className="faq-footer-card-content">
              <p>
                Have more questions?{' '}
                <a href="mailto:support@beeylo.com" className="faq-footer-contact-link">
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