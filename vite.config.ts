
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // Aumentamos o limite para 5000kb para silenciar avisos em apps complexos
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-core';
            if (id.includes('lucide')) return 'vendor-ui';
            if (id.includes('google/genai')) return 'vendor-ai';
            return 'vendor-libs';
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // FIX: Removed https: false to avoid type mismatch error with Node's ServerOptions.
    cors: true,
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
    'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''),
    'process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''),
  },
})
