
import React from 'react';
import { 
  Zap, ShieldCheck, Briefcase, CheckCircle2, ArrowRight, DollarSign, Star, TrendingUp, X
} from 'lucide-react';

interface ForCreatorsPageProps {
  onBack: () => void;
  onGoToSignup: () => void;
  onGoToDiscover: () => void;
}

export default function ForCreatorsPage({ onBack, onGoToSignup }: ForCreatorsPageProps) {
  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans text-left pb-32 animate-fade-in">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center"><Briefcase size={18} className="text-black" /></div>
            <h1 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h1>
          </div>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-6 py-2.5 rounded-xl text-[9px] uppercase tracking-widest">Acesso Criadores</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 space-y-24">
        <section className="space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-goldDim rounded-full px-5 py-2 mb-2">
            <Zap className="w-4 h-4 text-thedeal-gold" />
            <span className="text-thedeal-gold text-[10px] font-black uppercase tracking-widest">Criadores viram Fornecedores</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            CHEGA DE <br/><span className="text-thedeal-gold">"MIMOS".</span> <br/>VOCÊ QUER CONTRATOS.
          </h1>
          <p className="text-xl text-thedeal-gray400 max-w-2xl font-medium leading-relaxed">
            Sua audiência já vale dinheiro. Falta a infraestrutura para transformar posts em receita recorrente. No THE DEAL, você assina contratos reais, protege seu IP e garante seu pagamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Solicitar Validação de Perfil</button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-thedeal-gold"><DollarSign size={24} /></div>
            <h4 className="text-lg font-black text-white uppercase">Dinheiro no Bolso</h4>
            <p className="text-sm text-thedeal-gray400 font-medium">Pare de aceitar produto. Receba propostas em dinheiro com orçamentos reais das marcas.</p>
          </div>
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-thedeal-gold"><ShieldCheck size={24} /></div>
            <h4 className="text-lg font-black text-white uppercase">Garantia Alpha</h4>
            <p className="text-sm text-thedeal-gray400 font-medium">O valor do seu trabalho é bloqueado no sistema antes de você postar. Risco zero de calote.</p>
          </div>
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-thedeal-gold"><TrendingUp size={24} /></div>
            <h4 className="text-lg font-black text-white uppercase">LTV & Escala</h4>
            <p className="text-sm text-thedeal-gray400 font-medium">Performou bem? Nossa inteligência sugere contratos de 6 a 12 meses automaticamente.</p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-gold/20 p-12 md:p-24 rounded-[4rem] text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic">"Sua influência vira <br/>contrato fechado."</h2>
          <p className="text-thedeal-gray400 max-w-lg mx-auto font-medium">Exigimos +10k seguidores e histórico de parcerias para validação inicial.</p>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-16 py-6 rounded-2xl uppercase text-[10px] tracking-[0.3em] hover:scale-105 transition-all">Ver se eu me qualifico</button>
        </section>
      </main>
    </div>
  );
}
