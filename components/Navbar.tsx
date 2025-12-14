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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen ? 'bg-white/95 backdrop-blur-md shadow-md text-slate-800 py-3' : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
             <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
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
                className={`text-sm font-medium hover:text-teal-500 transition-colors ${
                  location.pathname === link.path ? 'text-teal-500 font-bold' : ''
                } ${!isScrolled && location.pathname === '/' ? 'text-white/90 hover:text-white' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/get-involved"
              className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart size={16} fill="currentColor" />
              <span>Donate</span>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md"
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
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-involved"
                className="block mt-4 text-center w-full px-5 py-3 rounded-md bg-teal-600 text-white font-bold"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};