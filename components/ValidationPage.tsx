
import React, { useState } from 'react';
import { ShieldCheck, Zap, ArrowRight, Clock, Crown, Check, ExternalLink } from 'lucide-react';

const LINK_PAGAMENTO_PRO = "https://mpago.li/1iwECoa";

interface ValidationPageProps {
  userName: string;
  userEmail: string;
  onSelectFree: () => void;
  onBack: () => void;
}

export default function ValidationPage({ userName, userEmail, onSelectFree, onBack }: ValidationPageProps) {
  const handleFastTrack = () => {
    window.open(LINK_PAGAMENTO_PRO, '_blank');
    onSelectFree(); // Permite avançar no app após abrir o pagamento
  };

  return (
    <div className="min-h-screen bg-thedeal-bg text-white flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <header className="text-center mb-12 space-y-4 relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-goldDim/30 rounded-full px-4 py-1.5 mb-2">
          <ShieldCheck size={14} className="text-thedeal-gold" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-thedeal-gold">Protocolo de Entrada Alpha</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight text-white">
          Inicie sua <span className="text-thedeal-goldBright">Análise Técnica.</span>
        </h1>
        <p className="text-thedeal-gray400 text-sm md:text-lg font-medium">
          {userName.split(' ')[0]}, seu formulário foi registrado. Realize o pagamento da taxa de avaliação para que nosso comitê inicie a auditoria do seu perfil.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full relative z-10">
        
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/20 transition-all group shadow-2xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="bg-white/5 p-3 rounded-2xl">
                <Clock size={24} className="text-thedeal-gray400" />
              </div>
              <span className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Aguardar Prioridade</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Análise Tardia</h2>
              <p className="text-4xl font-black text-white">R$ 0</p>
            </div>

            <ul className="space-y-4 pt-6 border-t border-white/5">
              {[
                "Fila de espera de até 180 dias",
                "Sem prioridade no terminal de inteligência",
                "Sem bônus de Deal Score inicial",
                "Acesso restrito apenas como observador"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-widest text-thedeal-gray400">
                  <Check size={14} className="text-thedeal-gray600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={onSelectFree}
            className="mt-10 w-full py-4 rounded-xl border border-white/10 text-thedeal-gray400 font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
          >
            Aguardar sem Prioridade
          </button>
        </div>

        <div className="bg-thedeal-card border-2 border-thedeal-goldBright/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative shadow-[0_0_50px_rgba(212,175,55,0.1)] group hover:border-thedeal-gold transition-all overflow-hidden">
          <div className="absolute top-0 right-0 bg-thedeal-goldBright text-black text-[9px] font-black px-5 py-2 rounded-bl-2xl uppercase tracking-widest">Protocolo de Prioridade</div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="bg-thedeal-gold/10 p-3 rounded-2xl">
                <Crown size={24} className="text-thedeal-gold" />
              </div>
              <span className="text-[10px] font-black uppercase text-thedeal-gold tracking-widest">Curadoria Prioritária</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Taxa de Avaliação</h2>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-white">R$ 99,00</p>
                <span className="text-[10px] font-black text-thedeal-gray600 uppercase">Análise Única</span>
              </div>
            </div>

            <ul className="space-y-4 pt-6 border-t border-white/5">
              {[
                { t: "Análise técnica prioritária (até 48h)", ok: true },
                { t: "+500 Pontos de Deal Score (se aprovado)", ok: true },
                { t: "Acesso total a contratos de elite (se aprovado)", ok: true },
                { t: "Processamento de compliance imediato", ok: true }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[11px] font-black uppercase tracking-widest text-white">
                  <Check size={14} className="text-thedeal-success mt-0.5" />
                  <span>{item.t}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleFastTrack}
            className="mt-10 w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 active:scale-95"
          >
            Iniciar Avaliação Alpha <ExternalLink size={14} />
          </button>
        </div>

      </div>

      <div className="mt-16 flex flex-col items-center gap-4 opacity-30">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.4em] text-thedeal-gray600 hover:text-white transition-colors">Voltar ao início</button>
      </div>
    </div>
  );
}
