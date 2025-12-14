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

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  // Check if we are using the placeholder API key.
  // If so, we switch to LocalStorage mode to prevent Firebase connection errors.
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
        setContent(docSnap.data() as SiteContent);
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

    if (isDemoMode) {
      localStorage.setItem('mati_content', JSON.stringify(newContent));
      return;
    }

    try {
        const docRef = doc(db, 'website_content', 'main_v1');
        await updateDoc(docRef, { [section]: data });
    } catch (e: any) {
        // If the document doesn't exist, updateDoc fails. We try setDoc with merge.
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