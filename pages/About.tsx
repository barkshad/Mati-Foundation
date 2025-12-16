import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-slate-900 mb-6">About Mati Foundation</h1>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            className="bg-teal-50 p-10 rounded-3xl border border-teal-100"
            {...({
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 }
            } as any)}
          >
            <h2 className="font-serif text-3xl font-bold text-teal-800 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{content.about.mission}</p>
          </motion.div>
          <motion.div 
            className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl"
            {...({
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2 }
            } as any)}
          >
            <h2 className="font-serif text-3xl font-bold text-teal-800 mb-4">Our Vision</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{content.about.vision}</p>
          </motion.div>
        </div>

        {/* Founder Story */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="lg:w-1/2">
                <img 
                    src={content.about.founderImage || "https://picsum.photos/800/800?grayscale"} 
                    alt="Matilda Kashindo" 
                    className="rounded-2xl shadow-2xl w-full object-cover aspect-square" 
                />
            </div>
            <div className="lg:w-1/2">
                <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">The Founder's Story</h2>
                <div className="prose prose-lg text-slate-600">
                    <p className="whitespace-pre-wrap">{content.about.founderStory}</p>
                </div>
            </div>
        </div>

        {/* Values */}
        <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-10">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {content.about.values.map((value, idx) => (
                    <span key={idx} className="px-6 py-3 bg-white shadow-md rounded-full text-teal-700 font-bold border border-teal-50">
                        {value}
                    </span>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};