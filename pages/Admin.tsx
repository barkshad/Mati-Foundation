import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { Navigate } from 'react-router-dom';
import { 
  Layout, Type, Image as ImageIcon, Users, Settings, LogOut, Save, 
  Plus, Trash2, Edit2, ExternalLink, Heart, BookOpen, Film, Menu, X, ChevronLeft, Lock, Palette, FileText, Globe
} from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Program, ChildProfile, Story, MediaItem, SiteContent } from '../types';

// Simple UUID generator for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

export const Admin: React.FC = () => {
  const { isAuthenticated, logout, changePassword } = useAuth();
  const { content, updateContent } = useContent();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Edit States
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [editingChild, setEditingChild] = useState<Partial<ChildProfile> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<Story> | null>(null);

  // Gallery Upload State
  const [galleryCategory, setGalleryCategory] = useState<MediaItem['category']>('General');

  // Page Form States
  const [heroData, setHeroData] = useState(content.hero);
  const [aboutData, setAboutData] = useState(content.about);
  const [getInvolvedData, setGetInvolvedData] = useState(content.getInvolved);
  const [contactData, setContactData] = useState(content.contact);
  const [themeData, setThemeData] = useState(content.theme || { primaryColor: '#0d9488' });
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Sync state with content if it changes (e.g. initial load)
  useEffect(() => {
    if (content) {
      setHeroData(content.hero);
      setAboutData(content.about);
      setGetInvolvedData(content.getInvolved || { introTitle: '', introText: '', financialText: '', suppliesText: '', volunteerText: '' });
      setContactData(content.contact);
      setThemeData(content.theme || { primaryColor: '#0d9488' });
    }
  }, [content]);

  // Scroll to top on tab change for mobile context
  useEffect(() => {
    window.scrollTo(0,0);
  }, [activeTab]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  // --- Handlers ---

  const handleSaveHero = async () => {
    await updateContent('hero', heroData);
    alert('Homepage updated successfully!');
  };

  const handleSaveAbout = async () => {
    await updateContent('about', aboutData);
    alert('About page updated successfully!');
  };

  const handleSaveGetInvolved = async () => {
    await updateContent('getInvolved', getInvolvedData);
    alert('Get Involved page updated successfully!');
  };
  
  const handleSaveContact = async () => {
    await updateContent('contact', contactData);
    alert('Contact settings updated successfully!');
  };

  const handleSaveTheme = async () => {
    await updateContent('theme', themeData);
    alert('Website theme updated successfully! Colors should update instantly.');
  };

  const handleUpdatePassword = async () => {
    if(!newAdminPassword.trim()) {
        alert("Please enter a valid password");
        return;
    }
    await changePassword(newAdminPassword);
    setNewAdminPassword('');
    alert('Admin password updated successfully!');
  };

  const handleSaveProgram = async () => {
    if (!editingProgram) return;
    const newProgram = { ...editingProgram, id: editingProgram.id || generateId() } as Program;
    const exists = content.programs.find(p => p.id === newProgram.id);
    const newPrograms = exists ? content.programs.map(p => p.id === newProgram.id ? newProgram : p) : [...content.programs, newProgram];
    await updateContent('programs', newPrograms);
    setEditingProgram(null);
  };

  const handleDeleteProgram = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this program?")) return;
    const newPrograms = content.programs.filter(p => p.id !== id);
    await updateContent('programs', newPrograms);
  };

  const handleSaveChild = async () => {
    if (!editingChild) return;
    const newChild = { ...editingChild, id: editingChild.id || generateId(), needsSponsorship: editingChild.needsSponsorship ?? true } as ChildProfile;
    const exists = content.children.find(c => c.id === newChild.id);
    const newChildren = exists ? content.children.map(c => c.id === newChild.id ? newChild : c) : [...content.children, newChild];
    await updateContent('children', newChildren);
    setEditingChild(null);
  };

  const handleDeleteChild = async (id: string) => {
    if(!window.confirm("Delete this child profile?")) return;
    const newChildren = content.children.filter(c => c.id !== id);
    await updateContent('children', newChildren);
  };

  const handleSaveStory = async () => {
    if (!editingStory) return;
    const newStory = { ...editingStory, id: editingStory.id || generateId(), date: editingStory.date || new Date().toISOString().split('T')[0] } as Story;
    const exists = content.stories.find(s => s.id === newStory.id);
    const newStories = exists ? content.stories.map(s => s.id === newStory.id ? newStory : s) : [...content.stories, newStory];
    await updateContent('stories', newStories);
    setEditingStory(null);
  };

  const handleDeleteStory = async (id: string) => {
    if(!window.confirm("Delete this story?")) return;
    const newStories = content.stories.filter(s => s.id !== id);
    await updateContent('stories', newStories);
  };

  const handleGalleryUpload = async (result: { url: string; publicId: string; type: 'image' | 'video' }) => {
    const newItem: MediaItem = { id: generateId(), url: result.url, publicId: result.publicId, type: result.type, category: galleryCategory, createdAt: new Date().toISOString() };
    const newGallery = [newItem, ...content.gallery];
    await updateContent('gallery', newGallery);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if(!window.confirm("Delete this media item?")) return;
    const newGallery = content.gallery.filter(item => item.id !== id);
    await updateContent('gallery', newGallery);
  };

  // Mock Data
  const donationData = [
    { name: 'Jan', amount: 4000 }, { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 }, { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 }, { name: 'Jun', amount: 3390 },
  ];

  // Menu Groups
  const menuGroups = [
      {
          title: "Dashboard",
          items: [{ id: 'overview', icon: Layout, label: 'Overview' }]
      },
      {
          title: "Content Management",
          items: [
            { id: 'programs', icon: BookOpen, label: 'Programs' },
            { id: 'sponsorship', icon: Users, label: 'Sponsorship' },
            { id: 'stories', icon: Heart, label: 'Stories' },
            { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
          ]
      },
      {
          title: "Page Editing",
          items: [
            { id: 'homepage', icon: Type, label: 'Home Page' },
            { id: 'about_page', icon: FileText, label: 'About Page' },
            { id: 'get_involved_page', icon: Heart, label: 'Get Involved' },
            { id: 'contact_page', icon: Globe, label: 'Contact Info' }
          ]
      },
      {
          title: "System",
          items: [
            { id: 'theme', icon: Palette, label: 'Theme & Branding' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ]
      }
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col shadow-2xl 
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-72
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center font-bold font-serif text-white">M</div>
             <span className="font-bold tracking-wide text-lg">CMS Panel</span>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 p-1 hover:text-white rounded-md hover:bg-slate-800">
             <X size={24} />
           </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
             <div key={groupIdx}>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">{group.title}</h4>
                 <div className="space-y-1">
                     {group.items.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                activeTab === item.id 
                                ? 'bg-teal-600 text-white shadow-lg' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                 </div>
             </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm w-full px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto w-full relative bg-slate-50">
        
        {/* Mobile Header Bar */}
        <div className="md:hidden bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-700 active:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-900 capitalize text-lg">{activeTab.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="p-4 md:p-8 pb-32 max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden md:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-800 capitalize">{activeTab.replace('_', ' ')}</h1>
              <p className="text-slate-500 text-sm mt-1">Manage content and settings.</p>
            </div>
            <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              <ExternalLink size={16} /> View Live Site
            </a>
          </header>

          <div className="w-full">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Children</h3>
                        <div className="text-4xl font-bold text-teal-600">{content.children.length}</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-full text-teal-600"><Users size={24}/></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Programs</h3>
                        <div className="text-4xl font-bold text-purple-600">{content.programs.length}</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full text-purple-600"><BookOpen size={24}/></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Stories</h3>
                        <div className="text-4xl font-bold text-orange-600">{content.stories.length}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-full text-orange-600"><Heart size={24}/></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80">
                  <h3 className="font-bold text-slate-800 mb-6 text-lg">Donation Trends</h3>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={donationData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="amount" fill="#0d9488" radius={[4, 4, 4, 4]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* THEME TAB */}
            {activeTab === 'theme' && (
                <div className="max-w-3xl mx-auto md:mx-0 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Palette className="text-teal-600" /> Website Theme
                    </h2>
                    <p className="text-slate-500 mb-6">Changing the primary color will instantly update the entire website's color scheme, including buttons, accents, and backgrounds.</p>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Primary Brand Color</label>
                            <div className="flex gap-4 items-center">
                                <input 
                                    type="color" 
                                    value={themeData.primaryColor} 
                                    onChange={(e) => setThemeData({...themeData, primaryColor: e.target.value})}
                                    className="h-12 w-24 rounded cursor-pointer border-0 p-0"
                                />
                                <div className="space-y-1">
                                    <div className="text-lg font-mono font-bold">{themeData.primaryColor}</div>
                                    <div className="text-xs text-slate-400">Click color box to pick</div>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Preview</h4>
                            <div className="flex gap-4 flex-wrap">
                                <button style={{ backgroundColor: themeData.primaryColor }} className="px-6 py-2 rounded-full text-white font-bold shadow-lg">Primary Button</button>
                                <button style={{ color: themeData.primaryColor, borderColor: themeData.primaryColor }} className="px-6 py-2 rounded-full bg-white border font-bold">Secondary Button</button>
                                <span style={{ color: themeData.primaryColor }} className="font-bold text-xl">Headlines & Accents</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button onClick={handleSaveTheme} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg">
                                Apply Theme Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HOMEPAGE TAB */}
            {activeTab === 'homepage' && (
              <div className="space-y-6 max-w-3xl mx-auto md:mx-0">
                <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                     <Type className="text-teal-600" /> Hero Section
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Main Headline</label>
                      <input 
                        type="text" 
                        value={heroData.headline} 
                        onChange={(e) => setHeroData({...heroData, headline: e.target.value})}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Sub-headline</label>
                      <textarea 
                        value={heroData.subheadline} 
                        onChange={(e) => setHeroData({...heroData, subheadline: e.target.value})}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none h-32 text-base leading-relaxed"
                      />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <label className="block text-sm font-bold text-slate-700 mb-4">Background Image</label>
                      <ImageUploader onUploadComplete={(data) => setHeroData({...heroData, heroImage: data.url})} label="" />
                      {heroData.heroImage && <img src={heroData.heroImage} className="w-full h-48 object-cover rounded-lg mt-2" />}
                    </div>
                    <button onClick={handleSaveHero} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT PAGE TAB */}
            {activeTab === 'about_page' && (
                <div className="space-y-6 max-w-4xl mx-auto md:mx-0">
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Mission & Vision</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Mission Statement</label>
                                <textarea className="w-full p-4 border rounded-xl h-24" value={aboutData.mission} onChange={e => setAboutData({...aboutData, mission: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Vision Statement</label>
                                <textarea className="w-full p-4 border rounded-xl h-24" value={aboutData.vision} onChange={e => setAboutData({...aboutData, vision: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Founder's Story</h2>
                        <div className="space-y-6">
                            <textarea className="w-full p-4 border rounded-xl h-64 font-sans text-base leading-relaxed" value={aboutData.founderStory} onChange={e => setAboutData({...aboutData, founderStory: e.target.value})} />
                        </div>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Core Values</h2>
                        <p className="text-xs text-slate-400 mb-2">Comma separated values</p>
                        <input 
                            className="w-full p-4 border rounded-xl" 
                            value={aboutData.values.join(', ')} 
                            onChange={e => setAboutData({...aboutData, values: e.target.value.split(',').map(s => s.trim())})} 
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button onClick={handleSaveAbout} className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-700">Save About Page</button>
                    </div>
                </div>
            )}

            {/* GET INVOLVED PAGE TAB */}
            {activeTab === 'get_involved_page' && (
                <div className="space-y-6 max-w-4xl mx-auto md:mx-0">
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                         <h2 className="text-xl font-bold text-slate-800 mb-6">Introduction</h2>
                         <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Page Title</label>
                                <input className="w-full p-3 border rounded-xl" value={getInvolvedData.introTitle} onChange={e => setGetInvolvedData({...getInvolvedData, introTitle: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Intro Subtext</label>
                                <textarea className="w-full p-3 border rounded-xl h-20" value={getInvolvedData.introText} onChange={e => setGetInvolvedData({...getInvolvedData, introText: e.target.value})} />
                            </div>
                         </div>
                    </div>

                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                         <h2 className="text-xl font-bold text-slate-800 mb-6">Section Content</h2>
                         <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Financial Support Text</label>
                                <textarea className="w-full p-3 border rounded-xl h-24" value={getInvolvedData.financialText} onChange={e => setGetInvolvedData({...getInvolvedData, financialText: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Supplies Donation Text</label>
                                <textarea className="w-full p-3 border rounded-xl h-24" value={getInvolvedData.suppliesText} onChange={e => setGetInvolvedData({...getInvolvedData, suppliesText: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Volunteer Text</label>
                                <textarea className="w-full p-3 border rounded-xl h-24" value={getInvolvedData.volunteerText} onChange={e => setGetInvolvedData({...getInvolvedData, volunteerText: e.target.value})} />
                            </div>
                         </div>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={handleSaveGetInvolved} className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-700">Save Changes</button>
                    </div>
                </div>
            )}

            {/* CONTACT PAGE TAB (Merged Contact Info) */}
            {activeTab === 'contact_page' && (
                <div className="max-w-2xl mx-auto md:mx-0 bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6">Contact & Payment Information</h2>
                    <div className="space-y-5">
                        <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                        <input 
                            className="w-full p-4 border rounded-xl text-base" 
                            value={contactData.address} 
                            onChange={(e) => setContactData({...contactData, address: e.target.value})}
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                        <input 
                            className="w-full p-4 border rounded-xl text-base" 
                            value={contactData.email} 
                            onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                        <input 
                            className="w-full p-4 border rounded-xl text-base" 
                            value={contactData.phone}
                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp</label>
                        <input 
                            className="w-full p-4 border rounded-xl text-base" 
                            value={contactData.whatsapp}
                            onChange={(e) => setContactData({...contactData, whatsapp: e.target.value})}
                        />
                        </div>
                        <div className="pt-6 border-t space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Bank Details (Displayed in Get Involved)</label>
                        <textarea 
                            className="w-full p-4 border rounded-xl h-24 font-mono text-sm leading-relaxed" 
                            value={contactData.bankDetails}
                            onChange={(e) => setContactData({...contactData, bankDetails: e.target.value})}
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">M-Pesa (Displayed in Get Involved)</label>
                        <input 
                            className="w-full p-4 border rounded-xl font-mono text-sm" 
                            value={contactData.mpesa}
                            onChange={(e) => setContactData({...contactData, mpesa: e.target.value})}
                        />
                        </div>
                        <div className="pt-4">
                        <button 
                            onClick={handleSaveContact}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-lg shadow-lg"
                        >
                            Save Information
                        </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PROGRAMS TAB */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                {!editingProgram ? (
                  <div className="grid gap-4">
                    <button 
                      onClick={() => setEditingProgram({ title: '', description: '', stats: '', image: 'https://picsum.photos/400/300', mediaType: 'image' })}
                      className="w-full py-6 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 active:bg-slate-100"
                    >
                      <Plus size={24} /> Add New Program
                    </button>
                    {content.programs.map(program => (
                      <div key={program.id} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:w-32 h-40 md:h-32 rounded-xl overflow-hidden relative bg-slate-100 flex-shrink-0">
                            {program.mediaType === 'video' ? (
                                <video src={program.image} className="w-full h-full object-cover" muted />
                            ) : (
                                <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="flex-1 text-left w-full">
                          <h3 className="font-bold text-lg text-slate-800">{program.title}</h3>
                          <p className="text-slate-500 line-clamp-2 mt-1 text-sm md:text-base">{program.description}</p>
                          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold mt-3">{program.stats}</div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto pt-2 md:pt-0">
                          <button onClick={() => setEditingProgram(program)} className="flex-1 md:flex-none p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"><Edit2 size={18} /></button>
                          <button onClick={() => handleDeleteProgram(program.id)} className="flex-1 md:flex-none p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                     <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingProgram(null)}>
                        <ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-wider">Back to List</span>
                     </div>
                     <h2 className="text-2xl font-bold mb-6 text-slate-800">{editingProgram.id ? 'Edit Program' : 'New Program'}</h2>
                     <div className="space-y-4">
                        <div><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input className="w-full p-4 border rounded-xl" value={editingProgram.title} onChange={e => setEditingProgram({...editingProgram, title: e.target.value})} /></div>
                        <div><label className="text-xs font-bold text-slate-500 uppercase">Description</label><textarea className="w-full p-4 border rounded-xl h-40" value={editingProgram.description} onChange={e => setEditingProgram({...editingProgram, description: e.target.value})} /></div>
                        <div><label className="text-xs font-bold text-slate-500 uppercase">Stats</label><input className="w-full p-4 border rounded-xl" value={editingProgram.stats} onChange={e => setEditingProgram({...editingProgram, stats: e.target.value})} /></div>
                        <div className="p-4 bg-slate-50 rounded-xl border"><p className="text-xs font-bold text-slate-500 uppercase mb-3">Media</p><ImageUploader accept="image/*,video/*" onUploadComplete={data => setEditingProgram({...editingProgram, image: data.url, mediaType: data.type})} />{editingProgram.image && <img src={editingProgram.image} className="h-48 rounded mt-2" />}</div>
                        <button onClick={handleSaveProgram} className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg">Save Program</button>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* SPONSORSHIP TAB */}
            {activeTab === 'sponsorship' && (
               <div className="space-y-6">
                 {!editingChild ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <button onClick={() => setEditingChild({ name: '', age: 5, dream: '', bio: '', image: 'https://picsum.photos/400/500', needsSponsorship: true })} className="min-h-[150px] border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 flex flex-col items-center justify-center gap-2 p-8"><Plus size={32} /><span>Add Profile</span></button>
                      {content.children.map(child => (
                        <div key={child.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex md:block">
                           <img src={child.image} className="w-32 md:w-full h-32 md:h-56 object-cover" />
                           <div className="p-4 flex-1">
                             <h3 className="font-bold text-lg">{child.name}, {child.age}</h3>
                             <div className="flex gap-2 mt-4">
                               <button onClick={() => setEditingChild(child)} className="flex-1 py-2 bg-slate-100 rounded-lg text-slate-700 font-bold text-xs">Edit</button>
                               <button onClick={() => handleDeleteChild(child.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg"><Trash2 size={16}/></button>
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 ) : (
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingChild(null)}><ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-wider">Back</span></div>
                      <h2 className="text-2xl font-bold mb-6">Child Profile</h2>
                      <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                             <input className="w-full p-3 border rounded-xl" placeholder="Name" value={editingChild.name} onChange={e => setEditingChild({...editingChild, name: e.target.value})} />
                             <input className="w-full p-3 border rounded-xl" type="number" placeholder="Age" value={editingChild.age} onChange={e => setEditingChild({...editingChild, age: parseInt(e.target.value)})} />
                         </div>
                         <input className="w-full p-3 border rounded-xl" placeholder="Dream" value={editingChild.dream} onChange={e => setEditingChild({...editingChild, dream: e.target.value})} />
                         <textarea className="w-full p-3 border rounded-xl h-32" placeholder="Bio" value={editingChild.bio} onChange={e => setEditingChild({...editingChild, bio: e.target.value})} />
                         <ImageUploader label="Photo" accept="image/*" onUploadComplete={data => setEditingChild({...editingChild, image: data.url})} />
                         <button onClick={handleSaveChild} className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg">Save Profile</button>
                      </div>
                    </div>
                 )}
               </div>
            )}

            {/* STORIES TAB */}
            {activeTab === 'stories' && (
               <div className="space-y-6">
                 {!editingStory ? (
                    <div className="space-y-4">
                       <button onClick={() => setEditingStory({ title: '', category: 'Success Story', excerpt: '', content: '', image: 'https://picsum.photos/800/400', mediaType: 'image' })} className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 flex justify-center items-center gap-2"><Plus size={24} /> Write New Story</button>
                       {content.stories.map(story => (
                          <div key={story.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-center">
                             <img src={story.image} className="w-24 h-24 rounded-lg object-cover" />
                             <div className="flex-1">
                                <h3 className="font-bold text-lg">{story.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-1">{story.excerpt}</p>
                             </div>
                             <button onClick={() => setEditingStory(story)} className="p-2 bg-slate-100 rounded-lg"><Edit2 size={16}/></button>
                             <button onClick={() => handleDeleteStory(story.id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 size={16}/></button>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                       <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingStory(null)}><ChevronLeft size={20} /> Back</div>
                       <h2 className="text-2xl font-bold mb-6">Edit Story</h2>
                       <div className="space-y-4">
                          <input className="w-full p-3 border rounded-xl font-bold text-lg" placeholder="Title" value={editingStory.title} onChange={e => setEditingStory({...editingStory, title: e.target.value})} />
                          <textarea className="w-full p-3 border rounded-xl h-24" placeholder="Excerpt" value={editingStory.excerpt} onChange={e => setEditingStory({...editingStory, excerpt: e.target.value})} />
                          <textarea className="w-full p-3 border rounded-xl h-64 font-mono text-sm" placeholder="Full Content" value={editingStory.content} onChange={e => setEditingStory({...editingStory, content: e.target.value})} />
                          <ImageUploader label="Cover Media" accept="image/*,video/*" onUploadComplete={data => setEditingStory({...editingStory, image: data.url, mediaType: data.type})} />
                          <button onClick={handleSaveStory} className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg">Publish</button>
                       </div>
                    </div>
                 )}
               </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                        <select className="p-3 border rounded-xl w-full" value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value as any)}>
                          <option value="General">General</option><option value="Education">Education</option><option value="Community">Community</option><option value="Welfare">Welfare</option>
                        </select>
                    </div>
                    <div className="flex-1"><ImageUploader onUploadComplete={handleGalleryUpload} label="" accept="image/*,video/*" /></div>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {content.gallery.map((item) => (
                       <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-200">
                          {item.type === 'video' ? <video src={item.url} className="w-full h-full object-cover" muted /> : <img src={item.url} className="w-full h-full object-cover" />}
                          <button onClick={() => handleDeleteGalleryItem(item.id)} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
               <div className="max-w-2xl mx-auto md:mx-0 bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                        <Lock className="text-teal-600" size={24} /> Admin Security
                    </h2>
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                            <input 
                                type="password"
                                className="w-full p-4 border rounded-xl text-base" 
                                value={newAdminPassword}
                                onChange={(e) => setNewAdminPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="pt-4">
                            <button 
                                onClick={handleUpdatePassword}
                                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-lg shadow-lg"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};