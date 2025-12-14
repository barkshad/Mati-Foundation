import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h1 className="font-serif text-5xl font-bold text-slate-900 mb-8">Contact Us</h1>
            <p className="text-lg text-slate-600 mb-12">
              We'd love to hear from you. Whether you have a question about our programs, sponsorship, or just want to say hello.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Visit Us</h3>
                  <p className="text-slate-600">{content.contact.address}</p>
                  <p className="text-sm text-slate-400 mt-1">Kilifi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Us</h3>
                  <p className="text-slate-600">{content.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Call Us</h3>
                  <p className="text-slate-600">{content.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">WhatsApp</h3>
                  <p className="text-slate-600 mb-1">{content.contact.whatsapp}</p>
                  <a 
                    href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-green-600 hover:text-green-700"
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Opening Hours</h3>
                  <p className="text-slate-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-slate-600">Sat: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input type="email" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea rows={5} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <button className="w-full py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};