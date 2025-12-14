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

// Ensure defaults match the new types
const INITIAL_CONTENT: SiteContent = {
  ...DEFAULT_CONTENT,
  gallery: [
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
  ]
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);

  // Check if we are using the placeholder API key.
  const isDemoMode = !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (isDemoMode) {
      console.log("⚠️ No valid Firebase configuration detected. Running in Offline/Demo Mode using LocalStorage.");
      const localData = localStorage.getItem('mati_content');
      if (localData) {
        try {
          setContent(JSON.parse(localData));
        } catch (e) {
          console.error("Error parsing local content", e);
        }
      }
      setLoading(false);
      return;
    }

    // Real Firebase connection
    const docRef = doc(db, 'website_content', 'main_v1');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        // Migration helper: If gallery is old string[], convert to MediaItem[] locally to prevent crash
        if (Array.isArray(data.gallery) && typeof data.gallery[0] === 'string') {
           data.gallery = data.gallery.map((url: string, i: number) => ({
             id: `legacy-${i}`,
             url,
             publicId: 'legacy',
             type: 'image',
             category: 'General',
             createdAt: new Date().toISOString()
           }));
        }
        setContent(data as SiteContent);
      } else {
        console.log("Document does not exist in Firestore. Using defaults.");
        // Initialize DB with defaults if needed
        // setDoc(docRef, INITIAL_CONTENT);
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

    if (isDemoMode) {
      localStorage.setItem('mati_content', JSON.stringify(newContent));
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
           alert("Changes saved locally only (Database connection failed).");
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