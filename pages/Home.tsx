import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { GlassCard } from '../components/GlassCard';

export const Home: React.FC = () => {
  const { content } = useContent();

  if (!content || !content.hero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <div className="flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
           <p className="text-teal-800 font-bold animate-pulse">Loading content...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <motion.img 
            {...({
              initial: { scale: 1.1 },
              animate: { scale: 1 },
              transition: { duration: 10, ease: "easeOut" }
            } as any)}
            src={content.hero.heroImage} 
            alt="Mati Foundation Children" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Lighter gradient for better visibility of the image while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-teal-900/40 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-50 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 -mt-20">
          <motion.div
            {...({
              initial: "hidden",
              animate: "visible",
              variants: containerVariants
            } as any)}
          >
            <motion.div {...({ variants: itemVariants } as any)}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-50 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                Non-Profit Organization
              </span>
            </motion.div>
            
            <motion.h1 {...({ variants: itemVariants } as any)} className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
              {content.hero.headline}
            </motion.h1>
            
            <motion.p {...({ variants: itemVariants } as any)} className="text-lg sm:text-2xl text-teal-50 max-w-3xl mx-auto mb-10 font-light leading-relaxed drop-shadow-sm">
              {content.hero.subheadline}
            </motion.p>
            
            <motion.div {...({ variants: itemVariants } as any)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div {...({ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 15 } } as any)}>
                <Link 
                  to="/get-involved" 
                  className="px-8 py-4 bg-teal-500 text-white rounded-full font-bold text-lg shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2"
                >
                  <Heart fill="white" size={20} /> Donate Now
                </Link>
              </motion.div>
              <motion.div {...({ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 15 } } as any)}>
                <Link 
                  to="/sponsorship" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/40 rounded-full font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  Sponsor a Child
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Floating Overlap */}
      <section className="relative -mt-32 z-20 px-4 mb-12">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          {...({
            initial: { y: 100, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
            viewport: { once: true, margin: "-100px" },
            transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 }
          } as any)}
        >
          <AnimatedCounter value={150} suffix="+" label="Children Educated" />
          <AnimatedCounter value={500} suffix="+" label="Meals Served Weekly" />
          <AnimatedCounter value={30} suffix="" label="Families Empowered" />
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2"
              {...({
                initial: { opacity: 0, x: -50 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, margin: "-100px" },
                transition: { type: "spring", stiffness: 70, damping: 20 }
              } as any)}
            >
              <h4 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">Our Story</h4>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-teal-950 mb-6">A Legacy of Love</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {content.about.founderStory.substring(0, 300)}...
              </p>
              <Link to="/about" className="group text-teal-700 font-bold flex items-center gap-2 transition-all">
                <span className="border-b-2 border-teal-200 group-hover:border-teal-600 transition-colors">Read our full story</span> 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <motion.img 
                {...({
                  initial: { opacity: 0, y: 50, rotate: -3 },
                  whileInView: { opacity: 1, y: 0, rotate: -3 },
                  whileHover: { scale: 1.05, rotate: 0, zIndex: 10 },
                  viewport: { once: true },
                  transition: { type: "spring", stiffness: 100, damping: 20 }
                } as any)}
                src="https://picsum.photos/400/500?random=20" 
                alt="Children playing" 
                className="rounded-2xl shadow-xl mt-12 border-4 border-white" 
              />
              <motion.img 
                {...({
                  initial: { opacity: 0, y: 50, rotate: 3 },
                  whileInView: { opacity: 1, y: 0, rotate: 3 },
                  whileHover: { scale: 1.05, rotate: 0, zIndex: 10 },
                  viewport: { once: true },
                  transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 }
                } as any)}
                src="https://picsum.photos/400/500?random=21" 
                alt="Classroom" 
                className="rounded-2xl shadow-xl border-4 border-white" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-100 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">What We Do</h4>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Our Core Programs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Holistic interventions designed to break the cycle of poverty.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            {...({
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-50px" }
            } as any)}
          >
            {content.programs.slice(0, 4).map((program) => (
              <motion.div key={program.id} {...({ variants: itemVariants } as any)} className="h-full">
                <Link to={`/programs/${program.id}`} className="block h-full">
                  <GlassCard className="h-full flex flex-col bg-slate-50/50 group" hoverEffect={true}>
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                      <div className="pt-4 border-t border-slate-200/60 mt-auto">
                        <span className="text-teal-700 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                          Learn More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/programs" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-50 hover:text-teal-600 transition-colors hover:border-teal-300">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};