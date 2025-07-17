import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = true 
}) => {
  return (
    <motion.div
      className={cn("card", className)}
      style={{
        borderRadius: '8px',
        backgroundColor: 'var(--background)',
        boxShadow: 'var(--shadow)',
        transformStyle: 'preserve-3d'
      }}
      whileHover={hover ? { 
        scale: 1.02,
        rotateY: 2,
        z: 10,
        boxShadow: '0 4px 12px var(--shadow)'
      } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div 
      className={cn("card-header", className)}
      style={{ padding: '16px 16px 8px 16px' }}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div 
      className={cn("card-content", className)}
      style={{ padding: '16px 16px 16px 16px' }}
    >
      {children}
    </div>
  );
};