import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = ReactRouterDOM.useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Sponsorship', path: '/sponsorship' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Stories', path: '/stories' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center ${
        isScrolled 
          ? 'py-4' 
          : 'py-6'
      }`}
    >
      <div className={`
        w-full max-w-7xl mx-4 sm:mx-6 lg:mx-8 px-6 transition-all duration-500
        flex justify-between items-center
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 rounded-full py-3 border border-white/40' 
          : 'bg-transparent py-2'}
      `}>
          {/* Logo */}
          <ReactRouterDOM.Link to="/" className="flex items-center gap-3 group relative z-50">
             <motion.div 
               className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-teal-900/10 border border-white/20"
               {...({
                 whileHover: { scale: 1.05, rotate: 2 },
                 transition: { type: "spring", stiffness: 400, damping: 15 }
               } as any)}
             >
               M
             </motion.div>
             <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled || isMobileOpen || !isHome ? 'text-slate-900' : 'text-white'}`}>
               Mati<span className="text-teal-500">.</span>
             </span>
          </ReactRouterDOM.Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <ReactRouterDOM.Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  location.pathname === link.path 
                    ? (isScrolled || !isHome ? 'text-teal-700 font-bold bg-teal-50' : 'text-white font-bold bg-white/20 backdrop-blur-md') 
                    : (isScrolled || !isHome ? 'text-slate-600 hover:text-teal-600 hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                }`}
              >
                {link.name}
              </ReactRouterDOM.Link>
            ))}
            <motion.div
              className="ml-4"
              {...({
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                transition: { type: "spring", stiffness: 400, damping: 15 }
              } as any)}
            >
              <ReactRouterDOM.Link
                to="/get-involved"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2 border border-slate-700"
              >
                <Heart size={16} fill="currentColor" className="text-teal-400" />
                <span>Donate</span>
              </ReactRouterDOM.Link>
            </motion.div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors relative z-50 ${isScrolled || isMobileOpen || !isHome ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            {...({
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: 'auto' },
              exit: { opacity: 0, height: 0 },
              transition: { type: "spring", stiffness: 300, damping: 30 },
              className: "md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden shadow-xl absolute top-0 left-0 w-full pt-24 pb-8"
            } as any)}
          >
            <div className="px-6 space-y-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  {...({
                    initial: { x: -20, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    transition: { delay: i * 0.05 }
                  } as any)}
                >
                  <ReactRouterDOM.Link
                    to={link.path}
                    className={`block px-4 py-4 rounded-2xl text-lg font-medium transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-teal-50 text-teal-700 border border-teal-100' 
                        : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </ReactRouterDOM.Link>
                </motion.div>
              ))}
              <motion.div 
                className="pt-6 mt-4 border-t border-slate-100"
                {...({
                  initial: { y: 20, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.3 }
                } as any)}
              >
                <ReactRouterDOM.Link
                  to="/get-involved"
                  className="block text-center w-full px-5 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-xl active:scale-95 transition-transform"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Donate Now
                </ReactRouterDOM.Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};