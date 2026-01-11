
import React from 'react';
import { Check, Zap, Crown, ArrowLeft, Briefcase, Info } from 'lucide-react';

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const handleGoToSignup = () => {
    if (onBack) onBack();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-thedeal-gold selection:text-black text-left">
      {onBack && (
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
            
            <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
            </button>
          </div>
        </nav>
      )}

      <div className={`p-4 md:p-8 space-y-24 animate-fade-in pb-32 ${onBack ? 'pt-32' : 'pt-12'}`}>
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
            Acessos & <span className="text-thedeal-gold">Protocolos.</span>
          </h1>
          <p className="text-thedeal-gray400 text-lg font-medium leading-relaxed">
            Infraestrutura profissional para quem busca parcerias seguras, contratos de alto valor e transparência absoluta.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CRIADOR */}
          <div className="bg-thedeal-card border border-white/5 p-10 md:p-12 rounded-[3rem] flex flex-col group hover:border-thedeal-gold/40 transition-all shadow-2xl relative overflow-hidden">
            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Criadores</h2>
              <div className="mt-4">
                <p className="text-4xl font-black text-thedeal-goldBright tracking-tighter">Acesso Gratuito</p>
                <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mt-2">Criadores não pagam mensalidade. Nunca.</p>
              </div>
            </div>

            <div className="space-y-6 mb-12 flex-1 relative z-10">
                <p className="text-sm text-thedeal-gray400 leading-relaxed font-medium uppercase">
                  O acesso ao The Deal é gratuito para criadores aprovados pela curadoria técnica.
                </p>
                <div className="p-6 bg-black/40 rounded-2xl border border-thedeal-gold/20">
                  <h4 className="text-xs font-black text-thedeal-gold uppercase tracking-widest mb-4">Taxa de Curadoria:</h4>
                  <p className="text-3xl font-black text-white tracking-tighter">R$ 99</p>
                  <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mt-2">Pagamento Único pós-aprovação</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-[9px] font-bold text-thedeal-gray400 uppercase tracking-widest">
                       <Check size={12} className="text-thedeal-gold" /> Não é mensalidade
                    </li>
                    <li className="flex items-center gap-2 text-[9px] font-bold text-thedeal-gray400 uppercase tracking-widest">
                       <Check size={12} className="text-thedeal-gold" /> Não é comissão
                    </li>
                    <li className="flex items-center gap-2 text-[9px] font-bold text-thedeal-gray400 uppercase tracking-widest">
                       <Check size={12} className="text-thedeal-gold" /> Mantém a qualidade da rede
                    </li>
                  </ul>
                </div>
            </div>

            <button 
              onClick={handleGoToSignup}
              className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl transition-all shadow-xl shadow-thedeal-gold/20 uppercase tracking-[0.2em] text-xs active:scale-95"
            >
              SOLICITAR CURADORIA
            </button>
          </div>

          {/* MARCA */}
          <div className="bg-thedeal-card border-2 border-thedeal-gold/40 p-10 md:p-12 rounded-[3rem] flex flex-col group hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden">
            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Marcas</h2>
              <div className="mt-4">
                <p className="text-sm font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Infraestrutura Profissional</p>
                <p className="text-4xl font-black text-white tracking-tighter">Assinatura Anual</p>
              </div>
            </div>

            <div className="space-y-8 mb-12 flex-1 relative z-10">
                <div className="space-y-2">
                  <p className="text-5xl font-black text-white tracking-tighter">R$ 497</p>
                  <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Acesso anual ao terminal</p>
                </div>

                <div className="p-6 bg-thedeal-gold/5 rounded-2xl border border-thedeal-gold/20">
                   <h4 className="text-xs font-black text-thedeal-gold uppercase tracking-widest mb-2">Comissão por Deal:</h4>
                   <p className="text-2xl font-black text-white">10% <span className="text-xs text-thedeal-gray600">sobre o valor do contrato</span></p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-thedeal-gray400 leading-relaxed font-bold uppercase text-justify">
                    Você não paga por seguidores. Você paga por segurança, estrutura e execução profissional. Pagamentos protegidos via escrow e contratos com validade jurídica TD-IP.
                  </p>
                </div>
            </div>

            <button 
              onClick={handleGoToSignup}
              className="w-full bg-white text-black font-black py-6 rounded-2xl transition-all shadow-xl shadow-white/5 uppercase tracking-[0.2em] text-xs active:scale-95"
            >
              SOLICITAR ACESSO PARA MARCAS
            </button>
          </div>
        </div>

        <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5 mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start opacity-40 max-w-4xl mx-auto mb-10">
              <Info size={24} className="text-thedeal-gold shrink-0" />
              <p className="text-[10px] text-thedeal-gray400 leading-relaxed font-medium uppercase text-justify">
                  O The Deal opera como infraestrutura técnica e jurídica. Não somos agência de talentos. Todos os acordos são formalizados entre as partes dentro de nosso protocolo de segurança.
              </p>
          </div>
          <div className="space-y-4 opacity-50">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • CNPJ: 59.440.114/0001-03</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">EM DESENVOLVIMENTO • SUPORTE@THEDEAL.COM.BR</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
