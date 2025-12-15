import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminContextType } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("kashindo");

  useEffect(() => {
    // Check local storage for persisted session
    const storedAuth = localStorage.getItem('mati_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Check for stored custom password
    const storedPwd = localStorage.getItem('mati_admin_password');
    if (storedPwd) {
        setCurrentPassword(storedPwd);
    }

    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (password === currentPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('mati_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mati_admin_auth');
  };

  const changePassword = async (newPassword: string) => {
    setCurrentPassword(newPassword);
    localStorage.setItem('mati_admin_password', newPassword);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};