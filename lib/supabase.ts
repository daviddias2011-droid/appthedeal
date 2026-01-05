import { createClient } from '@supabase/supabase-js';

// Support both Vite env (import.meta.env.VITE_*) and legacy NEXT_PUBLIC_* names.
const supabaseUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_SUPABASE_URL)
  || process.env.NEXT_PUBLIC_SUPABASE_URL
  || 'https://placeholder.supabase.co';
const supabaseKey = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_SUPABASE_ANON_KEY)
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || undefined;

export const supabase = (() => {
  try {
    if (supabaseUrl && supabaseKey && supabaseKey !== 'undefined' && supabaseUrl.startsWith('http')) {
      return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: true, autoRefreshToken: true }
      });
    }
    console.warn('Supabase não configurado: variáveis de ambiente ausentes. Operando em modo demo/local.');
    return null;
  } catch (e) {
    return null;
  }
})();

// Função crítica para o AuthContext saber se pode ou não inicializar o banco
export const isSupabaseConfigured = () => {
  return !!supabase && supabaseUrl !== 'https://placeholder.supabase.co';
};

export const checkSystemHealth = async () => {
  if (!supabase) return { online: false, reason: 'DNS_PROPAGATION' };
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    return { online: !error, reason: error ? 'DB_CONNECT_ERROR' : 'STABLE' };
  } catch (e) {
    return { online: false, reason: 'NETWORK_RECOVERY' };
  }
};

export async function signupUser(formData: any) {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ MODO OFFLINE: Propagação de DNS detectada.');
    const demoUser = { id: `demo_${Date.now()}`, email: formData.email, full_name: formData.fullName, user_type: formData.userType };
    localStorage.setItem('demo_profile', JSON.stringify(demoUser));
    return { success: true, user: demoUser, isDemo: true };
  }

  try {
    const { data, error } = await supabase!.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.fullName, user_type: formData.userType } }
    });
    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error: any) {
    return { success: false, error: "Conexão em atualização. Tente novamente em 15 minutos." };
  }
}

export async function getProfile(userId: string) {
  if (!isSupabaseConfigured()) return { data: null, error: 'Sincronizando...' };
  return await supabase!.from('profiles').select('*').eq('id', userId).single();
}