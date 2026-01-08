
import React from 'react';
import { 
  TrendingUp, Users, Target, DollarSign, Shield, Check, ArrowRight, Briefcase, Building2, CheckCircle2, X,
  Instagram, Twitter, Video
} from 'lucide-react';
import { KwaiIcon } from './Icons';

interface ForBrandsPageProps {
  onBack: () => void;
  onGoToSignup: () => void;
}

const ForBrandsPage: React.FC<ForBrandsPageProps> = ({ onBack, onGoToSignup }) => {
  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 animate-fade-in font-sans text-left pb-32">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center"><Briefcase size={18} className="text-black" /></div>
              <h1 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h1>
            </div>
          </div>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-6 py-2.5 rounded-xl text-[9px] uppercase tracking-widest">Acesso Marcas</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 space-y-24">
        <section className="space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            PARE DE <br/><span className="text-thedeal-gold">PROCURAR.</span> <br/>COMECE A CONTRATAR.
          </h1>
          <p className="text-xl text-thedeal-gray400 max-w-2xl font-medium leading-relaxed">
            Esqueça o ghosting em DMs e planilhas de "influenciadores". Publique sua missão com budget definido e receba propostas de criadores auditados e prontos para entregar ROI e previsibilidade.
          </p>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Publicar Primeira Missão</button>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-thedeal-card border border-white/5 p-10 rounded-[3rem] space-y-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Mídia sem Processo vira Bagunça</h3>
            <div className="space-y-4">
              {[
                "Sem 'vamos conversar por WhatsApp'",
                "Sem propostas sem pé nem cabeça",
                "Sem marcas perdidas na medição",
                "Sem criadores que somem após o PIX"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-thedeal-gray400">
                  <X className="text-thedeal-danger" size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-thedeal-card border border-thedeal-gold/20 p-10 rounded-[3rem] space-y-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Infraestrutura Profissional</h3>
            <div className="space-y-4">
              {[
                "Criadores curados por performance",
                "Contratos digitais com validade",
                "Pagamento em custódia (Escrow)",
                "Relatórios de ROI e P&L nativos"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <Check className="text-thedeal-success" size={18} />
                  <span className="text-sm font-black uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black border border-white/5 p-12 md:p-20 rounded-[4rem] text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Sua influência vira <br/><span className="text-thedeal-gold">contrato fechado.</span></h2>
          <p className="text-thedeal-gray400 max-w-xl mx-auto font-medium">Lideramos a transição para uma economia de influência pautada em contratos reais e ativos de mídia.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onGoToSignup} className="bg-white text-black font-black px-12 py-5 rounded-2xl uppercase text-[10px] tracking-widest transition-all hover:scale-105">Solicitar Acesso Marca</button>
          </div>
        </section>

        <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5">
          <div className="flex justify-center gap-8">
            <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
            <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
            <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
          </div>
          <div className="space-y-4 opacity-50">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • CNPJ: 59.440.114/0001-03</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">EM DESENVOLVIMENTO • SUPORTE@THEDEAL.COM.BR</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ForBrandsPage;
