import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Programs: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4 text-center">Our Programs</h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-16">
          We take a holistic approach to child welfare, ensuring every aspect of a child's development is nurtured.
        </p>

        <div className="space-y-12">
          {content.programs.map((program, index) => (
            <Link 
              to={`/programs/${program.id}`}
              key={program.id}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="font-serif text-3xl font-bold text-teal-800 group-hover:text-teal-600 transition-colors">
                    {program.title}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                      <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-lg font-bold text-sm">
                      Impact: {program.stats}
                      </div>
                      <span className="text-teal-600 font-bold flex items-center gap-2 text-sm group-hover:translate-x-2 transition-transform duration-300">
                          View Program Details <ArrowRight size={16} />
                      </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};