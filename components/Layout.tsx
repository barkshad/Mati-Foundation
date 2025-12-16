import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useContent } from '../contexts/ContentContext';
import { Loading } from './Loading';

interface LayoutProps {
  children: React.ReactNode;
}

// Helper to generate a palette from a hex color
// Returns array of hex strings for [50, 100, ... 950]
const generatePalette = (hex: string) => {
    // Simple mixing logic
    const mix = (color1: string, color2: string, weight: number) => {
        const d2h = (d: number) => d.toString(16).padStart(2, '0');
        const h2d = (h: string) => parseInt(h, 16);
        let color = "#";
        for(let i = 1; i < 7; i += 2) {
            const v1 = h2d(color1.substr(i, 2));
            const v2 = h2d(color2.substr(i, 2));
            const val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
            color += val;
        }
        return color;
    };

    return {
        50: mix(hex, "#ffffff", 5),
        100: mix(hex, "#ffffff", 15),
        200: mix(hex, "#ffffff", 30),
        300: mix(hex, "#ffffff", 50),
        400: mix(hex, "#ffffff", 70),
        500: hex,
        600: mix(hex, "#000000", 10),
        700: mix(hex, "#000000", 25),
        800: mix(hex, "#000000", 40),
        900: mix(hex, "#000000", 60),
        950: mix(hex, "#000000", 80),
    };
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = ReactRouterDOM.useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { loading, content } = useContent();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Apply theme variables to root
  useEffect(() => {
    if (content.theme && content.theme.primaryColor) {
        const palette = generatePalette(content.theme.primaryColor);
        const root = document.documentElement;
        
        Object.entries(palette).forEach(([key, value]) => {
            root.style.setProperty(`--color-primary-${key}`, value);
        });
    }
  }, [content.theme]);

  if (loading && !isAdmin) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 relative z-0">
      
      {/* Ambient Background - Moving Orbs for Glassmorphism Depth */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px] animate-float" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px] animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[140px] animate-float" style={{ animationDuration: '18s', animationDelay: '5s' }}></div>
      </div>

      {!isAdmin && <Navbar />}
      <main className={`flex-grow ${!isAdmin ? 'pt-0' : ''} relative z-10`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};