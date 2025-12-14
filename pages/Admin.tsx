import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { Navigate } from 'react-router-dom';
import { 
  Layout, Type, Image as ImageIcon, Users, Settings, LogOut, Save, 
  Plus, Trash2, Edit2, ExternalLink, Heart, BookOpen, User 
} from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Program, ChildProfile, Story } from '../types';

// Simple UUID generator for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

export const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { content, updateContent } = useContent();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'homepage' | 'programs' | 'sponsorship' | 'stories' | 'gallery' | 'settings'>('overview');
  
  // Edit States
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [editingChild, setEditingChild] = useState<Partial<ChildProfile> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<Story> | null>(null);

  // Form States (Local buffers before saving to context/firebase)
  const [heroData, setHeroData] = useState(content.hero);

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

  const handleGalleryUpload = async (url: string) => {
    const newGallery = [...content.gallery, url];
    await updateContent('gallery', newGallery);
  };

  const handleDeleteGalleryImage = async (index: number) => {
    if(!window.confirm("Remove this image from gallery?")) return;
    const newGallery = content.gallery.filter((_, i) => i !== index);
    await updateContent('gallery', newGallery);
  };

  // Mock Data
  const donationData = [
    { name: 'Jan', amount: 4000 }, { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 }, { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 }, { name: 'Jun', amount: 3390 },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
           <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center font-bold font-serif">M</div>
           <span className="font-bold tracking-wide">Mati CMS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', icon: Layout, label: 'Overview' },
            { id: 'homepage', icon: Type, label: 'Homepage' },
            { id: 'programs', icon: BookOpen, label: 'Programs' },
            { id: 'sponsorship', icon: Users, label: 'Sponsorship' },
            { id: 'stories', icon: Heart, label: 'Stories' },
            { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm w-full px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800 capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your website content safely.</p>
          </div>
          <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <ExternalLink size={16} /> View Live Site
          </a>
        </header>

        <div className="max-w-6xl mx-auto pb-20">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Children</h3>
                  <div className="text-4xl font-bold text-teal-600">{content.children.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Programs Active</h3>
                  <div className="text-4xl font-bold text-purple-600">{content.programs.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Stories Published</h3>
                  <div className="text-4xl font-bold text-orange-600">{content.stories.length}</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-96">
                <h3 className="font-bold text-slate-800 mb-6">Donation Trends (Year to Date)</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={donationData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="amount" fill="#0d9488" radius={[4, 4, 4, 4]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* HOMEPAGE TAB */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
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
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg"
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

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-4">Background Image</label>
                    <div className="flex gap-6 items-start">
                       <img src={heroData.heroImage} alt="Current Hero" className="w-32 h-20 object-cover rounded-lg shadow-sm" />
                       <div className="flex-1">
                          <ImageUploader 
                            label=""
                            onUploadComplete={(url) => setHeroData({...heroData, heroImage: url})} 
                          />
                          <p className="text-xs text-slate-400 mt-2">Recommended: 1920x1080px (JPG)</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={handleSaveHero}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                      <Save size={18} /> Save Changes
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
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={20} /> Add New Program
                  </button>
                  
                  {content.programs.map(program => (
                    <div key={program.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                      <img src={program.image} alt={program.title} className="w-full md:w-32 h-32 object-cover rounded-xl" />
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-xl text-slate-800">{program.title}</h3>
                        <p className="text-slate-500 line-clamp-2 mt-1">{program.description}</p>
                        <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold mt-3">
                          {program.stats}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setEditingProgram(program)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteProgram(program.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Edit View
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                   <h2 className="text-2xl font-bold mb-6">{editingProgram.id ? 'Edit Program' : 'New Program'}</h2>
                   <div className="space-y-4">
                      <input 
                        className="w-full p-3 border rounded-lg" 
                        placeholder="Program Title"
                        value={editingProgram.title}
                        onChange={e => setEditingProgram({...editingProgram, title: e.target.value})}
                      />
                      <textarea 
                        className="w-full p-3 border rounded-lg h-32" 
                        placeholder="Description"
                        value={editingProgram.description}
                        onChange={e => setEditingProgram({...editingProgram, description: e.target.value})}
                      />
                      <input 
                        className="w-full p-3 border rounded-lg" 
                        placeholder="Impact Stats (e.g. '150+ Kids')"
                        value={editingProgram.stats}
                        onChange={e => setEditingProgram({...editingProgram, stats: e.target.value})}
                      />
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-bold mb-2">Cover Image</p>
                        <ImageUploader onUploadComplete={url => setEditingProgram({...editingProgram, image: url})} />
                        {editingProgram.image && <img src={editingProgram.image} className="h-32 rounded mt-2" />}
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setEditingProgram(null)} className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
                        <button onClick={handleSaveProgram} className="px-6 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700">Save Program</button>
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
                      className="min-h-[300px] border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      <Plus size={32} />
                      <span>Add Profile</span>
                    </button>
                    {content.children.map(child => (
                      <div key={child.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group relative">
                         <img src={child.image} className="w-full h-48 object-cover" />
                         <div className="p-4">
                           <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg">{child.name}, {child.age}</h3>
                             {child.needsSponsorship && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Needs Sponsor</span>}
                           </div>
                           <p className="text-slate-500 text-sm mb-4">Dreams of being a {child.dream}</p>
                           <div className="flex gap-2">
                             <button onClick={() => setEditingChild(child)} className="flex-1 py-2 bg-slate-100 rounded-lg text-slate-700 font-bold text-xs hover:bg-slate-200">Edit</button>
                             <button onClick={() => handleDeleteChild(child.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
                           </div>
                         </div>
                      </div>
                    ))}
                 </div>
               ) : (
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Child Profile</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                       <input className="p-3 border rounded-lg" placeholder="Name" value={editingChild.name} onChange={e => setEditingChild({...editingChild, name: e.target.value})} />
                       <input className="p-3 border rounded-lg" type="number" placeholder="Age" value={editingChild.age} onChange={e => setEditingChild({...editingChild, age: parseInt(e.target.value)})} />
                    </div>
                    <div className="space-y-4">
                       <input className="w-full p-3 border rounded-lg" placeholder="Dream (e.g. Doctor)" value={editingChild.dream} onChange={e => setEditingChild({...editingChild, dream: e.target.value})} />
                       <textarea className="w-full p-3 border rounded-lg h-32" placeholder="Biography / Story" value={editingChild.bio} onChange={e => setEditingChild({...editingChild, bio: e.target.value})} />
                       <div className="p-4 bg-slate-50 rounded-lg">
                          <ImageUploader label="Profile Photo" onUploadComplete={url => setEditingChild({...editingChild, image: url})} />
                          {editingChild.image && <img src={editingChild.image} className="h-24 w-24 object-cover rounded-full mt-2" />}
                       </div>
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" className="w-5 h-5 accent-teal-600" checked={editingChild.needsSponsorship} onChange={e => setEditingChild({...editingChild, needsSponsorship: e.target.checked})} />
                         <span className="font-bold text-slate-700">Currently needs sponsorship</span>
                       </label>

                       <div className="flex justify-end gap-3 pt-4 border-t">
                          <button onClick={() => setEditingChild(null)} className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
                          <button onClick={handleSaveChild} className="px-6 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700">Save Profile</button>
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
                     <button onClick={() => setEditingStory({ title: '', category: 'Success Story', excerpt: '', content: '', image: 'https://picsum.photos/800/400' })} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 flex justify-center items-center gap-2">
                        <Plus size={20} /> Write New Story
                     </button>
                     {content.stories.map(story => (
                        <div key={story.id} className="bg-white p-6 rounded-xl border border-slate-100 flex gap-4 items-start">
                           <img src={story.image} className="w-24 h-24 object-cover rounded-lg" />
                           <div className="flex-1">
                              <span className="text-xs font-bold text-teal-600 uppercase">{story.category}</span>
                              <h3 className="font-bold text-lg text-slate-800">{story.title}</h3>
                              <p className="text-sm text-slate-500 line-clamp-2">{story.excerpt}</p>
                           </div>
                           <button onClick={() => setEditingStory(story)} className="p-2 text-slate-400 hover:text-teal-600"><Edit2 size={18} /></button>
                           <button onClick={() => handleDeleteStory(story.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                     <h2 className="text-2xl font-bold mb-6">Edit Story</h2>
                     <div className="space-y-4">
                        <input className="w-full p-3 border rounded-lg font-bold text-lg" placeholder="Story Title" value={editingStory.title} onChange={e => setEditingStory({...editingStory, title: e.target.value})} />
                        <div className="flex gap-4">
                           <select className="p-3 border rounded-lg bg-white" value={editingStory.category} onChange={e => setEditingStory({...editingStory, category: e.target.value as any})}>
                              <option>Success Story</option>
                              <option>Education</option>
                              <option>Community</option>
                           </select>
                           <input type="date" className="p-3 border rounded-lg" value={editingStory.date} onChange={e => setEditingStory({...editingStory, date: e.target.value})} />
                        </div>
                        <textarea className="w-full p-3 border rounded-lg h-24" placeholder="Short Excerpt (appears on cards)" value={editingStory.excerpt} onChange={e => setEditingStory({...editingStory, excerpt: e.target.value})} />
                        <textarea className="w-full p-3 border rounded-lg h-64 font-mono text-sm" placeholder="Full Content..." value={editingStory.content} onChange={e => setEditingStory({...editingStory, content: e.target.value})} />
                        <ImageUploader label="Cover Image" onUploadComplete={url => setEditingStory({...editingStory, image: url})} />
                        <div className="flex justify-end gap-3 pt-4">
                           <button onClick={() => setEditingStory(null)} className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
                           <button onClick={handleSaveStory} className="px-6 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700">Publish Story</button>
                        </div>
                     </div>
                  </div>
               )}
             </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold mb-4">Add New Photo</h2>
                  <ImageUploader onUploadComplete={handleGalleryUpload} label="Upload to Cloudinary" />
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.gallery.map((url, idx) => (
                     <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square">
                        <img src={url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button onClick={() => handleDeleteGalleryImage(idx)} className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110">
                              <Trash2 size={20} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
                <h2 className="text-xl font-bold mb-6">Contact & Payment Settings</h2>
                <div className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue={content.contact.email} />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue={content.contact.phone} />
                   </div>
                   <div className="pt-6 border-t">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Bank Details (Displayed publicly)</label>
                      <textarea className="w-full p-3 border rounded-lg h-24 font-mono text-sm" defaultValue={content.contact.bankDetails} />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">M-Pesa Details</label>
                      <input className="w-full p-3 border rounded-lg font-mono text-sm" defaultValue={content.contact.mpesa} />
                   </div>
                   <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Save Settings</button>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
};