import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { GlassCard } from '../components/GlassCard';

export const Home: React.FC = () => {
  const { content } = useContent();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  if (!content || !content.hero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
           <p className="text-teal-800 font-bold animate-pulse">Loading content...</p>
        </div>
      </div>
    );
  }

  // General container stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Standard fade up for buttons/badges
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  // Specific staggered word animation for Headline
  const headlineContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(10px)",
      scale: 1.1
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9], // Premium ease-out-quart/quint blend
      }
    }
  };

  const headlineWords = content.hero.headline.split(" ");

  return (
    <div className="w-full overflow-hidden bg-transparent">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax & Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <motion.img 
              {...({
                initial: { scale: 1.2, opacity: 0 },
                animate: { scale: 1, opacity: 0.9 },
                transition: { duration: 1.5, ease: "easeOut" }
              } as any)}
              src={content.hero.heroImage} 
              alt="Mati Foundation Children" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Refined gradient for better visibility of image and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 mt-12">
          <motion.div
            {...({
              initial: "hidden",
              animate: "visible",
              variants: containerVariants
            } as any)}
          >
            <motion.div {...({ variants: itemVariants } as any)}>
              <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Non-Profit Organization
              </span>
            </motion.div>
            
            {/* Animated Headline */}
            <motion.h1 
              {...({ 
                variants: headlineContainerVariants,
                initial: "hidden",
                animate: "visible",
              } as any)}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[1.05] tracking-tight drop-shadow-xl text-balance"
            >
              {headlineWords.map((word, index) => (
                <motion.span 
                  key={index} 
                  variants={wordVariants}
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              {...({ variants: itemVariants } as any)} 
              className="text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md text-balance"
            >
              {content.hero.subheadline}
            </motion.p>
            
            <motion.div {...({ variants: itemVariants } as any)} className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.div {...({ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 15 } } as any)}>
                <ReactRouterDOM.Link 
                  to="/get-involved" 
                  className="px-10 py-5 bg-teal-600 text-white rounded-full font-bold text-lg shadow-2xl shadow-teal-900/50 flex items-center justify-center gap-3 border border-teal-500/50 hover:bg-teal-500 transition-colors"
                >
                  <Heart fill="white" size={20} className="text-white" /> Donate Now
                </ReactRouterDOM.Link>
              </motion.div>
              <motion.div {...({ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 15 } } as any)}>
                <ReactRouterDOM.Link 
                  to="/sponsorship" 
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  Sponsor a Child
                </ReactRouterDOM.Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section - Floating Overlap */}
      <section className="relative -mt-24 z-20 px-4 mb-32">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          {...({
            initial: { y: 100, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
            viewport: { once: true, margin: "-100px" },
            transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.6 }
          } as any)}
        >
          <AnimatedCounter value={150} suffix="+" label="Children Educated" />
          <AnimatedCounter value={500} suffix="+" label="Meals Served Weekly" />
          <AnimatedCounter value={30} suffix="" label="Families Empowered" />
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative background element - now redundant with global ambient, but kept for localized intensity */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              className="lg:w-1/2"
              {...({
                initial: { opacity: 0, x: -50 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, margin: "-100px" },
                transition: { type: "spring", stiffness: 70, damping: 20 }
              } as any)}
            >
              <h4 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-teal-600"></span> Our Story
              </h4>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">A Legacy of <br/><span className="text-teal-600 italic">Compassion</span></h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-10 font-light">
                {content.about.founderStory.substring(0, 300)}...
              </p>
              <ReactRouterDOM.Link to="/about" className="group text-slate-900 font-bold flex items-center gap-3 text-lg transition-all">
                <span className="border-b-2 border-slate-200 group-hover:border-teal-600 transition-colors pb-1">Read our full story</span> 
                <span className="p-2 bg-slate-100 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                </span>
              </ReactRouterDOM.Link>
            </motion.div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
              <motion.div 
                className="col-span-1 mt-12"
                {...({
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  whileHover: { y: -10 },
                  viewport: { once: true },
                  transition: { type: "spring", stiffness: 100, damping: 20 }
                } as any)}
              >
                 <img 
                    src={content.about.homePreviewImage1 || "https://picsum.photos/400/500?random=20"} 
                    alt="Children playing" 
                    className="rounded-[2rem] shadow-2xl w-full h-80 object-cover rotate-[-3deg] hover:rotate-0 transition-transform duration-500" 
                  />
              </motion.div>

              <motion.div 
                 className="col-span-1"
                {...({
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  whileHover: { y: -10 },
                  viewport: { once: true },
                  transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 }
                } as any)}
              >
                 <img 
                    src={content.about.homePreviewImage2 || "https://picsum.photos/400/500?random=21"} 
                    alt="Classroom" 
                    className="rounded-[2rem] shadow-2xl w-full h-80 object-cover rotate-[3deg] hover:rotate-0 transition-transform duration-500" 
                  />
              </motion.div>
              
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-400 rounded-full blur-[60px] opacity-40 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h4 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">What We Do</h4>
            <h2 className="font-serif text-5xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Our Core Programs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-light">Holistic interventions designed to break the cycle of poverty.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            {...({
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-50px" }
            } as any)}
          >
            {content.programs.slice(0, 4).map((program) => (
              <motion.div key={program.id} {...({ variants: itemVariants } as any)} className="h-full">
                <ReactRouterDOM.Link to={`/programs/${program.id}`} className="block h-full">
                  <GlassCard className="h-full flex flex-col group" hoverEffect={true}>
                    <div className="h-72 overflow-hidden relative">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-90"></div>
                      <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                         <h3 className="font-serif text-2xl font-bold text-white mb-2 shadow-black drop-shadow-md leading-tight">{program.title}</h3>
                         <div className="h-1 w-0 bg-teal-400 rounded-full group-hover:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow bg-white/40">
                      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-teal-800 font-bold text-sm group-hover:gap-3 transition-all">
                          Learn More <ArrowRight size={14} className="text-teal-600" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </ReactRouterDOM.Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-20">
            <ReactRouterDOM.Link to="/programs" className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md rounded-full text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all hover:shadow-xl border border-white shadow-sm">
              View All Programs <ArrowRight size={16} />
            </ReactRouterDOM.Link>
          </div>
        </div>
      </section>
    </div>
  );
};