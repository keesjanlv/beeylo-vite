import { useState } from 'react'
import type { FC } from 'react'
import { Container, Stack, Typography, NumberedButton } from '../components/ui'
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
      question: "What is Beeylo?",
      answer: "Beeylo is an intelligent email management platform that helps you focus on what matters by filtering out noise and organizing your important emails."
    },
    {
      question: "How does Beeylo work?",
      answer: "Beeylo uses advanced AI algorithms to analyze your emails and automatically categorize them based on importance, sender, and content type."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All your data is encrypted and we never share your personal information with third parties."
    },
    {
      question: "Can I use Beeylo with multiple email accounts?",
      answer: "Yes, Beeylo supports multiple email accounts from various providers including Gmail, Outlook, and Yahoo."
    },
    {
      question: "How much does Beeylo cost?",
      answer: "We offer a free tier with basic features and premium plans starting at $9.99/month for advanced functionality."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees."
    }
  ];

  // Split FAQs into two tabs
  const faqTabs = [
    {
      title: "Getting Started",
      faqs: allFaqs.slice(0, 3) // First 3 questions
    },
    {
      title: "Pricing & Account",
      faqs: allFaqs.slice(3, 6) // Last 3 questions
    }
  ];

  const currentFaqs = faqTabs[currentTab].faqs;

  return (
    <div className="no-scroll-page">
      <div className="no-scroll-content">
        <div className="no-scroll-stack">
          {/* Header */}
          <div className="no-scroll-faq-header">
            <PageBadge>Support</PageBadge>
            <Typography variant="h2" className="no-scroll-title text-center">Frequently Asked Questions</Typography>
            <Typography variant="body" color="secondary" className="no-scroll-body text-center">
              Find your answer below
            </Typography>
            
            {/* Tab Navigation */}
            <div className="faq-navigation">
              {faqTabs.map((tab, index) => (
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