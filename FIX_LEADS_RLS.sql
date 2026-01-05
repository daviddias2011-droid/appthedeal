-- Desabilitar RLS temporariamente ou corrigir policies
-- Execute isso no Supabase SQL Editor

-- Opção 1: Desabilitar RLS completamente (mais permissivo)
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Se quer manter RLS, crie uma policy permissiva para INSERT público:
-- ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow public lead creation"
--   ON public.leads
--   FOR INSERT
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow read own leads"
--   ON public.leads
--   FOR SELECT
--   USING (auth.jwt() ->> 'email' = email OR true);
