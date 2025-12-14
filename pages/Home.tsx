import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { GlassCard } from '../components/GlassCard';

export const Home: React.FC = () => {
  const { content } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={content.hero.heroImage} 
            alt="Mati Foundation Children" 
            className="w-full h-full object-cover"
          />
          {/* Enhanced gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/70 to-slate-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-50 via-transparent to-transparent opacity-90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-50 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Non-Profit Organization
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
              {content.hero.headline}
            </h1>
            <p className="text-lg sm:text-2xl text-teal-50 max-w-3xl mx-auto mb-10 font-light leading-relaxed drop-shadow-sm">
              {content.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/get-involved" 
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <Heart fill="white" size={20} /> Donate Now
              </Link>
              <Link 
                to="/sponsorship" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/40 rounded-full font-bold text-lg transition-all flex items-center justify-center transform hover:-translate-y-1"
              >
                Sponsor a Child
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Floating Overlap */}
      <section className="relative -mt-32 z-20 px-4 mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCounter value={150} suffix="+" label="Children Educated" />
          <AnimatedCounter value={500} suffix="+" label="Meals Served Weekly" />
          <AnimatedCounter value={30} suffix="" label="Families Empowered" />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src="https://picsum.photos/400/500?random=20" 
                alt="Children playing" 
                className="rounded-2xl shadow-xl mt-12 transform hover:scale-[1.02] transition-transform duration-500" 
              />
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                src="https://picsum.photos/400/500?random=21" 
                alt="Classroom" 
                className="rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-500" 
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {content.programs.slice(0, 4).map((program) => (
              <motion.div key={program.id} variants={itemVariants} className="h-full">
                <GlassCard className="h-full flex flex-col hover:border-teal-200 transition-colors bg-slate-50/50" hoverEffect={true}>
                  <div className="h-56 overflow-hidden relative">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">{program.description}</p>
                    <div className="pt-4 border-t border-slate-200/60 mt-auto">
                      <span className="text-teal-700 font-bold text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        {program.stats}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link to="/programs" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-slate-50 hover:text-teal-600 transition-colors">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};