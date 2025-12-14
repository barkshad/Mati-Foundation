import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from '../components/GlassCard';

export const Stories: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold text-slate-900 mb-12 text-center">Impact Stories</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {content.stories.map((story) => (
            <GlassCard key={story.id} className="overflow-hidden group" hoverEffect={true}>
              <div className="h-64 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>{story.category}</span>
                  <span>{story.date}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">{story.title}</h2>
                <p className="text-slate-600 mb-6 line-clamp-3">{story.excerpt}</p>
                <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">Read Full Story &rarr;</button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};