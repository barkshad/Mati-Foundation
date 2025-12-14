import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, Lock } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-white font-bold">Mati Foundation</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              {content.about.mission}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-teal-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-teal-400 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-teal-400">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-teal-400">Our Programs</Link></li>
              <li><Link to="/sponsorship" className="hover:text-teal-400">Sponsor a Child</Link></li>
              <li><Link to="/stories" className="hover:text-teal-400">Impact Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-teal-500" />
                <span>{content.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-500" />
                <span>{content.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-teal-500" />
                <span>{content.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Stay Updated</h4>
            <p className="text-xs mb-4">Join our community of supporters.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              />
              <button className="bg-teal-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-teal-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {year} Mati Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link to="/admin" className="flex items-center gap-1 hover:text-white transition-colors opacity-30 hover:opacity-100">
              <Lock size={10} />
              <span>Staff Login</span>
            </Link>
            <div className="flex items-center gap-1">
               <span>Made with</span>
               <Heart size={10} className="text-red-500 fill-red-500" />
               <span>in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};