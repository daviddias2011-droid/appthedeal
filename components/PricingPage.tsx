
import React from 'react';
import { Check, Zap, Crown, ArrowLeft, Briefcase, ExternalLink, HelpCircle, Instagram, Twitter, Video } from 'lucide-react';
import { KwaiIcon } from './Icons';

const LINK_CRIADOR = "https://mpago.li/1EQHmNM";
const LINK_MARCA = "https://mpago.li/27TLyFa";

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const handleCheckout = (role: 'creator' | 'brand') => {
    const url = role === 'creator' ? LINK_CRIADOR : LINK_MARCA;
    window.open(url, '_blank');
  };

  const faqs = [
    { q: "Por que pagar R$ 297?", a: "Porque você elimina calote, ghosting e burocracia. São R$ 0,81/dia pra nunca mais perder tempo com contrato furado." },
    { q: "A taxa de 10% não é alta?", a: "Agências cobram 20-30%. Advogado + contrato custa R$ 1.500+. E nós só cobramos se o deal fechar." },
    { q: "E se a marca não confirmar a entrega?", a: "Você tem 48h pra apresentar prova (print, link, etc). Nossa equipe analisa e libera o pagamento." },
    { q: "Posso cancelar?", a: "Sim. Sem multa. Sem pegadinha. Você mantém acesso até o fim do período contratado." }
  ];

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
            Escolha Seu <span className="text-thedeal-gold">Acesso.</span>
          </h1>
          <p className="text-thedeal-gray400 text-lg font-medium leading-relaxed">
            Infraestrutura profissional para quem busca parcerias seguras e contratos de alto valor.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CRIADOR */}
          <div className="bg-thedeal-card border border-white/5 p-10 md:p-12 rounded-[3rem] flex flex-col group hover:border-thedeal-gold/40 transition-all shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} className="text-thedeal-gold" />
            </div>
            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Criador</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-5xl font-black text-thedeal-goldBright tracking-tighter">R$ 297</p>
                <span className="text-xs font-bold text-thedeal-gray600 uppercase">/ano</span>
              </div>
            </div>

            <ul className="space-y-5 mb-12 flex-1 relative z-10">
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Seu perfil no marketplace</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Receba propostas de marcas</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Contrato + Escrow Automático</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-black uppercase tracking-widest text-thedeal-goldBright">
                  <Zap size={18} className="shrink-0 mt-0.5" />
                  <span>Taxa: 10% por deal fechado</span>
                </li>
            </ul>

            <button 
              onClick={() => handleCheckout('creator')}
              className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl transition-all shadow-xl shadow-thedeal-gold/20 uppercase tracking-[0.2em] text-xs active:scale-95 mb-4"
            >
              ATIVAR PERFIL
            </button>
            <p className="text-[10px] text-center font-black text-thedeal-gray600 uppercase tracking-widest">Aprovação em 48h</p>
          </div>

          {/* MARCA */}
          <div className="bg-thedeal-card border-2 border-thedeal-gold/40 p-10 md:p-12 rounded-[3rem] flex flex-col group hover:border-thedeal-gold transition-all shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Crown size={120} className="text-thedeal-gold" />
            </div>
            <div className="mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Marca</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-5xl font-black text-white tracking-tighter">R$ 497</p>
                <span className="text-xs font-bold text-thedeal-gray600 uppercase">/ano</span>
              </div>
            </div>

            <ul className="space-y-5 mb-12 flex-1 relative z-10">
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Acesso total aos criadores</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Propostas Ilimitadas</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-thedeal-gray100">
                  <Check size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                  <span>Contrato + Escrow Automático</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-black uppercase tracking-widest text-thedeal-goldBright">
                  <Zap size={18} className="shrink-0 mt-0.5" />
                  <span>Taxa: 10% por deal fechado</span>
                </li>
            </ul>

            <button 
              onClick={() => handleCheckout('brand')}
              className="w-full bg-white text-black font-black py-6 rounded-2xl transition-all shadow-xl shadow-white/5 uppercase tracking-[0.2em] text-xs active:scale-95 mb-4"
            >
              COMEÇAR A CONTRATAR
            </button>
            <p className="text-[10px] text-center font-black text-thedeal-gray600 uppercase tracking-widest">Ativação Imediata</p>
          </div>
        </div>

        <div className="text-center py-12 border-t border-white/5">
             <button 
                onClick={() => window.open("https://wa.me/5519994497796", "_blank")}
                className="group inline-flex items-center gap-4 text-thedeal-gray400 hover:text-thedeal-gold transition-colors font-black uppercase tracking-[0.3em] text-[11px]"
             >
               Enterprise? Contratos acima de R$ 50k? <span className="text-white group-hover:text-thedeal-gold underline underline-offset-8 decoration-thedeal-gold/30">Falar com o time</span>
               <ExternalLink size={14} />
             </button>
        </div>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto space-y-16 pt-16">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white">Perguntas <span className="text-thedeal-gold">Diretas.</span></h2>
                <p className="text-thedeal-gray600 font-bold uppercase tracking-[0.3em] text-[10px]">Sem enrolação. Sem burocracia.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {faqs.map((f, i) => (
                    <div key={i} className="bg-thedeal-card border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="flex items-center gap-3 text-thedeal-gold">
                            <HelpCircle size={18} />
                            <h4 className="text-xs font-black uppercase tracking-widest">{f.q}</h4>
                        </div>
                        <p className="text-thedeal-gray400 text-sm leading-relaxed font-medium">{f.a}</p>
                    </div>
                ))}
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
      </div>
    </div>
  );
}
