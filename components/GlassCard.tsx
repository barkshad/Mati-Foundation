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
      className={`relative bg-white/70 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden ${className}`}
      {...({
        initial: false,
        whileHover: hoverEffect ? { 
          y: -12, 
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(13, 148, 136, 0.1) inset"
        } : {},
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } as any)}
    >
      {/* Shine effect container */}
      {hoverEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" />
        </div>
      )}

      {/* Glossy gradient overlay for premium finish */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/40 opacity-60 pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};