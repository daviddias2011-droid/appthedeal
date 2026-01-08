
import React, { useState } from 'react';
import { 
  Check, X, Zap, Crown, ArrowLeft, Briefcase, ExternalLink, 
  ShieldCheck, HelpCircle, Calculator, TrendingUp, Info, MessageSquare
} from 'lucide-react';

export default function PricingPage({ onBack }: { onBack?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCalculator = () => {
    if (onBack) {
        // Simulação de navegação para a calculadora (usando o simulador existente)
        alert("Redirecionando para o Terminal de Cálculo Alpha...");
    }
  };

  const faqs = [
    {
      q: "Por que pagar R$ 297 se posso negociar direto?",
      a: "Porque negociar direto te deixa exposto. No The Deal, você tem contrato válido juridicamente, sistema de escrow (dinheiro bloqueado pela rede) e garantia de pagamento. Você paga para eliminar o risco de calote e o tempo perdido com ghosting."
    },
    {
      q: "A taxa de 10% não é alta?",
      a: "Comparado a agências tradicionais (20-30%) ou plataformas concorrentes (12-20%), somos a opção mais eficiente. Além disso, você economiza R$ 1.500+ em advogados por contrato. Só cobramos se o deal fechar."
    },
    {
      q: "Quanto tempo demora pra ser aprovado?",
      a: "Criador: Até 48h após o envio do perfil. Marca: Ativação imediata via verificação assíncrona. Enterprise: Até 7 dias para onboarding personalizado."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-thedeal-gold selection:text-black font-sans text-left">
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
              <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Infraestrutura Alpha</p>
            </div>
            
            <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar ao Terminal
            </button>
          </div>
        </nav>
      )}

      <main className={`max-w-7xl mx-auto px-6 pb-32 ${onBack ? 'pt-40' : 'pt-20'}`}>
        {/* HERO */}
        <header className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-goldDim/30 rounded-full px-5 py-2 mb-4">
             <ShieldCheck className="w-4 h-4 text-thedeal-gold" />
             <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Protocolo de Transações Protegidas</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] max-w-4xl mx-auto">
            Feche Contratos como um Profissional. <span className="text-thedeal-gold">Dinheiro Bloqueado até a Entrega.</span>
          </h1>
          <p className="text-thedeal-gray400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Contratos automáticos. Dinheiro em escrow. Zero ghosting. Zero calote. Escolha como quer acessar a rede.
          </p>
        </header>

        {/* PRICING GRIDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          
          {/* TIER 1: DESCOBERTA */}
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col hover:border-white/10 transition-all opacity-80 hover:opacity-100">
            <div className="mb-8">
              <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-4">Tier 1 / Descoberta</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Descubra seu Valor de Mercado</h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase mt-2">Veja quanto seu perfil pode faturar.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gray600 shrink-0" />
                <span>Calculadora de Valor de Mercado</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gray600 shrink-0" />
                <span>Exemplos de contratos (Anonimizados)</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray600 uppercase tracking-widest leading-snug">
                <X size={14} className="shrink-0" />
                <span>Não fecha contratos</span>
              </li>
            </ul>

            <div className="mb-8">
              <p className="text-4xl font-black text-white uppercase tracking-tighter">Gratuito</p>
            </div>

            <button 
              onClick={handleCalculator}
              className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
            >
              Calcular Meu Valor
            </button>
            <p className="text-[8px] text-thedeal-gray700 font-black uppercase text-center mt-4 tracking-widest">Sem compromisso, sem cadastro.</p>
          </div>

          {/* TIER 2: CRIADOR */}
          <div className="bg-thedeal-card border-2 border-thedeal-goldBright/40 p-8 rounded-[2.5rem] flex flex-col relative shadow-[0_0_60px_rgba(212,175,55,0.1)] group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-thedeal-goldBright text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">MAIS POPULAR</div>
            
            <div className="mb-8">
              <h3 className="text-xs font-black text-thedeal-goldBright uppercase tracking-[0.4em] mb-4">Tier 2 / Criador</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Fature com Segurança Total</h2>
              <p className="text-thedeal-goldBright/60 text-[10px] font-bold uppercase mt-2">Perfil aprovado em até 48h.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Perfil Público no Marketplace Curado</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Dinheiro bloqueado no escrow</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-black text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-thedeal-gold shrink-0" />
                <span>Contrato automático + Assinatura</span>
              </li>
            </ul>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-black text-white uppercase tracking-tighter">R$ 297</p>
                <span className="text-[10px] font-black text-thedeal-gray600 uppercase">/ano</span>
              </div>
              <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest mt-1">R$ 24,75/mês • Cobrado anualmente</p>
            </div>

            <div className="mb-6 p-4 bg-thedeal-gold/5 border border-thedeal-gold/20 rounded-2xl">
               <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest mb-1">Taxa de Operação</p>
               <p className="text-xs font-bold text-white leading-tight">10% do valor de cada deal fechado.</p>
            </div>

            <button 
              onClick={() => handleCheckout("https://mpago.li/1iwECoa")}
              className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-thedeal-gold/20"
            >
              Ativar Meu Perfil
            </button>
            <p className="text-[9px] text-thedeal-gray600 font-black uppercase text-center mt-4 tracking-widest">Aprovação em até 48h</p>
          </div>

          {/* TIER 3: MARCA */}
          <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col hover:border-white/10 transition-all">
            <div className="mb-8">
              <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Tier 3 / Marca</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Contrate com Risco Zero</h2>
              <p className="text-blue-400 text-[10px] font-bold uppercase mt-2">Busca inteligente e escrow nativo.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Busca avançada por nicho e engajamento</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Propostas e Contratos Ilimitados</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-thedeal-gray400 uppercase tracking-widest leading-snug">
                <Check size={14} className="text-blue-500 shrink-0" />
                <span>Suporte Prioritário em 12h úteis</span>
              </li>
            </ul>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-black text-white uppercase tracking-tighter">R$ 497</p>
                <span className="text-[10px] font-black text-thedeal-gray600 uppercase">/ano</span>
              </div>
              <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest mt-1">R$ 41,42/mês • Cobrado anualmente</p>
            </div>

            <button 
              onClick={() => handleCheckout("https://mpago.la/13NLfeG")}
              className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:brightness-110 transition-all shadow-xl shadow-white/5"
            >
              Começar a Contratar
            </button>
            <p className="text-[9px] text-thedeal-gray600 font-black uppercase text-center mt-4 tracking-widest">Ativação Imediata</p>
          </div>

          {/* TIER 4: ENTERPRISE */}
          <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-white/10 p-8 rounded-[2rem] flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Crown size={120} />
            </div>
            
            <div className="mb-8">
              <h3 className="text-xs font-black text-thedeal-gray400 uppercase tracking-[0.4em] mb-4">Tier 4 / Enterprise</h3>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Suporte VIP & Alto Impacto</h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase mt-2">Contratos acima de R$ 50k.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-[11px] font-bold text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-white shrink-0" />
                <span>Gerente de Conta Dedicado (WhatsApp)</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-white shrink-0" />
                <span>Acesso a Criadores Premium</span>
              </li>
              <li className="flex items-start gap-3 text-[11px] font-bold text-white uppercase tracking-widest leading-snug">
                <Check size={14} className="text-white shrink-0" />
                <span>Taxa de deal negociável (6-8%)</span>
              </li>
            </ul>

            <div className="mb-8">
              <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">A partir de</p>
              <p className="text-4xl font-black text-white uppercase tracking-tighter">R$ 2.997</p>
              <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest mt-1">Anual • Sob Consulta</p>
            </div>

            <button 
              onClick={() => window.open("https://wa.me/5519994497796?text=Olá! Gostaria de falar sobre o plano Enterprise do The Deal.", "_blank")}
              className="w-full bg-white/5 border-2 border-white/10 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
            >
              Agendar Conversa
            </button>
            <p className="text-[9px] text-thedeal-gray600 font-black uppercase text-center mt-4 tracking-widest">Resposta em até 4h úteis</p>
          </div>

        </div>

        {/* COMPARISON TABLE */}
        <section className="mb-32 overflow-hidden">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10 text-center">Seção Comparativa Alpha</h2>
            <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/40 text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="px-8 py-6">Recursos do Terminal</th>
                            <th className="px-8 py-6">Descoberta</th>
                            <th className="px-8 py-6 text-thedeal-gold">Criador</th>
                            <th className="px-8 py-6">Marca</th>
                            <th className="px-8 py-6">Enterprise</th>
                        </tr>
                    </thead>
                    <tbody className="text-[11px] font-bold uppercase tracking-widest">
                        {[
                            { f: "Perfil Público", t1: false, t2: true, t3: true, t4: true },
                            { f: "Fechar Contratos", t1: false, t2: true, t3: true, t4: true },
                            { f: "Dinheiro Bloqueado (Escrow)", t1: false, t2: true, t3: true, t4: true },
                            { f: "Taxa por Deal", t1: "—", t2: "10%", t3: "10%", t4: "6-8%" },
                            { f: "SLA de Suporte", t1: "—", t2: "Email 24h", t3: "Email 12h", t4: "WhatsApp 4h" },
                            { f: "Gerente Dedicado", t1: false, t2: false, t3: false, t4: true },
                        ].map((row, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-5 text-thedeal-gray400">{row.f}</td>
                                <td className="px-8 py-5">{row.t1 === true ? <Check size={14} className="text-thedeal-success" /> : (row.t1 === false ? <X size={14} className="text-red-500/30" /> : row.t1)}</td>
                                <td className="px-8 py-5 text-thedeal-gold">{row.t2 === true ? <Check size={14} className="text-thedeal-gold" /> : (row.t2 === false ? <X size={14} className="text-red-500/30" /> : row.t2)}</td>
                                <td className="px-8 py-5">{row.t3 === true ? <Check size={14} className="text-white" /> : (row.t3 === false ? <X size={14} className="text-red-500/30" /> : row.t3)}</td>
                                <td className="px-8 py-5">{row.t4 === true ? <Check size={14} className="text-white" /> : (row.t4 === false ? <X size={14} className="text-red-500/30" /> : row.t4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-3xl mx-auto mb-32">
            <div className="text-center mb-12">
                <HelpCircle className="text-thedeal-gold mx-auto mb-4" size={32} />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Dúvidas Frequentes</h2>
                <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mt-2">Transparência Total sobre a Rede</p>
            </div>
            
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-thedeal-card border border-white/5 rounded-2xl overflow-hidden">
                        <button 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-6 text-left flex items-center justify-between group transition-all"
                        >
                            <span className="text-sm font-bold text-white group-hover:text-thedeal-gold transition-colors">{faq.q}</span>
                            <ChevronRightIcon className={`w-5 h-5 text-thedeal-gray600 transition-transform ${openFaq === i ? 'rotate-90 text-thedeal-gold' : ''}`} />
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

        {/* CTA FINAL */}
        <div className="text-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 italic">
                Chega de ghosting. <br/>Chega de insegurança. <br/><span className="text-thedeal-gold">Seja Profissional.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button 
                    onClick={() => handleCheckout("https://mpago.li/1iwECoa")}
                    className="bg-thedeal-gold text-black font-black px-12 py-5 rounded-2xl uppercase text-[11px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20"
                >
                    Ativar Meu Perfil Agora
                </button>
                <button 
                    onClick={() => window.open("https://wa.me/5519994497796", "_blank")}
                    className="bg-white/5 border border-white/10 text-white font-black px-12 py-5 rounded-2xl uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all"
                >
                    Falar com Especialista
                </button>
            </div>
        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 text-center opacity-30 flex flex-col items-center gap-2">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </footer>
      </main>
    </div>
  );
}

// Sub-componentes necessários para compatibilidade
const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
