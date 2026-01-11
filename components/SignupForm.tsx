
import React, { useState, useRef, useEffect } from 'react';
import { 
  Loader, ArrowRight, ArrowLeft, Building2, User, 
  ShieldCheck, Check, MessageSquare, Zap, ExternalLink, Mail, Send, FileText, AlertCircle
} from 'lucide-react';
import { UserType } from '../types';

interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'select' | 'number' | 'textarea';
  options?: { value: string; label: string }[];
}

const SignupForm: React.FC<{ onBack: () => void; onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(0); // 0: Intro, 1: Questions, 2: Payment/Final info, 3: Send Channel
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SUPPORT_WA = "5519994497796";
  const SUPPORT_EMAIL = "suporte@thedeal.com.br";
  const PAYMENT_LINK = "https://mpago.li/1iwECoa";

  const creatorQuestions: Question[] = [
    // Identificação
    { id: 'fullName', label: 'Nome completo', type: 'text' },
    { id: 'email', label: 'E-mail profissional', type: 'text' },
    { id: 'whatsapp', label: 'WhatsApp com DDD', type: 'text' },
    // Perfil Público
    { id: 'mainLink', label: 'Link principal (Instagram, TikTok, YouTube ou outro)', type: 'text' },
    { id: 'secondaryLink', label: 'Plataforma secundária (se houver)', type: 'text', placeholder: 'Caso não tenha, digite: N/A' },
    // Audiência
    { id: 'followers', label: 'Número atual de seguidores', type: 'number' },
    { id: 'niche', label: 'Nicho principal de atuação', type: 'text' },
    { id: 'audienceProfile', label: 'Público predominante (idade / interesse)', type: 'text' },
    // Histórico Comercial
    { 
      id: 'hasDonePaidJobs', 
      label: 'Já fechou contratos pagos com marcas?', 
      type: 'select',
      options: [{ value: 'Sim', label: 'Sim' }, { value: 'Não', label: 'Não' }]
    },
    { id: 'avgPrice', label: 'Valor médio cobrado por publi', type: 'text' },
    // Compromisso
    { id: 'whyJoin', label: 'Por que você acredita que seu perfil deve fazer parte de uma rede profissional e curada?', type: 'textarea' }
  ];

  const brandQuestions: Question[] = [
    // Identificação
    { id: 'companyName', label: 'Nome da empresa', type: 'text' },
    { id: 'cnpj', label: 'CNPJ', type: 'text' },
    { id: 'managerName', label: 'Nome do responsável', type: 'text' },
    { id: 'managerRole', label: 'Cargo', type: 'text' },
    // Contato
    { id: 'corpEmail', label: 'E-mail corporativo', type: 'text' },
    { id: 'whatsapp', label: 'WhatsApp', type: 'text' },
    // Objetivo
    { 
      id: 'objective', 
      label: 'Qual o principal objetivo com criadores?', 
      type: 'select',
      options: [
        { value: 'Vendas', label: 'Vendas' },
        { value: 'Branding', label: 'Branding' },
        { value: 'Lançamento', label: 'Lançamento' },
        { value: 'Tráfego', label: 'Tráfego' },
        { value: 'Outro', label: 'Outro' }
      ]
    },
    // Experiência
    { 
      id: 'hasHiredBefore', 
      label: 'Já contratou influenciadores antes?', 
      type: 'select',
      options: [{ value: 'Sim', label: 'Sim' }, { value: 'Não', label: 'Não' }]
    },
    { id: 'mainProblem', label: 'Principal problema enfrentado (ex: falta de ROI, atraso, ghosting)', type: 'textarea' },
    // Orçamento
    { id: 'avgTicket', label: 'Ticket médio por campanha', type: 'text', placeholder: 'Ex: R$ 5k - 20k' }
  ];

  const activeQuestions = userType === UserType.Creator ? creatorQuestions : brandQuestions;

  const handleNext = (val?: string) => {
    if (val !== undefined) {
      setAnswers(prev => ({ ...prev, [activeQuestions[currentQuestionIndex].id]: val }));
    }

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep(2); // Vai para Confirmação/Pagamento
    }
  };

  const generateSummary = () => {
    let report = `🚀 SOLICITAÇÃO DE ACESSO - THE DEAL\n`;
    report += `PROTOCOLO: ${userType === UserType.Creator ? 'CRIADOR' : 'MARCA'}\n`;
    report += `------------------------------------------\n`;
    activeQuestions.forEach(q => {
      report += `${q.label.toUpperCase()}: ${answers[q.id]}\n`;
    });
    report += `------------------------------------------\n`;
    if (userType === UserType.Creator) report += `STATUS FINANCEIRO: TAXA DE VERIFICAÇÃO PENDENTE DE ANEXO\n`;
    report += `🔐 Gerado via Terminal de Curadoria Alpha`;
    return report;
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(generateSummary());
    window.open(`https://wa.me/${SUPPORT_WA}?text=${text}`, '_blank');
    setStep(3);
  };

  const openEmail = () => {
    const body = encodeURIComponent(generateSummary());
    const subject = encodeURIComponent(`CURADORIA THE DEAL: ${answers['fullName'] || answers['companyName']}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setStep(3);
  };

  const handlePaymentClick = () => {
    window.open(PAYMENT_LINK, '_blank');
    setIsPaid(true); // Assume usuário pagou para habilitar o botão de envio
  };

  // Render Intro
  if (userType === null) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          <div className="space-y-4">
            <h2 className="text-sm font-black text-thedeal-gray600 uppercase tracking-[0.4em]">Início de Protocolo</h2>
            <p className="text-xl font-bold text-white leading-relaxed">
              Antes de prosseguir, precisamos identificar seu perfil para iniciar o protocolo correto.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => setUserType(UserType.Creator)} className="group p-8 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between">
              <div className="flex items-center gap-4">
                <User size={24} className="text-thedeal-gold" />
                <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Sou Criador</span>
              </div>
              <ArrowRight size={20} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
            <button onClick={() => setUserType(UserType.Brand)} className="group p-8 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Building2 size={24} className="text-thedeal-gold" />
                <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Sou Marca</span>
              </div>
              <ArrowRight size={20} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
          </div>
          <button onClick={onBack} className="text-[10px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.4em] transition-colors">Cancelar</button>
        </div>
      </div>
    );
  }

  // Render Question Flow
  if (step === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-12 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={32} className="text-thedeal-gold" />
          </div>
          <div className="space-y-4">
            {userType === UserType.Creator ? (
              <>
                <p className="text-white font-medium text-lg leading-relaxed">
                  O acesso ao THE DEAL é gratuito para criadores aprovados. No entanto, todos os perfis passam por verificação técnica para manter a integridade da rede.
                </p>
                <p className="text-thedeal-gray600 text-sm font-bold uppercase tracking-widest">Responda com atenção. Suas respostas serão analisadas.</p>
              </>
            ) : (
              <>
                <p className="text-white font-medium text-lg leading-relaxed">
                  Marcas no THE DEAL operam com contratos, custódia financeira e criadores verificados.
                </p>
                <p className="text-thedeal-gray600 text-sm font-bold uppercase tracking-widest">Suas respostas ajudam a validar se a plataforma atende ao seu modelo de negócio.</p>
              </>
            )}
          </div>
          <button onClick={() => setStep(1)} className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl uppercase text-[11px] tracking-[0.3em] hover:scale-105 transition-all">Iniciar Verificação</button>
        </div>
      </div>
    );
  }

  // Render Questions
  if (step === 1) {
    const q = activeQuestions[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
          
          <div className="mb-12 flex justify-between items-center">
            <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Protocolo de Curadoria</span>
            <span className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">{currentQuestionIndex + 1} / {activeQuestions.length}</span>
          </div>

          <div className="flex-1 space-y-10 animate-float-in">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">{q.label}</h3>
            
            {q.type === 'text' && (
              <input 
                autoFocus 
                type="text" 
                placeholder={q.placeholder || 'Sua resposta...'} 
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl md:text-2xl text-white font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-zinc-800"
                onKeyDown={(e) => { if(e.key === 'Enter' && (e.target as HTMLInputElement).value) handleNext((e.target as HTMLInputElement).value); }}
              />
            )}

            {q.type === 'number' && (
              <input 
                autoFocus 
                type="number" 
                placeholder="0" 
                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl md:text-2xl text-white font-bold focus:border-thedeal-gold outline-none transition-all"
                onKeyDown={(e) => { if(e.key === 'Enter' && (e.target as HTMLInputElement).value) handleNext((e.target as HTMLInputElement).value); }}
              />
            )}

            {q.type === 'textarea' && (
              <textarea 
                autoFocus 
                rows={4} 
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white font-medium text-lg focus:border-thedeal-gold outline-none resize-none transition-all" 
                placeholder="Descreva com detalhes..."
              />
            )}

            {q.type === 'select' && (
              <div className="grid gap-3">
                {q.options?.map(opt => (
                  <button key={opt.value} onClick={() => handleNext(opt.label)} className="w-full p-6 bg-black/40 border border-white/5 rounded-2xl text-left hover:border-thedeal-gold transition-all group">
                    <span className="text-sm font-bold text-thedeal-gray600 group-hover:text-white uppercase tracking-widest">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-10 flex justify-between items-center">
            <button onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(c => c - 1) : setUserType(null)} className="text-[9px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-widest">Voltar</button>
            {(q.type === 'textarea' || q.type === 'text' || q.type === 'number') && (
              <button 
                onClick={() => {
                  const input = document.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
                  if(input && input.value) handleNext(input.value);
                }}
                className="bg-thedeal-gold text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
              >
                Próximo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Final Info / Payment
  if (step === 2) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-10 md:p-12 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          
          <div className="space-y-4">
             <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-thedeal-gold" />
             </div>
             <h2 className="text-2xl font-black text-white uppercase tracking-tight">Análise Preliminar Concluída.</h2>
             
             {userType === UserType.Creator ? (
               <div className="space-y-6">
                  <p className="text-white font-medium leading-relaxed">
                    Seu perfil foi pré-analisado. Para concluir a solicitação de curadoria, é necessário realizar a Taxa Única de Verificação de Perfil no valor de **R$ 99**.
                  </p>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-left space-y-4">
                    <div className="flex gap-3 items-start">
                       <AlertCircle size={18} className="text-thedeal-gold shrink-0 mt-0.5" />
                       <p className="text-[11px] text-thedeal-gray400 leading-relaxed font-bold uppercase">Essa taxa não é mensalidade. Ela existe para garantir que apenas criadores profissionais entrem na rede. Sem o pagamento, a solicitação não é enviada.</p>
                    </div>
                  </div>
                  <button onClick={handlePaymentClick} className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-thedeal-gold/10 hover:scale-[1.02] transition-all">Pagar Taxa de Verificação e Enviar Solicitação</button>
               </div>
             ) : (
               <div className="space-y-6">
                  <p className="text-white font-medium leading-relaxed">
                    Sua solicitação de acesso será analisada pela nossa inteligência de mercado.
                  </p>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-left">
                     <p className="text-xs text-white font-bold uppercase tracking-widest mb-2">Informações de Acesso:</p>
                     <p className="text-thedeal-gray400 text-[11px] leading-relaxed font-medium uppercase">O acesso à plataforma é anual, no valor de R$ 497, com comissão fixa de 10% apenas sobre contratos fechados no terminal.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button onClick={openEmail} className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest hover:bg-white/10">
                      <Mail size={16} /> Enviar via E-mail
                    </button>
                    <button onClick={openWhatsApp} className="bg-[#25D366] text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">
                      <MessageSquare size={16} /> Enviar via WhatsApp
                    </button>
                  </div>
                  <p className="text-[9px] text-thedeal-gray700 font-black uppercase tracking-widest">Nossa equipe retornará após análise.</p>
               </div>
             )}
          </div>
          
          {userType === UserType.Creator && isPaid && (
            <div className="pt-6 border-t border-white/5 space-y-4 animate-float-in">
               <p className="text-sm font-bold text-white uppercase tracking-tight">Pagamento Reconhecido?</p>
               <div className="grid grid-cols-2 gap-3">
                  <button onClick={openEmail} className="bg-white/5 border border-white/10 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">E-mail</button>
                  <button onClick={openWhatsApp} className="bg-[#25D366] text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest">WhatsApp</button>
               </div>
               <p className="text-[9px] text-thedeal-gray600 uppercase font-black tracking-widest">Anexe o comprovante de pagamento junto com este resumo.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Final Step: Welcome
  return (
    <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in text-center">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-success"></div>
        <div className="w-20 h-20 bg-thedeal-success/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-thedeal-success/5 animate-subtle-pulse">
          <ShieldCheck size={40} className="text-thedeal-success" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Solicitação <br/><span className="text-thedeal-success">Recebida.</span></h2>
          <p className="text-thedeal-gray400 text-sm leading-relaxed">
            Você entrou no fluxo de curadoria do THE DEAL. Nossa equipe irá analisar seu perfil tecnicamente. Se aprovado, você receberá as instruções de acesso em breve.
          </p>
        </div>
        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
          <p className="text-[10px] text-thedeal-gold font-black uppercase tracking-[0.3em]">Aqui, influência opera como ativo profissional.</p>
        </div>
        <button onClick={onSuccess} className="w-full bg-white text-black font-black py-6 rounded-2xl uppercase text-[10px] tracking-[0.3em] hover:scale-105 transition-all shadow-xl">Ir para Página de Boas-Vindas</button>
      </div>
    </div>
  );
};

export default SignupForm;
