import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from '../components/GlassCard';
import { CreditCard, Package, UserPlus, Copy, Check, Building2, Smartphone } from 'lucide-react';

const BankDetailRow = ({ label, value }: { label: string, value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-slate-200 last:border-0 group gap-1">
      <span className="text-slate-500 font-medium text-sm">{label}</span>
      <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
        <span className="font-mono text-slate-900 font-bold text-sm">{value}</span>
        <button 
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-teal-600" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

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
              <div className="flex-grow w-full">
                <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Financial Support</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Bank Details Table */}
                  <div className="bg-slate-50 p-6 rounded-xl shadow-inner border border-slate-200 w-full">
                    <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Building2 size={18} /> Bank Details
                    </h3>
                    <div className="flex flex-col">
                        <BankDetailRow label="Bank Name" value="Diamond Trust Bank" />
                        <BankDetailRow label="Account Name" value="Matilda John Kashindo" />
                        <BankDetailRow label="Account Number" value="0200471001" />
                        <BankDetailRow label="Branch" value="Kilifi" />
                        <BankDetailRow label="Branch Code" value="044" />
                        <BankDetailRow label="Bank Code" value="63" />
                        <BankDetailRow label="Swift Code" value="DTKE KENA" />
                        <BankDetailRow label="Country" value="Kenya" />
                    </div>
                  </div>

                  {/* M-Pesa & Instructions */}
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Smartphone size={18} /> M-Pesa Donation
                      </h3>
                      <p className="font-mono text-green-900 font-bold text-lg mb-2">{content.contact.mpesa}</p>
                      <p className="text-xs text-green-700">Go to M-Pesa &gt; Lipa na M-Pesa &gt; Paybill</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Why Donate?</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        100% of your donation goes directly to the children's welfare. We maintain strict transparency and provide receipts for all contributions.
                      </p>
                    </div>
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