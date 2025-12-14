import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from '../components/GlassCard';

export const Programs: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4 text-center">Our Programs</h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-16">
          We take a holistic approach to child welfare, ensuring every aspect of a child's development is nurtured.
        </p>

        <div className="space-y-12">
          {content.programs.map((program, index) => (
            <div 
              key={program.id} 
              className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 h-80">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="font-serif text-3xl font-bold text-teal-800">{program.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">{program.description}</p>
                <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-lg font-bold text-sm">
                  Impact: {program.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};