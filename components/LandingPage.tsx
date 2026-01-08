
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
  const handleRequestDemo = () => window.open("https://wa.me/5519994497796?text=Olá! Gostaria de falar sobre o plano Enterprise/Sócio.", "_blank");

  // Removido Shopee e Magalu conforme solicitado
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
      content: "Embaixadores 2026. Buscamos criadores para promover soluções de pagamento digital. Foco em educação financeira.",
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
      q: "E se a marca não confirmar a entrega?",
      a: "Você tem 48h pra apresentar prova (print, link, etc). Nossa equipe analisa e libera o pagamento."
    },
    {
      q: "Posso cancelar?",
      a: "Sim. Sem multa. Sem pegadinha. Você mantém acesso até o fim do período anual."
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black max-w-full overflow-x-hidden flex justify-center text-left">
      
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} onSignup={handleRequestInvite} />

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
              <p className="text-[7px] md:text-[8px] font-black text-thedeal-gold tracking-tight pl-0.5 uppercase">A rede que conecta criadores de conteúdo a grandes marcas. Feche contratos.</p>
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
                <span className="text-[9px] md:text-[10px] font-black text-thedeal-gray400 uppercase tracking-[0.4em]">Rede Exclusiva de Performance</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1] tracking-tighter uppercase px-2">
                SUA <TypewriterText /> <br/>
                EM PRIMEIRO LUGAR.
              </h1>

              <p className="text-base md:text-lg text-thedeal-gray400 max-w-md mx-auto font-medium leading-relaxed px-4">
                A rede que conecta criadores de conteúdo a grandes marcas. Feche contratos. Segurança jurídica e financeira para quem gera resultado.
              </p>

              <div className="flex flex-col gap-4 justify-center w-full px-10">
                <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] transition-all">
                  <span>Quero Fazer Parte</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* CARROSSEL DE MARCAS - SEM SHOPEE/MAGALU */}
          <section className="py-12 bg-thedeal-card border-y border-thedeal-gray700/50 overflow-hidden relative">
            <h3 className="text-thedeal-gray400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-center">Parceiros da Rede</h3>
            <div className="flex w-full overflow-hidden">
                <div className="flex animate-scroll-slow gap-8 md:gap-14 px-4 py-4 w-max whitespace-nowrap">
                  {[...marcasCarrossel, ...marcasCarrossel].map((marca, i) => (
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
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4">Deals Recentes no Terminal</h2>
            <div className="space-y-6">
                {mockPosts.map((post) => (
                  <FeedItem key={post.id} {...post} onAction={handleRestrictedAction} />
                ))}
            </div>
          </section>

          {/* NOVO: PROBLEMA (3 Cards) */}
          <section className="py-20 px-6 bg-black/40 border-t border-thedeal-gray700/30">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-10 text-center">O Mercado está <span className="text-red-500">Quebrado.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
                <ShieldAlert className="text-red-500" size={32} />
                <h4 className="text-lg font-black text-white uppercase tracking-tight">🚫 Ghosting</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">Negociou, criou, postou. <br/> Marca sumiu.</p>
              </div>
              <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
                <DollarSign className="text-red-500" size={32} />
                <h4 className="text-lg font-black text-white uppercase tracking-tight">💸 Calote</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">"Pagamos semana que vem" <br/> (Spoiler: não pagam)</p>
              </div>
              <div className="p-8 bg-thedeal-card border border-red-500/10 rounded-[2rem] space-y-4">
                <FileX className="text-red-500" size={32} />
                <h4 className="text-lg font-black text-white uppercase tracking-tight">📄 Sem Contrato</h4>
                <p className="text-thedeal-gray400 text-sm leading-relaxed">Marca muda o combinado. <br/> Você não prova nada.</p>
              </div>
            </div>
            <p className="mt-10 text-center text-thedeal-gold font-black uppercase text-xs tracking-[0.4em]">The Deal resolve isso.</p>
          </section>

          {/* NOVO: SOLUÇÃO (Como Funciona) */}
          <section className="py-24 px-6 border-y border-thedeal-gray700/30">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-16 text-center">Como Funciona</h2>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-thedeal-gold/20">1</div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Marca Deposita</h4>
                  <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">O dinheiro fica bloqueado no sistema. Ninguém toca até a entrega.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-thedeal-gold/20">2</div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Você Entrega</h4>
                  <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">Faz o post, vídeo, ou o que foi combinado. Confirma no sistema.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-thedeal-gold text-black flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-thedeal-gold/20">3</div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Dinheiro Liberado</h4>
                  <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">Marca confirma → você recebe. Não confirma? A gente resolve.</p>
                </div>
              </div>
            </div>
            <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-3xl text-center space-y-6">
                <p className="text-thedeal-gold font-black uppercase text-xs tracking-widest">Taxa: 10% do valor do deal.</p>
                <button className="text-white font-black uppercase text-[10px] tracking-[0.2em] border-b border-thedeal-gold pb-1 hover:text-thedeal-gold transition-colors">VER EXEMPLO DE CONTRATO</button>
            </div>
          </section>

          {/* PROVA SOCIAL */}
          <section className="py-20 px-6 text-center bg-black/20">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-10">Quem Já Fechou Pelo The Deal</h2>
            <div className="p-8 bg-thedeal-card border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thedeal-gold to-black flex items-center justify-center text-black font-black text-xs">A</div>
                  <div className="text-left">
                    <p className="text-white font-black text-sm uppercase tracking-tight">R$ 8.500 em 48h. Zero burocracia.</p>
                    <p className="text-thedeal-gold text-[10px] font-black uppercase tracking-widest mt-0.5">@criador_alpha, 150k seguidores</p>
                  </div>
               </div>
               <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mt-8">Primeiros 100 criadores entram com vantagens</p>
            </div>
          </section>

          {/* NOVO: PRICING DIRETO (2 Colunas) */}
          <section className="py-24 px-6 bg-black border-t border-thedeal-gray700/30">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-12 text-center">Escolha Seu Acesso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CRIADOR */}
              <div className="p-10 bg-thedeal-card border-2 border-thedeal-goldBright/40 rounded-[2.5rem] flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-all">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">CRIADOR</h3>
                    <p className="text-3xl font-black text-thedeal-goldBright mt-2">R$ 297<span className="text-xs font-bold text-thedeal-gray600">/ano</span></p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[11px] text-white font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Seu perfil no marketplace</li>
                    <li className="flex items-center gap-2 text-[11px] text-white font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Receba propostas de marcas</li>
                    <li className="flex items-center gap-2 text-[11px] text-white font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Contrato + escrow automático</li>
                    <li className="flex items-center gap-2 text-[11px] text-white font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Taxa: 10% por deal fechado</li>
                  </ul>
                </div>
                <div className="mt-10 space-y-4">
                  <button onClick={handleRequestInvite} className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20 hover:brightness-110">ATIVAR PERFIL</button>
                  <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest text-center">Aprovação em 48h</p>
                </div>
              </div>

              {/* MARCA */}
              <div className="p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] flex flex-col justify-between hover:border-white/10 transition-all">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">MARCA</h3>
                    <p className="text-3xl font-black text-white mt-2">R$ 497<span className="text-xs font-bold text-thedeal-gray600">/ano</span></p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[11px] text-thedeal-gray400 font-bold uppercase"><Check size={14} className="text-white" /> Acesso total aos criadores</li>
                    <li className="flex items-center gap-2 text-[11px] text-white/50 font-bold uppercase"><Check size={14} className="text-white/20" /> Propostas ilimitadas</li>
                    <li className="flex items-center gap-2 text-[11px] text-white/50 font-bold uppercase"><Check size={14} className="text-white/20" /> Contrato + escrow automático</li>
                    <li className="flex items-center gap-2 text-[11px] text-white/50 font-bold uppercase"><Check size={14} className="text-white/20" /> Taxa: 10% por deal fechado</li>
                  </ul>
                </div>
                <div className="mt-10 space-y-4">
                  <button onClick={() => onGoToSignup('brand')} className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-gray-200">COMEÇAR A CONTRATAR</button>
                  <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest text-center">Ativação imediata</p>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <button onClick={handleRequestDemo} className="text-thedeal-gray600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Enterprise? Contratos acima de R$ 50k? <span className="underline ml-1">Falar com o time</span></button>
            </div>
          </section>

          {/* NOVO: OBJEÇÕES (FAQ) */}
          <section className="py-24 px-6 bg-thedeal-card/30 border-t border-thedeal-gray700/30">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-16 text-center">Perguntas Diretas</h2>
            <div className="space-y-4 max-w-xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between group transition-all"
                  >
                    <span className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-thedeal-gold transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-thedeal-gray600 transition-transform ${openFaq === i ? 'rotate-180 text-thedeal-gold' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-sm text-thedeal-gray400 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="py-24 px-6 text-center space-y-10">
            <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-5 py-2 rounded-full border border-thedeal-goldDim/20">
              <Award size={14} className="text-thedeal-gold" />
              <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Membro Lote Fundador: 53/100 vagas</span>
            </div>
            <button onClick={handleRequestInvite} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-8 py-6 rounded-2xl shadow-xl transition-all uppercase text-lg tracking-[0.2em] active:scale-95">
              Quero Fazer Parte
            </button>
            <div className="space-y-4 opacity-30 mt-10">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600 text-center">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
                <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] text-center max-w-lg mx-auto leading-relaxed">
                    A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
                </p>
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
