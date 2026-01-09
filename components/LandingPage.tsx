
import React, { useState } from 'react';
import { 
  ArrowRight, Briefcase, Menu, X as CloseIcon, Building2, Calculator, Compass, Zap, 
  Check, X, ShieldCheck, TrendingUp, Star, Shield, CheckCircle2, Award, MessageCircle,
  Instagram, Twitter, Video, Target, FileText, Lock, ShieldOff, DollarSign, Handshake
} from 'lucide-react';
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
          <button onClick={() => props.onGoToSignup()} className="px-5 py-2 bg-thedeal-gold text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-thedeal-gold/20">Entrar</button>
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
            <button onClick={() => { props.onGoToSignup(); setIsMobileMenuOpen(false); }} className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">SOLICITAR ACESSO</button>
          </nav>
        </div>
      )}

      <main className="w-full max-w-2xl min-h-screen border-x border-thedeal-gray700/50 pb-20 pt-20">
        
        {/* 1. HERO SECTION */}
        <section className="px-6 py-20 md:py-32 text-center space-y-10 border-b border-thedeal-gray700/30 bg-gradient-to-b from-thedeal-card/50 to-transparent">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-7xl font-display font-black text-white leading-[0.95] tracking-tighter uppercase">
              SUA INFLUÊNCIA <br/>
              <span className="text-thedeal-gold italic">JÁ VALE DINHEIRO.</span>
            </h1>
            <div className="space-y-3">
              <p className="text-lg md:text-xl text-white font-bold tracking-tight uppercase">
                O problema é que quase ninguém transforma isso em contrato.
              </p>
              <p className="text-sm md:text-base text-thedeal-gray400 max-w-md mx-auto font-medium leading-relaxed">
                O THE DEAL existe para fazer isso acontecer — com curadoria, método e pagamento real.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 px-6 py-3 rounded-full inline-flex items-center gap-3 mx-auto">
             <div className="w-2 h-2 bg-thedeal-gold animate-pulse rounded-full"></div>
             <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.2em]">Onde influência vira contrato.</span>
          </div>

          <div className="flex flex-col gap-4 px-4 sm:px-12 pt-4">
            <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 group uppercase text-xs tracking-widest">
              ENTRAR PARA A CURADORIA
            </button>
          </div>
        </section>

        {/* 2. O QUE MUDA QUANDO VOCÊ ENTRA */}
        <section className="p-8 md:p-12 space-y-10 border-b border-white/5 bg-thedeal-card/20">
           <div className="text-center md:text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">O QUE MUDA QUANDO <br/><span className="text-thedeal-gold">VOCÊ ENTRA NO THE DEAL</span></h2>
           </div>

           <div className="grid gap-4">
              {[
                "Você para de implorar por publis",
                "Você não negocia mais sozinho",
                "Seu pitch deixa de ser amador",
                "Marcas falam com quem está pronto",
                "Acordos viram contratos"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-thedeal-gold/30 transition-all">
                   <div className="w-6 h-6 rounded-full bg-thedeal-gold/10 flex items-center justify-center">
                     <Check className="text-thedeal-gold" size={14} />
                   </div>
                   <span className="text-white font-bold uppercase text-[11px] tracking-widest">{text}</span>
                </div>
              ))}
           </div>

           <div className="text-center pt-4">
              <p className="text-thedeal-gray600 font-black uppercase text-[10px] tracking-[0.4em]">Aqui não existe feed. Existe negociação.</p>
           </div>
        </section>

        {/* BLOCO IDENTIDADE: O QUE NÃO SOMOS VS O QUE SOMOS */}
        <section className="p-8 md:p-12 grid md:grid-cols-2 gap-8 border-b border-white/5 bg-black/40">
           <div className="space-y-6">
              <h3 className="text-thedeal-danger font-black uppercase text-xs tracking-widest flex items-center gap-2">
                <X size={16} /> O que NÃO somos
              </h3>
              <ul className="space-y-4">
                 {["Não somos agência", "Não somos assessoria", "Não somos empresários", "Não ficamos com % do seu cachê"].map((item, i) => (
                   <li key={i} className="text-thedeal-gray600 font-bold uppercase text-[11px] tracking-widest border-l-2 border-thedeal-danger/30 pl-4">{item}</li>
                 ))}
              </ul>
           </div>
           <div className="space-y-6">
              <h3 className="text-thedeal-success font-black uppercase text-xs tracking-widest flex items-center gap-2">
                <Check size={16} /> O que SOMOS
              </h3>
              <ul className="space-y-4">
                 {["Plataforma de contratos", "Ferramenta de negociação", "Estrutura profissional", "Ambiente de negócios"].map((item, i) => (
                   <li key={i} className="text-white font-bold uppercase text-[11px] tracking-widest border-l-2 border-thedeal-success/30 pl-4">{item}</li>
                 ))}
              </ul>
           </div>
        </section>

        {/* 3. O PROBLEMA QUE NINGUÉM FALA */}
        <section className="p-8 md:p-12 space-y-12 border-b border-white/5 bg-black">
           <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">O PROBLEMA QUE <br/><span className="text-thedeal-danger">NINGUÉM FALA</span></h2>
              <p className="text-lg text-white font-bold uppercase tracking-tight">Influência não falha por falta de seguidores.</p>
           </div>

           <div className="space-y-6">
              <p className="text-thedeal-gray400 text-sm md:text-base font-medium leading-relaxed">
                Ela falha porque ninguém ensina a negociar, ninguém protege o criador e ninguém estrutura o contrato.
              </p>
              
              <div className="grid gap-4">
                {[
                  "Ninguém ensina a negociar",
                  "Ninguém protege o criador",
                  "Ninguém estrutura contrato"
                ].map((text, i) => (
                  <div key={i} className="bg-thedeal-danger/5 border border-thedeal-danger/20 p-5 rounded-2xl flex gap-4 items-center">
                     <X className="text-thedeal-danger" size={20} />
                     <p className="text-xs text-white font-bold uppercase tracking-widest">{text}</p>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-thedeal-card border border-thedeal-gray700 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <p className="text-lg md:text-xl font-serif italic text-thedeal-gray400 leading-relaxed text-center">
                O resultado? Criadores aceitando qualquer valor. <br/>Marcas com medo de investir.
              </p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter text-center mt-6">
                O THE DEAL NASCE NESSE VÁCUO.
              </p>
           </div>
        </section>

        {/* BLOCO AUTONOMIA (MEDO) */}
        <section className="p-8 md:p-12 space-y-10 border-b border-white/5 bg-gradient-to-br from-thedeal-card/50 to-transparent">
            <h3 className="text-xl font-display font-black text-white uppercase tracking-tight text-center">VOCÊ NO CONTROLE TOTAL</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {[
                 { t: "Você decide o preço", i: DollarSign },
                 { t: "Você aprova propostas", i: CheckCircle2 },
                 { t: "Fala direto com a marca", i: MessageCircle },
                 { t: "Pode sair quando quiser", i: X },
                 { t: "Sem exclusividade", i: ShieldOff }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl text-center border border-white/5 hover:border-thedeal-gold/30 transition-all">
                    <item.i className="text-thedeal-gold" size={20} />
                    <span className="text-[10px] font-black uppercase text-white tracking-widest leading-tight">{item.t}</span>
                 </div>
               ))}
            </div>
        </section>

        {/* 4. COMO O THE DEAL RESOLVE */}
        <section className="p-8 md:p-12 space-y-12 bg-black">
           <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">COMO O <br/><span className="text-thedeal-gold">THE DEAL RESOLVE</span></h2>
           </div>

           <div className="grid gap-6">
              {[
                { t: "Curadoria", d: "Só entra quem pode fechar negócio." },
                { t: "Estrutura", d: "Pitch, proposta e valor com lógica comercial." },
                { t: "Contrato", d: "Pagamento claro. Sem improviso." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-thedeal-gold transition-all group">
                   <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-black text-thedeal-gold shadow-lg group-hover:scale-110 transition-transform">
                      {i + 1}
                   </div>
                   <div className="flex-1">
                      <h4 className="text-white font-black uppercase text-sm tracking-tight">{step.t}</h4>
                      <p className="text-thedeal-gray400 text-xs font-medium mt-1 uppercase tracking-widest opacity-60">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="text-center pt-4">
              <p className="text-white font-bold text-sm uppercase tracking-widest leading-relaxed">
                Simples. Profissional. <span className="text-thedeal-gold">Rentável.</span>
              </p>
           </div>
        </section>

        {/* 5. PARA QUEM É */}
        <section className="p-8 md:p-12 space-y-12 border-y border-white/5 bg-thedeal-card/30">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter text-center">PARA QUEM É</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <p className="text-[10px] font-black text-thedeal-success uppercase tracking-[0.3em] flex items-center gap-2">CRIADORES</p>
                 <p className="text-[11px] font-bold text-white uppercase tracking-widest border-l-2 border-thedeal-success pl-4">
                   Criadores que querem parar de viver de permuta, sorte ou DM ignorada.
                 </p>
              </div>
              <div className="space-y-6">
                 <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em] flex items-center gap-2">MARCAS</p>
                 <p className="text-[11px] font-bold text-white uppercase tracking-widest border-l-2 border-thedeal-gold pl-4">
                   Marcas que querem previsibilidade, não apostas.
                 </p>
              </div>
            </div>
        </section>

        {/* 6. PRICING ANUAL */}
        <section className="py-20 px-6 bg-black text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">ACESSO ANUAL AO <br/><span className="text-thedeal-gold">THE DEAL.</span></h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Menos de R$ 1 por dia para transformar influência em contrato.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="p-10 bg-thedeal-card border border-white/5 rounded-[3rem] space-y-8 hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden group">
                <Zap size={80} className="absolute -top-4 -right-4 text-thedeal-gold opacity-5 group-hover:opacity-10 transition-opacity" />
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">💼 Criador</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-thedeal-goldBright tracking-tighter">R$ 297</p>
                  <span className="text-sm font-bold text-thedeal-gray600 uppercase">/ano</span>
                </div>
                <ul className="space-y-4 text-[10px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Aplicar em missões reais</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Usar IA para pitch vencedor</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Acessar valores de referência</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Entrar na curadoria</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl uppercase text-[11px] tracking-widest shadow-xl shadow-thedeal-gold/20 hover:scale-[1.02] transition-all">APLICAR PARA CURADORIA</button>
              </div>

              <div className="p-10 bg-thedeal-card border border-white/5 rounded-[3rem] space-y-8 hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden group">
                <Building2 size={80} className="absolute -top-4 -right-4 text-thedeal-gold opacity-5 group-hover:opacity-10 transition-opacity" />
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">🏢 Marca</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-white tracking-tighter">R$ 497</p>
                  <span className="text-sm font-bold text-thedeal-gray600 uppercase">/ano</span>
                </div>
                <ul className="space-y-4 text-[10px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Criar missões privadas</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Receber propostas estruturadas</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Criadores validados</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Economizar tempo e erro</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-white text-black font-black py-6 rounded-2xl uppercase text-[11px] tracking-widest shadow-xl shadow-white/5 hover:scale-[1.02] transition-all">SOLICITAR ACESSO</button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl max-w-xl mx-auto">
               <p className="text-white text-sm md:text-base font-medium leading-relaxed italic">
                 "Um único contrato pode pagar esse valor em um post. <br/><span className="text-thedeal-danger font-black not-italic">UM ERRO CUSTA MUITO MAIS.</span>"
               </p>
            </div>
        </section>

        {/* 7. BLOCO FINAL */}
        <section className="py-32 px-8 text-center space-y-12 bg-gradient-to-t from-thedeal-card/20 to-transparent">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                O THE DEAL NÃO É PARA TODO MUNDO.
              </h2>
              <p className="text-thedeal-gray400 text-lg md:text-xl font-medium">
                É para quem quer profissionalizar a influência e ganhar dinheiro de forma real.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => props.onGoToSignup()}
                className="w-full sm:w-auto bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-16 py-8 rounded-3xl text-sm transition-all shadow-2xl shadow-thedeal-gold/30 uppercase tracking-[0.3em] hover:scale-105 active:scale-95"
              >
                ENTRAR PARA A CURADORIA
              </button>
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
