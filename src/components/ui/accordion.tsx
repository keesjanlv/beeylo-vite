import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface AccordionContextType {
  openItem: string | null;
  setOpenItem: (item: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
}

export const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  className,
  type = "single" 
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={cn("space-y-2", className)} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  children, 
  value, 
  className 
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");
  const isOpen = context.openItem === value;

  return (
    <div 
      className={cn("accordion-item", className)}
      style={{
        borderBottom: isOpen ? '2px solid #f59e0b' : '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)'
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value } as any);
        }
        return child;
      })}
    </div>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  children, 
  className,
  value 
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");
  
  const { openItem, setOpenItem } = context;
  const isOpen = openItem === value;

  return (
    <button
      className={cn("accordion-trigger", className)}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        fontWeight: '500'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={() => setOpenItem(isOpen ? null : value || "")}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <div style={{ marginLeft: '8px' }}>
        <svg
          style={{ width: '16px', height: '16px', color: '#f59e0b' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14"
          />
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v14"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </div>
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ 
  children, 
  className,
  value 
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");
  
  const { openItem } = context;
  const isOpen = openItem === value;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
        >
          <div 
            className={cn("accordion-content", className)}
            style={{
              padding: '0 16px 16px 16px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};