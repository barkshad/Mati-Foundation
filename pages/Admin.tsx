import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { Navigate } from 'react-router-dom';
import { Layout, Type, Image as ImageIcon, Users, Settings, LogOut, Save } from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState<'content' | 'gallery' | 'settings'>('content');
  
  // Local state for forms
  const [heroData, setHeroData] = useState(content.hero);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const handleSaveHero = async () => {
    await updateContent('hero', heroData);
    alert('Hero section updated!');
  };

  const handleGalleryUpload = async (url: string) => {
    const newGallery = [...content.gallery, url];
    await updateContent('gallery', newGallery);
  };

  // Mock data for the mandated chart
  const donationData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
           <span className="font-serif text-xl font-bold">Mati Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'content' ? 'bg-teal-600' : 'hover:bg-slate-800'}`}
          >
            <Type size={18} /> Content
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-teal-600' : 'hover:bg-slate-800'}`}
          >
            <ImageIcon size={18} /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-teal-600' : 'hover:bg-slate-800'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-white">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Management</h1>
          <div className="text-sm text-slate-500">Live Changes enabled</div>
        </header>

        {activeTab === 'content' && (
          <div className="grid gap-8">
            {/* Quick Stats Chart */}
             <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-slate-700 mb-4">Donation Trends (Overview)</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donationData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">Homepage Hero</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Headline</label>
                  <input 
                    type="text" 
                    value={heroData.headline} 
                    onChange={(e) => setHeroData({...heroData, headline: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subheadline</label>
                  <textarea 
                    value={heroData.subheadline} 
                    onChange={(e) => setHeroData({...heroData, subheadline: e.target.value})}
                    className="w-full p-2 border rounded h-24"
                  />
                </div>
                 <ImageUploader 
                    label="Update Hero Image"
                    onUploadComplete={(url) => setHeroData({...heroData, heroImage: url})} 
                  />
                <button 
                  onClick={handleSaveHero}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-6">Manage Gallery</h2>
            <div className="mb-8">
              <ImageUploader 
                label="Add New Photo to Gallery"
                onUploadComplete={handleGalleryUpload} 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {content.gallery.map((img, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden h-32">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button className="text-white text-xs bg-red-500 px-2 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
             <h2 className="text-lg font-bold mb-4">Organization Settings</h2>
             <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bank Details</label>
                  <input type="text" className="w-full p-2 border rounded" defaultValue={content.contact.bankDetails} />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">M-Pesa</label>
                  <input type="text" className="w-full p-2 border rounded" defaultValue={content.contact.mpesa} />
               </div>
             </div>
             <div className="mt-4">
               <button className="px-4 py-2 bg-slate-900 text-white rounded">Update Contact Info</button>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};