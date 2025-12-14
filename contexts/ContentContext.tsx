import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DEFAULT_CONTENT } from '../constants';
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

  useEffect(() => {
    // Subscribe to Firestore updates
    const docRef = doc(db, 'website_content', 'main_v1');
    
    // Note: If permission denied (common without valid keys), this will fail gracefully
    // and we stick with DEFAULT_CONTENT
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data() as SiteContent);
      } else {
        // If doc doesn't exist, we might want to create it (admin only usually)
        // or just keep defaults
        console.log("No content found in DB, using defaults");
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection failed (expected if no API keys), using offline content.", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (section: keyof SiteContent, data: any) => {
    try {
        const docRef = doc(db, 'website_content', 'main_v1');
        // Merging logic
        const newContent = { ...content, [section]: data };
        
        // Optimistic update
        setContent(newContent);
        
        // Write to DB
        await updateDoc(docRef, { [section]: data });
    } catch (e) {
        console.error("Failed to update content", e);
        alert("Could not save to database. Check console/permissions.");
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