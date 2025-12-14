import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Incorrect Access Key');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-2">Restricted area for foundation staff.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-center text-lg tracking-widest"
              placeholder="•••••"
              required 
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-slate-900 text-white py-4 rounded-xl font-bold transition-all ${isLoading ? 'opacity-70' : 'hover:bg-slate-800 hover:shadow-lg'}`}
          >
            {isLoading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-slate-400 text-sm hover:text-slate-600">
            &larr; Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};