
import React, { useState, useEffect } from 'react';
import { 
  LogIn, ArrowRight, Lock, Zap, Home, Search, Briefcase, 
  ChevronDown, Camera, Shield, Eye, DollarSign, Sparkles, Menu, X as CloseIcon, Trophy, GraduationCap, LayoutGrid, Building2, HelpCircle, Users, Handshake, Target, Calculator, Info, FileCheck, Clock, Star, Crown, Award, Check, X, CheckCircle, ShieldCheck, Compass
} from 'lucide-react';
import Sidebar from './Sidebar';
import FeedItem from './FeedItem';
import AccessModal from './AccessModal';
import SupportChat from './SupportChat';
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
  language: Language;
  t: any;
}

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Carreira", "Marca", "Influência", "História"];

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
    <span className="bg-gradient-to-r from-thedeal-goldBright to-thedeal-gold bg-clip-text text-transparent italic min-h-[1.2em] inline-block">
      {text}
      <span className="animate-pulse text-thedeal-gold ml-1">|</span>
    </span>
  );
};

export default function LandingPage({ 
  onGoToDemo, onGoToSignup, onGoToForBrands, onGoToForCreators, 
  onGoToHowItWorks, onGoToHub, onGoToBlog, onGoToAcademy, onGoToMissions, 
  onGoToInvestor, onGoToSimulator, onGoToPrivacy, onGoToTerms, onGoToDiscover, language, t 
 }: LandingPageProps) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);

  const handleRequestInvite = () => onGoToSignup('creator');
  const handleRestrictedAction = () => setIsAccessModalOpen(true);

  const marcasCarrossel = [
    { nome: 'Shopee', segmento: 'E-commerce', logo: 'https://www.pngmart.com/files/12/Shopee-Logo-Transparent-Background.png' },
    { nome: 'Magalu', segmento: 'Varejo', logo: 'https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0-1536x1536.png' },
    { nome: 'SIGAPAY', segmento: 'Fintech', logo: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp' },
    { nome: 'Park Brasil', segmento: 'Mobilidade', logo: 'https://parkbrazil.com.br/wp-content/uploads/2022/06/logo-park-brazil.png' },
    { nome: 'Rota Automóveis', segmento: 'Automotivo', logo: 'https://sites.integracarros.com.br/uploads/CF75-CF75D0A4-03F7-9ABE-9773-E5FEE598/images/logorota.png' },
    { nome: 'Zona Azul Brasil', segmento: 'Serviços Públicos', logo: 'https://zonaazulbrasil.com.br/wp-content/uploads/2018/02/cropped-LOGO.png' },
    { nome: 'IGUATEMI Imóveis', segmento: 'Imobiliário', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRo_h_9fHHTStKN6kPal9_m-j0Guuqs_8NQ&s' },
  ];

  const mockPosts = [
    {
      id: 1,
      author: "SIGAPAY",
      avatar: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp",
      tag: "FINANÇAS & TECH",
      time: "Ativa agora",
      content: "Embaixadores 2026. Campanha de educação financeira. Buscamos criadores que sabem traduzir o financês.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
      stats: "Exclusivo para membros",
      isDeal: true
    },
    {
      id: 2,
      author: "IGUATEMI",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRo_h_9fHHTStKN6kPal9_m-j0Guuqs_8NQ&s",
      tag: "LIFESTYLE PREMIUM",
      time: "Destaque",
      content: "Luxury Living. Você produz conteúdo de arquitetura ou design? Estamos selecionando vozes para novos lançamentos.",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      stats: "Seleção via portfólio",
      isDeal: true
    },
    {
      id: 3,
      author: "ZONA AZUL",
      avatar: "https://zonaazulbrasil.com.br/wp-content/uploads/2018/02/cropped-LOGO.png",
      tag: "UTILIDADE PÚBLICA",
      time: "Dia a Dia",
      content: "Campanha prática e direta para apps de mobilidade. Ideal para quem fala com a cidade.",
      imageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop",
      stats: "Candidaturas abertas",
      isDeal: true
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black max-w-full overflow-x-hidden flex justify-center">
      
      <AccessModal 
        isOpen={isAccessModalOpen} 
        onClose={() => setIsAccessModalOpen(false)} 
        onSignup={handleRequestInvite} 
      />

      {/* MISSÃO THE DEAL MODAL */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsMissionModalOpen(false)}></div>
          <div className="bg-thedeal-card border-2 border-thedeal-gold/40 rounded-3xl max-w-lg w-full p-6 md:p-10 relative shadow-[0_0_100px_rgba(212,175,55,0.15)] animate-float-in overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsMissionModalOpen(false)} className="absolute top-6 right-6 text-thedeal-gray400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
              <CloseIcon size={20} />
            </button>
            <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20">
                <Trophy className="text-thedeal-gold" size={32} />
              </div>
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">Ganhe assinatura vitalícia no The Deal</h2>
                <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed">
                  Conclua as missões de expansão e garanta seu acesso premium permanente sem custos futuros.
                </p>
              </div>

              <div className="w-full space-y-3 md:space-y-4 text-left">
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                   <Users className="text-thedeal-gold shrink-0" size={20} />
                   <div>
                      <p className="text-white font-bold text-xs uppercase">01. Expansão da Rede</p>
                      <p className="text-thedeal-gray400 text-[10px] leading-relaxed">Indique 02 novos membros qualificados para a rede.</p>
                   </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                   <Clock className="text-thedeal-gold shrink-0" size={20} />
                   <div>
                      <p className="text-white font-bold text-xs uppercase">02. Fidelidade</p>
                      <p className="text-thedeal-gray400 text-[10px] leading-relaxed">Mantenha sua performance ativa por no mínimo 6 meses.</p>
                   </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                   <FileCheck className="text-thedeal-gold shrink-0" size={20} />
                   <div>
                      <p className="text-white font-bold text-xs uppercase">03. Realização</p>
                      <p className="text-thedeal-gray400 text-[10px] leading-relaxed">Conclua pelo menos 01 contrato formalizado na rede.</p>
                   </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => { setIsMissionModalOpen(false); onGoToMissions(); }}
                  className="w-full bg-thedeal-goldBright text-black font-black py-4 rounded-xl uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20 transition-all hover:scale-[1.02]"
                >
                  Participar das Missões
                </button>
                <button onClick={() => setIsMissionModalOpen(false)} className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] hover:text-thedeal-gray400 transition-colors py-2">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MENU ALPHA OVERLAY (Drawer unificado) */}
      {(isMobileMenuOpen) && (
        <div className="fixed inset-0 z-[100] bg-thedeal-bg p-6 md:p-8 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-12">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-lg shadow-lg flex items-center justify-center">
                  <Briefcase size={20} className="text-black" />
                </div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h2>
              </div>
              <p className="text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-thedeal-gray400 hover:text-white"><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 flex-1 max-w-sm mx-auto w-full">
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToMissions(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Trophy size={20} /> MISSÕES</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToAcademy(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><GraduationCap size={20} /> INTELIGÊNCIA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToSimulator(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Calculator size={20} /> SIMULADOR DE GANHOS</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToInvestor(); }} className="text-lg md:text-xl font-bold text-left text-thedeal-gold flex items-center gap-3 transition-colors"><Handshake size={20} /> SEJA UM INVESTIDOR</button>
            <div className="h-px bg-thedeal-gray700 my-4"></div>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToHowItWorks(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><HelpCircle size={20} /> COMO FUNCIONA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForBrands(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Building2 size={20} /> PARA MARCAS</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForCreators(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Zap size={20} /> PARA CRIADORES</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToDemo(); }} className="text-base md:text-lg font-bold text-left text-thedeal-gold mt-4 flex items-center gap-3 transition-colors"><LogIn size={20} /> LOGIN</button>
          </nav>
        </div>
      )}

      <SupportChat />

      <div className="flex justify-center w-full min-h-screen">
        <main className="w-full max-w-2xl min-h-screen border-x border-thedeal-gray700/50 pb-24 lg:pb-32">
          
          <header className="sticky top-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 flex items-center justify-between h-16 md:h-20 transition-all">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                  <Briefcase size={18} className="text-black" />
                </div>
                <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
              </div>
              <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={onGoToDemo} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                <LogIn size={14} className="text-thedeal-gold" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Login</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-thedeal-gray400 hover:text-white p-2 bg-white/5 rounded-xl border border-white/10">
                <Menu size={24} />
              </button>
            </div>
          </header>

          <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-24 text-center animate-fade-in border-b border-thedeal-gray700/30">
            <div className="relative z-10 space-y-8 md:space-y-12 max-w-full mx-auto flex flex-col items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                    <p className="text-[8px] md:text-[10px] font-black uppercase text-thedeal-gray400 tracking-[0.3em]">Comunidade Profissional</p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight uppercase px-2">
                Sua <TypewriterText /> <br/> em Primeiro Lugar.
              </h1>

              <p className="text-lg text-thedeal-gray400 max-w-full mx-auto font-medium leading-relaxed px-4">
                A rede social onde criadores de conteúdo e grandes marcas se conectam para fechar parcerias reais, seguras e justas. Você cria a audiência. Nós trazemos as oportunidades.
              </p>

              <div className="flex flex-col gap-4 justify-center w-full px-6">
                <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-5 rounded-2xl shadow-2xl shadow-thedeal-gold/15 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
                  <span>Quero Fazer Parte</span>
                  <ArrowRight size={16} />
                </button>
                <button onClick={onGoToHowItWorks} className="w-full bg-white/5 hover:bg-white/10 border border-thedeal-gray700 text-white font-black px-8 py-5 rounded-2xl uppercase text-[10px] tracking-widest transition-all backdrop-blur-md">
                  Como funciona a comunidade
                </button>
              </div>
            </div>
          </section>

          <section className="py-12 bg-thedeal-card border-y border-thedeal-gray700/50 overflow-hidden px-4">
            <h3 className="text-thedeal-gray400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-center">Quem já está no The Deal</h3>
            <div className="flex animate-scroll-slow gap-8 md:gap-14 px-4 py-4 w-max">
              {[...marcasCarrossel, ...marcasCarrossel].map((marca, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-thedeal-bg bg-white shadow-xl overflow-hidden flex items-center justify-center">
                    {marca.nome === 'Ethos Comunicação' ? <Target className="text-thedeal-gold w-8 h-8" /> : <img src={marca.logo} alt={marca.nome} className="w-full h-full object-contain p-2" />}
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black text-[9px] md:text-[11px] uppercase tracking-tighter leading-none">{marca.nome}</p>
                    <p className="text-thedeal-gold text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-80">{marca.segmento}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 sm:px-6 py-10 space-y-8 relative overflow-hidden">
            <div className="text-center space-y-4 mb-12">
               <h3 className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] text-thedeal-gold flex items-center justify-center gap-3">
                <Zap size={18} className="text-thedeal-gold" /> Oportunidades Ativas
               </h3>
               <p className="text-thedeal-gray400 text-sm font-medium max-w-sm mx-auto">
                Seu feed focado no próximo passo da sua carreira.
               </p>
            </div>
            
            <div className="space-y-6">
                {mockPosts.map((post, idx) => (
                  <FeedItem 
                    key={post.id} 
                    {...post} 
                    onAction={handleRestrictedAction}
                    stats="Apenas membros"
                  />
                ))}
            </div>
          </section>

          {/* SISTEMA DE NÍVEIS */}
          <section className="py-24 px-4 sm:px-6 space-y-16">
            <div className="text-center max-w-full mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-2">
                <LayoutGrid size={14} className="text-blue-400" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">🎮 EVOLUÇÃO DE CARREIRA</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Sua jornada <br/> por <span className="text-thedeal-gold">mérito.</span></h2>
              <p className="text-thedeal-gray400 text-sm md:text-lg font-medium leading-relaxed px-4">
                No The Deal, seu crescimento é baseado em performance real e consistência.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 w-full px-4">
              {/* NÍVEL 1: ROOKIE */}
              <div className="bg-thedeal-card border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-between group hover:border-thedeal-gray600 transition-all shadow-2xl relative overflow-hidden">
                 <div className="space-y-8 relative z-10 text-center flex flex-col items-center">
                    <div className="space-y-4">
                      <div className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-thedeal-gray400">Até 100k SEGUIDORES</div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-2 shadow-inner">🌱</div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Rookie</h3>
                      </div>
                      <p className="text-thedeal-gold font-black text-xs tracking-[0.2em]">O COMEÇO PROFISSIONAL</p>
                    </div>
                    <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">Ideal para quem está validando sua voz e criando portfólio comercial.</p>
                 </div>
              </div>

              {/* NÍVEL 2: PRO */}
              <div className="bg-thedeal-card border-2 border-thedeal-gold/40 p-10 rounded-[2.5rem] flex flex-col justify-between group hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden">
                 <div className="space-y-8 relative z-10 text-center flex flex-col items-center">
                    <div className="space-y-4">
                      <div className="inline-block bg-thedeal-gold/20 border border-thedeal-gold/30 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-thedeal-gold">100k a 900k SEGUIDORES</div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-thedeal-gold/10 rounded-2xl flex items-center justify-center text-4xl mb-2 shadow-inner">⭐</div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Pro</h3>
                      </div>
                      <p className="text-thedeal-gold font-black text-xs tracking-[0.2em]">GANHANDO ESCALA</p>
                    </div>
                    <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">Acesse contratos regionais e parcerias de médio prazo com marcas fixas.</p>
                 </div>
              </div>

              {/* NÍVEL 3: STAR */}
              <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-goldBright p-10 rounded-[2.5rem] flex flex-col justify-between group hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all shadow-2xl relative overflow-hidden">
                 <div className="space-y-8 relative z-10 text-center flex flex-col items-center">
                    <div className="space-y-4">
                      <div className="inline-block bg-thedeal-goldBright/20 border border-thedeal-goldBright/30 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-thedeal-goldBright">+900k SEGUIDORES</div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-thedeal-goldBright/10 rounded-2xl flex items-center justify-center text-4xl mb-2 shadow-inner">👑</div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Star</h3>
                      </div>
                      <p className="text-thedeal-goldBright font-black text-xs tracking-[0.2em]">GRANDES ALCANCES</p>
                    </div>
                    <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">Campanhas nacionais, exclusividade e modelos avançados de equity.</p>
                 </div>
              </div>
            </div>
          </section>

          {/* MEMBERSHIP SECTION */}
          <section className="py-24 px-6 bg-black/40 border-y border-thedeal-gray700/30">
            <div className="max-w-full mx-auto flex flex-col gap-12 items-center text-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-gold/20 px-4 py-1.5 rounded-full mx-auto">
                  <Shield size={16} className="text-thedeal-gold" />
                  <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.2em]">Comunidade Protegida</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">Acesso à <br/> <span className="text-thedeal-gold">Comunidade.</span></h2>
                <p className="text-thedeal-gray400 text-base leading-relaxed font-medium px-4">
                  O The Deal mantém um ambiente seguro e focado em negócios através de um sistema de assinatura anual para validação de identidade.
                </p>
              </div>
              <div className="w-full max-w-sm bg-thedeal-card border-2 border-thedeal-gold/30 p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-thedeal-gold/5 rounded-full blur-2xl"></div>
                <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-4">ASSINATURA ANUAL</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white tracking-tighter">R$ 118,80</span>
                  <span className="text-sm font-bold text-thedeal-gray600 block mt-1">/ ano</span>
                </div>
                <button 
                  onClick={onGoToDiscover}
                  className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-thedeal-gold/20 hover:scale-105 transition-all mb-4"
                >
                  DESCUBRA A REDE
                </button>
                <p className="text-[9px] font-bold text-thedeal-gray600 uppercase leading-relaxed">
                  Explore sem limites. Conecte-se com a elite.
                </p>
              </div>
            </div>
          </section>
          
          <section className="py-24 px-6 text-center space-y-10">
            <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none">
              Dê o próximo passo <br/>na sua carreira.
            </h2>
            <div className="pt-8 w-full">
              <button onClick={handleRestrictedAction} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-6 rounded-2xl shadow-xl transition-all uppercase text-lg tracking-[0.2em] active:scale-95">
                Criar Minha Conta
              </button>
            </div>
          </section>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-16 md:h-20 bg-thedeal-bg/95 backdrop-blur-xl border-t border-thedeal-gray700 flex justify-around py-3 px-4 z-50 safe-area-bottom">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex flex-col items-center gap-1 text-white">
          <Home size={20} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Início</span>
        </button>
        <button onClick={onGoToMissions} className="flex flex-col items-center gap-1 text-thedeal-gray400">
          <Trophy size={20} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Missões</span>
        </button>
        <button onClick={onGoToDiscover} className="p-3 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-xl shadow-lg -mt-8 border-4 border-thedeal-bg">
          <Compass size={22} className="text-black" strokeWidth={2.5} />
        </button>
        <button onClick={onGoToAcademy} className="flex flex-col items-center gap-1 text-thedeal-gray400">
          <GraduationCap size={20} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Academia</span>
        </button>
        <button onClick={onGoToDiscover} className="flex flex-col items-center gap-1 text-thedeal-gray400">
          <Compass size={20} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Descubra</span>
        </button>
      </nav>
    </div>
  );
}
