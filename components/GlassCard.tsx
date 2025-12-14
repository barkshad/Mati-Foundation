import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = false }) => {
  return (
    <motion.div 
      className={`bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden ${className}`}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      {children}
    </motion.div>
  );
};