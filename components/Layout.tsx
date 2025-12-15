import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useContent } from '../contexts/ContentContext';
import { Loading } from './Loading';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { loading } = useContent();

  if (loading && !isAdmin) {
    return <Loading />;
  }

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