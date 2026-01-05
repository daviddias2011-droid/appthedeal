# 🐛 RELATÓRIO COMPLETO DE BUGS E FALHAS

## 1. ERROS CRÍTICOS (TypeScript/Compilation)

### ✅ CORRIGIDOS
- ❌ MissionDashboard.tsx: `.catch()` sem type annotation → **CORRIGIDO**
- ❌ send-mission-code-email: `req` sem type → **CORRIGIDO**

### ⚠️ PRECISA CORRIGIR (Edge Functions - Deno)
**Arquivo**: `supabase/functions/create-checkout/index.ts`
- Imports Deno remote (esm.sh) - OK para Deno, mas VS Code não reconhece
- `Deno` não é acessível em VS Code, mas funciona em produção Supabase
- **Status**: Funcional em Supabase, apenas error visual VS Code

**Arquivo**: `supabase/functions/send-confirmation-email/index.ts`
- Mesmo problema com imports Deno

**Arquivo**: `supabase/functions/send-mission-code-email/index.ts`
- Mesmo problema com imports Deno

---

## 2. BUGS DE LÓGICA

### A. Problema: URL Detection para Missão (App.tsx:45-50)
**Problema**: A detecção de `?mission=CODE` é executada uma única vez no mount. Se o usuário navega para uma missão depois de logar, o código é ignorado.

**Localização**: `App.tsx` - `useEffect` linha 45

**Solução necessária**: Observar mudanças na URL usando `window.location.search` continuamente ou usar History API

**Severity**: ⚠️ MEDIUM

---

### B. Problema: Modal Stripe não abre (Checkout)
**Problema**: User reportou que Stripe modal não abre, retorna à landing page

**Causa**: Provavelmente `stripe.redirectToCheckout()` está falhando silenciosamente

**Arquivo**: `components/PricingPage.tsx` - `handleCheckout()` função

**Fix necessário**: Adicionar logging melhor e tratamento de erro

**Severity**: 🔴 CRITICAL

---

### C. Problema: Login falha com "credenciais erradas"
**Problema**: User não consegue fazer login após signup

**Possíveis causas**:
1. Email não foi verificado (precisa de OTP antes)
2. Usuário não foi criado corretamente em `auth.users`
3. Trigger de `profiles` falhando silenciosamente

**Arquivo**: `App.tsx` - `handleLogin()` linha 74

**Status**: 🔴 CRITICAL - Aguardando diagnóstico via Console

---

### D. Problema: RLS Policy pode estar bloqueando operações
**Problema**: Error "Database error saving new user" quando usuário tenta se registrar

**Causa possível**: RLS policy em `mission_participants` muito restritiva

**Arquivo**: `MISSION_PARTICIPANTS_TABLE.sql`

**Solução implementada**: Policy permite `INSERT` público:
```sql
CREATE POLICY "Allow public mission signup"
  ON public.mission_participants
  FOR INSERT
  WITH CHECK (true);
```

**Status**: ✅ PARCIALMENTE CORRIGIDO - Aguarda execução SQL no Supabase

---

## 3. PROBLEMAS DE CONFIGURAÇÃO

### A. Variáveis de Ambiente Faltando
**Problemas**:
1. `SENDGRID_API_KEY` ou `RESEND_API_KEY` não configurados
   - Edge Functions `send-mission-code-email` e `send-confirmation-email` não enviarão emails
   - **Fix**: Adicionar em Supabase Dashboard → Settings → Secrets

2. `STRIPE_PRICE_PRO_MENSAL` e `STRIPE_PRICE_ELITE_MENSAL` não configurados
   - Checkout vai falhar
   - **Fix**: Adicionar em Supabase Dashboard → Settings → Secrets
   - Valores vêm do Stripe Dashboard → Products

3. `FRONTEND_URL` não configurado
   - Checkout retorna para URL genérica
   - **Fix**: Deve ser `http://localhost:5173` (dev) ou `https://thedeal.app` (prod)

---

### B. Secrets no Supabase não configurados
**Necessários**:
- `STRIPE_SECRET_KEY` (sk_test_* ou sk_live_*)
- `STRIPE_PRICE_PRO_MENSAL` (price_* do Stripe)
- `STRIPE_PRICE_ELITE_MENSAL` (price_* do Stripe)
- `SENDGRID_API_KEY` ou `RESEND_API_KEY`
- `SENDGRID_FROM_EMAIL` (opcional, default: noreply@thedeal.app)

**Como adicionar**:
1. Supabase Dashboard → Project Settings
2. Edge Functions → Secrets
3. Adicione cada uma

---

## 4. FALHAS EM COMPONENTES

### A. AIInsightsPage, CreatorInsights, BrandInsights
**Problema**: Usam `process.env.API_KEY` que não existe (Vite format: `VITE_GEMINI_API_KEY`)

**Localização**:
- `components/AIInsightsPage.tsx` linha 22
- `components/CreatorInsights.tsx` linha 18
- `components/BrandInsights.tsx` linha 21

**Fix necessário**: Trocar `process.env.API_KEY` por `import.meta.env.VITE_GEMINI_API_KEY`

**Severity**: ⚠️ MEDIUM

---

### B. SmartSearch
**Problema**: Usa `process.env.API_KEY` (Vite format issue)

**Localização**: `components/SmartSearch.tsx` linha 58

**Fix**: Mesma coisa acima

**Severity**: ⚠️ MEDIUM

---

### C. ValidationPage (fallback para Stripe)
**Problema**: Tenta chamar `/api/create-checkout` que não existe (é Edge Function)

**Localização**: `components/ValidationPage.tsx` linha 20

**Atualmente**: Fallback permite continuar sem pagamento ✅

**Fix necessário**: Usar `supabase.functions.invoke('create-checkout')` como no `PricingPage`

**Severity**: ⚠️ MEDIUM

---

### D. PaymentModal (mesmo problema)
**Localização**: `components/PaymentModal.tsx` linha 52

**Problema**: Tenta chamar `/api/create-checkout` (não existe)

**Severity**: ⚠️ MEDIUM

---

## 5. FALTA DE ERROR HANDLING

### A. MissionDashboard
**Problema**: Falha ao carregar missão → apenas mostra "Código Inválido", sem logging

**Fix**: Adicionar console logs para diagnóstico

**Severity**: ⚠️ LOW

---

### B. PricingPage
**Problema**: `getStripe()` pode falhar silenciosamente

**Localização**: linha 32

**Fix**: Melhor mensagem de erro

**Severity**: ⚠️ LOW

---

## 6. FALHAS CONHECIDAS ACEITÁVEIS

### A. Webhook.js (Next.js API Route)
**Problema**: Arquivo está em `/pages/api/webhook.js` mas app é Vite (não Next.js)

**Status**: ⚠️ Não é usado atualmente, pode ser removido ou migrado para Edge Function

---

### B. Edge Functions usando imports Deno
**Problema**: VS Code mostra erros, mas funciona em produção

**Status**: ✅ Aceitável - apenas erro visual no IDE

---

## 7. RECOMENDAÇÕES DE CORREÇÃO (Prioridade)

1. **CRITICAL** 🔴
   - ❌ Diagnosticar por que Stripe modal não abre
   - ❌ Diagnosticar por que login falha
   - ✅ FIXADO: Corrigir types em MissionDashboard
   - ✅ FIXADO: Corrigir req type em send-mission-code-email

2. **HIGH** 🟠
   - Configurar Secrets do Supabase (STRIPE_*, SENDGRID/RESEND_*)
   - Executar SQL de trigger de profiles
   - Executar SQL de mission_participants table
   - Deploy Edge Functions (`supabase functions deploy ...`)

3. **MEDIUM** 🟡
   - Trocar `process.env.API_KEY` por `VITE_GEMINI_API_KEY` em AI components
   - Corrigir ValidationPage e PaymentModal para usar Edge Functions
   - Melhorar error handling em PricingPage

4. **LOW** 🟢
   - Remover ou migrar webhook.js para Edge Function
   - Adicionar melhor logging em componentes

---

## 8. CHECKLIST DE DEPLOYMENT

- [ ] Trigger SQL de profiles executado
- [ ] Table SQL de mission_participants criada
- [ ] Secrets adicionados em Supabase
- [ ] Edge Functions deployadas
- [ ] Stripe keys (test/live) adicionadas
- [ ] Variáveis de ambiente corretas em .env.local
- [ ] AI components usando VITE_GEMINI_API_KEY
- [ ] Build (`npm run build`) sem erros
- [ ] Local test (`npm run dev`) funcional
- [ ] Vercel deployment com env vars configuradas

---

## RESUMO

**Erros Corrigidos**: 2
**Bugs Críticos**: 2 (Stripe checkout, Login)
**Problemas Config**: 3 (env vars, secrets, Edge Functions)
**Componentes com Bugs**: 5 (AI, SmartSearch, ValidationPage, PaymentModal)
**Status Geral**: 🟡 FUNCIONAL COM LIMITAÇÕES - Precisa configuração Supabase + Secrets

