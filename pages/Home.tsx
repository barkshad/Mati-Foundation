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
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={content.hero.heroImage} 
            alt="Mati Foundation Children" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-slate-900/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {content.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-teal-50 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              {content.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/get-involved" 
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-teal-900/20 hover:shadow-teal-900/40 flex items-center justify-center gap-2"
              >
                <Heart fill="white" size={20} /> Donate Now
              </Link>
              <Link 
                to="/sponsorship" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-lg transition-all flex items-center justify-center"
              >
                Sponsor a Child
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20 px-4">
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
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold text-teal-900 mb-6">A Legacy of Love</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {content.about.founderStory.substring(0, 300)}...
              </p>
              <Link to="/about" className="text-teal-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Read our full story <ArrowRight size={18} />
              </Link>
            </motion.div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/400/500?random=20" alt="Children playing" className="rounded-2xl shadow-lg mt-8" />
              <img src="https://picsum.photos/400/500?random=21" alt="Classroom" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Our Core Programs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Holistic interventions designed to break the cycle of poverty.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {content.programs.slice(0, 4).map((program) => (
              <motion.div key={program.id} variants={itemVariants}>
                <GlassCard className="h-full flex flex-col hover:border-teal-200 transition-colors" hoverEffect={true}>
                  <div className="h-48 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 flex-grow">{program.description}</p>
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-teal-600 font-bold text-sm">{program.stats}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};