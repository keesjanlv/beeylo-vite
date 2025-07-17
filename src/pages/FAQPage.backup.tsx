import type { FC } from 'react'
import { useState } from 'react';
import '../styles/pages/faq.css';

export const FAQPage: FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null)

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

  const toggleItem = (index: number) => {
    setOpenItem(prev => prev === index ? null : index)
  }

  return (
    <div className="page-content faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1>FAQ</h1>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openItem === index ? 'open' : ''}`}>
              <button 
                className="faq-question-button"
                onClick={() => toggleItem(index)}
                aria-expanded={openItem === index}
              >
                <span className="faq-question">{faq.question}</span>
                <span className="faq-toggle-icon">
                  {openItem === index ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-footer">
          <p>Have more questions? <a href="mailto:support@beeylo.com">Contact our support team</a></p>
        </div>
      </div>
    </div>
  )
}