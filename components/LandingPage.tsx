
import React, { useState, useEffect } from 'react';
import { 
  LogIn, ArrowRight, Zap, Home, Briefcase, 
  Menu, X as CloseIcon, Trophy, GraduationCap, LayoutGrid, Building2, HelpCircle, Users, Handshake, Calculator, Compass, AlertOctagon, Sparkles, Star, TrendingUp, ShieldCheck, Crown, Check, X, ShieldAlert, FileX, DollarSign, Clock, MessageSquare, ChevronDown, Award
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
  onGoToHowItWorks, onGoToBlog, onGoToAcademy, onGoToMissions, 
  onGoToInvestor, onGoToSimulator, onGoToDiscover, onGoToBlacklist, onGoToPricing, t 
 }: LandingPageProps) {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleRequestInvite = () => onGoToSignup('creator');
  const handleRestrictedAction = () => setIsAccessModalOpen(true);

  const marcasCarrossel = [
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
      tag: "FINTECH",
      time: "Ativa agora",
      content: "Embaixadores 2026. Buscamos criadores para promover soluções de pagamento digital. Foco em educação financeira e performance.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
      stats: "Contrato + Escrow Ativo",
      isDeal: true
    },
    {
      id: 2,
      author: "IGUATEMI",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRo_h_9fHHTStKN6kPal9_m-j0Guuqs_8NQ&s",
      tag: "PREMIUM",
      time: "Destaque",
      content: "Luxury Living. Seleção de criadores para cobertura de novos empreendimentos de alto padrão.",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      stats: "Pagamento Protegido",
      isDeal: true
    }
  ];

  const faqs = [
    {
      q: "Por que pagar R$ 297?",
      a: "Porque você elimina calote, ghosting e burocracia. São R$ 0,81/dia pra nunca mais perder tempo com contrato furado."
    },
    {
      q: "A taxa de 10% não é alta?",
      a: "Agências cobram 20-30%. Advogado + contrato custa R$ 1.500+. E nós só cobramos se o deal fechar."
    },
    {
      q: "Como funciona o Escrow?",
      a: "A marca deposita antes de você começar. O dinheiro fica 'travado' com o The Deal e é liberado assim que você entrega."
    },
    {
      q: "Posso cancelar a anuidade?",
      a: "Sim. Sem multa. Você mantém acesso até o fim do período já pago."
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black max-w-full overflow-x-hidden flex flex-col items-center">
      
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={handleRequestInvite} />

      <main className="w-full max-w-2xl min-h-screen border-x border-thedeal-gray700/50 pb-40">
        
        <header className="sticky top-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 flex items-center justify-between h-16 md:h-20 transition-all">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg">
                <Briefcase size={18} className="text-black" />
              </div>
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
            <p className="text-[7px] md:text-[8px] font-black text-thedeal-gold tracking-tight pl-0.5 uppercase">A rede que conecta criadores a grandes marcas.</p>
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

        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center px-4 py-12 md:py-24 text-center border-b border-thedeal-gray700/30">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-[9px] md:text-[10px] font-black text-thedeal-gray400 uppercase tracking-[0.4em]">Rede Exclusiva de Inteligência</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase mb-8">
            SUA <TypewriterText /> <br/>
            EM PRIMEIRO LUGAR.
          </h1>
          <p className="text-base md:text-lg text-thedeal-gray400 max-w-md mx-auto font-medium leading-relaxed mb-10">
            A infraestrutura completa para criadores de performance e marcas que buscam ROI. Feche contratos reais com segurança.
          </p>
          <button onClick={handleRequestInvite} className="w-full max-w-xs bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] transition-all active:scale-95">
            <span>Quero Fazer Parte</span>
            <ArrowRight size={16} />
          </button>
        </section>

        {/* MARCAS */}
        <section className="py-12 bg-thedeal-card border-y border-thedeal-gray700/50 overflow-hidden relative">
          <h3 className="text-thedeal-gray400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-center">Grandes Marcas Estão Aqui</h3>
          <div className="flex w-full overflow-hidden">
              <div className="flex animate-scroll-slow gap-8 md:gap-14 px-4 py-4 w-max whitespace-nowrap">
                {[...marcasCarrossel, ...marcasCarrossel].map((marca, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-thedeal-bg bg-white shadow-xl overflow-hidden flex items-center justify-center">
                      <img src={marca.logo} alt={marca.nome} className="w-full h-full object-contain p-2" />
                    </div>
                    <p className="text-white font-black text-[9px] md:text-[11px] uppercase tracking-tighter leading-none">{marca.nome}</p>
                  </div>
                ))}
              </div>
          </div>
        </section>

        {/* FEED */}
        <section className="px-4 py-10 space-y-6">
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4">Deals Ativos no Terminal</h3>
          {mockPosts.map((post) => (
            <FeedItem key={post.id} {...post} onAction={handleRestrictedAction} />
          ))}
        </section>

        {/* PROBLEMA */}
        <section className="py-20 px-6 bg-black/40 border-t border-thedeal-gray700/30">
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-10 text-center">O Mercado está <span className="text-red-500">Quebrado.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
              <ShieldAlert className="text-red-500" size={32} />
              <h4 className="text-lg font-black text-white uppercase tracking-tight">🚫 Ghosting</h4>
              <p className="text-thedeal-gray400 text-sm leading-relaxed">Fez o conteúdo e a marca sumiu? No The Deal, isso é impossível.</p>
            </div>
            <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
              <DollarSign className="text-red-500" size={32} />
              <h4 className="text-lg font-black text-white uppercase tracking-tight">💸 Calote</h4>
              <p className="text-thedeal-gray400 text-sm leading-relaxed">Prometeram pagar mas sumiram? Nosso sistema de Escrow garante seu cachê.</p>
            </div>
            <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
              <FileX className="text-red-500" size={32} />
              <h4 className="text-lg font-black text-white uppercase tracking-tight">📄 Sem Contrato</h4>
              <p className="text-thedeal-gray400 text-sm leading-relaxed">Negociou por WhatsApp? Aqui tudo tem força jurídica real.</p>
            </div>
          </div>
        </section>

        {/* SOLUÇÃO */}
        <section className="py-24 px-6 border-y border-thedeal-gray700/30">
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-16 text-center">Como o Sistema Protege Você</h2>
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0">1</div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Marca Garante o Valor</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">O cachê fica bloqueado no sistema. Você só começa quando o dinheiro está seguro.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0">2</div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Entrega Blindada</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">Foque na sua criatividade. Nosso contrato protege seus direitos autorais automaticamente.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0">3</div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Recebimento Instantâneo</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">Postou e validou? O dinheiro cai na sua carteira na hora. Sem espera.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-thedeal-card/30 border-t border-thedeal-gray700/30">
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-16 text-center">Dúvidas Frequentes</h2>
          <div className="space-y-4 max-w-xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <span className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-thedeal-gold">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-thedeal-gray600 transition-transform ${openFaq === i ? 'rotate-180 text-thedeal-gold' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-sm text-thedeal-gray400 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 text-center space-y-10">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-5 py-2 rounded-full border border-thedeal-goldDim/20">
            <Award size={14} className="text-thedeal-gold" />
            <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Membro Lote Fundador: 53/100 vagas</span>
          </div>
          <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-6 rounded-2xl shadow-xl transition-all uppercase text-lg tracking-[0.2em] active:scale-95">
            Quero Fazer Parte
          </button>
          <div className="space-y-4 opacity-30 mt-10">
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03</p>
          </div>
        </section>

      </main>

      {/* FOOTER BAR (BOTNAV) RESTAURADA */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-thedeal-bg/95 backdrop-blur-xl border-t border-thedeal-gray700 flex justify-around items-center py-3 px-4 z-[500] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex flex-col items-center gap-1 text-white">
          <Home size={22} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Início</span>
        </button>
        <button onClick={onGoToMissions} className="flex flex-col items-center gap-1 text-thedeal-gray400 hover:text-white transition-colors">
          <Trophy size={22} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Missões</span>
        </button>
        <button onClick={onGoToSimulator} className="p-3.5 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-xl shadow-lg -mt-10 border-4 border-thedeal-bg transform hover:scale-110 transition-transform">
          <Calculator size={24} className="text-black" strokeWidth={2.5} />
        </button>
        <button onClick={onGoToAcademy} className="flex flex-col items-center gap-1 text-thedeal-gray400 hover:text-white transition-colors">
          <GraduationCap size={22} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Academia</span>
        </button>
        <button onClick={onGoToDiscover} className="flex flex-col items-center gap-1 text-thedeal-gray400 hover:text-white transition-colors">
          <Compass size={22} strokeWidth={2.5} />
          <span className="text-[7px] font-black uppercase tracking-widest">Descubra</span>
        </button>
      </nav>

    </div>
  );
}
