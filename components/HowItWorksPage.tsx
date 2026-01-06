
import React from 'react';
import { 
  ArrowRight, Shield, Zap, Search, MessageCircle, FileCheck, Briefcase, Sparkles, Star, ChevronDown, ArrowLeft, TrendingUp, Award, Repeat
} from 'lucide-react';

interface HowItWorksPageProps {
  onBack: () => void;
  onGoToSignup: () => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack, onGoToSignup }) => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Entrada & Nível",
      desc: "Você começa sua jornada gratuitamente como Aspirante. Nosso comitê audita seus ativos para calcular seu Deal Score inicial e validar sua identidade."
    },
    {
      number: "02",
      icon: Zap,
      title: "Inteligência de LTV",
      desc: "Nosso algoritmo cruza dados de conversão para sugerir parcerias onde a receita recorrente (LTV) é o foco, garantindo retorno para a marca."
    },
    {
      number: "03",
      icon: MessageCircle,
      title: "Negociação de IP",
      desc: "Criadores e marcas estruturam o licenciamento de formatos originais (IP). Você deixa de vender apenas posts e passa a vender ativos estratégicos."
    },
    {
      number: "04",
      icon: FileCheck,
      title: "Contratos de 12 meses",
      desc: "Acordos de longo prazo são formalizados no terminal. Isso gera estabilidade financeira para o criador e retenção de clientes para a marca."
    },
    {
      number: "05",
      icon: Star,
      title: "Escala & Royalties",
      desc: "A cada ação bem sucedida, seu Deal Score sobe. Se o formato performar, a marca escala o uso e você recebe royalties sobre o licenciamento."
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 animate-fade-in font-sans selection:bg-thedeal-goldBright selection:text-black pb-20 text-left">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                </div>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
                  <ArrowLeft size={14} /> Voltar
                </button>
                <button onClick={onGoToSignup} className="hidden sm:block bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-bold px-6 py-2.5 rounded-xl text-[9px] transition-all shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest">Começar Jornada</button>
            </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-40 md:pt-48 pb-20 px-6 text-center max-w-5xl mx-auto relative">
        <div className="inline-block bg-thedeal-gold/10 border border-thedeal-goldDim/30 rounded-full px-5 py-2 mb-6">
            <span className="text-thedeal-gold text-[10px] font-black uppercase tracking-widest">Infraestrutura Profissional</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 uppercase tracking-tighter leading-none">
          O Futuro dos <br/>
          <span className="text-thedeal-gold">Negócios de Influência</span>.
        </h1>
        <p className="text-lg md:text-xl text-thedeal-gray400 leading-relaxed font-medium max-w-3xl mx-auto text-center">
          Não somos um marketplace de jobs. Somos uma rede de inteligência que formaliza parcerias de alto valor e longo prazo.
        </p>
      </header>

      {/* Steps Grid */}
      <section className="px-6 max-w-6xl mx-auto space-y-12 text-left">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-thedeal-card border border-thedeal-gray700 rounded-[2rem] p-10 space-y-8 group hover:border-thedeal-gold transition-all relative overflow-hidden">
              <span className="absolute top-8 right-8 text-6xl font-black text-white/5 group-hover:text-thedeal-gold/10 transition-colors">{step.number}</span>
              <div className="w-14 h-14 bg-thedeal-gold/10 rounded-2xl flex items-center justify-center text-thedeal-gold group-hover:scale-110 transition-transform">
                <step.icon size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{step.title}</h3>
                <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
          
          {/* Final Step CTA Card */}
          <div className="bg-gradient-to-br from-thedeal-gold to-thedeal-goldDim rounded-[2rem] p-10 flex flex-col justify-between items-center text-center shadow-2xl shadow-thedeal-gold/10">
            <div className="space-y-4">
               <Award size={48} className="text-black mx-auto mb-6" />
               <h3 className="text-2xl font-black text-black uppercase tracking-tight">Pronto para <br/> a Elite?</h3>
               <p className="text-black/80 text-sm font-bold leading-relaxed">Sua jornada como criador profissional começa agora.</p>
            </div>
            <button onClick={onGoToSignup} className="w-full bg-black text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:scale-105 transition-all mt-8">
              Pedir Convite
            </button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 mt-20 bg-thedeal-card border-y border-thedeal-gray700/50 text-left">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Nosso Compromisso com a <span className="text-thedeal-gold">Verdade.</span></h2>
            <p className="text-thedeal-gray400 text-lg leading-relaxed text-left">No The Deal, cada parceria é auditada por dados. Não toleramos automação, métricas falsas ou falta de compromisso contratual.</p>
            
            <div className="space-y-6">
              {[
                { icon: Shield, t: "Proteção Jurídica", d: "Todos os contratos seguem padrões de IP e licenciamento." },
                { icon: Zap, t: "Performance Real", d: "Tracking de conversão nativo para medir o ROI de cada deal." },
                { icon: Repeat, t: "Receita Recorrente", d: "Foco em contratos fixos para estabilidade financeira." }
              ].map((v, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-thedeal-gold/10 p-2 rounded-lg h-fit"><v.icon size={20} className="text-thedeal-gold" /></div>
                  <div className="text-left">
                    <h4 className="text-white font-bold uppercase text-xs tracking-widest">{v.t}</h4>
                    <p className="text-thedeal-gray400 text-xs mt-1">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative text-center">
             <div className="bg-gradient-to-br from-thedeal-gold/20 to-transparent border border-thedeal-gold/30 rounded-[3rem] p-10 md:p-20 text-center mx-auto">
                <TrendingUp size={120} className="text-thedeal-gold mx-auto mb-8 opacity-40" />
                <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">"Onde a atenção vira negócio estruturado, o lucro é inevitável."</p>
             </div>
          </div>
        </div>
      </section>

      <div className="text-center mt-20 px-6 space-y-8">
        <button onClick={onBack} className="text-[10px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.5em] transition-all">
          Retornar à página inicial
        </button>
        <div className="space-y-4 opacity-30 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
