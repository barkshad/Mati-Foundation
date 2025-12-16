import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DEFAULT_CONTENT, FIREBASE_CONFIG } from '../constants';
import { SiteContent, ContentContextType, Program } from '../types';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};

// Default gallery items for fallback
const DEFAULT_GALLERY = [
  {
    id: 'g1',
    url: 'https://picsum.photos/800/800?random=10',
    publicId: 'demo/1',
    type: 'image',
    category: 'General',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g2',
    url: 'https://picsum.photos/800/800?random=11',
    publicId: 'demo/2',
    type: 'image',
    category: 'Education',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g3',
    url: 'https://picsum.photos/800/800?random=12',
    publicId: 'demo/3',
    type: 'image',
    category: 'Community',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CONTENT: SiteContent = {
  ...DEFAULT_CONTENT,
  gallery: DEFAULT_GALLERY as any
};

// Helper to load from local storage synchronously
const loadFromLocalStorage = (): SiteContent => {
  if (typeof window === 'undefined') return INITIAL_CONTENT;
  
  const localData = localStorage.getItem('mati_content');
  if (localData) {
    try {
      const parsedData = JSON.parse(localData);
      // Deep merge to ensure structure exists even if local data is partial or old
      const mergedLocal = {
        ...DEFAULT_CONTENT,
        ...parsedData,
        hero: { ...DEFAULT_CONTENT.hero, ...(parsedData.hero || {}) },
        homePage: { ...DEFAULT_CONTENT.homePage, ...(parsedData.homePage || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(parsedData.about || {}) },
        contact: { ...DEFAULT_CONTENT.contact, ...(parsedData.contact || {}) },
        programs: parsedData.programs || DEFAULT_CONTENT.programs,
        stories: parsedData.stories || DEFAULT_CONTENT.stories,
        children: parsedData.children || DEFAULT_CONTENT.children,
        gallery: parsedData.gallery || DEFAULT_CONTENT.gallery,
      };
      
      // Fix potential gallery legacy format issues immediately
      if (Array.isArray(mergedLocal.gallery) && mergedLocal.gallery.length > 0 && typeof mergedLocal.gallery[0] === 'string') {
           mergedLocal.gallery = (mergedLocal.gallery as unknown as string[]).map((url: string, i: number) => ({
             id: `legacy-${i}`,
             url,
             publicId: 'legacy',
             type: 'image',
             category: 'General',
             createdAt: new Date().toISOString()
           }));
      }

      return mergedLocal as SiteContent;
    } catch (e) {
      console.error("Error parsing local content", e);
    }
  }
  return INITIAL_CONTENT;
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state directly from LocalStorage to prevent flash of defaults
  const [content, setContent] = useState<SiteContent>(loadFromLocalStorage);
  
  // If we loaded from localStorage successfully, we might not be "loading" in the user's eyes (demo mode),
  // but for Firebase we still want to fetch fresh data. 
  // However, initializing with local data solves the "flash" of defaults.
  const [loading, setLoading] = useState(true);

  // Check if we are using the placeholder API key.
  const isDemoMode = !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (isDemoMode) {
      console.log("⚠️ No valid Firebase configuration detected. Running in Offline/Demo Mode using LocalStorage.");
      // We already loaded from local storage in useState, so we just set loading to false.
      setLoading(false);
      return;
    }

    // Real Firebase connection
    const docRef = doc(db, 'website_content', 'main_v1');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Deep merge logic
        const mergedData: SiteContent = {
            ...DEFAULT_CONTENT,
            ...data,
            hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
            homePage: { ...DEFAULT_CONTENT.homePage, ...(data.homePage || {}) },
            about: { ...DEFAULT_CONTENT.about, ...(data.about || {}) },
            contact: { ...DEFAULT_CONTENT.contact, ...(data.contact || {}) },
            programs: data.programs || DEFAULT_CONTENT.programs,
            stories: data.stories || DEFAULT_CONTENT.stories,
            children: data.children || DEFAULT_CONTENT.children,
            gallery: data.gallery || DEFAULT_CONTENT.gallery,
        };

        if (Array.isArray(mergedData.gallery) && mergedData.gallery.length > 0 && typeof mergedData.gallery[0] === 'string') {
           mergedData.gallery = (mergedData.gallery as unknown as string[]).map((url: string, i: number) => ({
             id: `legacy-${i}`,
             url,
             publicId: 'legacy',
             type: 'image',
             category: 'General',
             createdAt: new Date().toISOString()
           }));
        }
        setContent(mergedData as SiteContent);
      } else {
        console.log("Document does not exist in Firestore. Using defaults.");
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection issue (falling back to offline mode):", error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const updateContent = async (section: keyof SiteContent, data: any) => {
    const newContent = { ...content, [section]: data };
    
    // Optimistic update for UI
    setContent(newContent);
    
    // Save to local storage immediately as backup/cache
    localStorage.setItem('mati_content', JSON.stringify(newContent));

    if (isDemoMode) {
      return;
    }

    try {
        const docRef = doc(db, 'website_content', 'main_v1');
        await updateDoc(docRef, { [section]: data });
    } catch (e: any) {
        if (e.code === 'not-found') {
           const docRef = doc(db, 'website_content', 'main_v1');
           await setDoc(docRef, { [section]: data }, { merge: true });
        } else {
           console.error("Failed to update content in Firestore", e);
           // We already saved to local storage, so we don't alert the user aggressively, maybe a toast in future
           console.log("Changes saved locally only (Database connection failed).");
        }
    }
  };

  const updateProgram = async (updatedProgram: Program) => {
    const newPrograms = content.programs.map(p => p.id === updatedProgram.id ? updatedProgram : p);
    await updateContent('programs', newPrograms);
  };

  const addProgram = async (program: Program) => {
    const newPrograms = [...content.programs, program];
    await updateContent('programs', newPrograms);
  };

  const deleteProgram = async (id: string) => {
    const newPrograms = content.programs.filter(p => p.id !== id);
    await updateContent('programs', newPrograms);
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateContent, updateProgram, addProgram, deleteProgram }}>
      {children}
    </ContentContext.Provider>
  );
};