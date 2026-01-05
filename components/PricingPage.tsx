
import React, { useState } from 'react';
import { Check, Zap, Crown, Loader, AlertCircle } from 'lucide-react';
import { getStripe } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const { profile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (plan: 'pro-mensal' | 'elite-mensal') => {
    setError(null);
    if (!profile?.email) {
      setError("Usuário não identificado.");
      return;
    }

    setLoading(plan);
    try {
      console.log(`[Alpha Checkout] Iniciando: ${plan}`);
      
      const stripe = await getStripe();
      if (!stripe) throw new Error("Stripe Gateway falhou ao carregar.");

      // Invocação direta da Edge Function no Supabase
      const { data, error: funcError } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan: plan, 
          userEmail: profile.email,
          // Forçamos o valor correto no backend via Price ID vinculado ao plano
        }
      });

      if (funcError) throw funcError;
      if (!data?.sessionId) throw new Error("Falha ao gerar sessão de pagamento.");

      const { error: stripeError } = await stripe.redirectToCheckout({ 
        sessionId: data.sessionId 
      });

      if (stripeError) throw stripeError;

    } catch (err: any) {
      console.error("[Stripe Failure]:", err);
      setError(err.message || "Erro no processamento do pagamento.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-12 animate-fade-in pb-32">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          Níveis de <span className="text-thedeal-gold">Expansão.</span>
        </h1>
        <p className="text-thedeal-gray400 font-medium">Valide seu perfil e acesse o Hub de Contratos.</p>
      </header>

      {error && (
        <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-thedeal-card border-2 border-thedeal-gold/30 p-10 rounded-[2.5rem] flex flex-col relative overflow-hidden group">
          <div className="mb-8">
            <div className="bg-thedeal-gold/10 w-fit p-3 rounded-2xl mb-4">
              <Zap className="text-thedeal-gold" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase">Membro Pro</h2>
          </div>

          <div className="mb-10">
            <p className="text-5xl font-black text-white tracking-tighter">R$ 9,90<span className="text-sm font-bold text-thedeal-gray600">/mês</span></p>
          </div>

          <ul className="space-y-4 mb-12 flex-1">
            <li className="flex items-center gap-3 text-xs font-bold text-white uppercase"><Check size={14} className="text-thedeal-success" /> Hub de Contratos</li>
            <li className="flex items-center gap-3 text-xs font-bold text-white uppercase"><Check size={14} className="text-thedeal-success" /> Dashboard ROI Alpha</li>
            <li className="flex items-center gap-3 text-xs font-bold text-white uppercase"><Check size={14} className="text-thedeal-success" /> Badge PRO Verificada</li>
          </ul>

          <button 
            onClick={() => handleCheckout('pro-mensal')}
            disabled={!!loading}
            className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20"
          >
            {loading === 'pro-mensal' ? <Loader className="animate-spin" size={18} /> : "Ativar Plano Pro"}
          </button>
        </div>

        <div className="bg-thedeal-card border border-white/5 p-10 rounded-[2.5rem] flex flex-col group opacity-80 hover:opacity-100 transition-all">
          <div className="mb-8">
            <div className="bg-white/5 w-fit p-3 rounded-2xl mb-4">
              <Crown className="text-thedeal-gray400 group-hover:text-purple-500 transition-colors" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase">Elite Alpha</h2>
          </div>

          <div className="mb-10">
            <p className="text-5xl font-black text-white tracking-tighter">R$ 19,90<span className="text-sm font-bold text-thedeal-gray600">/mês</span></p>
          </div>

          <button 
            onClick={() => handleCheckout('elite-mensal')}
            disabled={!!loading}
            className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-50 uppercase text-[10px] tracking-widest"
          >
            {loading === 'elite-mensal' ? <Loader className="animate-spin" size={18} /> : "Acessar Elite"}
          </button>
        </div>
      </div>
    </div>
  );
}
