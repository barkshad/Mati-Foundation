import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = "", label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Format number without decimals if integer
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, suffix]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-teal-50">
      <span 
        ref={ref} 
        className="text-4xl md:text-5xl font-bold text-teal-600 font-serif mb-2"
      >
        0{suffix}
      </span>
      <span className="text-sm md:text-base text-slate-500 uppercase tracking-wide font-medium text-center">
        {label}
      </span>
    </div>
  );
};