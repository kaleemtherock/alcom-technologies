import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { isTokenExpired } from '../utils/jwt';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isEnrolled: (courseId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => storage.getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = () => {
      const token = storage.getToken();
      if (token && isTokenExpired(token)) {
        handleSessionExpired();
      }
    };

    // Check session every minute
    const intervalId = setInterval(checkSession, 60000);
    
    // Check on mount
    checkSession();

    return () => clearInterval(intervalId);
  }, []);

  const handleSessionExpired = () => {
    storage.clearAll();
    setUser(null);
    navigate('/login', {
      state: { message: 'Your session has expired. Please sign in again.' }
    });
  };

  // Add session check to existing API calls
  const makeAuthenticatedRequest = async (request: () => Promise<any>) => {
    const token = storage.getToken();
    if (token && isTokenExpired(token)) {
      handleSessionExpired();
      throw new Error('Session expired');
    }
    return request();
  };

  // Update existing methods to use makeAuthenticatedRequest
  // Keep only one isEnrolled function with the authenticated request check
  const isEnrolled = async (courseId: string) => {
    if (!user) return false;
    try {
      const { data } = await api.get(`/enrollments/check/${courseId}`);
      return data.isEnrolled;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data } = await api.post('/auth/login', { email, password });
      storage.setToken(data.token);
      storage.setUser(data.user);
      setUser(data.user);
    } catch (err: any) {
      setError('Failed to login. Please check your credentials.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      storage.clearAll();
      setUser(null);
    } catch (err) {
      setError('Failed to logout.');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isEnrolled
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};