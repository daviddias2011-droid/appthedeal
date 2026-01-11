
import React, { useState, useEffect, useRef } from 'react';
import { 
  Loader, ArrowRight, ArrowLeft, Building2, User, 
  ShieldCheck, Check, MessageSquare, Zap, Crown, ExternalLink, Mail, Send
} from 'lucide-react';
import { UserType } from '../types';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'number';
  options?: { value: string; label: string }[];
}

const SignupForm: React.FC<{ onBack: () => void; onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submittedChannel, setSubmittedChannel] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const LINK_PAGAMENTO_PRO = "https://mpago.li/1iwECoa";
  const SUPPORT_WA = "5519999999999"; // Substitua pelo número real de suporte
  const SUPPORT_EMAIL = "suporte@thedeal.com.br";

  const creatorQuestions: Question[] = [
    { id: 'fullName', text: 'Nome completo', type: 'text' },
    { id: 'location', text: 'Cidade / País', type: 'text' },
    { id: 'profileLink', text: 'Link principal do perfil', type: 'text' },
    { id: 'followers', text: 'Quantidade de seguidores', type: 'number' },
    { 
      id: 'donePaidJobs', 
      text: 'Já fechou publis pagas?', 
      type: 'select',
      options: [
        { value: 'never', label: 'Nunca' },
        { value: 'eventually', label: 'Sim, eventualmente' },
        { value: 'recurrently', label: 'Sim, com recorrência' }
      ]
    },
    { id: 'maxDealValue', text: 'Maior valor já recebido em um contrato', type: 'number' },
    { 
      id: 'deadlines', 
      text: 'Você cumpre prazos sem cobrança?', 
      type: 'select',
      options: [
        { value: 'always', label: 'Sempre' },
        { value: 'almost_always', label: 'Quase sempre' },
        { value: 'depends', label: 'Depende' }
      ]
    },
    { 
      id: 'understandsStructure', 
      text: 'Entende que o The Deal é uma infraestrutura de negócios?', 
      type: 'select',
      options: [
        { value: 'yes', label: 'Sim, entendo' }
      ]
    }
  ];

  const brandQuestions: Question[] = [
    { id: 'companyName', text: 'Nome da empresa', type: 'text' },
    { id: 'officialLink', text: 'Site ou Instagram oficial', type: 'text' },
    { id: 'segment', text: 'Segmento', type: 'text' },
    { id: 'avgTicket', text: 'Ticket médio mensal em influência', type: 'number' },
    { 
      id: 'understandsRules', 
      text: 'Entende que no The Deal contratos são obrigatórios e há comissão?', 
      type: 'select',
      options: [
        { value: 'yes', label: 'Sim, entendo as regras' }
      ]
    }
  ];

  const questions = userType === UserType.Creator ? creatorQuestions : brandQuestions;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentQuestionIndex, userType]);

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsFinished(true);
      }, 1500);
    }
  };

  const generateReport = () => {
    let report = `🚀 *NOVA SOLICITAÇÃO DE ACESSO - THE DEAL*\n`;
    report += `------------------------------------------\n`;
    report += `*TIPO:* ${userType === UserType.Creator ? 'CRIADOR' : 'MARCA'}\n`;
    
    Object.entries(answers).forEach(([key, value]) => {
      const question = questions.find(q => q.id === key);
      if (question) {
        report += `*${question.text.toUpperCase()}:* ${value}\n`;
      }
    });
    
    report += `------------------------------------------\n`;
    report += `🔐 Protocolo gerado via Terminal Alpha v3.0`;
    return report;
  };

  const sendWhatsApp = () => {
    const text = encodeURIComponent(generateReport());
    window.open(`https://wa.me/${SUPPORT_WA}?text=${text}`, '_blank');
    setSubmittedChannel(true);
  };

  const sendEmail = () => {
    const body = encodeURIComponent(generateReport());
    const subject = encodeURIComponent(`Solicitação de Acesso: ${answers['fullName'] || answers['companyName']}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmittedChannel(true);
  };

  const sendReceiptWA = () => {
    const text = encodeURIComponent(`📄 *COMPROVANTE DE ATIVAÇÃO ALPHA*\n\nOlá, acabei de realizar o pagamento do Fast Track e gostaria de enviar o comprovante para liberação imediata.`);
    window.open(`https://wa.me/${SUPPORT_WA}?text=${text}`, '_blank');
  };

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="text-thedeal-gold" size={32} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Protocolo Gerado.</h2>
            <p className="text-thedeal-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8">Agora, finalize o envio para curadoria</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
             {/* COLUNA 1: ENVIO DOS DADOS */}
             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest ml-2">PASSO 01: Enviar Dados Digitados</h4>
                <div className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-4">
                   <button 
                      onClick={sendWhatsApp}
                      className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-[#25D366]/10"
                   >
                     <MessageSquare size={18} /> Enviar via WhatsApp
                   </button>
                   <button 
                      onClick={sendEmail}
                      className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
                   >
                     <Mail size={18} /> Enviar via E-mail
                   </button>
                   <p className="text-[9px] text-thedeal-gray600 text-center uppercase font-bold tracking-widest pt-2">Seus dados já foram preenchidos na mensagem.</p>
                </div>
             </div>

             {/* COLUNA 2: PAGAMENTO & COMPROVANTE */}
             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest ml-2">PASSO 02: Ativação Fast Track (Opcional)</h4>
                <div className="bg-gradient-to-br from-thedeal-gold/10 to-transparent border-2 border-thedeal-gold/30 p-6 rounded-3xl space-y-4">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">Validação Alpha</span>
                      <span className="text-xl font-black text-white">R$ 99,00</span>
                   </div>
                   <a 
                      href={LINK_PAGAMENTO_PRO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-thedeal-gold text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest hover:brightness-110 transition-all"
                   >
                     Pagar Agora <ExternalLink size={16} />
                   </a>
                   <button 
                      onClick={sendReceiptWA}
                      className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
                   >
                     Enviar Comprovante <Zap size={16} className="text-thedeal-gold" />
                   </button>
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
             {submittedChannel ? (
               <button 
                  onClick={onSuccess}
                  className="w-full max-w-sm bg-white text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-[0.3em] shadow-2xl hover:scale-105 transition-all animate-bounce-subtle"
               >
                 Acessar Terminal Alpha <ArrowRight size={20} />
               </button>
             ) : (
               <p className="text-[9px] font-black text-thedeal-gray700 uppercase tracking-[0.4em]">Aguardando envio dos dados para habilitar acesso...</p>
             )}
             
             <button onClick={onBack} className="text-[9px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.4em] transition-colors">Cancelar Protocolo</button>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex === -1) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          <div>
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Curadoria The Deal</h2>
            <p className="text-thedeal-gray400 text-sm leading-relaxed max-w-sm mx-auto">
              Inicie seu protocolo para a **Rede de Inteligência & Performance**.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => { setUserType(UserType.Creator); setCurrentQuestionIndex(0); }} 
              className="group p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <User size={20} className="text-thedeal-gold" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Sou Criador</span>
              </div>
              <ArrowRight size={16} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
            <button 
              onClick={() => { setUserType(UserType.Brand); setCurrentQuestionIndex(0); }} 
              className="group p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Building2 size={20} className="text-thedeal-gold" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Sou Marca</span>
              </div>
              <ArrowRight size={16} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
          </div>
          <button onClick={onBack} className="text-[10px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.4em] transition-colors">Voltar</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in text-left min-h-[600px] flex flex-col">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex-1 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        <div className="mb-12 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-thedeal-gold rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Processando Protocolo</span>
            </div>
            <span className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">Questão {currentQuestionIndex + 1} de {questions.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-12 pr-2" ref={scrollRef}>
          {questions.slice(0, currentQuestionIndex).map((q, i) => (
            <div key={q.id} className="space-y-4 animate-fade-in opacity-40">
              <p className="text-xs font-black text-thedeal-gray600 uppercase tracking-widest">{q.text}</p>
              <p className="text-sm font-bold text-white uppercase">{answers[q.id]}</p>
            </div>
          ))}

          <div className="space-y-8 animate-float-in pb-10">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
              {currentQuestion.text}
            </h3>

            {currentQuestion.type === 'text' && (
              <input 
                autoFocus
                type="text"
                placeholder="Resposta..."
                className="w-full bg-transparent border-b-2 border-thedeal-gray700 py-4 text-xl md:text-2xl text-white font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-zinc-800"
                onKeyDown={(e) => { if(e.key === 'Enter' && (e.target as HTMLInputElement).value) handleAnswer((e.target as HTMLInputElement).value); }}
              />
            )}

            {currentQuestion.type === 'number' && (
              <input 
                autoFocus
                type="number"
                placeholder="0"
                className="w-full bg-transparent border-b-2 border-thedeal-gray700 py-4 text-xl md:text-2xl text-white font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-zinc-800"
                onKeyDown={(e) => { if(e.key === 'Enter' && (e.target as HTMLInputElement).value) handleAnswer((e.target as HTMLInputElement).value); }}
              />
            )}

            {currentQuestion.type === 'select' && (
              <div className="grid gap-3">
                {currentQuestion.options?.map(opt => (
                  <button 
                    key={opt.value}
                    onClick={() => handleAnswer(opt.label)}
                    className="w-full p-6 bg-black/40 border border-white/5 rounded-2xl text-left hover:border-thedeal-gold hover:bg-thedeal-gold/5 transition-all group"
                  >
                    <span className="text-sm font-bold text-thedeal-gray400 group-hover:text-white uppercase tracking-widest">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
             <Loader className="text-thedeal-gold animate-spin" size={32} />
             <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Finalizando Questionário...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
