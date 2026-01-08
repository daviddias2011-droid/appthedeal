
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '../types';
import { api } from '../lib/api';

interface AuthContextType {
  user: any | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const data = await api.post('/get_profile.php', { userId });
      if (data) {
        setProfile({
          id: data.id,
          name: data.full_name || 'Membro',
          username: data.username || 'membro',
          email: data.email || '',
          type: data.user_type as UserType || UserType.Creator,
          phone: data.phone || '',
          isVetted: data.is_vetted == 1,
          dealsCompleted: data.deals_count || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          balance: data.balance || 0,
          logoUrl: data.avatar_url,
          total_points: data.total_points || 0
        });
      }
    } catch (e) {
      console.error("Erro ao carregar perfil do MySQL:", e);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedSession = localStorage.getItem('thedeal_session');
        if (savedSession) {
          const session = JSON.parse(savedSession);
          setUser(session);
          await fetchProfile(session.id);
        }
      } catch (e) {
        console.warn("Sessão expirada ou terminal inacessível.");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.post('/login.php', { email, password });
      setUser(data.user);
      localStorage.setItem('thedeal_session', JSON.stringify(data.user));
      await fetchProfile(data.user.id);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('thedeal_session');
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
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
