import React, { useState } from 'react';
import { 
  ArrowRight, Briefcase, Menu, X as CloseIcon, Building2, Calculator, Compass, Zap, 
  Check, X, ShieldCheck, TrendingUp, Shield, CheckCircle2, FileText, 
  Instagram, Twitter, Video, HelpCircle, ArrowDown
} from 'lucide-react';
import AccessModal from './AccessModal';
import { KwaiIcon } from './Icons';

export default function LandingPage(props: any) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroToggle, setHeroToggle] = useState<'creator' | 'brand'>('creator');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-thedeal-gold selection:text-black overflow-x-hidden flex flex-col items-center">
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={() => props.onGoToSignup()} />

      {/* Navigation */}
      <header className="fixed top-0 z-[100] w-full max-w-7xl bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#404040] p-4 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg shadow-thedeal-gold/10">
            <Briefcase size={18} className="text-black" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-display font-black text-white uppercase leading-none tracking-tighter">THE DEAL</h1>
            <p className="text-[7px] md:text-[8px] font-bold uppercase text-thedeal-gold tracking-widest leading-tight">Onde influência vira contrato</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => props.onGoToForBrands()} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-white transition-colors">Para Marcas</button>
          <button onClick={() => props.onGoToForCreators()} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-white transition-colors">Para Criadores</button>
          <button onClick={() => scrollToSection('como-funciona')} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-white transition-colors">Como Funciona</button>
          <button onClick={() => props.onGoToSimulator()} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-white transition-colors">Calculadora</button>
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => props.onGoToSignup()} 
            className="px-6 py-2.5 bg-thedeal-gold text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-thedeal-gold/20 hover:scale-105 transition-all"
          >
            Solicitar Acesso
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-xl border border-white/10 text-white"><Menu size={24} /></button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-black p-8 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-thedeal-gold rounded flex items-center justify-center">
                <Briefcase size={20} className="text-black" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-display font-black text-white leading-none">THE DEAL</h2>
                <p className="text-[8px] font-bold uppercase text-thedeal-gold tracking-widest">Onde influência vira contrato</p>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            <button onClick={() => { props.onGoToForBrands(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Building2 size={20} className="text-thedeal-gold" /> MARCAS</button>
            <button onClick={() => { props.onGoToForCreators(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Zap size={20} className="text-thedeal-gold" /> CRIADORES</button>
            <button onClick={() => { props.onGoToSimulator(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Calculator size={20} className="text-thedeal-gold" /> CALCULADORA</button>
            <button onClick={() => { props.onGoToDiscover(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tighter"><Compass size={20} className="text-thedeal-gold" /> DESCUBRA</button>
            <button onClick={() => { props.onGoToSignup(); setIsMobileMenuOpen(false); }} className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">PEDIR CONVITE</button>
          </nav>
        </div>
      )}

      <main className="w-full">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-12 bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.05)_0%,transparent_50%)]">
          <div className="flex bg-white/5 p-1.5 rounded-full mb-12 border border-white/10">
            <button 
              onClick={() => setHeroToggle('creator')}
              className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${heroToggle === 'creator' ? 'bg-thedeal-gold text-black' : 'text-[#A0A0A0] hover:text-white'}`}
            >
              Sou Criador
            </button>
            <button 
              onClick={() => setHeroToggle('brand')}
              className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${heroToggle === 'brand' ? 'bg-thedeal-gold text-black' : 'text-[#A0A0A0] hover:text-white'}`}
            >
              Sou Marca
            </button>
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] tracking-tighter uppercase animate-float-in">
              {heroToggle === 'creator' ? (
                <>Sua Influência <span className="text-thedeal-gold italic">JÁ VALE</span> Dinheiro. <br/> Falta Só o Contrato.</>
              ) : (
                <>Contrate influência do mesmo jeito que você <br/><span className="text-thedeal-gold italic">contrata qualquer fornecedor sério.</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-2xl text-[#A0A0A0] max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-tight">
              A primeira infraestrutura privada que transforma criadores em fornecedores profissionais e protege o investimento das marcas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button 
                onClick={() => props.onGoToSignup()} 
                className="w-full sm:w-auto bg-thedeal-gold text-black font-black px-12 py-6 rounded-2xl shadow-2xl shadow-thedeal-gold/20 hover:scale-105 active:scale-95 transition-all uppercase text-sm tracking-widest"
              >
                Solicitar Acesso
              </button>
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-black px-12 py-5 rounded-2xl hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest"
              >
                Ver Como Funciona
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
            <ArrowDown size={32} />
          </div>
        </section>

        {/* PARA QUEM É */}
        <section className="py-24 px-6 bg-thedeal-card/30 border-y border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* COLUMN CRIADOR */}
            <div className="bg-thedeal-card border border-white/5 p-10 rounded-[3rem] space-y-8 hover:border-thedeal-gold/40 transition-all shadow-2xl">
              <div className="w-16 h-16 bg-thedeal-gold/10 rounded-2xl flex items-center justify-center">
                <Zap size={32} className="text-thedeal-gold" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Criadores</h3>
              <ul className="space-y-4">
                {[
                  "Acesso a contratos de alto ticket",
                  "100% do valor do contrato é seu",
                  "Pagamento garantido em custódia (Escrow)",
                  "Protocolo de curadoria técnica profissional"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#A0A0A0]">
                    <Check size={18} className="text-thedeal-gold" /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Taxa de avaliação técnica: R$ 99 (paga para solicitar curadoria)</p>
              </div>
            </div>

            {/* COLUMN MARCA */}
            <div className="bg-thedeal-card border border-white/5 p-10 rounded-[3rem] space-y-8 hover:border-thedeal-gold/40 transition-all shadow-2xl">
              <div className="w-16 h-16 bg-thedeal-gold/10 rounded-2xl flex items-center justify-center">
                <Building2 size={32} className="text-thedeal-gold" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Marcas</h3>
              <ul className="space-y-4">
                {[
                  "Rede curada de criadores profissionais",
                  "Acesso anual ao terminal estratégico",
                  "Pagamento liberado somente após a entrega",
                  "Formalização contratual para cada deal"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#A0A0A0]">
                    <Check size={18} className="text-thedeal-gold" /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Comissão: 10% sobre negócios fechados</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-24 md:py-32 px-4 md:px-6">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
                O Mercado Está Quebrado.<br/><span className="text-[#FF0033]">Nós Consertamos.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 bg-thedeal-card rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
              {/* BLOCK 1: MERCADO HOJE */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
                <h4 className="text-[#FF0033] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-10">Como o mercado opera hoje</h4>
                <ul className="space-y-6 md:space-y-8">
                  {["DMs perdidas", "Pagamento inseguro", "Acordos informais", "Ghosting sem consequência", "Dependência de confiança informal"].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4 text-[#A0A0A0] text-xs md:text-sm font-bold uppercase tracking-widest opacity-60">
                      <X size={18} className="text-[#FF0033] shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* BLOCK 2: THE DEAL */}
              <div className="p-8 md:p-12 bg-thedeal-gold/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                   <ShieldCheck size={120} className="text-thedeal-gold" />
                </div>
                <h4 className="text-thedeal-gold font-black uppercase text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-10">O padrão com infraestrutura</h4>
                <ul className="space-y-6 md:space-y-8 relative z-10">
                  {["Contratos digitais registrados", "Custódia financeira (Escrow)", "Cláusulas com validade jurídica", "Proteção jurídica bilateral", "ROI mensurável e auditado"].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4 text-white text-xs md:text-sm font-black uppercase tracking-widest">
                      <CheckCircle2 size={18} className="text-thedeal-gold shrink-0" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-32 px-6 bg-thedeal-card/30 border-y border-white/5">
          <div className="max-w-6xl mx-auto space-y-20">
             <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Como os contratos <span className="text-thedeal-gold">acontecem na prática.</span></h2>
             </div>

             <div className="grid md:grid-cols-4 gap-8">
                {[
                  { n: "1", t: "· Protocolo", d: "Pagamento da taxa e submissão para análise técnica.", i: Shield },
                  { n: "2", t: "· Curadoria", d: "Avaliação da maturidade e ativos do perfil.", i: TrendingUp },
                  { n: "3", t: "· Contrato", d: "Aprovação e acesso a deals com validade jurídica.", i: FileText },
                  { n: "4", t: "· Liquidação", d: "Entrega aprovada e pagamento liberado da custódia.", i: ShieldCheck }
                ].map((step, i) => (
                  <div key={i} className="relative group p-8 bg-black/40 border border-white/5 rounded-3xl hover:border-thedeal-gold/30 transition-all">
                    <div className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:text-thedeal-gold/10 transition-colors">{step.n}</div>
                    <div className="w-12 h-12 bg-thedeal-gold/10 rounded-xl flex items-center justify-center text-thedeal-gold mb-6"><step.i size={24} /></div>
                    <h4 className="text-lg font-black uppercase tracking-widest mb-3 text-white">{step.t}</h4>
                    <p className="text-sm text-[#A0A0A0] font-medium leading-relaxed">{step.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 px-6 text-center space-y-12">
            <div className="space-y-6">
              <p className="text-[#A0A0A0] text-sm md:text-xl font-bold uppercase tracking-[0.3em]">Nós não somos uma agência.</p>
              <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
                Somos a infraestrutura que organiza <br/>e protege a sua <span className="text-thedeal-gold">influência.</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg md:text-2xl font-light max-w-2xl mx-auto italic uppercase tracking-tight">
                Onde contratos substituem promessas e o "mimo" não faz parte do processo.
              </p>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => props.onGoToSignup()}
                className="w-full sm:w-auto bg-thedeal-gold text-black font-black px-16 py-8 rounded-3xl text-sm transition-all shadow-2xl shadow-thedeal-gold/30 uppercase tracking-[0.3em] hover:scale-110 active:scale-95"
              >
                Quero operar de forma profissional
              </button>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 px-6 bg-black border-t border-white/5 text-center space-y-12">
          <div className="flex flex-wrap justify-center gap-10">
            <button onClick={props.onGoToTerms} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-thedeal-gold transition-colors">Termos de Uso</button>
            <button onClick={props.onGoToPrivacy} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-thedeal-gold transition-colors">Política de Privacidade</button>
            <button onClick={props.onGoToFaq} className="text-[10px] font-black uppercase tracking-widest text-[#A0A0A0] hover:text-thedeal-gold transition-colors">Contato / Suporte</button>
          </div>

          <div className="flex justify-center gap-12 py-4 border-y border-white/5">
             <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#A0A0A0] tracking-widest">
                <Shield size={14} className="text-thedeal-gold" /> Pagamento Seguro
             </div>
             <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#A0A0A0] tracking-widest">
                <ShieldCheck size={14} className="text-thedeal-gold" /> LGPD Compliance
             </div>
             <div className="flex items-center gap-2 text-[9px] font-black uppercase text-[#A0A0A0] tracking-widest">
                <Compass size={14} className="text-thedeal-gold" /> Foro: Leme/SP
             </div>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/thedealbrasil" target="_blank" className="text-[#A0A0A0] hover:text-thedeal-gold"><Instagram size={22} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" className="text-[#A0A0A0] hover:text-thedeal-gold"><Twitter size={22} /></a>
            <a href="https://www.tiktok.com/@thedealbr" target="_blank" className="text-[#A0A0A0] hover:text-thedeal-gold"><Video size={22} /></a>
          </div>

          <div className="space-y-2 opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • CNPJ: 59.440.114/0001-03</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">Rede Social Privada • © 2026</p>
          </div>
        </footer>
      </main>
    </div>
  );
}