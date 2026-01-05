import React, { useState } from 'react';
import { Deal, User, UserType } from '../types';
import { CheckCircle2, ArrowLeft, Shield, Clock, Briefcase, ShieldCheck, Loader2 } from 'lucide-react';

interface DealDetailsPageProps {
  deal: Deal;
  user: User;
  onBack: () => void;
  onApply: (deal: Deal, message: string, value: number) => void;
}

const DealDetailsPage: React.FC<DealDetailsPageProps> = ({ deal, user, onBack, onApply }) => {
  const [pitch, setPitch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [validationStep, setValidationStep] = useState(0);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleApplySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!user.isVetted) {
          alert("Sistema em Validação: Sua conta ainda está sendo analisada pela nossa curadoria técnica.");
          return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
          onApply(deal, pitch, deal.value);
          setIsSubmitting(false);
      }, 1500);
  };

  const handleSignContract = () => {
    setIsSubmitting(true);
    setValidationStep(1);
    
    // Simulação de passos de validação criptográfica
    setTimeout(() => setValidationStep(2), 1000);
    setTimeout(() => setValidationStep(3), 2000);
    setTimeout(() => {
        setIsSigned(true);
        setIsSubmitting(false);
        setValidationStep(4);
    }, 3500);
  }

  return (
    <div className="max-w-5xl mx-auto pb-32 animate-fade-in px-4">
        <button onClick={onBack} className="mb-10 flex items-center gap-3 text-thedeal-gray400 hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
            <div className="w-32 h-32 rounded-3xl bg-thedeal-card border border-thedeal-gray700 p-4 shadow-2xl flex-shrink-0 flex items-center justify-center relative">
                <img src={deal.brand.logoUrl} className="w-full h-full object-contain" alt={deal.brand.name} />
                {(deal.status === 'in progress' || isSigned) && (
                    <div className="absolute -bottom-2 -right-2 bg-thedeal-success p-1.5 rounded-full border-4 border-thedeal-bg">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
            <div className="text-center md:text-left pt-2 flex-1">
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{deal.title}</h1>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${deal.status === 'in progress' || isSigned ? 'bg-thedeal-success/10 text-thedeal-success border-thedeal-success/20' : 'bg-thedeal-gold/10 text-thedeal-gold border-thedeal-gold/20'}`}>
                        {deal.status === 'in progress' || isSigned ? 'CONTRATO EM EXECUÇÃO' : 'SELEÇÃO ABERTA'}
                    </span>
                </div>
                <p className="text-thedeal-gray400 font-black uppercase text-xs tracking-[0.4em]">{deal.brand.name}</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
                <section className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Briefcase className="w-32 h-32" />
                    </div>
                    
                    <h3 className="text-[10px] font-black uppercase text-thedeal-gold tracking-[0.5em] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full animate-pulse"></div>
                        Briefing Estratégico
                    </h3>
                    
                    <div className="space-y-12 relative z-10">
                        <div>
                            <h4 className="text-white font-black uppercase text-[11px] tracking-widest mb-4">Visão Geral do Projeto</h4>
                            <p className="text-lg text-thedeal-gray400 leading-relaxed font-light">{deal.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div>
                                <h4 className="text-white font-black uppercase text-[11px] tracking-widest mb-4">Entregáveis Obrigatórios</h4>
                                <ul className="space-y-3">
                                    {(deal.briefing?.deliverables || ["01 Vídeo Curto (Reels/TikTok)", "Aprovação prévia do roteiro", "Link na bio por 24h"]).map((d, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-thedeal-gray400">
                                            <div className="w-1.5 h-1.5 bg-thedeal-gold/40 rounded-full mt-1.5"></div>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-black uppercase text-[11px] tracking-widest mb-4">Público Alvo</h4>
                                <p className="text-sm text-thedeal-gray400">{deal.briefing?.targetAudience || "Pessoas interessadas em finanças, tecnologia e produtividade. Perfil 25-45 anos."}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase text-[11px] tracking-widest mb-4">Tom de Voz</h4>
                            <div className="flex flex-wrap gap-2">
                                {(deal.briefing?.toneOfVoice || "Profissional, Direto, Autoritário").split(',').map((tone, i) => (
                                    <span key={i} className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold text-white uppercase border border-white/10">{tone.trim()}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {(deal.status === 'in progress' || isSigned) ? (
                    <section className="bg-thedeal-success/5 border-2 border-thedeal-success/30 rounded-2xl p-8 md:p-12 animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck size={120} className="text-thedeal-success" />
                        </div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-thedeal-success/20 p-2 rounded-lg"><ShieldCheck className="w-6 h-6 text-thedeal-success" /></div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase text-thedeal-success tracking-[0.5em]">Certificado Digital de Acordo</h3>
                                    <p className="text-[9px] text-thedeal-success/60 font-mono mt-1 uppercase tracking-widest">Registro Hash: TD-{Math.random().toString(36).substring(7).toUpperCase()}-V3</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-black/40 border border-thedeal-success/10 p-6 rounded-xl mb-8 relative z-10">
                            <p className="text-xs text-thedeal-gray400 leading-relaxed font-mono">
                                ESTE DOCUMENTO DIGITAL CERTIFICA QUE AS PARTES CONCORDARAM COM OS TERMOS ACIMA. 
                                O VALOR DE {currencyFormatter.format(deal.value)} ESTÁ PROTEGIDO POR CUSTÓDIA DIGITAL (ESCROW) 
                                E SERÁ LIBERADO APÓS A VALIDAÇÃO FINAL PELA {deal.brand.name.toUpperCase()}.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4 opacity-50 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-thedeal-success/20 flex items-center justify-center">
                                <CheckCircle2 size={16} className="text-thedeal-success" />
                            </div>
                            <p className="text-[9px] font-black uppercase text-thedeal-success tracking-widest">Integridade de Dados Verificada</p>
                        </div>
                    </section>
                ) : (
                    <section className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-thedeal-gold/10 p-2 rounded-lg"><Shield className="w-6 h-6 text-thedeal-gold" /></div>
                            <h3 className="text-[10px] font-black uppercase text-thedeal-gold tracking-[0.5em]">Garantia de Execução</h3>
                        </div>
                        <p className="text-sm text-thedeal-gray400 mb-8 leading-relaxed italic pr-10">
                            Após a seleção, o certificado digital de acordo é gerado. 
                            O capital é alocado e protegido pela rede, garantindo o recebimento após a entrega aprovada.
                        </p>
                    </section>
                )}
            </div>

            <aside className="lg:col-span-4 space-y-8">
                <div className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-8 shadow-2xl sticky top-24">
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-thedeal-gray400 uppercase tracking-[0.3em] mb-2">Valor do Acordo</p>
                        <p className="text-4xl font-black text-white tracking-tighter">{currencyFormatter.format(deal.value)}</p>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-xs text-thedeal-gray400">
                            <Clock className="w-4 h-4" /> 
                            <span>Entrega em <strong>{deal.deadlineDays || 7} dias</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-thedeal-gray400">
                            <Shield className="w-4 h-4 text-thedeal-success" /> 
                            <span>Pagamento <strong>Protegido</strong></span>
                        </div>
                    </div>
                    
                    {deal.status === 'awaiting_signature' && user.type === UserType.Creator && !isSigned && (
                         <div className="space-y-4">
                            {validationStep > 0 && validationStep < 4 && (
                                <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-3 h-3 text-thedeal-gold animate-spin" />
                                        <span className="text-[9px] font-black uppercase text-thedeal-gold tracking-widest">
                                            {validationStep === 1 && "Verificando chaves de segurança..."}
                                            {validationStep === 2 && "Registrando registro em cartório digital..."}
                                            {validationStep === 3 && "Finalizando custódia financeira..."}
                                        </span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-thedeal-gold transition-all duration-1000" style={{ width: `${(validationStep / 3) * 100}%` }}></div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={handleSignContract}
                                disabled={isSubmitting}
                                className="w-full py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] transition-all bg-thedeal-success text-black hover:scale-105 shadow-xl shadow-thedeal-success/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Validando...' : <><ShieldCheck className="w-4 h-4" /> Validar Certificado Digital</>}
                            </button>
                         </div>
                    )}

                    {deal.status === 'active' && (
                        <button 
                            onClick={handleApplySubmit}
                            disabled={isSubmitting}
                            className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] transition-all ${user.isVetted ? 'bg-thedeal-gold text-black hover:scale-105 shadow-xl shadow-thedeal-gold/20' : 'bg-white/5 text-thedeal-gray600 cursor-not-allowed opacity-50'}`}
                        >
                            {isSubmitting ? 'Enviando Proposta...' : (user.isVetted ? 'Enviar Proposta de Acordo' : 'Aguardando Validação')}
                        </button>
                    )}
                    
                    {isSigned && (
                        <div className="bg-thedeal-success/10 border border-thedeal-success/20 p-4 rounded-xl text-center">
                            <p className="text-[10px] font-black text-thedeal-success uppercase tracking-widest">Vínculo Jurídico Estabelecido</p>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    </div>
  );
};

export default DealDetailsPage;