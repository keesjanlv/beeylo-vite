import { useState } from 'react'
import type { FC } from 'react'
import { Typography, NumberedButton } from '../components/ui'
import { PageBadge } from '../components'
import { motion, AnimatePresence } from 'framer-motion';

export const FAQPage: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
    setOpenIndex(null); // Close any open FAQ when switching tabs
  };

  const allFaqs = [
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

  // Split FAQs into two tabs
  const faqTabs = [
    {
      title: "About Beeylo",
      faqs: allFaqs.slice(0, 3) // First 3 questions
    },
    {
      title: "Usage & Privacy",
      faqs: allFaqs.slice(3, 6) // Last 3 questions
    }
  ];

  const currentFaqs = faqTabs[currentTab].faqs;

  return (
    <div className="no-scroll-page faq">
      <div className="no-scroll-content">
        <div className="no-scroll-stack faq2">
          {/* Header */}
          <div className="no-scroll-faq-header">
            <PageBadge>Support</PageBadge>
            <Typography variant="h2" className="no-scroll-title text-center">Frequently Asked Questions</Typography>
            <Typography variant="body" color="secondary" className="no-scroll-body text-center">
              Find your answer below
            </Typography>
            
            {/* Tab Navigation */}
            <div className="faq-navigation">
              {faqTabs.map((_, index) => (
                <NumberedButton
                  key={index}
                  number={index + 1}
                  active={currentTab === index}
                  onClick={() => handleTabChange(index)}
                />
              ))}
            </div>
          </div>
          
          {/* FAQ List with Animation */}
          <div className="no-scroll-faq-list">
            <AnimatePresence mode="wait">
              <motion.div
                key={`faq-tab-${currentTab}`}
                initial={{ opacity: 0.7, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.7, x: -10 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="faq-tab-content"
              >
                {currentFaqs.map((faq, index) => {
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
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Footer */}
          <div className="no-scroll-faq-footer">
            <Typography variant="body" color="secondary">
              Have more questions? <a href="mailto:support@beeylo.com" className="text-primary hover:underline">Contact our support team</a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};