
import React, { useState, useEffect, useRef } from 'react';
import { 
  Loader, ArrowRight, ArrowLeft, Building2, User, 
  ShieldCheck, Check, MessageSquare
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const creatorQuestions: Question[] = [
    { id: 'fullName', text: 'Nome completo', type: 'text' },
    { id: 'location', text: 'Cidade / País', type: 'text' },
    { id: 'profileLink', text: 'Link principal do perfil (Instagram, TikTok ou YouTube)', type: 'text' },
    { id: 'followers', text: 'Quantidade atual de seguidores', type: 'number' },
    { 
      id: 'donePaidJobs', 
      text: 'Você já fechou publis pagas?', 
      type: 'select',
      options: [
        { value: 'never', label: 'Nunca' },
        { value: 'eventually', label: 'Sim, eventualmente' },
        { value: 'recurrently', label: 'Sim, com recorrência' }
      ]
    },
    { id: 'maxDealValue', text: 'Maior valor já recebido em um contrato', type: 'number' },
    { 
      id: 'pricingMethod', 
      text: 'Hoje, como você define seu preço?', 
      type: 'select',
      options: [
        { value: 'intuition', label: 'Intuição' },
        { value: 'own_table', label: 'Tabela própria' },
        { value: 'negotiation', label: 'Negociação caso a caso' },
        { value: 'dont_know', label: 'Não sei precificar' }
      ]
    },
    { 
      id: 'problems', 
      text: 'Já teve problemas com:', 
      type: 'select',
      options: [
        { value: 'vanished_brand', label: 'Marca que sumiu' },
        { value: 'late_payment', label: 'Pagamento atrasado' },
        { value: 'no_contract', label: 'Contrato inexistente' },
        { value: 'all', label: 'Todos' }
      ]
    },
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
      text: 'Você entende que o The Deal não garante contratos, apenas fornece estrutura?', 
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
    { id: 'avgTicket', text: 'Ticket médio mensal em marketing de influência', type: 'number' },
    { 
      id: 'workedWithCreators', 
      text: 'Você já trabalhou com creators?', 
      type: 'select',
      options: [
        { value: 'never', label: 'Nunca' },
        { value: 'few_times', label: 'Algumas vezes' },
        { value: 'recurrently', label: 'Recorrentemente' }
      ]
    },
    { 
      id: 'mainProblem', 
      text: 'Principal problema hoje:', 
      type: 'select',
      options: [
        { value: 'no_predictability', label: 'Falta de previsibilidade' },
        { value: 'informal_contracts', label: 'Contratos informais' },
        { value: 'selection_difficulty', label: 'Dificuldade de escolher criadores' },
        { value: 'delivery_failure', label: 'Falta de entrega' }
      ]
    },
    { 
      id: 'understandsRules', 
      text: 'Você entende que no The Deal criadores são fornecedores, contratos são obrigatórios e existe comissão por deal?', 
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

  const handleStartEvaluation = () => {
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsFinished(true);
    }, 2000);
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 animate-fade-in text-center">
        <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="text-thedeal-gold" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Obrigado.</h2>
          <p className="text-thedeal-gray400 text-sm leading-relaxed mb-8">
            {userType === UserType.Creator 
              ? 'Seu perfil entrou em análise. Caso aprovado, você receberá um convite oficial. Acesso para criadores é gratuito. Para entrar na rede, existe apenas uma taxa única de curadoria.'
              : 'Sua solicitação será analisada. Caso aprovada, você receberá acesso à rede curada de criadores.'}
          </p>
          <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-8">
            <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-1">Status</p>
            <p className="text-thedeal-gold font-black text-lg uppercase tracking-widest">EM ANÁLISE</p>
          </div>
          <button onClick={onSuccess} className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-thedeal-gold transition-all">Retornar ao Terminal</button>
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
              Este processo avalia perfil, maturidade comercial e postura profissional.
            </p>
          </div>
          
          <div className="space-y-4">
             <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Não é automático. Não é rápido. Não é para todos.</p>
             <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Tempo médio: 6–8 minutos.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => { setUserType(UserType.Creator); handleStartEvaluation(); }} 
              className="group p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <User size={20} className="text-thedeal-gold" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Sou Criador</span>
              </div>
              <ArrowRight size={16} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
            <button 
              onClick={() => { setUserType(UserType.Brand); handleStartEvaluation(); }} 
              className="group p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-thedeal-gold transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Building2 size={20} className="text-thedeal-gold" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Sou Marca</span>
              </div>
              <ArrowRight size={16} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
            </button>
          </div>

          <button onClick={onBack} className="text-[10px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.4em] transition-colors">Retornar</button>
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
              <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Banca Avaliadora Alpha</span>
            </div>
            <span className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">Questão {currentQuestionIndex + 1} de {questions.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-12 pr-2" ref={scrollRef}>
          {/* History of conversation */}
          {questions.slice(0, currentQuestionIndex).map((q, i) => (
            <div key={q.id} className="space-y-4 animate-fade-in opacity-40">
              <p className="text-xs font-black text-thedeal-gray600 uppercase tracking-widest">{q.text}</p>
              <p className="text-sm font-bold text-white uppercase">{answers[q.id]}</p>
            </div>
          ))}

          {/* Current Question */}
          <div className="space-y-8 animate-float-in pb-10">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
              {currentQuestion.text}
            </h3>

            {currentQuestion.type === 'text' && (
              <input 
                autoFocus
                type="text"
                placeholder="Digite sua resposta..."
                className="w-full bg-transparent border-b-2 border-thedeal-gray700 py-4 text-xl md:text-2xl text-white font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-zinc-800"
                onKeyDown={(e) => { if(e.key === 'Enter' && (e.target as HTMLInputElement).value) handleAnswer((e.target as HTMLInputElement).value); }}
              />
            )}

            {currentQuestion.type === 'number' && (
              <input 
                autoFocus
                type="number"
                placeholder="Valor numérico..."
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
             <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Processando Protocolo de Auditoria...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
