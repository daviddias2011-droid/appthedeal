
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
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black overflow-x-hidden flex flex-col items-center">
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={() => props.onGoToSignup()} />

      {/* Navigation - Optimized for Desktop */}
      <header className="fixed top-0 z-[100] w-full max-w-5xl bg-thedeal-bg/80 backdrop-blur-xl border-x border-b border-thedeal-gray700 p-4 md:px-8 flex items-center justify-between h-16 md:h-24">
        <div className="flex items-center gap-3 md:gap-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-thedeal-gold rounded flex items-center justify-center shadow-lg shadow-thedeal-gold/10 hover:scale-105 transition-transform">
              <Briefcase size={20} className="text-black" />
            </div>
            <h1 className="text-lg md:text-2xl font-display font-black text-white uppercase leading-none tracking-tighter">THE DEAL</h1>
          </div>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => props.onGoToForBrands()} className="text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-thedeal-gold transition-colors">Marcas</button>
            <button onClick={() => props.onGoToForCreators()} className="text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-thedeal-gold transition-colors">Criadores</button>
            <button onClick={() => props.onGoToDiscover()} className="text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-thedeal-gold transition-colors">Descubra</button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => props.onGoToSignup()} className="hidden sm:block px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            Login
          </button>
          <button onClick={() => props.onGoToSignup()} className="px-6 py-3 bg-thedeal-gold text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-thedeal-gold/20 hover:scale-105 transition-all">
            Solicitar Acesso
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white md:hidden"><Menu size={24} /></button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
            <button onClick={() => { props.onGoToSignup(); setIsMobileMenuOpen(false); }} className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">ENTRAR NA REDE</button>
          </nav>
        </div>
      )}

      <main className="w-full max-w-5xl border-x border-thedeal-gray700/30 pb-20 pt-24 md:pt-32">
        
        {/* 1. HERO SECTION - Expansive on Desktop */}
        <section className="px-6 py-20 md:py-40 text-center space-y-12 border-b border-thedeal-gray700/30 bg-gradient-to-b from-thedeal-card/50 to-transparent">
          <div className="space-y-8 animate-float-in">
            <h1 className="text-4xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase">
              SUA INFLUÊNCIA <br/>
              <span className="text-thedeal-gold italic">JÁ VALE DINHEIRO.</span>
            </h1>
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl md:text-3xl text-white font-bold tracking-tight uppercase">
                O problema é que quase ninguém transforma isso em contrato.
              </p>
              <p className="text-sm md:text-lg text-thedeal-gray400 font-medium leading-relaxed opacity-80">
                O THE DEAL é a infraestrutura que faz isso acontecer — com curadoria extrema, <br className="hidden md:block" /> método de performance e garantia de pagamento real.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 px-8 py-4 rounded-full inline-flex items-center gap-3 mx-auto shadow-2xl">
             <div className="w-2.5 h-2.5 bg-thedeal-gold animate-pulse rounded-full shadow-[0_0_10px_rgba(201,169,97,0.8)]"></div>
             <span className="text-[11px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Networking de Elite • Onde influência vira contrato.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-24 pt-6 justify-center">
            <button onClick={() => props.onGoToSignup()} className="w-full md:w-auto md:px-16 bg-thedeal-goldBright text-black font-black py-6 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 group uppercase text-xs tracking-[0.2em]">
              VER SE VOCÊ SE QUALIFICA
            </button>
            <button onClick={() => props.onGoToSimulator()} className="w-full md:w-auto md:px-12 bg-white/5 hover:bg-white/10 text-white font-black py-6 rounded-2xl border border-white/10 uppercase text-xs tracking-[0.2em] transition-all">
              CALCULAR MEU CACHÊ
            </button>
          </div>
        </section>

        {/* 2. O QUE MUDA - 3 Cards Grid for Desktop */}
        <section className="p-8 md:p-20 space-y-16 border-b border-white/5 bg-thedeal-card/20">
           <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">O QUE MUDA QUANDO <br/><span className="text-thedeal-gold">VOCÊ ENTRA NO THE DEAL</span></h2>
              <p className="text-thedeal-gray600 font-black uppercase text-[11px] tracking-[0.5em]">Aqui não existe feed. Existe negociação.</p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Você para de implorar por publis",
                "Você não negocia mais sozinho",
                "Seu pitch deixa de ser amador",
                "Marcas falam com quem está pronto",
                "Acordos viram contratos",
                "Seu alcance vira um ativo financeiro"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:border-thedeal-gold/40 hover:bg-white/[0.04] transition-all">
                   <div className="w-8 h-8 rounded-xl bg-thedeal-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     <Check className="text-thedeal-gold" size={16} strokeWidth={3} />
                   </div>
                   <span className="text-white font-bold uppercase text-[12px] tracking-widest leading-tight">{text}</span>
                </div>
              ))}
           </div>
        </section>

        {/* 3. BLOCO IDENTIDADE - Side-by-Side on Desktop */}
        <section className="p-8 md:p-20 grid md:grid-cols-2 gap-10 border-b border-white/5 bg-black/40">
           <div className="space-y-8 bg-thedeal-danger/5 border border-thedeal-danger/10 p-10 rounded-[3rem]">
              <h3 className="text-thedeal-danger font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3">
                <X size={20} strokeWidth={3} /> O que NÃO somos
              </h3>
              <ul className="space-y-6">
                 {["Não somos agência", "Não somos assessoria", "Não somos empresários", "Não ficamos com % do seu cachê"].map((item, i) => (
                   <li key={i} className="text-thedeal-gray600 font-bold uppercase text-[12px] tracking-[0.2em] border-l-2 border-thedeal-danger/30 pl-6 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-thedeal-danger/20 rounded-full"></div> {item}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="space-y-8 bg-thedeal-success/5 border border-thedeal-success/10 p-10 rounded-[3rem]">
              <h3 className="text-thedeal-success font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3">
                <Check size={20} strokeWidth={3} /> O que SOMOS
              </h3>
              <ul className="space-y-6">
                 {["Plataforma de contratos", "Ferramenta de negociação", "Estrutura profissional", "Ambiente de negócios"].map((item, i) => (
                   <li key={i} className="text-white font-bold uppercase text-[12px] tracking-[0.2em] border-l-2 border-thedeal-success/30 pl-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-thedeal-success/40 rounded-full"></div> {item}
                   </li>
                 ))}
              </ul>
           </div>
        </section>

        {/* 4. O PROBLEMA - Detailed on Desktop */}
        <section className="p-8 md:p-24 space-y-16 border-b border-white/5 bg-black">
           <div className="text-center md:text-left space-y-6 max-w-4xl">
              <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">O PROBLEMA QUE <br/><span className="text-thedeal-danger">NINGUÉM FALA</span></h2>
              <p className="text-xl md:text-2xl text-white font-bold uppercase tracking-tight opacity-80">Influência não falha por falta de seguidores. Falha por falta de estrutura.</p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <p className="text-thedeal-gray400 text-lg md:text-xl font-medium leading-relaxed">
                  A economia de influência está quebrada. Criadores operam como amadores e marcas investem no escuro.
                </p>
                <div className="grid gap-4">
                  {[
                    "Ninguém ensina o criador a negociar",
                    "Ninguém protege juridicamente as partes",
                    "Ninguém estrutura o contrato para escala",
                    "A falta de processo destrói o ROI"
                  ].map((text, i) => (
                    <div key={i} className="bg-thedeal-danger/5 border border-thedeal-danger/20 p-6 rounded-2xl flex gap-5 items-center group">
                       <X className="text-thedeal-danger group-hover:rotate-90 transition-transform" size={24} />
                       <p className="text-[11px] md:text-xs text-white font-black uppercase tracking-widest">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-thedeal-card border border-thedeal-gray700 p-12 rounded-[4rem] relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                  <p className="text-2xl md:text-4xl font-serif italic text-white leading-tight text-center">
                    "O resultado? Criadores aceitando qualquer valor por medo. Marcas perdendo dinheiro por falta de dado."
                  </p>
                  <p className="text-xl md:text-2xl font-black text-thedeal-gold uppercase tracking-tighter text-center mt-10">
                    O THE DEAL NASCE NESSE VÁCUO.
                  </p>
              </div>
           </div>
        </section>

        {/* 5. CONTROLE TOTAL - 5 Col Grid on Desktop */}
        <section className="p-8 md:p-20 space-y-12 border-b border-white/5 bg-gradient-to-br from-thedeal-card/50 to-transparent">
            <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight">VOCÊ NO CONTROLE TOTAL</h3>
                <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Sua conta, suas regras, nossos contratos.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
               {[
                 { t: "Você decide o preço", i: DollarSign },
                 { t: "Você aprova propostas", i: CheckCircle2 },
                 { t: "Fala direto com a marca", i: MessageCircle },
                 { t: "Pode sair quando quiser", i: X },
                 { t: "Sem exclusividade", i: ShieldOff }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-5 p-8 bg-white/5 rounded-[2rem] text-center border border-white/5 hover:border-thedeal-gold/40 hover:bg-white/10 transition-all cursor-default group">
                    <item.i className="text-thedeal-gold group-hover:scale-110 transition-transform" size={28} />
                    <span className="text-[10px] font-black uppercase text-white tracking-widest leading-tight">{item.t}</span>
                 </div>
               ))}
            </div>
        </section>

        {/* 6. COMO RESOLVE - 3 Horizontal Cards on Desktop */}
        <section className="p-8 md:p-20 space-y-16 bg-black">
           <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none text-center">COMO O <span className="text-thedeal-gold">THE DEAL RESOLVE</span></h2>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { t: "Curadoria", d: "Só entra quem pode fechar negócio. Auditamos cada perfil." },
                { t: "Estrutura", d: "Pitch, proposta e valor com lógica comercial e ROI." },
                { t: "Contrato", d: "Pagamento claro via Escrow. Sem improviso jurídico." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col gap-8 p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-thedeal-gold transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:text-thedeal-gold/5 transition-colors">{i+1}</div>
                   <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-black text-2xl text-thedeal-gold shadow-lg group-hover:scale-110 transition-transform">
                      {i + 1}
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">{step.t}</h4>
                      <p className="text-thedeal-gray400 text-sm font-medium uppercase tracking-widest leading-relaxed opacity-60">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 7. PRICING ANUAL - Premium Desktop Cards */}
        <section className="py-24 md:py-40 px-6 bg-black text-center space-y-20 border-t border-white/5">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">ACESSO AO <span className="text-thedeal-gold">TERMINAL ALPHA.</span></h2>
              <p className="text-thedeal-gray600 text-[11px] font-bold uppercase tracking-[0.5em]">O custo da profissionalização é menor que o custo do amadorismo.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
              <div className="p-12 md:p-16 bg-thedeal-card border border-white/5 rounded-[4rem] space-y-10 hover:border-thedeal-gold transition-all shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <Zap size={150} className="absolute -top-10 -right-10 text-thedeal-gold opacity-[0.03] group-hover:opacity-10 transition-opacity" />
                <div className="space-y-2">
                    <h3 className="text-white font-black text-3xl uppercase tracking-tighter flex items-center gap-3">💼 Criador</h3>
                    <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Para quem quer viver de influência</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-6xl md:text-7xl font-black text-thedeal-goldBright tracking-tighter">R$ 297</p>
                  <span className="text-lg font-bold text-thedeal-gray600 uppercase">/ano</span>
                </div>
                <ul className="space-y-5 text-[12px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div> Aplicar em missões reais</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div> Usar IA para pitch vencedor</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div> Acessar valores de referência</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div> Entrar na curadoria premium</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-7 rounded-3xl uppercase text-[12px] tracking-[0.2em] shadow-2xl shadow-thedeal-gold/20 hover:scale-[1.02] transition-all">APLICAR PARA CURADORIA</button>
              </div>

              <div className="p-12 md:p-16 bg-thedeal-card border border-white/5 rounded-[4rem] space-y-10 hover:border-white/20 transition-all shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <Building2 size={150} className="absolute -top-10 -right-10 text-white opacity-[0.03] group-hover:opacity-10 transition-opacity" />
                <div className="space-y-2">
                    <h3 className="text-white font-black text-3xl uppercase tracking-tighter flex items-center gap-3">🏢 Marca</h3>
                    <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Para empresas focadas em ROI</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">R$ 497</p>
                  <span className="text-lg font-bold text-thedeal-gray600 uppercase">/ano</span>
                </div>
                <ul className="space-y-5 text-[12px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> Criar missões privadas</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> Receber propostas estruturadas</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> Criadores 100% validados</li>
                  <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> Economizar tempo e erros</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-white text-black font-black py-7 rounded-3xl uppercase text-[12px] tracking-[0.2em] shadow-2xl shadow-white/5 hover:scale-[1.02] transition-all">SOLICITAR ACESSO MARCA</button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] max-w-2xl mx-auto shadow-inner">
               <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                 "Um único contrato pode pagar esse valor em um post. <br/><span className="text-thedeal-danger font-black not-italic text-2xl uppercase mt-4 block">UM ERRO CUSTA MUITO MAIS.</span>"
               </p>
            </div>
        </section>

        {/* 8. FINAL CTA - Massive Background on Desktop */}
        <section className="py-40 px-8 text-center space-y-16 bg-gradient-to-t from-thedeal-card/20 to-transparent">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                O THE DEAL NÃO É <br/>PARA <span className="text-thedeal-danger">TODO MUNDO.</span>
              </h2>
              <p className="text-thedeal-gray400 text-xl md:text-3xl font-medium max-w-4xl mx-auto uppercase tracking-widest opacity-60">
                É para quem quer profissionalizar a influência e <br className="hidden md:block" /> construir um patrimônio digital real.
              </p>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => props.onGoToSignup()}
                className="w-full sm:w-auto bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-24 py-10 rounded-[3rem] text-lg transition-all shadow-[0_30px_100px_rgba(212,175,55,0.4)] uppercase tracking-[0.4em] hover:scale-110 active:scale-95"
              >
                ENTRAR PARA A CURADORIA ALPHA
              </button>
            </div>
        </section>

        <footer className="py-24 px-8 text-center space-y-12 opacity-60 border-t border-white/5">
          <div className="flex justify-center gap-12">
            <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors hover:scale-125"><Instagram size={28} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors hover:scale-125"><Twitter size={28} /></a>
            <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors hover:scale-125"><Video size={28} /></a>
            <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors hover:scale-125"><KwaiIcon className="w-6 h-6" /></a>
          </div>
          <div className="space-y-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.8em]">THE DEAL • INFRAESTRUTURA DE INFLUÊNCIA PROFISSIONAL</p>
            <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-[0.5em]">CNPJ: 59.440.114/0001-03 • LEME, SÃO PAULO, BRASIL</p>
            <p className="text-[8px] font-bold text-thedeal-gold uppercase tracking-[0.3em]">SUPORTE@THEDEAL.COM.BR</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
