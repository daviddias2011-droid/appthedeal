
import React, { useState } from 'react';
import { Check, Zap, Crown, ArrowLeft, Briefcase, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LINK_MENSAL = "https://mpago.la/13NLfeG";
const LINK_ANUAL = "https://mpago.li/1iwECoa";

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const { profile } = useAuth();

  const handleCheckout = (period: 'monthly' | 'annual') => {
    const url = period === 'monthly' ? LINK_MENSAL : LINK_ANUAL;
    window.open(url, '_blank');
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
            Escolha como <span className="text-thedeal-gold">você entra.</span>
          </h1>
          <p className="text-thedeal-gray400 font-medium">Protocolos de Expansão Profissional na Creator Economy.</p>
        </header>

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

            <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed mb-8">
              Para quem está chegando agora. Você entra na fila de espera e descobre quanto vale, mas ainda não fecha negócios.
            </p>

            <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-thedeal-gray400">
                  <Check size={16} className="text-thedeal-gray600 shrink-0" />
                  <span>Cadastro na fila de espera</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-thedeal-gray400">
                  <Check size={16} className="text-thedeal-gray600 shrink-0" />
                  <span>Calculadora de Valor (Descubra seu preço)</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-thedeal-gray400">
                  <Check size={16} className="text-thedeal-gray600 shrink-0" />
                  <span>Perfil em modo visualização</span>
                </li>
            </ul>

            <div className="mb-10">
              <p className="text-5xl font-black text-white tracking-tighter">GRÁTIS</p>
            </div>

            <button 
              className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
              onClick={() => alert("Você já iniciou seu processo de triagem.")}
            >
              Entrar na Fila
            </button>
          </div>

          {/* PROFISSIONAL */}
          <div className="bg-thedeal-card border-2 border-thedeal-gold/30 p-10 rounded-[2.5rem] flex flex-col relative overflow-hidden group shadow-2xl">
            <div className="mb-8">
              <div className="bg-thedeal-gold/10 w-fit p-3 rounded-2xl mb-4">
                <Zap className="text-thedeal-gold" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">2. Profissional</h2>
              <p className="text-thedeal-goldBright font-black text-[10px] uppercase tracking-widest mt-2">Para quem quer faturar.</p>
            </div>

            <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed mb-8">
              Pule a fila de espera. Tenha seu perfil liberado em até 72h e comece a negociar.
            </p>

            <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Aprovação Rápida: Seu perfil ativo em 3 dias</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Mercado Aberto: Venda fotos, vídeos e feche contratos</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Capacitação: Acesso liberado aos cursos</span>
                </li>
            </ul>

            <div className="mb-10">
              <p className="text-5xl font-black text-white tracking-tighter">R$ 9,90<span className="text-sm font-bold text-thedeal-gray600">/mês</span></p>
              <p className="text-[10px] text-thedeal-gray600 font-black uppercase mt-2">(Cobrado R$ 99,90 uma vez ao ano)</p>
            </div>

            <button 
              onClick={() => handleCheckout('annual')}
              className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20"
            >
              Quero Faturar Agora <ExternalLink size={14} />
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
            <p className="text-thedeal-goldBright font-black text-[10px] uppercase tracking-[0.3em] mt-2 mb-6">Para quem joga alto.</p>
            <p className="text-thedeal-gray400 text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
              O nível máximo. Acesso a contratos grandes e sociedade em marcas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
                <div className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Tudo do plano Profissional</span>
                </div>
                <div className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Grandes Negócios: Contratos acima de R$ 20 mil</span>
                </div>
                <div className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Sociedade: Participação nos lucros</span>
                </div>
                <div className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                  <Check size={16} className="text-thedeal-gold shrink-0" />
                  <span>Atendimento VIP: Suporte direto</span>
                </div>
            </div>

            <div className="mb-10">
                <p className="text-2xl font-black text-white uppercase tracking-widest">SOB APROVAÇÃO</p>
            </div>

            <button 
              onClick={handleRequestDemo}
              className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-thedeal-gold/20 active:scale-95 inline-flex items-center gap-3"
            >
              SOLICITAR ACESSO ELITE
              <ArrowLeft className="rotate-180" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
