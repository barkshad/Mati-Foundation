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
      className={`relative bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] overflow-hidden ${className}`}
      {...({
        initial: false,
        whileHover: hoverEffect ? { 
          y: -8,
          scale: 1.01,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6) inset"
        } : {},
        transition: { type: "spring", stiffness: 400, damping: 30, mass: 1 }
      } as any)}
    >
      {/* Shine effect container */}
      {hoverEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" />
        </div>
      )}

      {/* Glossy gradient overlay for premium finish */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-transparent opacity-60 pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};