
import React, { useState, useEffect } from 'react';
import { 
  LogIn, ArrowRight, Zap, Home, Briefcase, 
  Menu, X as CloseIcon, Trophy, GraduationCap, Building2, HelpCircle, Calculator, Compass
} from 'lucide-react';
import FeedItem from './FeedItem';
import AccessModal from './AccessModal';
import { Language } from '../translations';

interface LandingPageProps {
  onGoToDemo: () => void;
  onGoToSignup: (role: 'creator' | 'brand') => void;
  onGoToPrivacy: () => void;
  onGoToTerms: () => void;
  onGoToForBrands: () => void;
  onGoToForCreators: () => void;
  onGoToHowItWorks: () => void;
  onGoToHub: () => void;
  onGoToBlog: () => void;
  onGoToAcademy: () => void;
  onGoToMissions: () => void;
  onGoToInvestor: () => void;
  onGoToSimulator: () => void;
  onGoToDiscover: () => void;
  onGoToPricing?: () => void;
  language: Language;
  t: any;
}

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const words = ["Influência", "Marca"];

  useEffect(() => {
    const i = loopNum % words.length;
    const fullText = words[i];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed]);

  return (
    <span className="text-thedeal-gold italic min-h-[1.2em] inline-block">
      {text}
      <span className="animate-pulse text-thedeal-gold ml-1">|</span>
    </span>
  );
};

export default function LandingPage({ 
  onGoToDemo, onGoToSignup, onGoToForBrands, onGoToForCreators, 
  onGoToHowItWorks, onGoToAcademy, onGoToMissions, 
  onGoToInvestor, onGoToSimulator, onGoToDiscover, onGoToPricing, t 
 }: LandingPageProps) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRequestInvite = () => onGoToSignup('creator');
  const handleRestrictedAction = () => setIsAccessModalOpen(true);

  const marcasCarrossel = [
    { nome: 'Shopee', logo: 'https://www.pngmart.com/files/12/Shopee-Logo-Transparent-Background.png' },
    { nome: 'Magalu', logo: 'https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0-1536x1536.png' },
    { nome: 'SIGAPAY', logo: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp' },
    { nome: 'Park Brasil', logo: 'https://parkbrazil.com.br/wp-content/uploads/2022/06/logo-park-brazil.png' },
    { nome: 'Rota Automóveis', logo: 'https://sites.integracarros.com.br/uploads/CF75-CF75D0A4-03F7-9ABE-9773-E5FEE598/images/logorota.png' },
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black max-w-full overflow-x-hidden flex flex-col justify-center text-left">
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={handleRequestInvite} />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-thedeal-bg p-6 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-lg shadow-lg flex items-center justify-center">
                <Briefcase size={20} className="text-black" />
              </div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-thedeal-gray400 hover:text-white"><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 flex-1 max-w-sm mx-auto w-full">
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToMissions(); }} className="text-lg font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Trophy size={20} /> MISSÕES</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToAcademy(); }} className="text-lg font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><GraduationCap size={20} /> ACADEMIA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToPricing?.(); }} className="text-lg font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Zap size={20} /> PREÇOS</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToSimulator(); }} className="text-lg font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Calculator size={20} /> CALCULADORA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToInvestor(); }} className="text-lg font-bold text-left text-thedeal-gold flex items-center gap-3 transition-colors"><Briefcase size={20} /> INVESTIDORES</button>
            <div className="h-px bg-thedeal-gray700 my-4"></div>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToHowItWorks(); }} className="text-base font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><HelpCircle size={20} /> COMO FUNCIONA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForBrands(); }} className="text-base font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Building2 size={20} /> PARA MARCAS</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForCreators(); }} className="text-base font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Zap size={20} /> PARA CRIADORES</button>
          </nav>
        </div>
      )}

      <main className="w-full max-w-2xl mx-auto min-h-screen border-x border-thedeal-gray700/50 pb-24">
        <header className="sticky top-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 flex items-center justify-between h-16 md:h-20 transition-all">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                <Briefcase size={16} className="text-black" />
              </div>
              <h1 className="text-lg font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onGoToDemo} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl transition-all">
              <LogIn size={14} className="text-thedeal-gold" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">Login</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-xl border border-white/10 text-thedeal-gray400"><Menu size={20} /></button>
          </div>
        </header>

        <section className="py-20 px-6 text-center space-y-10 animate-fade-in">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-2">
            <span className="text-[9px] font-black text-thedeal-gray400 uppercase tracking-[0.4em]">Comunidade Profissional</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase">
            SUA <TypewriterText /> <br/> EM PRIMEIRO LUGAR.
          </h1>
          <p className="text-lg text-thedeal-gray400 max-w-md mx-auto font-medium">
            A rede social de elite onde criadores e marcas fecham parcerias reais, seguras e justas.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest transition-all">
              <span>Quero Fazer Parte</span> <ArrowRight size={18} />
            </button>
            <button onClick={onGoToHowItWorks} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest transition-all">Como Funciona</button>
          </div>
        </section>

        <section className="py-10 bg-thedeal-card border-y border-thedeal-gray700/50 overflow-hidden relative">
          <div className="flex animate-scroll-slow gap-10 whitespace-nowrap px-4">
            {[...marcasCarrossel, ...marcasCarrossel].map((marca, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-lg"><img src={marca.logo} className="w-full h-full object-contain" /></div>
                <p className="text-white font-black text-[10px] uppercase tracking-tighter">{marca.nome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 space-y-24">
          <FeedItem author="SIGAPAY" avatar="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp" tag="FINTECH" content="Buscamos criadores locais para o lançamento nacional do Terminal Pro 2026." time="Ativa agora" isDeal={true} stats="Apenas Membros Vetted" onAction={handleRestrictedAction} />
          <div className="pt-20 border-t border-white/5 text-center opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL © 2025</p>
          </div>
        </section>
      </main>
    </div>
  );
}
