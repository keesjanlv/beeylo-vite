import { useState } from 'react';
import type { FC } from 'react';
import { Container, Stack } from '../components/ui';
import { PageBadge } from '../components';

export const FAQPage: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-content">
      <Container size="lg">
        <Stack spacing={8}>
          {/* Header */}
          <Stack spacing={4} className="text-center">
            <PageBadge>Support</PageBadge>
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-secondary">Find answers to common questions about Beeylo</p>
          </Stack>
          
          {/* FAQ List */}
          <Stack spacing={2}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`accordion-item faq-accordion-item ${isOpen ? 'faq-accordion-item-active' : ''}`}
                >
                  <button 
                    className="accordion-trigger faq-accordion-trigger"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className="faq-icon-container">
                      <svg 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        className="faq-icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 12h14"
                        ></path>
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M12 5v14"
                          className={isOpen ? 'faq-icon-vertical collapsed' : 'faq-icon-vertical'}
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div className={`accordion-content ${isOpen ? 'accordion-content-visible' : ''}`}>
                    <div className="accordion-content-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stack>
          
          {/* Footer */}
          <div className="text-center">
            <p className="text-secondary">
              Have more questions? <a href="mailto:support@beeylo.com" className="text-primary hover:underline">Contact our support team</a>
            </p>
          </div>
        </Stack>
      </Container>
    </div>
  );
};