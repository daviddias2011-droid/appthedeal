# 🚀 INSTRUÇÕES DE FUNCIONAMENTO - MISSION DASHBOARD

## 1. O QUE FOI IMPLEMENTADO

### Novo Componente: `MissionDashboard.tsx`
Uma página completa para participantes acompanharem sua missão com:
- ✅ Código de ativação exclusivo
- ✅ Status da missão (Ativa, Concluída, Suspensa)
- ✅ Dados do participante (nome, email, telefone, CPF)
- ✅ Contador de dias desde inscrição
- ✅ Contador de compartilhamentos
- ✅ Meta visual (5+ compartilhamentos para análise prioritária)
- ✅ Dicas para acelerar aprovação
- ✅ Botões para copiar código e compartilhar

### Integração no App
- **URL**: `http://localhost:5173/?mission=CODIGO_AQUI`
- **Rota**: `mission-dashboard`
- **Acesso**: Público (não requer login)
- **Dados**: Lê da tabela `mission_participants` no Supabase

---

## 2. COMO FUNCIONA O FLUXO

### Passo 1: Participante entra na missão
```
MissionsPage.tsx → User preenche formulário (nome, email, CPF, telefone)
                → Sistema gera CÓDIGO ÚNICO
                → Salva em tabela 'mission_participants'
```

### Passo 2: Email é enviado
```
send-mission-code-email (Edge Function)
  ├─ Lê SENDGRID_API_KEY ou RESEND_API_KEY (Supabase Secrets)
  ├─ Envia HTML com CÓDIGO + LINK
  └─ Email enviado para: participante.email@example.com
```

### Passo 3: Participante acessa dashboard
```
Clica no link do email:  http://localhost:5173/?mission=ABC123XYZ
                              ↓
                    MissionDashboard carrega
                              ↓
                    Busca na tabela `mission_participants`
                              ↓
                    Mostra: código, status, dicas, compartilhamentos
```

### Passo 4: Participante compartilha (opcional)
```
Clica em "Copiar Código" ou "Compartilhar"
         ↓
Contador de shares atualiza (+1)
         ↓
Quando chegar a 5 shares → Status visual "Meta alcançada!"
```

---

## 3. COMO CONFIGURAR PARA FUNCIONAR

### A. Criar a tabela `mission_participants`

1. Abra **Supabase Dashboard** → **SQL Editor**
2. Copie TODO o conteúdo de `MISSION_PARTICIPANTS_TABLE.sql`
3. Cole no SQL Editor
4. Clique em **Run**

**O que será criado:**
- Tabela `mission_participants` com colunas:
  - `id` (UUID, chave primária)
  - `full_name`, `email`, `phone`, `cpf`
  - `activation_code` (ÚNICO)
  - `status` (ativa/completa/suspensa)
  - `shared_count` (contador)
  - `created_at`, `updated_at`
- Índices para performance
- RLS Policies para segurança

---

### B. Deploy das Edge Functions

1. No terminal do seu projeto:
```bash
# Deploy send-mission-code-email
supabase functions deploy send-mission-code-email

# Deploy create-checkout (se ainda não fez)
supabase functions deploy create-checkout

# Deploy send-confirmation-email (se ainda não fez)
supabase functions deploy send-confirmation-email
```

2. Se tiver erro de autenticação:
```bash
# Login no Supabase
supabase login
```

---

### C. Configurar Secrets no Supabase

1. **Supabase Dashboard** → **Project Settings** → **Secrets**
2. Adicione cada um:

#### Email (escolha UMA opção)

**Opção 1: SendGrid**
```
SENDGRID_API_KEY = SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL = noreply@thedeal.app (opcional)
```

**Opção 2: Resend**
```
RESEND_API_KEY = re_YLWZ5iYW_5xtNt9nMR13B662EKVR8RE8w
```

#### Stripe (OBRIGATÓRIO)
```
STRIPE_PRICE_PRO_MENSAL = price_1Skls2FdrCGQW...
STRIPE_PRICE_PRO_MENSAL = price_1Skls2FdrCGQW...
STRIPE_PRICE_ELITE_MENSAL = price_1Skls3FdrCGQW...
FRONTEND_URL = http://localhost:5173 (dev) ou https://thedeal.app (prod)
```

**Como pegar do Stripe:**
1. Acesse https://dashboard.stripe.com/
2. **API Keys** → Copie `Secret Key` (sk_test_*)
3. **Products** → Veja os `price_*` IDs
4. Adicione em Supabase Secrets

---

### D. Verificar Trigger de Profiles

Se usuário novo não consegue fazer login, o trigger pode estar falhando:

1. **SQL Editor** no Supabase
2. Execute:
```sql
SELECT * FROM pg_stat_activity WHERE datname = 'postgres';
```

3. Se quiser recriar o trigger:
```bash
# Cole todo o conteúdo de SUPABASE_TRIGGER.sql no SQL Editor
# Execute
```

---

## 4. TESTAR LOCALMENTE

### A. Verificar ambiente
```bash
# Veja o .env.local
cat .env.local

# Deverá ter:
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=eyJ...
# VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
# GEMINI_API_KEY=AIzaSyBsPUxwaUn1DIkBcVpdSLOonrMHbF6nK4g
```

### B. Iniciar dev server
```bash
npm run dev
# Acessa em http://localhost:5173
```

### C. Testar fluxo completo

#### Teste 1: Criar missão
```
1. Vá para http://localhost:5173
2. Clique em "Missões" (ou "Participar")
3. Preencha formulário com dados fictícios
4. Clique em "Cadastrar"
5. Deverá aparecer código: ABC123XYZ
```

#### Teste 2: Acessar dashboard
```
1. Copie o código gerado
2. Abra:  http://localhost:5173/?mission=ABC123XYZ
3. Deverá mostrar dados do participante
4. Teste "Copiar Código" (copiar para clipboard)
5. Teste "Compartilhar" (nativo do navegador)
```

#### Teste 3: Verificar email
```
1. Se configurou SendGrid/Resend, cheque inbox do email
2. Deverá ter recebido email com:
   - Assunto: "🎯 Código de Ativação: ABC123XYZ"
   - Link para: http://localhost:5173/?mission=ABC123XYZ
   - Código em destaque
```

---

## 5. VERIFICAR BANCO DE DADOS

### Ver os participantes cadastrados
```sql
-- No SQL Editor do Supabase
SELECT id, full_name, email, activation_code, status, shared_count, created_at
FROM mission_participants
ORDER BY created_at DESC;
```

### Atualizar status manualmente (admin)
```sql
UPDATE mission_participants
SET status = 'completed'
WHERE activation_code = 'ABC123XYZ';
```

### Contar por status
```sql
SELECT status, COUNT(*) as total
FROM mission_participants
GROUP BY status;
```

---

## 6. CORREÇÕES APLICADAS

✅ **Corrigido**: MissionDashboard.tsx
- Type errors no `.catch()`
- Adicionado proper error handling

✅ **Corrigido**: App.tsx
- Adicionada detecção de `?mission=` na URL
- Rota `mission-dashboard` integrada
- Função para carregar código da missão

✅ **Corrigido**: AI Components (AIInsightsPage, CreatorInsights, BrandInsights, SmartSearch)
- Trocar `process.env.API_KEY` por `import.meta.env.VITE_GEMINI_API_KEY`
- Adicionar validação se chave existe

✅ **Corrigido**: Checkout Components (ValidationPage, PaymentModal)
- Usar `supabase.functions.invoke('create-checkout')` em vez de `/api/create-checkout`
- Melhor error handling

⚠️ **Pendente**: Configuração Supabase
- Executar SQL trigger
- Executar SQL mission_participants
- Deploy Edge Functions
- Adicionar Secrets

---

## 7. DÚVIDAS FREQUENTES

### P: Email não é enviado?
**R**: Cheque se `SENDGRID_API_KEY` ou `RESEND_API_KEY` está em Supabase Secrets. Sem isso, Edge Function falha silenciosamente.

### P: Código não aparece no dashboard?
**R**: Verifique se tabela `mission_participants` foi criada. Se não, execute o SQL.

### P: Link do email não funciona?
**R**: Cheque se `FRONTEND_URL` está correto nos Secrets (localhost:5173 para dev).

### P: Stripe não abre?
**R**: Verifique:
1. `VITE_STRIPE_PUBLISHABLE_KEY` está no `.env.local` com chave real (pk_test_*)
2. Secrets `STRIPE_SECRET_KEY` e `STRIPE_PRICE_*` estão em Supabase
3. Edge Function `create-checkout` foi deployada

### P: Como aumentar shared_count manualmente?
**R**: Execute no SQL:
```sql
UPDATE mission_participants
SET shared_count = shared_count + 1
WHERE activation_code = 'ABC123XYZ';
```

---

## 8. PRÓXIMOS PASSOS (Deployment)

Quando estiver pronto para Vercel:

1. ✅ Build local sem erros:
```bash
npm run build
```

2. ✅ Adicione variables no Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_GEMINI_API_KEY`

3. ✅ Configure Supabase para produção:
   - Use `sk_live_*` e `REMOVIDO*` do Stripe (não test)
   - Confirme CORS em Supabase (permite vercel domain)
   - Edge Functions deployadas

4. ✅ Deploy:
```bash
git push origin main
# Vercel auto-deploy
```

---

## RESUMO RÁPIDO

| Tarefa | Status | Como Fazer |
|--------|--------|-----------|
| MissionDashboard criado | ✅ Pronto | Já integrado em App.tsx |
| Tabela criada | ⏳ Pendente | Executar MISSION_PARTICIPANTS_TABLE.sql |
| Edge Functions deployadas | ⏳ Pendente | `supabase functions deploy ...` |
| Secrets adicionados | ⏳ Pendente | Supabase Dashboard → Settings → Secrets |
| Email enviado | ⏳ Pendente | Configurar SENDGRID ou RESEND |
| Checkout funciona | ⏳ Pendente | Stripe secrets + deploy create-checkout |
| Localtesting | 🟡 Parcial | Funciona UI, precisa backend config |

**Próxima ação**: Executar SQL (2 arquivos) no Supabase Dashboard, depois add secrets e deploy functions.
