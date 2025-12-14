import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from '../components/GlassCard';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

export const Sponsorship: React.FC = () => {
  const { content } = useContent();
  const [selectedChild, setSelectedChild] = useState<any | null>(null);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4">Sponsor a Child</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Change a life forever. Your monthly sponsorship provides education, meals, healthcare, and hope.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.children.map((child, i) => (
            <motion.div 
              key={child.id} 
              onClick={() => setSelectedChild(child)} 
              className="cursor-pointer"
              {...({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { delay: i * 0.1, type: "spring" }
              } as any)}
            >
              <GlassCard hoverEffect={true} className="h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={child.image} alt={child.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-teal-700 font-bold text-xs shadow-sm">
                    Age: {child.age}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-slate-900">{child.name}</h3>
                  <p className="text-teal-600 font-medium mb-4">Aspiring {child.dream}</p>
                  <p className="text-slate-500 text-sm line-clamp-2">{child.bio}</p>
                  <button className="mt-4 w-full py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
                    View Profile
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Child Detail Modal */}
      <AnimatePresence>
        {selectedChild && (
          <motion.div 
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
            } as any)}
            onClick={() => setSelectedChild(null)}
          >
            <motion.div 
              {...({
                initial: { scale: 0.9, opacity: 0, y: 50 },
                animate: { scale: 1, opacity: 1, y: 0 },
                exit: { scale: 0.95, opacity: 0, y: 50 },
                transition: { type: "spring", damping: 25, stiffness: 300 },
                className: "bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-white/50 my-8 max-h-[90vh] flex flex-col"
              } as any)}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedChild(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 backdrop-blur-sm"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                <div className="md:w-1/2 h-64 md:h-auto flex-shrink-0">
                  <img src={selectedChild.image} alt={selectedChild.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">{selectedChild.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-bold border border-teal-100">Age {selectedChild.age}</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-100">Future {selectedChild.dream}</span>
                  </div>
                  
                  <div className="prose prose-sm prose-slate overflow-y-auto pr-2 custom-scrollbar flex-1 mb-6">
                    <h4 className="font-bold text-slate-700 mb-2 mt-0">My Story</h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">{selectedChild.bio}</p>

                    <h4 className="font-bold text-slate-700 mb-2">What Sponsorship Covers</h4>
                    <ul className="text-sm text-slate-500 space-y-2 list-none pl-0">
                      <li className="flex gap-2 items-center"><CheckCircle size={16} className="text-teal-500 fill-teal-50"/> School Fees & Uniforms</li>
                      <li className="flex gap-2 items-center"><CheckCircle size={16} className="text-teal-500 fill-teal-50"/> Daily Nutritious Meals</li>
                      <li className="flex gap-2 items-center"><CheckCircle size={16} className="text-teal-500 fill-teal-50"/> Medical Care</li>
                    </ul>
                  </div>

                  <motion.a 
                    href="/get-involved" 
                    className="w-full py-3 bg-teal-600 text-white text-center rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/30 shrink-0"
                    {...({
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 }
                    } as any)}
                  >
                    Sponsor {selectedChild.name} Today
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};