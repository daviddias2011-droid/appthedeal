import React from 'react';
import { 
  TrendingUp, Target, DollarSign, Shield, Check, ArrowRight, Briefcase, Building2, CheckCircle2, X,
  Instagram, Twitter, Video, ShieldCheck, FileText, Activity
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
              <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg"><Briefcase size={18} className="text-black" /></div>
              <h1 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h1>
            </div>
          </div>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-6 py-2.5 rounded-xl text-[9px] uppercase tracking-widest shadow-xl">Acesso Corporativo</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 space-y-24">
        <section className="space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            CONTRATE INFLUÊNCIA <br/>COMO QUALQUER OUTRO <br/><span className="text-thedeal-gold">FORNECEDOR PROFISSIONAL.</span>
          </h1>
          <p className="text-xl text-thedeal-gray400 max-w-2xl font-medium leading-relaxed">
            Sem DMs. Sem improviso. Sem criadores amadores. Publique sua demanda com budget definido e receba propostas de profissionais auditados prontos para entrega estratégica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Abrir Demanda de Contratação</button>
            <button onClick={onGoToSignup} className="bg-white/5 border border-white/10 text-white font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:bg-white/10 transition-all">Solicitar Acesso Corporativo</button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-thedeal-card border border-white/5 p-10 rounded-[3rem] space-y-8 shadow-2xl">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ineficiência e Risco</h3>
            <div className="space-y-6">
              {[
                "Processos comerciais fragmentados",
                "Ausência de garantias de entrega",
                "Negociações informais via chat",
                "Dificuldade de mensuração real"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-thedeal-gray400">
                  <X className="text-thedeal-danger" size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest leading-none">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-thedeal-card border border-thedeal-gold/20 p-10 rounded-[3rem] space-y-8 shadow-2xl">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight text-thedeal-gold">Blindagem para Marcas</h3>
            <div className="space-y-6">
              {[
                "Pagamento bloqueado em custódia (Escrow)",
                "Contratos com cláusulas jurídicas claras",
                "Auditoria técnica de entregas",
                "Redução de risco operacional e jurídico"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-white">
                  <ShieldCheck className="text-thedeal-gold" size={20} />
                  <span className="text-sm font-black uppercase tracking-widest leading-none">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-10 md:p-20 bg-gradient-to-br from-thedeal-card to-black border border-white/5 rounded-[4rem] space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Estrutura e Transparência</h2>
                <p className="text-thedeal-gray400 text-sm font-black uppercase tracking-[0.3em]">Investimento em Infraestrutura</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Modelo de Acesso</p>
                    <p className="text-lg font-black text-white uppercase">Assinatura Anual do Terminal</p>
                </div>
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Sucesso (Fee)</p>
                    <p className="text-lg font-black text-white uppercase">Comissão somente em contrato fechado</p>
                </div>
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Segurança</p>
                    <p className="text-lg font-black text-white uppercase">Liquidação via Escrow Protocol</p>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 text-center">
                <button onClick={onGoToSignup} className="bg-white text-black font-black px-16 py-6 rounded-2xl uppercase text-[11px] tracking-[0.3em] shadow-2xl hover:scale-105 transition-all">ENTRE PARA O THE DEAL</button>
            </div>
        </section>

        <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5">
          <div className="flex justify-center gap-8">
            <a href="https://www.instagram.com/thedealbrasil" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
            <a href="https://www.tiktok.com/@thedealbr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
            <a href="https://k.kwai.com/u/@thedeal" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
          </div>
          <div className="space-y-4 opacity-50">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • PROTOCOLO DE EXCLUSIVIDADE • CNPJ: 59.440.114/0001-03</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ForBrandsPage;