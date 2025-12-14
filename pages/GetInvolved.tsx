import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from '../components/GlassCard';
import { CreditCard, Package, UserPlus } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold text-slate-900 mb-4 text-center">Get Involved</h1>
        <p className="text-center text-slate-500 mb-16">
          Whether you donate funds, supplies, or your time, you are making a tangible difference.
        </p>

        <div className="space-y-8">
          {/* Financial Donation */}
          <GlassCard className="p-8 border-l-4 border-teal-500">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-teal-50 rounded-full text-teal-600 hidden sm:block">
                <CreditCard size={32} />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Financial Support</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Bank Transfer</h3>
                    <p className="font-mono text-slate-800">{content.contact.bankDetails}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2">M-Pesa</h3>
                    <p className="font-mono text-green-900 font-bold">{content.contact.mpesa}</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Item Donation */}
          <GlassCard className="p-8 border-l-4 border-orange-400">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-orange-50 rounded-full text-orange-500 hidden sm:block">
                <Package size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Donate Supplies</h2>
                <p className="text-slate-600 mb-4">We are always in need of dry foods, sanitary towels, clothes (ages 4-16), and scholastic materials.</p>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Rice/Maize</span>
                   <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Textbooks</span>
                   <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Shoes</span>
                   <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">Soap</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Volunteer */}
          <GlassCard className="p-8 border-l-4 border-blue-500">
             <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 rounded-full text-blue-500 hidden sm:block">
                <UserPlus size={32} />
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Volunteer With Us</h2>
                <p className="text-slate-600 mb-6">Are you a teacher, medic, or mentor? We welcome volunteers to spend time with the children.</p>
                <form className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="p-3 border rounded-lg" />
                    <input type="email" placeholder="Email" className="p-3 border rounded-lg" />
                  </div>
                  <textarea placeholder="How would you like to help?" className="p-3 border rounded-lg h-24"></textarea>
                  <button className="bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};