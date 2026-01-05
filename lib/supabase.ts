
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Singleton para o cliente Supabase.
 * Retorna null caso as credenciais não estejam configuradas no ambiente.
 */
export const supabase = (() => {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
})();

export const isSupabaseConfigured = () => !!supabase;

export const getProfile = async (userId: string) => {
  if (!supabase) return { data: null, error: new Error('Database not configured') };
  return await supabase.from('profiles').select('*').eq('id', userId).single();
};
