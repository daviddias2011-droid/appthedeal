# Setup do Supabase para THE DEAL

Este guia descreve como configurar as Edge Functions e variáveis de ambiente para que o checkout e envio de e-mails funcionem.

## Pré-requisitos

1. **Projeto Supabase ativo** (https://supabase.com)
2. **Conta Stripe** (https://stripe.com) para processar pagamentos
3. **Serviço de E-mail**: SendGrid ou Resend (para enviar confirmações)
4. **CLI do Supabase** instalado:
   ```bash
   npm install -g supabase
   ```

## Passos de Configuração

### 1. Copie as variáveis de exemplo
```bash
cp .env.example .env
```
Edite `.env` com suas chaves reais.

### 2. Configure Stripe

#### Criar preços no Stripe
1. Acesse https://dashboard.stripe.com/products
2. Crie um produto chamado "THE DEAL - Pro Mensal"
   - Preço: R$ 9,90 (ou $1,99 em USD para teste)
   - Recorrência: Mensal
   - Copie o ID do preço (começa com `price_`)

3. Crie outro produto "THE DEAL - Elite Mensal"
   - Preço: R$ 19,90 (ou $4,99 em USD para teste)
   - Recorrência: Mensal
   - Copie o ID do preço

#### Adicionar keys ao Supabase
1. Acesse seu projeto em https://supabase.com
2. Vá para **Settings** → **Edge Functions** → **Secrets**
3. Clique em **Add secret** e adicione:
   ```
   STRIPE_SECRET_KEY = sk_test_... (ou sk_live_...)
   STRIPE_PRICE_PRO_MENSAL = price_...
   STRIPE_PRICE_ELITE_MENSAL = price_...
   FRONTEND_URL = http://localhost:5173 (em dev) ou https://seu-dominio.com
   ```

### 3. Configure E-mail (SendGrid ou Resend)

#### Opção A: SendGrid
1. Crie conta em https://sendgrid.com
2. Vá para **Settings** → **API Keys**
3. Crie uma chave e copie
4. No Supabase Secrets, adicione:
   ```
   SENDGRID_API_KEY = SG.xxxxxxx...
   SENDGRID_FROM_EMAIL = noreply@thedeal.app
   ```

#### Opção B: Resend (recomendado - mais simples)
1. Crie conta em https://resend.com
2. Vá para **API Keys**
3. Crie uma chave e copie
4. No Supabase Secrets, adicione:
   ```
   RESEND_API_KEY = re_xxxxxxx...
   ```

### 4. Deploy das Edge Functions

#### Via Supabase CLI (local)
```bash
# Fazer login
supabase login

# Deploy da função create-checkout
supabase functions deploy create-checkout --project-id seu-project-id

# Deploy da função send-confirmation-email
supabase functions deploy send-confirmation-email --project-id seu-project-id
```

#### Via Painel Supabase (sem CLI)
1. Acesse **Functions** no painel do Supabase
2. Clique em **Create a new function**
3. Nome: `create-checkout`
4. Cole o conteúdo de `supabase/functions/create-checkout/index.ts`
5. Clique em **Deploy**
6. Repita para `send-confirmation-email`

### 5. Configure variáveis de ambiente Vite

Crie um arquivo `.env.local` na raiz do projeto (ou use `.env`):
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=seu_anon_key_aqui
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... (ou pk_live_...)
```

Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

### 6. Teste o fluxo

1. Acesse http://localhost:5173
2. Clique em "Junte-se à Elite" ou "Signup"
3. Preencha o formulário
4. Selecione "Plano PRO"
5. Verifique o e-mail (você deve receber um código OTP)
6. Digite o código e finalize o cadastro
7. Você verá a tela de checkout → clique em "Ir para Checkout PRO"
8. Deve ser redirecionado para o Stripe (ou mock em ambiente de teste)

### 7. Configurações adicionais (Produção)

Antes de colocar em produção (Vercel):

- **Stripe**:
  - Use as keys live (`pk_live_...` e `sk_live_...`)
  - Configure webhooks do Stripe para seu backend

- **Supabase**:
  - Ative SMTP nas Auth Settings (ou use SendGrid webhook)
  - Configure domínios permitidos em CORS

- **Vercel**:
  - Adicione as mesmas variáveis de ambiente no painel da Vercel
  - Configure Supabase para aceitar requests da URL da Vercel

## Troubleshooting

### "Stripe key not found"
- Verifique se `STRIPE_SECRET_KEY` foi adicionado nos Supabase Secrets
- Certifique-se que a chave começa com `sk_`

### "Email not sent"
- Verifique se `SENDGRID_API_KEY` ou `RESEND_API_KEY` foi adicionado
- Se usar SendGrid, verifique `SENDGRID_FROM_EMAIL`
- Teste diretamente no painel do provedor de e-mail

### "Function not found"
- Certifique-se que as funções foram deployadas com sucesso
- Acesse **Functions** no painel do Supabase e verifique se aparecem
- Se não aparecerem, repita o deploy

## Documentação

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Stripe Checkout Sessions API](https://stripe.com/docs/api/checkout/sessions/create)
- [SendGrid API](https://docs.sendgrid.com/api-reference/mail-send/mail-send)
- [Resend API](https://resend.com/docs)
