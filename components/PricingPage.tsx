
import React, { useState } from 'react';
import { Check, Zap, Crown, Loader, AlertCircle, ArrowLeft, Briefcase } from 'lucide-react';
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
      const { data, error: funcError } = await supabase!.functions.invoke('create-checkout', {
        body: { 
          plan: plan, 
          userEmail: profile.email,
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

  const handleRequestDemo = () => window.open("https://wa.me/5519994497796?text=Olá! Gostaria de solicitar uma demonstração do nível Sócio/Elite do The Deal.", "_blank");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-thedeal-gold selection:text-black">
      {onBack && (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Briefcase size={18} className="text-black" />
                </div>
                <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
              </div>
              <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            
            <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
            </button>
          </div>
        </nav>
      )}

      <div className={`p-4 md:p-8 space-y-12 animate-fade-in pb-32 ${onBack ? 'pt-32' : 'pt-12'}`}>
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Protocolos de <span className="text-thedeal-gold">Expansão.</span>
          </h1>
          <p className="text-thedeal-gray400 font-medium">Escolha seu modo de ingresso na rede.</p>
        </header>

        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TRIAGEM */}
          <div className="bg-thedeal-card border border-white/5 p-10 rounded-[2.5rem] flex flex-col group opacity-80 hover:opacity-100 transition-all">
            <div className="mb-8">
              <div className="bg-white/5 w-fit p-3 rounded-2xl mb-4">
                <Briefcase className="text-thedeal-gray400" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">1. Triagem</h2>
              <p className="text-thedeal-gold font-black text-[10px] uppercase tracking-widest mt-2">Acesso sob análise.</p>
            </div>

            <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed mb-10 flex-1">
              Sua entrada no ecossistema. Permite criar o perfil para avaliação e usar nossa Calculadora de Valor de Mercado. Você descobre quanto sua marca pessoal vale, mas aguarda na fila de espera.
            </p>

            <div className="mb-10">
              <p className="text-5xl font-black text-white tracking-tighter">Grátis</p>
            </div>

            <button 
              className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest disabled:opacity-50"
              disabled
            >
              Acesso Inicial Ativo
            </button>
          </div>

          {/* PROFISSIONAL */}
          <div className="bg-thedeal-card border-2 border-thedeal-gold/30 p-10 rounded-[2.5rem] flex flex-col relative overflow-hidden group shadow-2xl">
            <div className="mb-8">
              <div className="bg-thedeal-gold/10 w-fit p-3 rounded-2xl mb-4">
                <Zap className="text-thedeal-gold" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">2. Profissional</h2>
              <p className="text-thedeal-goldBright font-black text-[10px] uppercase tracking-widest mt-2">Para quem fecha contratos.</p>
            </div>

            <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed mb-10 flex-1">
              Liberação expressa em 48h. Desbloqueia o Licenciamento de Conteúdo e acesso a negócios operacionais de até R$ 20k. Ideal para criadores que buscam fluxo de caixa e validação.
            </p>

            <div className="mb-10">
              <p className="text-5xl font-black text-white tracking-tighter">R$ 9,90<span className="text-sm font-bold text-thedeal-gray600">/mês</span></p>
              <p className="text-[10px] text-thedeal-gray600 font-black uppercase mt-2">Cobrado anualmente como Taxa de Credenciamento</p>
            </div>

            <button 
              onClick={() => handleCheckout('pro-mensal')}
              disabled={!!loading}
              className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20"
            >
              {loading === 'pro-mensal' ? <Loader className="animate-spin" size={18} /> : "Ativar Credenciamento Profissional"}
            </button>
          </div>
        </div>

        {/* SÓCIO / ELITE */}
        <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-gold/20 p-12 rounded-[3rem] max-w-4xl mx-auto text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Crown size={200} className="text-thedeal-gold" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="text-thedeal-gold" size={32} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">3. Sócio / Elite</h2>
            <p className="text-thedeal-goldBright font-black text-[10px] uppercase tracking-[0.3em] mt-2 mb-6">O topo da cadeia.</p>
            <p className="text-thedeal-gray400 text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
              Reservado estritamente para grandes nomes e marcas com capital de investimento. Acesso a negociações de Participação Societária (Equity) e contratos de alto escalão. Atendimento via Concierge.
            </p>
            <button 
              onClick={handleRequestDemo}
              className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-thedeal-gold/20 active:scale-95 inline-flex items-center gap-3"
            >
              SOLICITE UMA DEMONSTRAÇÃO
              <ArrowLeft className="rotate-180" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
