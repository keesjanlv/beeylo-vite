import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
  size = 300
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    
    if (!container || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      spotlight.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, ${spotlightColor} 0%, transparent 70%)`;
    };

    const handleMouseEnter = () => {
      spotlight.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [spotlightColor, size]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight overlay - always present, just opacity changes */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ 
          opacity: 0,
          background: 'transparent'
        }}
      />
      
      {/* Content - always visible */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: variant === 'primary' 
          ? '0 0 20px rgba(99, 102, 241, 0.4)' 
          : '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {children}
    </motion.button>
  );
};

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  interactive = false,
  onClick
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      whileHover={interactive ? { 
        y: -6,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {
        y: -2
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {children}
    </motion.div>
  );
};

export default Spotlight;