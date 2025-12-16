import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';

export const Programs: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4 text-center">Our Programs</h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-16 font-light text-lg">
          We take a holistic approach to child welfare, ensuring every aspect of a child's development is nurtured.
        </p>

        <div className="space-y-8">
          {content.programs.map((program, index) => (
            <ReactRouterDOM.Link 
              to={`/programs/${program.id}`}
              key={program.id}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 50, damping: 20 }}
              >
                <GlassCard hoverEffect={true} className="overflow-hidden">
                  <div className={`flex flex-col md:flex-row gap-0 md:gap-0 items-stretch ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[350px] relative overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors">
                        {program.title}
                      </h2>
                      <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                        {program.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                          <div className="inline-block px-4 py-2 bg-teal-50/80 backdrop-blur-sm text-teal-800 rounded-lg font-bold text-sm border border-teal-100">
                           Impact: {program.stats}
                          </div>
                          <span className="text-teal-600 font-bold flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform duration-300">
                              View Details <ArrowRight size={16} />
                          </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </ReactRouterDOM.Link>
          ))}
        </div>
      </div>
    </div>
  );
};