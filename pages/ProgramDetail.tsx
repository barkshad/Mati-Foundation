import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ArrowLeft, Heart, CheckCircle, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  
  // Find program by ID
  const program = content.programs.find(p => p.id === id);

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        {program.mediaType === 'video' ? (
             <video 
                src={program.image} 
                className="w-full h-full object-cover opacity-80"
                autoPlay
                muted
                loop
                playsInline
             />
        ) : (
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
           <div className="max-w-7xl mx-auto">
             <Link to="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-bold text-sm uppercase tracking-wider">
               <ArrowLeft size={16} className="mr-2" /> Back to Programs
             </Link>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 shadow-black drop-shadow-lg"
             >
               {program.title}
             </motion.h1>
             <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg border border-teal-500">
                  <Target size={16} /> Impact: {program.stats}
                </span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
               <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">About the Program</h2>
               <div className="prose prose-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                 {program.description}
               </div>
               
               <div className="mt-10 p-8 bg-teal-50 rounded-2xl border border-teal-100 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                        <Heart size={20} className="fill-teal-600 text-teal-600" />
                        Our Commitment
                    </h3>
                    <p className="text-teal-800/80 italic text-lg font-serif">
                        "Through the {program.title} program, we are restoring dignity and building a sustainable future for the children of Kilifi."
                    </p>
                  </div>
                  {/* Decorative background element */}
                  <Heart className="absolute -bottom-4 -right-4 text-teal-100 fill-teal-100 w-32 h-32 transform rotate-12" />
               </div>
             </div>
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Support this Cause</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Your contribution directly supports the {program.title} initiative. Help us reach more children today.
                  </p>
                  
                  <Link 
                    to="/get-involved"
                    className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 group mb-6 active:scale-95"
                  >
                    <Heart className="fill-white/20 group-hover:fill-white transition-colors" />
                    Support Program
                  </Link>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0" /> 
                      <span>Secure Bank Transfer & M-Pesa</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0" /> 
                      <span>Direct Impact on Children</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0" /> 
                      <span>Tax Deductible Receipts</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};