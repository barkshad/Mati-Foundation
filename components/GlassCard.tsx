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
      className={`relative bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-teal-900/5 rounded-3xl overflow-hidden ${className}`}
      {...({
        initial: false,
        whileHover: hoverEffect ? { 
          y: -8, 
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 25px 50px -12px rgba(13, 148, 136, 0.15), 0 0 0 1px rgba(255,255,255,0.5) inset"
        } : {},
        transition: { type: "spring", stiffness: 400, damping: 25, mass: 1 }
      } as any)}
    >
      {/* Glossy gradient overlay for realism */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};