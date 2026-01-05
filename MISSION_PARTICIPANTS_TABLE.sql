-- Tabela para rastrear participantes de missões
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

-- Índices para melhor performance
CREATE INDEX idx_mission_participants_email ON public.mission_participants(email);
CREATE INDEX idx_mission_participants_code ON public.mission_participants(activation_code);
CREATE INDEX idx_mission_participants_status ON public.mission_participants(status);

-- RLS Policy para permitir leitura da própria participação
ALTER TABLE public.mission_participants ENABLE ROW LEVEL SECURITY;

-- Policy: usuários podem ver suas próprias participações
CREATE POLICY "Users can view own mission participation"
  ON public.mission_participants
  FOR SELECT
  USING (email = auth.jwt() ->> 'email');

-- Policy: permitir insert sem autenticação (durante signup)
CREATE POLICY "Allow public mission signup"
  ON public.mission_participants
  FOR INSERT
  WITH CHECK (true);

-- Policy: usuários podem atualizar suas próprias participações
CREATE POLICY "Users can update own mission participation"
  ON public.mission_participants
  FOR UPDATE
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');
