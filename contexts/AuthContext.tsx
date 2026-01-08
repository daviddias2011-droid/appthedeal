import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, getProfile, isSupabaseConfigured } from '../lib/supabase';
import { User, UserType } from '../types';

interface AuthContextType {
  user: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    if (!isSupabaseConfigured() || !supabase) return;
    try {
      const { data, error } = await getProfile(userId);
      if (data && !error) {
        setProfile({
          id: data.id,
          name: data.full_name || 'Membro',
          username: data.username || 'membro',
          email: data.email || '',
          type: data.user_type as UserType || UserType.Creator,
          phone: data.phone || '',
          isVetted: data.is_vetted || false,
          dealsCompleted: data.deals_count || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          balance: data.balance || 0,
          logoUrl: data.avatar_url,
          total_points: data.total_points || 0
        });
      }
    } catch (e) {
      console.error("Erro ao carregar perfil (DNS/Database offline):", e);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      // Fallback para modo demo local se existir
      const demo = localStorage.getItem('demo_profile');
      if (demo) setProfile(JSON.parse(demo));
      return;
    }

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        if (session?.user) await fetchProfile(session.user.id);
      } catch (e) {
        console.warn("Falha na inicialização da sessão (DNS ainda propagando).");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      // Mock Login para emergência DNS
      if (email === 'admin@thedeal.app' && password === 'password123') {
        const mockUser = { id: 'admin-id', email } as SupabaseUser;
        setUser(mockUser);
        setProfile({ id: 'admin-id', name: 'Master Access (DNS Offline)', type: UserType.Admin, isVetted: true } as any);
        return { error: null };
      }
      return { error: { message: 'DNS em propagação. Tente novamente em alguns minutos.' } };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('demo_profile');
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