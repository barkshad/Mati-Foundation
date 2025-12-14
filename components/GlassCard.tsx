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
      className={`bg-white/80 backdrop-blur-md border border-white/40 shadow-xl shadow-teal-900/5 rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      whileHover={hoverEffect ? { y: -8, boxShadow: "0 20px 25px -5px rgba(13, 148, 136, 0.1), 0 8px 10px -6px rgba(13, 148, 136, 0.1)" } : {}}
    >
      {children}
    </motion.div>
  );
};