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
      className={`relative bg-white/60 backdrop-blur-md border border-white/60 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden ${className}`}
      {...({
        initial: false,
        whileHover: hoverEffect ? { 
          y: -8, 
          scale: 1.01,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 20px 40px -10px rgba(13, 148, 136, 0.1), 0 0 0 1px rgba(255,255,255,0.6) inset"
        } : {},
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } as any)}
    >
      {/* Glossy gradient overlay for premium finish */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/20 opacity-50 pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};