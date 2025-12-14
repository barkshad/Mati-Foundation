import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-teal-50">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow ${!isAdmin ? 'pt-0' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};