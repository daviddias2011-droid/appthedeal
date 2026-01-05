-- ===== FIX 1: Desabilitar RLS na tabela leads =====
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- ===== FIX 2: Criar tabela mission_participants =====
CREATE TABLE IF NOT EXISTS public.mission_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cpf VARCHAR(11),
  activation_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended')),
  shared_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mission_participants_email ON public.mission_participants(email);
CREATE INDEX IF NOT EXISTS idx_mission_participants_code ON public.mission_participants(activation_code);
CREATE INDEX IF NOT EXISTS idx_mission_participants_status ON public.mission_participants(status);

ALTER TABLE public.mission_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own mission participation" ON public.mission_participants;
CREATE POLICY "Users can view own mission participation"
  ON public.mission_participants
  FOR SELECT
  USING (email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "Allow public mission signup" ON public.mission_participants;
CREATE POLICY "Allow public mission signup"
  ON public.mission_participants
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own mission participation" ON public.mission_participants;
CREATE POLICY "Users can update own mission participation"
  ON public.mission_participants
  FOR UPDATE
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');

  -- ===== FIX 2.2: Criar/ajustar tabela profiles =====
  CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

  -- ===== FIX 3: Criar trigger para auto-criar profile =====
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
