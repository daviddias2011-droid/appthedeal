
import React, { useState, useEffect } from 'react';
import { 
  LogIn, ArrowRight, Briefcase, 
  Menu, X as CloseIcon, Building2, HelpCircle, Calculator, Compass, Zap, Check
} from 'lucide-react';
import FeedItem from './FeedItem';
import AccessModal from './AccessModal';
import Footer from './Footer';

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const words = ["Influência", "Marca"];
  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1); }
    }, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);
  return <span className="text-thedeal-gold italic">{text}<span className="animate-pulse">|</span></span>;
};

export default function LandingPage(props: any) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mockPosts = [
    { id: 1, author: "SIGAPAY", avatar: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp", tag: "FINTECH", time: "Ativa", content: "Buscamos criadores para campanha de mobilidade. Foco em conversão.", imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop", stats: "Exclusivo", isDeal: true },
    { id: 2, author: "IGUATEMI", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRo_h_9fHHTStKN6kPal9_m-j0Guuqs_8NQ&s", tag: "LUXO", time: "Destaque", content: "Seleção para vozes do Luxury Living. Arquitetura e Design.", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", stats: "Vetted Only", isDeal: true }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black overflow-x-hidden flex justify-center text-left">
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={() => props.onGoToSignup()} />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-thedeal-bg p-8 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-thedeal-gold rounded flex items-center justify-center"><Briefcase size={20} className="text-black" /></div><h2 className="text-xl font-display font-black text-white">THE DEAL</h2></div>
            <button onClick={() => setIsMobileMenuOpen(false)}><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            <button onClick={() => { props.onGoToForBrands(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3"><Building2 size={20} /> MARCAS</button>
            <button onClick={() => { props.onGoToForCreators(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3"><Zap size={20} /> CRIADORES</button>
            <button onClick={() => { props.onGoToSimulator(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3"><Calculator size={20} /> CALCULADORA</button>
            <button onClick={() => { props.onGoToDiscover(); setIsMobileMenuOpen(false); }} className="text-xl font-bold flex items-center gap-3"><Compass size={20} /> DESCUBRA</button>
            <button onClick={() => { props.onGoToSignup(); setIsMobileMenuOpen(false); }} className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl">ENTRAR AGORA</button>
          </nav>
        </div>
      )}

      <main className="w-full max-w-2xl min-h-screen border-x border-thedeal-gray700/50 pb-32">
        <header className="sticky top-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center"><Briefcase size={18} className="text-black" /></div>
            <h1 className="text-lg md:text-xl font-display font-black text-white uppercase leading-none">THE DEAL</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => props.onGoToSignup()} className="px-5 py-2 bg-thedeal-gold text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-thedeal-gold/20">Entrar</button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-xl border border-white/10"><Menu size={24} /></button>
          </div>
        </header>

        <section className="px-6 py-16 md:py-24 text-center space-y-10 border-b border-thedeal-gray700/30">
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase">
            SUA <TypewriterText /> <br/> EM PRIMEIRO LUGAR.
          </h1>
          <p className="text-base md:text-lg text-thedeal-gray400 max-w-md mx-auto font-medium">A infraestrutura profissional onde criadores estratégicos e grandes marcas fecham contratos reais.</p>
          <div className="flex flex-col gap-4 px-10">
            <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest transition-all hover:scale-105">Quero Fazer Parte <ArrowRight size={16} /></button>
            <button onClick={() => props.onGoToHowItWorks()} className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest">Como funciona</button>
          </div>
        </section>

        <section className="p-6 space-y-8">
          {mockPosts.map(post => <FeedItem key={post.id} {...post} onAction={() => setIsAccessModalOpen(true)} />)}
        </section>

        <section className="py-20 px-6 bg-black border-y border-thedeal-gray700/30 text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Escolha Seu <span className="text-thedeal-gold">Acesso.</span></h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Protocolos Profissionais</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div className="p-8 bg-thedeal-card border border-white/5 rounded-[2.5rem] space-y-8">
                <h3 className="text-white font-black text-2xl uppercase">Criador</h3>
                <p className="text-4xl font-black text-thedeal-goldBright">R$ 297<span className="text-sm font-bold text-thedeal-gray600">/ano</span></p>
                <ul className="space-y-4 text-[11px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Marketplace Ativo</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Escrow de Segurança</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-thedeal-goldBright text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20">ATIVAR PERFIL</button>
              </div>
              <div className="p-8 bg-thedeal-card border border-white/5 rounded-[2.5rem] space-y-8 border-l-4 border-l-thedeal-gold">
                <h3 className="text-white font-black text-2xl uppercase">Marca</h3>
                <p className="text-4xl font-black text-white">R$ 497<span className="text-sm font-bold text-thedeal-gray600">/ano</span></p>
                <ul className="space-y-4 text-[11px] text-white font-bold uppercase tracking-widest">
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Acesso aos Criadores</li>
                  <li className="flex gap-2"><Check size={16} className="text-thedeal-gold"/> Propostas Ilimitadas</li>
                </ul>
                <button onClick={() => props.onGoToSignup()} className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-white/5">COMEÇAR A CONTRATAR</button>
              </div>
            </div>
        </section>

        <footer className="py-20 px-6 text-center space-y-6 opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • CNPJ: 59.440.114/0001-03</p>
          <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">EM DESENVOLVIMENTO • SUPORTE@THEDEAL.COM.BR</p>
        </footer>
      </main>

      <Footer activeTab="landing" setActiveTab={(tab) => props[`onGoTo${tab.charAt(0).toUpperCase() + tab.slice(1).replace('-','').replace('landing','Hub')}`]()} />
    </div>
  );
}
