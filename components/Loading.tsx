import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-900">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-200"></div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-serif font-bold text-teal-800 text-xl">M</div>
      </div>
      <p className="mt-6 text-slate-500 font-medium tracking-widest uppercase text-xs animate-pulse">Loading Experience...</p>
    </div>
  );
};