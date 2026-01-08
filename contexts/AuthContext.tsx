
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from '../types';
import { USERS } from '../constants';

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
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega sessão local se existir
    const saved = localStorage.getItem('thedeal_session');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('thedeal_session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulação de login local baseada na lista de constantes
    const foundUser = USERS.find(u => u.email === email.toLowerCase());
    
    if (foundUser && foundUser.password === password) {
      setProfile(foundUser);
      localStorage.setItem('thedeal_session', JSON.stringify(foundUser));
      return { error: null };
    }
    
    return { error: { message: 'Membro não localizado no terminal ou chave de segurança incorreta.' } };
  };

  const signOut = async () => {
    setProfile(null);
    localStorage.removeItem('thedeal_session');
  };

  const refreshProfile = async () => {
    // Modo local: Perfil é atualizado via estado
  };

  return (
    <AuthContext.Provider value={{ user: profile, profile, loading, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
