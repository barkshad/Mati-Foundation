import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      <Loader2 className="animate-spin text-teal-600 w-10 h-10 mb-4" />
      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase animate-pulse">Loading Content...</p>
    </div>
  );
};