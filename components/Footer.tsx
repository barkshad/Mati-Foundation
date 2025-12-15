import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, Lock, ArrowRight, MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">M</div>
                 <h3 className="font-serif text-2xl text-white font-bold tracking-tight">Mati Foundation</h3>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              {content.about.mission}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61585230359217" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-full hover:bg-teal-600 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-teal-600 hover:text-white transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.1em]">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><ReactRouterDOM.Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-teal-500 transition-all"></span> About Us</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/programs" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-teal-500 transition-all"></span> Our Programs</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/sponsorship" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-teal-500 transition-all"></span> Sponsor a Child</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/stories" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-teal-500 transition-all"></span> Impact Stories</ReactRouterDOM.Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.1em]">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-teal-600" />
                <span>{content.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-teal-600" />
                <span>{content.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-teal-600" />
                <a href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {content.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-teal-600" />
                <span>{content.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.1em]">Stay Updated</h4>
            <p className="text-xs mb-4">Join our community of supporters for updates.</p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {year} Mati Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <ReactRouterDOM.Link to="/admin" className="flex items-center gap-2 hover:text-white transition-colors opacity-40 hover:opacity-100">
              <Lock size={12} />
              <span>Staff Login</span>
            </ReactRouterDOM.Link>
            <div className="flex items-center gap-1.5 opacity-60">
               <span>Made with</span>
               <Heart size={12} className="text-teal-600 fill-teal-600" />
               <span>in Kilifi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};