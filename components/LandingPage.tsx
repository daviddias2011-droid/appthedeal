
import React, { useState, useEffect } from 'react';
import { 
  LogIn, ArrowRight, Zap, Home, Briefcase, 
  Menu, X as CloseIcon, Trophy, GraduationCap, LayoutGrid, Building2, HelpCircle, Users, Handshake, Calculator, Compass, AlertOctagon, Sparkles, Star, TrendingUp, ShieldCheck
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
  onGoToBlacklist: () => void;
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
  onGoToHowItWorks, onGoToBlog, onGoToAcademy, onGoToMissions, 
  onGoToInvestor, onGoToSimulator, onGoToDiscover, onGoToBlacklist, t 
 }: LandingPageProps) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black max-w-full overflow-x-hidden flex justify-center">
      
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={handleRequestInvite} />

      {/* MENU ALPHA OVERLAY */}
      {(isMobileMenuOpen) && (
        <div className="fixed inset-0 z-[100] bg-thedeal-bg p-6 md:p-8 animate-fade-in flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-lg shadow-lg flex items-center justify-center">
                <Briefcase size={20} className="text-black" />
              </div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-thedeal-gray400 hover:text-white"><CloseIcon size={28}/></button>
          </div>
          <nav className="flex flex-col gap-6 flex-1 max-w-sm mx-auto w-full">
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToMissions(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Trophy size={20} /> MISSÕES</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToAcademy(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><GraduationCap size={20} /> ACADEMIA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToSimulator(); }} className="text-lg md:text-xl font-bold text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Calculator size={20} /> CALCULADORA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToBlacklist(); }} className="text-lg md:text-xl font-bold text-left hover:text-red-500 flex items-center gap-3 transition-colors text-thedeal-gray400"><AlertOctagon size={20} /> LISTA NEGRA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToInvestor(); }} className="text-lg md:text-xl font-bold text-left text-thedeal-gold flex items-center gap-3 transition-colors"><Handshake size={20} /> SEJA UM INVESTIDOR</button>
            <div className="h-px bg-thedeal-gray700 my-4"></div>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToHowItWorks(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><HelpCircle size={20} /> COMO FUNCIONA</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForBrands(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Building2 size={20} /> PARA MARCAS</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToForCreators(); }} className="text-base md:text-lg font-medium text-left hover:text-thedeal-gold flex items-center gap-3 transition-colors"><Zap size={20} /> PARA CRIADORES</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onGoToDemo(); }} className="text-base md:text-lg font-bold text-left text-thedeal-gold mt-4 flex items-center gap-3 transition-colors"><LogIn size={20} /> LOGIN</button>
          </nav>
        </div>
      )}

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
              
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-2">
                <span className="text-[9px] md:text-[10px] font-black text-thedeal-gray400 uppercase tracking-[0.4em]">Comunidade Profissional</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase px-2">
                SUA <TypewriterText /> <br/>
                EM PRIMEIRO LUGAR.
              </h1>

              <p className="text-base md:text-lg text-thedeal-gray400 max-w-md mx-auto font-medium leading-relaxed px-4">
                A rede social onde criadores de conteúdo e grandes marcas se conectam para fechar parcerias reais, seguras e justas. Você cria a audiência. Nós trazemos as oportunidades.
              </p>

              <div className="flex flex-col gap-4 justify-center w-full px-10">
                <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] transition-all">
                  <span>Quero Fazer Parte</span>
                  <ArrowRight size={16} />
                </button>
                <button onClick={onGoToHowItWorks} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black px-8 py-5 rounded-2xl transition-all uppercase text-[11px] tracking-[0.2em]">
                  Como funciona a comunidade
                </button>
              </div>
            </div>
          </section>

          {/* CARROSSEL DE MARCAS - ROLAMENTO CONTÍNUO */}
          <section className="py-12 bg-thedeal-card border-y border-thedeal-gray700/50 overflow-hidden relative">
            <h3 className="text-thedeal-gray400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-center">Quem já está no The Deal</h3>
            <div className="flex w-full overflow-hidden">
                <div className="flex animate-scroll-slow gap-8 md:gap-14 px-4 py-4 w-max whitespace-nowrap">
                  {[...marcasCarrossel, ...marcasCarrossel, ...marcasCarrossel].map((marca, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-thedeal-bg bg-white shadow-xl overflow-hidden flex items-center justify-center">
                        <img src={marca.logo} alt={marca.nome} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-black text-[9px] md:text-[11px] uppercase tracking-tighter leading-none">{marca.nome}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 py-10 space-y-8 relative overflow-hidden">
            <div className="space-y-6">
                {mockPosts.map((post) => (
                  <FeedItem key={post.id} {...post} onAction={handleRestrictedAction} />
                ))}
            </div>
          </section>

          {/* SEÇÃO DE NÍVEIS E PRECIFICAÇÃO - MOVIDA PARA O FINAL */}
          <section className="py-20 px-6 bg-black border-t border-thedeal-gray700/30">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter">Planos de <span className="text-thedeal-gold">Acesso.</span></h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Escolha seu modo de ingresso na rede</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-thedeal-card border border-white/5 rounded-[2rem] space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight">Iniciante</h3>
                  <p className="text-thedeal-gray400 text-xs mt-2 font-medium">Acesso limitado para Aspirantes. Fila de espera manual e sem badge verificado.</p>
                </div>
                <div className="pt-6">
                  <p className="text-3xl font-black text-white">Grátis</p>
                  <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest mt-1">Sempre gratuito</p>
                </div>
              </div>

              <div className="p-8 bg-thedeal-card border-2 border-thedeal-goldBright/40 rounded-[2rem] space-y-6 flex flex-col justify-between shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-black text-xl uppercase tracking-tight">Crescimento</h3>
                    <div className="bg-thedeal-gold text-black px-3 py-1 rounded-full text-[8px] font-black uppercase">Alpha</div>
                  </div>
                  <p className="text-thedeal-gray400 text-xs mt-2 font-medium">Liberação instantânea, bônus de Deal Score e acesso a contratos fixos.</p>
                </div>
                <div className="pt-6">
                  <p className="text-3xl font-black text-thedeal-goldBright">R$ 9,90 <span className="text-sm font-bold text-thedeal-gray600">/mês</span></p>
                  <p className="text-[10px] font-black uppercase text-thedeal-gold tracking-widest mt-1">Plano Pro Mensal</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-thedeal-card to-black border border-thedeal-gold/20 rounded-[2rem] text-center">
              <div className="w-12 h-12 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown size={24} className="text-thedeal-gold" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Estrela</h3>
              <p className="text-thedeal-gray400 text-xs mt-2 mb-6 max-w-xs mx-auto font-medium">Nível Elite reservado para criadores celebridades e grandes marcas enterprise. Acesso via ClubAlpha.</p>
              <button onClick={handleRestrictedAction} className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em] hover:text-white transition-colors underline decoration-2 underline-offset-8">Solicitar Upgrade de Elite</button>
            </div>
          </section>

          <section className="py-24 px-6 text-center space-y-10">
            <button onClick={handleRestrictedAction} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-6 rounded-2xl shadow-xl transition-all uppercase text-lg tracking-[0.2em] active:scale-95">
              Criar Minha Conta
            </button>
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
        <button onClick={onGoToSimulator} className="p-3 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-xl shadow-lg -mt-8 border-4 border-thedeal-bg">
          <Calculator size={22} className="text-black" strokeWidth={2.5} />
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

const Crown = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
);
