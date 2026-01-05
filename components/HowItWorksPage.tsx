
import React, { useState } from 'react';
import { 
  ArrowRight, Shield, Zap, Search, MessageCircle, FileCheck, Briefcase, Sparkles, Star, ChevronDown, ArrowLeft
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
      desc: "Você começa sua jornada gratuitamente como Aspirante. Nosso comitê audita seus ativos para calcular seu Deal Score inicial."
    },
    {
      number: "02",
      icon: Zap,
      title: "Inteligência de LTV",
      desc: "Nosso algoritmo cruza dados de conversão para sugerir parcerias onde a receita recorrente (LTV) é garantida por contrato."
    },
    {
      number: "03",
      icon: MessageCircle,
      title: "Negociação de IP",
      desc: "Criadores e marcas estruturam o licenciamento de formatos originais (IP). Você deixa de vender posts e passa a vender ativos."
    },
    {
      number: "04",
      icon: FileCheck,
      title: "Contratos de 12 meses",
      desc: "Acordos de longo prazo são formalizados. Estabilidade financeira para o criador e retenção de clientes para a marca."
    },
    {
      number: "05",
      icon: Star,
      title: "Escala & Royalties",
      desc: "A cada ação bem sucedida, as comissões caem. Se o formato performar, a marca escala o uso do seu IP e você recebe royalties."
    }
  ];

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 animate-fade-in font-sans selection:bg-thedeal-goldBright selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer" onClick={onBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                </div>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="hidden sm:flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">Voltar</button>
                <button onClick={onGoToSignup} className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-bold px-6 py-2.5 rounded-xl text-[9px] transition-all shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest">Começar Jornada</button>
            </div>
        </div>
      </nav>

      <header className="pt-48 pb-20 px-6 text-center max-w-5xl mx-auto relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at center, #D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
         </div>
        
        <div className="inline-block bg-thedeal-gold/10 border border-thedeal-goldDim rounded-full px-5 py-2 mb-6">
            <span className="text-thedeal-gold text-[10px] font-black uppercase tracking-widest">Meritocracia & Performance</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 uppercase tracking-tighter leading-[0.9]">
          Prove seu <span className="text-thedeal-gold">Valor</span>. <br/>
          Conquiste <span className="italic text-thedeal-goldBright">Estabilidade</span>.
        </h1>
        <p className="text-xl text-thedeal-gray400 leading-relaxed font-medium max-w-3xl mx-auto">
          O The Deal é a rede onde parcerias estratégicas viram ativos reais de Propriedade Intelectual.
        </p>
      </header>

      {/* Restante do conteúdo do HowItWorksPage permanece igual */}
    </div>
  );
};

export default HowItWorksPage;
