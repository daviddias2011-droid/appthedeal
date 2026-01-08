
import React from 'react';
import { Check, Zap, Crown, ArrowLeft, Briefcase, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LINK_MENSAL = "https://mpago.la/13NLfeG";
const LINK_ANUAL = "https://mpago.li/1iwECoa";

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const handleCheckout = (period: 'monthly' | 'annual') => {
    const url = period === 'monthly' ? LINK_MENSAL : LINK_ANUAL;
    window.open(url, '_blank');
  };

  const handleRequestDemo = () => window.open("https://wa.me/5519994497796?text=Olá! Gostaria de detalhes sobre o nível Enterprise do The Deal.", "_blank");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-thedeal-gold selection:text-black font-sans text-left">
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
              <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Infraestrutura Alpha</p>
            </div>
            
            <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
            </button>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <header className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-5 py-2 rounded-full border border-thedeal-goldDim/30">
            <ShieldCheck size={14} className="text-thedeal-gold" />
            <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Protocolo de Expansão Alpha</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            Escolha seu Nível de <br/> <span className="text-thedeal-gold">Acesso à Rede.</span>
          </h1>
          <p className="text-thedeal-gray400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            De Aspirante a Sócio. Nossa infraestrutura protege seus ganhos e garante parcerias reais.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {/* TIER 1: TRIAGEM */}
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col hover:border-white/10 transition-all opacity-80 hover:opacity-100">
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-4">Tier 1 / Grátis</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Triagem Alpha</h2>
              <p className="text-thedeal-gold font-black text-[10px] uppercase mt-2 tracking-widest">Acesso sob análise.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gray600 shrink-0" />
                <span>Cadastro na fila de espera</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gray600 shrink-0" />
                <span>Calculadora de Valor de Mercado</span>
              </li>
            </ul>
            <div className="mb-8">
              <p className="text-4xl font-black text-white">GRATUITO</p>
            </div>
            <button className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest cursor-not-allowed">Em Análise</button>
          </div>

          {/* TIER 2: CRIADOR */}
          <div className="bg-thedeal-card border-2 border-thedeal-goldBright/40 p-8 rounded-[2.5rem] flex flex-col shadow-[0_0_60px_rgba(212,175,55,0.1)] relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-thedeal-goldBright text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">RECOMENDADO</div>
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-thedeal-goldBright uppercase tracking-[0.4em] mb-4">Tier 2 / Pro</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Criador Vetted</h2>
              <p className="text-thedeal-goldBright/60 text-[10px] font-bold uppercase mt-2 tracking-widest">Foco em faturamento.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Perfil ativo no marketplace (72h)</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Custódia financeira em Escrow</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Contratos automáticos validados</span>
              </li>
            </ul>
            <div className="mb-8">
              <p className="text-4xl font-black text-white">R$ 297<span className="text-xs text-thedeal-gray600">/ano</span></p>
              <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest mt-1">Cobrado anualmente</p>
            </div>
            <button onClick={() => handleCheckout('annual')} className="w-full bg-thedeal-gold text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">Ativar Agora</button>
          </div>

          {/* TIER 3: MARCA */}
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col hover:border-white/10 transition-all">
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Tier 3 / Brand</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Marca Ativa</h2>
              <p className="text-blue-400 text-[10px] font-bold uppercase mt-2 tracking-widest">Foco em escala comercial.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Acesso total aos criadores da rede</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Propostas de contratação ilimitadas</span>
              </li>
            </ul>
            <div className="mb-8">
              <p className="text-4xl font-black text-white">R$ 497<span className="text-xs text-thedeal-gray600">/ano</span></p>
            </div>
            <button onClick={() => handleCheckout('annual')} className="w-full bg-white text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">Entrar na Rede</button>
          </div>

          {/* TIER 4: ENTERPRISE */}
          <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-white/10 p-8 rounded-[2rem] flex flex-col group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Crown size={120} />
            </div>
            <div className="mb-8">
              <h3 className="text-[10px] font-black text-thedeal-gray400 uppercase tracking-[0.4em] mb-4">Tier 4 / VIP</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Enterprise & Sócio</h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase mt-2 tracking-widest">Gestão de alto ticket.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-white shrink-0" />
                <span>Gerente de conta dedicado 24/7</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-white shrink-0" />
                <span>Acesso a Sociedade em Marcas</span>
              </li>
            </ul>
            <div className="mb-8">
              <p className="text-[10px] font-black text-thedeal-gray600 uppercase mb-1">Sob Consulta</p>
              <p className="text-3xl font-black text-white">R$ 2.997+</p>
            </div>
            <button onClick={handleRequestDemo} className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Falar com Consultor</button>
          </div>
        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 text-center opacity-30 flex flex-col items-center gap-2">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </footer>
      </main>
    </div>
  );
}
