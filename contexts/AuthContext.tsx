
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: { token: string } | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('/api/perfil.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({
          id: data.id,
          name: data.full_name || 'Membro Alpha',
          username: data.username || 'membro',
          email: data.email || '',
          type: data.user_type as UserType || UserType.Creator,
          phone: data.phone || '',
          isVetted: Boolean(data.is_vetted),
          dealsCompleted: data.deals_count || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          balance: data.balance || 0,
          logoUrl: data.avatar_url,
          total_points: data.total_points || 0
        });
      } else if (response.status === 401) {
        signOut();
      }
    } catch (e) {
      console.error("Erro ao carregar perfil Alpha:", e);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        setUser({ token });
        await fetchProfile(token);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação Alpha.');
      }

      localStorage.setItem('auth_token', data.token);
      setUser({ token: data.token });
      
      setProfile({
        id: data.user.id,
        name: data.user.full_name,
        username: data.user.username,
        email: data.user.email,
        type: data.user.user_type as UserType,
        phone: data.user.phone || '',
        isVetted: Boolean(data.user.is_vetted),
        dealsCompleted: data.user.deals_count || 0,
        followers: data.user.followers || 0,
        following: data.user.following || 0,
        balance: data.user.balance || 0,
        logoUrl: data.user.avatar_url,
        total_points: data.user.total_points || 0
      });

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) await fetchProfile(token);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
