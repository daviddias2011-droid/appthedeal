
import React from 'react';
import { 
  Zap, ShieldCheck, Briefcase, CheckCircle2, ArrowRight, DollarSign, Star, TrendingUp, X,
  Instagram, Twitter, Video, FileText, UserCheck, Shield
} from 'lucide-react';
import { KwaiIcon } from './Icons';

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
            <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg"><Briefcase size={18} className="text-black" /></div>
            <h1 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter">THE DEAL</h1>
          </div>
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-6 py-2.5 rounded-xl text-[9px] uppercase tracking-widest shadow-xl">Acesso Fornecedor</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 space-y-24">
        <section className="space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-3 bg-thedeal-gold/10 border border-thedeal-goldDim rounded-full px-5 py-2 mb-2">
            <Zap className="w-4 h-4 text-thedeal-gold" />
            <span className="text-thedeal-gold text-[9px] font-black uppercase tracking-widest">Infraestrutura para Fornecedores de Mídia</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
            PARE DE NEGOCIAR <br/><span className="text-thedeal-gold">COMO AMADOR.</span> <br/>COMECE A OPERAR <br/>COMO FORNECEDOR.
          </h1>
          <p className="text-xl text-thedeal-gray400 max-w-2xl font-medium leading-relaxed">
            Profissionalize seu fluxo comercial. No The Deal você é tratado como empresa de mídia, com contratos registrados, prazos definidos e recebimento garantido por custódia financeira.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Solicitar Verificação de Perfil</button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
            <div className="bg-thedeal-card border border-white/5 p-10 rounded-[3rem] space-y-6 shadow-2xl">
                <h4 className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Modelo Financeiro</h4>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Repasse Integral. Zero Mensalidade.</h3>
                <p className="text-sm text-thedeal-gray400 leading-relaxed font-medium uppercase">
                    O The Deal não retém comissão do fornecedor. Você recebe 100% do valor acordado em contrato. As marcas custeiam a infraestrutura da rede e as taxas de transação.
                </p>
                <div className="pt-6 grid grid-cols-2 gap-4">
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl text-center">
                        <p className="text-xs font-black text-white uppercase">Custo Mensal</p>
                        <p className="text-2xl font-black text-thedeal-gold">R$ 0</p>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl text-center">
                        <p className="text-xs font-black text-white uppercase">Repasse</p>
                        <p className="text-2xl font-black text-thedeal-gold">100%</p>
                    </div>
                </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-gold/20 p-10 rounded-[3rem] space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><UserCheck size={120} className="text-thedeal-gold" /></div>
                <h4 className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Protocolo de Entrada</h4>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Taxa de Verificação de Perfil</h3>
                <p className="text-sm text-thedeal-gray400 leading-relaxed font-medium uppercase text-justify">
                    Processo de compliance técnico para eliminar amadores e curiosos. Este valor único refere-se à análise técnica e auditoria de perfil necessária para manter a integridade da rede e o tempo das marcas.
                </p>
                <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest">
                        <Shield className="text-thedeal-gold" size={14} /> Filtro de maturidade profissional
                    </li>
                    <li className="flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest">
                        <Shield className="text-thedeal-gold" size={14} /> Proteção do valor da rede
                    </li>
                </ul>
            </div>
        </section>

        <section className="bg-gradient-to-br from-thedeal-card to-black border-2 border-white/5 p-12 md:p-24 rounded-[4rem] text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Opere no topo do mercado.</h2>
            <p className="text-thedeal-gray400 max-w-xl mx-auto font-medium uppercase tracking-widest text-sm">Exigimos compromisso com entrega e conformidade técnica.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright text-black font-black px-12 py-6 rounded-2xl uppercase text-[11px] tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Submeter para Curadoria Técnica</button>
            <button onClick={onGoToSignup} className="bg-white/5 border border-white/10 text-white font-black px-12 py-6 rounded-2xl uppercase text-[11px] tracking-[0.3em] hover:bg-white/10 transition-all">Entrar como Fornecedor Verificado</button>
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
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • PROTOCOLO ALPHA • CNPJ: 59.440.114/0001-03</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
