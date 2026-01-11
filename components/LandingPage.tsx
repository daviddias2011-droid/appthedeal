
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Briefcase, Menu, X as CloseIcon, Building2, Calculator, Compass, Zap, 
  Check, X, ShieldCheck, TrendingUp, AlertTriangle, Star, Shield, CheckCircle2, Award, MessageCircle,
  Instagram, Twitter, Video
} from 'lucide-react';
import FeedItem from './FeedItem';
import AccessModal from './AccessModal';
import { KwaiIcon } from './Icons';

export default function LandingPage(props: any) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black overflow-x-hidden flex flex-col items-center text-left">
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={() => props.onGoToSignup()} />

      {/* Navigation */}
      <header className="fixed top-0 z-[100] w-full max-w-2xl bg-thedeal-bg/80 backdrop-blur-xl border-x border-b border-thedeal-gray700 p-4 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg shadow-thedeal-gold/10"><Briefcase size={18} className="text-black" /></div>
          <h1 className="text-lg md:text-xl font-display font-black text-white uppercase leading-none tracking-tighter">THE DEAL</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => props.onGoToSignup()} className="px-5 py-2 bg-thedeal-gold text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-thedeal-gold/20">Acesso</button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-xl border border-white/10 text-white"><Menu size={24} /></button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-black p-8 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-thedeal-gold rounded flex items-center justify-center"><Briefcase size={20} className="text-black" /></div><h2 className="text-xl font-display font-black text-white">THE DEAL</h2></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            <button onClick={() => { props.onGoToForBrands(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Building2 size={20} className="text-thedeal-gold" /> MARCAS</button>
            <button onClick={() => { props.onGoToForCreators(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Zap size={20} className="text-thedeal-gold" /> CRIADORES</button>
            <button onClick={() => { props.onGoToSimulator(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Calculator size={20} className="text-thedeal-gold" /> CALCULADORA</button>
            <button onClick={() => { props.onGoToDiscover(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Compass size={20} className="text-thedeal-gold" /> DESCUBRA</button>
            <button onClick={() => { props.onGoToSignup(); setIsMobileMenuOpen(false); }} className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">SOLICITAR CONVITE</button>
          </nav>
        </div>
      )}

      <main className="w-full max-w-2xl min-h-screen border-x border-thedeal-gray700/50 pb-20 pt-20">
        
        {/* HERO SECTION */}
        <section className="px-6 py-20 md:py-32 text-center space-y-10 border-b border-thedeal-gray700/30 bg-gradient-to-b from-thedeal-card/50 to-transparent">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-7xl font-display font-black text-white leading-[0.95] tracking-tighter uppercase">
              SUA INFLUÊNCIA <br/>
              <span className="text-thedeal-gold italic">JÁ VALE DINHEIRO.</span>
            </h1>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter opacity-40">
              FALTA SÓ O CONTRATO.
            </h2>
          </div>
          
          <p className="text-base md:text-lg text-thedeal-gray400 max-w-md mx-auto font-medium leading-relaxed">
            O THE DEAL é a infraestrutura onde criadores viram fornecedores e marcas contratam mídia com proteção jurídica e financeira.
          </p>

          <div className="bg-black/40 border border-white/5 px-6 py-3 rounded-full inline-flex items-center gap-3 mx-auto">
             <div className="w-2 h-2 bg-thedeal-gold animate-pulse rounded-full"></div>
             <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.2em]">Aqui, influência vira contrato fechado.</span>
          </div>

          <div className="flex flex-col gap-4 px-4 sm:px-12 pt-4">
            <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group">
              <span className="uppercase text-xs tracking-[0.2em]">SOLICITAR CURADORIA</span>
              <span className="text-[9px] opacity-60 font-bold uppercase mt-1 tracking-widest flex items-center gap-1 group-hover:opacity-100 transition-opacity">Avaliação Técnica de Perfil</span>
            </button>
          </div>
        </section>

        {/* COMMISSION MODEL */}
        <section className="p-8 md:p-12 space-y-10 border-b border-white/5 bg-thedeal-gold/5">
           <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">MODELO JUSTO. <br/><span className="text-thedeal-gold">SEM ABUSO.</span></h2>
              <p className="text-thedeal-gray400 text-sm font-black uppercase tracking-widest leading-relaxed">Quem ganha dinheiro, paga a infraestrutura.</p>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-thedeal-card border border-white/5 p-8 rounded-3xl space-y-4">
                <h4 className="text-white font-black uppercase text-xs tracking-widest">Para Criadores</h4>
                <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed uppercase">Criadores não pagam mensalidade. O acesso é gratuito para membros aprovados.</p>
              </div>
              <div className="bg-thedeal-card border border-white/5 p-8 rounded-3xl space-y-4">
                <h4 className="text-white font-black uppercase text-xs tracking-widest">Para Marcas</h4>
                <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed uppercase">Marcas pagam acesso anual + comissão de 10% apenas quando fecham contrato.</p>
              </div>
           </div>

           <p className="text-center text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Comissão clara. Termos claros. Pagamento protegido.</p>
        </section>

        {/* O PROBLEMA */}
        <section className="p-8 md:p-12 space-y-12 border-b border-white/5">
           <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">A BARREIRA DO <br/><span className="text-thedeal-danger">AMADORISMO</span></h2>
              <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed">Você tem audiência e propostas, mas falta o processo que garante a recorrência e a segurança financeira.</p>
           </div>

           <div className="grid gap-4">
              {[
                "Ausência de garantias de pagamento",
                "Contratos informais ou inexistentes",
                "Dificuldade na mensuração de ROI real",
                "Processos comerciais fragmentados"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl group">
                   <Shield className="text-thedeal-gray600 group-hover:text-thedeal-gold transition-colors" size={20} />
                   <span className="text-white font-black uppercase text-[11px] tracking-widest">{text}</span>
                </div>
              ))}
           </div>
        </section>

        {/* PRICING */}
        <section className="py-20 px-6 bg-black text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">ESCOLHA SEU <span className="text-thedeal-gold">ACESSO.</span></h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Protocolos Profissionais</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="p-10 bg-thedeal-card border border-white/5 rounded-[3rem] space-y-8 hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden group">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Criador</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-thedeal-goldBright tracking-tighter">Acesso Gratuito</p>
                </div>
                <ul className="space-y-4 text-[10px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Sem mensalidade ou comissão</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Negociação direta com marcas</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Receba 100% do valor do contrato</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Infraestrutura de contratos inclusa</li>
                </ul>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <p className="text-[9px] text-thedeal-gray400 uppercase leading-relaxed text-justify">
                    Acesso gratuito para aprovados. Taxa única de curadoria de R$ 99 aplicada pós-aprovação para manutenção da integridade da rede.
                  </p>
                </div>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl uppercase text-[11px] tracking-widest shadow-xl shadow-thedeal-gold/20 hover:scale-[1.02] transition-all">SOLICITAR CURADORIA</button>
              </div>

              <div className="p-10 bg-thedeal-card border border-thedeal-gold/40 rounded-[3rem] space-y-8 hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden group">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Marca</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-white tracking-tighter">R$ 497</p>
                  <span className="text-sm font-bold text-thedeal-gray600 uppercase">/ano</span>
                </div>
                <ul className="space-y-4 text-[10px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Acesso a criadores curados</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Gestão centralizada de contratos</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Pagamento em custódia (Escrow)</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> 10% de comissão por deal fechado</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-white text-black font-black py-6 rounded-2xl uppercase text-[11px] tracking-widest shadow-xl shadow-white/5 hover:scale-[1.02] transition-all">SOLICITAR ACESSO — MARCA</button>
              </div>
            </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-8 text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
                ESTRUTURA É O QUE <br/>
                <span className="text-thedeal-gold">SEPARA O AMADOR.</span>
              </h2>
              <p className="text-thedeal-gray400 text-lg md:text-xl font-light italic">
                Influência é mídia. Mídia sem processo não escala. O THE DEAL é a infraestrutura definitiva.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => props.onGoToSignup()}
                className="w-full sm:w-auto bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-16 py-8 rounded-3xl text-sm transition-all shadow-2xl shadow-thedeal-gold/30 uppercase tracking-[0.3em] hover:scale-105 active:scale-95"
              >
                SOLICITAR ACESSO AO TERMINAL
              </button>
              <p className="text-[11px] font-black uppercase text-thedeal-gray600 mt-6 tracking-widest">Vagas limitadas por curadoria técnica</p>
            </div>
        </section>

        <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5">
          <div className="flex justify-center gap-8">
            <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
            <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
            <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
          </div>
          <div className="space-y-4 opacity-50">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • CNPJ: 59.440.114/0001-03</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">EM DESENVOLVIMENTO • SUPORTE@THEDEAL.COM.BR</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
