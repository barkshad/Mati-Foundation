import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { Navigate } from 'react-router-dom';
import { 
  Layout, Type, Image as ImageIcon, Users, Settings, LogOut, Save, 
  Plus, Trash2, Edit2, ExternalLink, Heart, BookOpen, Video, Film, Menu, X, Check, ChevronLeft
} from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Program, ChildProfile, Story, MediaItem } from '../types';

// Simple UUID generator for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

export const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { content, updateContent } = useContent();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'homepage' | 'programs' | 'sponsorship' | 'stories' | 'gallery' | 'settings'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Edit States
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [editingChild, setEditingChild] = useState<Partial<ChildProfile> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<Story> | null>(null);

  // Gallery Upload State
  const [galleryCategory, setGalleryCategory] = useState<MediaItem['category']>('General');

  // Form States (Local buffers before saving to context/firebase)
  const [heroData, setHeroData] = useState(content.hero);

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

  const handleSaveProgram = async () => {
    if (!editingProgram) return;
    
    const newProgram = {
      ...editingProgram,
      id: editingProgram.id || generateId()
    } as Program;

    const exists = content.programs.find(p => p.id === newProgram.id);
    const newPrograms = exists 
      ? content.programs.map(p => p.id === newProgram.id ? newProgram : p)
      : [...content.programs, newProgram];

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
    
    const newChild = {
      ...editingChild,
      id: editingChild.id || generateId(),
      needsSponsorship: editingChild.needsSponsorship ?? true
    } as ChildProfile;

    const exists = content.children.find(c => c.id === newChild.id);
    const newChildren = exists 
      ? content.children.map(c => c.id === newChild.id ? newChild : c)
      : [...content.children, newChild];

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

    const newStory = {
      ...editingStory,
      id: editingStory.id || generateId(),
      date: editingStory.date || new Date().toISOString().split('T')[0]
    } as Story;

    const exists = content.stories.find(s => s.id === newStory.id);
    const newStories = exists
      ? content.stories.map(s => s.id === newStory.id ? newStory : s)
      : [...content.stories, newStory];

    await updateContent('stories', newStories);
    setEditingStory(null);
  };

  const handleDeleteStory = async (id: string) => {
    if(!window.confirm("Delete this story?")) return;
    const newStories = content.stories.filter(s => s.id !== id);
    await updateContent('stories', newStories);
  };

  const handleGalleryUpload = async (result: { url: string; publicId: string; type: 'image' | 'video' }) => {
    const newItem: MediaItem = {
      id: generateId(),
      url: result.url,
      publicId: result.publicId,
      type: result.type,
      category: galleryCategory,
      createdAt: new Date().toISOString()
    };
    
    const newGallery = [newItem, ...content.gallery];
    await updateContent('gallery', newGallery);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if(!window.confirm("Delete this media item? Note: This removes it from the website but may remain in Cloudinary backup.")) return;
    const newGallery = content.gallery.filter(item => item.id !== id);
    await updateContent('gallery', newGallery);
  };

  // Mock Data
  const donationData = [
    { name: 'Jan', amount: 4000 }, { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 }, { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 }, { name: 'Jun', amount: 3390 },
  ];

  const menuItems = [
    { id: 'overview', icon: Layout, label: 'Overview' },
    { id: 'homepage', icon: Type, label: 'Homepage' },
    { id: 'programs', icon: BookOpen, label: 'Programs' },
    { id: 'sponsorship', icon: Users, label: 'Sponsorship' },
    { id: 'stories', icon: Heart, label: 'Stories' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'settings', icon: Settings, label: 'Settings' },
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
        md:relative md:translate-x-0 md:w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center font-bold font-serif text-white">M</div>
             <span className="font-bold tracking-wide text-lg">Mati Admin</span>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 p-1 hover:text-white rounded-md hover:bg-slate-800">
             <X size={24} />
           </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 md:py-3 rounded-xl transition-all duration-200 text-base font-medium ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 text-slate-400 hover:text-white text-base w-full px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
            <LogOut size={20} /> Sign Out
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
            <span className="font-bold text-slate-900 capitalize text-lg">{activeTab}</span>
          </div>
          {/* Contextual Action Button (Mobile) - e.g. Back if editing */}
          {(editingProgram || editingChild || editingStory) && (
             <button 
                onClick={() => { setEditingProgram(null); setEditingChild(null); setEditingStory(null); }}
                className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
             >
                Cancel
             </button>
          )}
        </div>

        <div className="p-4 md:p-8 pb-32 max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden md:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-800 capitalize">{activeTab}</h1>
              <p className="text-slate-500 text-sm mt-1">Manage your website content safely.</p>
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
                        placeholder="e.g. Empowering Future Generations"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Sub-headline</label>
                      <textarea 
                        value={heroData.subheadline} 
                        onChange={(e) => setHeroData({...heroData, subheadline: e.target.value})}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none h-32 text-base leading-relaxed"
                        placeholder="e.g. Providing shelter, education..."
                      />
                    </div>

                    <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                      <label className="block text-sm font-bold text-slate-700 mb-4">Background Image</label>
                      <div className="flex flex-col gap-4">
                         {heroData.heroImage && (
                            <img src={heroData.heroImage} alt="Current Hero" className="w-full h-48 object-cover rounded-lg shadow-sm" />
                         )}
                         <div className="w-full">
                            <ImageUploader 
                              label=""
                              accept="image/*"
                              onUploadComplete={(data) => setHeroData({...heroData, heroImage: data.url})} 
                            />
                         </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button 
                        onClick={handleSaveHero}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 text-lg"
                      >
                        <Save size={20} /> Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROGRAMS TAB */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                {!editingProgram ? (
                  // List View
                  <div className="grid gap-4">
                    <button 
                      onClick={() => setEditingProgram({ title: '', description: '', stats: '', image: 'https://picsum.photos/400/300' })}
                      className="w-full py-6 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 active:bg-slate-100"
                    >
                      <Plus size={24} /> Add New Program
                    </button>
                    
                    {content.programs.map(program => (
                      <div key={program.id} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                        <img src={program.image} alt={program.title} className="w-full md:w-32 h-40 md:h-32 object-cover rounded-xl" />
                        <div className="flex-1 text-left w-full">
                          <h3 className="font-bold text-lg text-slate-800">{program.title}</h3>
                          <p className="text-slate-500 line-clamp-2 mt-1 text-sm md:text-base">{program.description}</p>
                          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold mt-3">
                            {program.stats}
                          </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto pt-2 md:pt-0">
                          <button onClick={() => setEditingProgram(program)} className="flex-1 md:flex-none p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
                            <Edit2 size={18} /> <span className="md:hidden">Edit</span>
                          </button>
                          <button onClick={() => handleDeleteProgram(program.id)} className="flex-1 md:flex-none p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
                            <Trash2 size={18} /> <span className="md:hidden">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Edit View
                  <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                     <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingProgram(null)}>
                        <ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-wider">Back to List</span>
                     </div>
                     <h2 className="text-2xl font-bold mb-6 text-slate-800">{editingProgram.id ? 'Edit Program' : 'New Program'}</h2>
                     <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                          <input 
                            className="w-full p-4 border border-slate-200 rounded-xl text-base outline-none focus:border-teal-500" 
                            placeholder="Program Title"
                            value={editingProgram.title}
                            onChange={e => setEditingProgram({...editingProgram, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                          <textarea 
                            className="w-full p-4 border border-slate-200 rounded-xl h-40 text-base outline-none focus:border-teal-500" 
                            placeholder="Description"
                            value={editingProgram.description}
                            onChange={e => setEditingProgram({...editingProgram, description: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Impact Stats</label>
                          <input 
                            className="w-full p-4 border border-slate-200 rounded-xl text-base outline-none focus:border-teal-500" 
                            placeholder="e.g. '150+ Kids'"
                            value={editingProgram.stats}
                            onChange={e => setEditingProgram({...editingProgram, stats: e.target.value})}
                          />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-3">Cover Image</p>
                          <ImageUploader 
                            accept="image/*"
                            onUploadComplete={data => setEditingProgram({...editingProgram, image: data.url})} 
                          />
                          {editingProgram.image && <img src={editingProgram.image} className="h-40 w-full object-cover rounded-lg mt-3" />}
                        </div>
                        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                          <button onClick={() => setEditingProgram(null)} className="px-6 py-4 md:py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl w-full md:w-auto">Cancel</button>
                          <button onClick={handleSaveProgram} className="px-6 py-4 md:py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 w-full md:w-auto shadow-lg flex items-center justify-center gap-2">
                            <Save size={18} /> Save Program
                          </button>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* SPONSORSHIP (CHILDREN) TAB */}
            {activeTab === 'sponsorship' && (
               <div className="space-y-6">
                 {!editingChild ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <button 
                        onClick={() => setEditingChild({ name: '', age: 5, dream: '', bio: '', image: 'https://picsum.photos/400/500', needsSponsorship: true })}
                        className="min-h-[150px] md:min-h-[300px] border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center justify-center gap-2 p-8 active:bg-slate-100"
                      >
                        <Plus size={32} />
                        <span>Add Profile</span>
                      </button>
                      {content.children.map(child => (
                        <div key={child.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group relative flex md:block">
                           <img src={child.image} className="w-32 md:w-full h-32 md:h-56 object-cover" />
                           <div className="p-4 flex-1 flex flex-col justify-between">
                             <div>
                               <div className="flex justify-between items-start mb-1">
                                 <h3 className="font-bold text-lg">{child.name}, {child.age}</h3>
                               </div>
                               <p className="text-teal-600 text-sm font-medium mb-2">{child.dream}</p>
                               {child.needsSponsorship && <span className="inline-block text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide mb-2">Needs Sponsor</span>}
                             </div>
                             <div className="flex gap-2 mt-2 md:mt-4">
                               <button onClick={() => setEditingChild(child)} className="flex-1 py-2 bg-slate-100 rounded-lg text-slate-700 font-bold text-xs hover:bg-slate-200">Edit</button>
                               <button onClick={() => handleDeleteChild(child.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
                             </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 ) : (
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingChild(null)}>
                        <ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-wider">Back to List</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-6 text-slate-800">Child Profile</h2>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                            <input className="w-full p-3 border rounded-xl text-base" value={editingChild.name} onChange={e => setEditingChild({...editingChild, name: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Age</label>
                            <input className="w-full p-3 border rounded-xl text-base" type="number" value={editingChild.age} onChange={e => setEditingChild({...editingChild, age: parseInt(e.target.value)})} />
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Dream</label>
                            <input className="w-full p-3 border rounded-xl text-base" placeholder="e.g. Doctor" value={editingChild.dream} onChange={e => setEditingChild({...editingChild, dream: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Bio</label>
                            <textarea className="w-full p-3 border rounded-xl h-32 text-base" placeholder="Biography" value={editingChild.bio} onChange={e => setEditingChild({...editingChild, bio: e.target.value})} />
                         </div>
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Photo</p>
                            <ImageUploader 
                              label="" 
                              accept="image/*"
                              onUploadComplete={data => setEditingChild({...editingChild, image: data.url})} 
                            />
                            {editingChild.image && <img src={editingChild.image} className="h-32 w-32 object-cover rounded-lg mt-3" />}
                         </div>
                         <label className="flex items-center gap-3 cursor-pointer select-none p-4 border border-slate-200 rounded-xl">
                           <input type="checkbox" className="w-6 h-6 accent-teal-600 rounded" checked={editingChild.needsSponsorship} onChange={e => setEditingChild({...editingChild, needsSponsorship: e.target.checked})} />
                           <span className="font-bold text-slate-700">Needs Sponsorship?</span>
                         </label>
  
                         <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t mt-6">
                            <button onClick={() => setEditingChild(null)} className="px-6 py-4 md:py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl w-full md:w-auto">Cancel</button>
                            <button onClick={handleSaveChild} className="px-6 py-4 md:py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 w-full md:w-auto shadow-lg flex items-center justify-center gap-2">
                               <Save size={18} /> Save Profile
                            </button>
                         </div>
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
                       <button onClick={() => setEditingStory({ title: '', category: 'Success Story', excerpt: '', content: '', image: 'https://picsum.photos/800/400' })} className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 flex justify-center items-center gap-2 shadow-md active:scale-95 transition-transform">
                          <Plus size={24} /> Write New Story
                       </button>
                       {content.stories.map(story => (
                          <div key={story.id} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-start">
                             <img src={story.image} className="w-full md:w-32 h-40 md:h-24 object-cover rounded-lg" />
                             <div className="flex-1 w-full">
                                <div className="flex justify-between items-start">
                                   <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{story.category}</span>
                                   <span className="text-xs text-slate-400">{story.date}</span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 mt-1">{story.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mt-2">{story.excerpt}</p>
                             </div>
                             <div className="flex gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0 border-slate-100">
                               <button onClick={() => setEditingStory(story)} className="flex-1 md:flex-none p-3 text-slate-600 bg-slate-50 rounded-lg font-bold text-sm">Edit</button>
                               <button onClick={() => handleDeleteStory(story.id)} className="flex-1 md:flex-none p-3 text-red-600 bg-red-50 rounded-lg font-bold text-sm">Delete</button>
                             </div>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                       <div className="flex items-center gap-2 mb-6 text-slate-400 cursor-pointer" onClick={() => setEditingStory(null)}>
                          <ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-wider">Back to List</span>
                       </div>
                       <h2 className="text-2xl font-bold mb-6">Edit Story</h2>
                       <div className="space-y-4">
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                             <input className="w-full p-3 border rounded-xl font-bold text-lg" value={editingStory.title} onChange={e => setEditingStory({...editingStory, title: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                <select className="w-full p-3 border rounded-xl bg-white" value={editingStory.category} onChange={e => setEditingStory({...editingStory, category: e.target.value as any})}>
                                    <option>Success Story</option>
                                    <option>Education</option>
                                    <option>Community</option>
                                </select>
                             </div>
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                                <input type="date" className="w-full p-3 border rounded-xl bg-white" value={editingStory.date} onChange={e => setEditingStory({...editingStory, date: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 uppercase">Short Excerpt</label>
                             <textarea className="w-full p-3 border rounded-xl h-24 text-base" value={editingStory.excerpt} onChange={e => setEditingStory({...editingStory, excerpt: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500 uppercase">Content</label>
                             <textarea className="w-full p-3 border rounded-xl h-64 font-mono text-sm leading-relaxed" placeholder="Write full story..." value={editingStory.content} onChange={e => setEditingStory({...editingStory, content: e.target.value})} />
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                             <p className="text-xs font-bold text-slate-500 uppercase mb-2">Cover Image</p>
                            <ImageUploader 
                              label="" 
                              accept="image/*"
                              onUploadComplete={data => setEditingStory({...editingStory, image: data.url})} 
                            />
                            {editingStory.image && <img src={editingStory.image} className="h-32 w-full md:w-auto rounded-lg mt-3 object-cover" />}
                          </div>
                          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t mt-6">
                             <button onClick={() => setEditingStory(null)} className="px-6 py-4 md:py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl w-full md:w-auto">Cancel</button>
                             <button onClick={handleSaveStory} className="px-6 py-4 md:py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 w-full md:w-auto shadow-lg flex items-center justify-center gap-2">
                                <Save size={18} /> Publish
                             </button>
                          </div>
                       </div>
                    </div>
                 )}
               </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                 <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Film size={20} className="text-teal-600"/> Add New Media</h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <select 
                          className="p-3 border rounded-xl bg-slate-50 w-full md:w-auto font-bold text-slate-700" 
                          value={galleryCategory} 
                          onChange={(e) => setGalleryCategory(e.target.value as any)}
                        >
                          <option value="General">General</option>
                          <option value="Education">Education</option>
                          <option value="Community">Community</option>
                          <option value="Welfare">Welfare</option>
                        </select>
                        <div className="flex-1">
                          <ImageUploader 
                            onUploadComplete={handleGalleryUpload} 
                            label=""
                            accept="image/*,video/*" 
                          />
                        </div>
                      </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                    {content.gallery.map((item) => (
                       <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-200">
                          {item.type === 'video' ? (
                            <div className="w-full h-full relative">
                              <video src={item.url} className="w-full h-full object-cover" muted />
                              <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><Film size={10}/> Video</div>
                            </div>
                          ) : (
                            <img src={item.url} className="w-full h-full object-cover" loading="lazy" />
                          )}
                          
                          {/* Always visible delete button on mobile, hover on desktop */}
                          <button 
                            onClick={() => handleDeleteGalleryItem(item.id)} 
                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                             <span className="text-white text-[10px] font-bold px-2 py-1 bg-teal-600/80 backdrop-blur-sm rounded-full">{item.category}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
               <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto md:mx-0">
                  <h2 className="text-xl font-bold mb-6">Contact & Payment Settings</h2>
                  <div className="space-y-5">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                        <input className="w-full p-4 border rounded-xl text-base" defaultValue={content.contact.email} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                        <input className="w-full p-4 border rounded-xl text-base" defaultValue={content.contact.phone} />
                     </div>
                     <div className="pt-6 border-t space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Bank Details</label>
                        <textarea className="w-full p-4 border rounded-xl h-24 font-mono text-sm leading-relaxed" defaultValue={content.contact.bankDetails} />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">M-Pesa</label>
                        <input className="w-full p-4 border rounded-xl font-mono text-sm" defaultValue={content.contact.mpesa} />
                     </div>
                     <div className="pt-4">
                        <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-lg shadow-lg">Save Settings</button>
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