
# THE DEAL - Inteligência & Performance

Rede social privada e infraestrutura de elite para contratos de LTV, Licenciamento de IP e Equity na Creator Economy.

## 🚀 Tecnologias

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **IA**: Google Gemini API (Modelos Flash 3 & 2.5)
- **Backend/Auth**: Supabase
- **Pagamentos**: Stripe Gateway
- **Infra**: Vite

## 🛠️ Instalação e Setup

1.  **Clonar o Repositório**
2.  **Instalar Dependências**
    ```bash
    npm install
    ```
3.  **Configurar Variáveis de Ambiente**
    - Copie o arquivo `.env.example` para um novo arquivo `.env`.
    - Preencha as credenciais do Supabase, Stripe e Google GenAI.
4.  **Executar em Desenvolvimento**
    ```bash
    npm run dev
    ```

## 🏗️ Arquitetura de Pastas

- `components/`: Componentes modulares e páginas.
- `contexts/`: Provedores de estado global (Auth).
- `lib/`: Configurações de bibliotecas externas (Supabase, Stripe).
- `types.ts`: Definições globais de interfaces TypeScript.
- `constants.ts`: Dados estáticos e mocks controlados.

## 🛡️ Segurança

- Todas as chaves de API devem ser injetadas via `.env`.
- Nunca commitar chaves reais no repositório.
- Uso de `process.env` padronizado.
