import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SparklesProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
}

export const Sparkles: React.FC<SparklesProps> = ({
  children,
  className,
  color,
  minSize = 1,
  maxSize = 3,
  particleDensity = 1.2,
}) => {
  // Use CSS variable for primary color if no color is provided
  const sparkleColor = color || 'var(--primary)';
  
  const sparkles = Array.from({ length: Math.floor(particleDensity * 10) }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (maxSize - minSize) + minSize,
    delay: Math.random() * 2,
  }));

  return (
    <div className={cn("sparkles-container", className)} style={{ position: 'relative', display: 'inline-block' }}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkleColor,
            borderRadius: '50%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 2,
          }}
        />
      ))}
      {children}
    </div>
  );
};