
/**
 * Mock para desativação de backend conforme solicitado.
 */
export const supabase = null;
export const isSupabaseConfigured = () => false;
export const getProfile = async (userId: string) => ({ data: null, error: null });
