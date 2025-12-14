import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isMobileOpen ? 'bg-white/95 backdrop-blur-md shadow-lg text-slate-800 py-3' : 'bg-transparent text-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:bg-teal-700 transition-colors">
               M
             </div>
             <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled || isMobileOpen ? 'text-teal-900' : 'text-white'}`}>
               Mati<span className="text-teal-500">.</span>
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium hover:text-teal-500 transition-colors relative group ${
                  location.pathname === link.path ? 'text-teal-500 font-bold' : ''
                } ${!isScrolled && location.pathname === '/' ? 'text-white/90 hover:text-white' : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            <Link
              to="/get-involved"
              className="px-6 py-2.5 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Heart size={16} fill="currentColor" className="animate-pulse" />
              <span>Donate</span>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${isScrolled || isMobileOpen ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="text-slate-800" /> : <Menu className={isScrolled ? 'text-slate-800' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to="/get-involved"
                  className="block text-center w-full px-5 py-3 rounded-full bg-teal-600 text-white font-bold shadow-md active:scale-95 transition-transform"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};