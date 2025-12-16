import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  initial: { 
    opacity: 0, 
    y: 15, 
    filter: "blur(5px)",
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth entry
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: "blur(5px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] // Smooth exit
    }
  }
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="w-full flex-grow"
    >
      {children}
    </motion.div>
  );
};