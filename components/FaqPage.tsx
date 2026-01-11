import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { ArrowLeftIcon } from './Icons';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isOpen ? 'text-thedeal-gold' : 'text-white group-hover:text-thedeal-gold'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp size={20} className="text-thedeal-gold" />
        ) : (
          <ChevronDown size={20} className="text-thedeal-gray600 group-hover:text-white" />
        )}
      </button>
      {isOpen && (
        <div className="pb-8 animate-fade-in">
          <div className="text-thedeal-gray400 text-sm md:text-base leading-relaxed space-y-4 font-medium">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

const FaqPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const faqData = [
    {
      question: "O que é o THE DEAL?",
      answer: (
        <>
          <p>O THE DEAL é uma Rede Exclusiva de Inteligência e Performance. Não somos apenas um marketplace; somos uma infraestrutura privada destinada a formalizar parcerias estratégicas com proteção jurídica e financeira.</p>
          <p>Aqui, influência é tratada como um ativo profissional de alta performance.</p>
        </>
      )
    },
    {
      question: "Como funciona a entrada de criadores?",
      answer: (
        <>
          <p>A entrada não é automática. O criador deve preencher um formulário técnico e realizar o pagamento da **Taxa de Avaliação** (R$ 99).</p>
          <p>Após o pagamento, nosso comitê audita o perfil. Caso aprovado, o criador ganha acesso ao terminal de deals e networking elite.</p>
        </>
      )
    },
    {
      question: "Pagar a taxa garante minha aprovação ou contratos?",
      answer: (
        <>
          <p><strong className="text-white">Não.</strong></p>
          <p>A taxa de R$ 99 refere-se ao serviço de análise e curadoria técnica. Ela serve como filtro de maturidade profissional.</p>
          <p>A aprovação na rede depende da qualidade e alinhamento estratégico do seu perfil. O fechamento de contratos (deals) depende da sua negociação com as marcas e do seu Deal Score.</p>
        </>
      )
    },
    {
      question: "Por que a taxa deve ser paga antes da análise?",
      answer: (
        <>
          <p>A manutenção de uma rede exclusiva exige recursos técnicos e humanos para auditar cada candidatura. A taxa cobre o custo operacional dessa análise detalhada.</p>
          <p>Isso garante que apenas criadores que levam sua carreira a sério submetam seus perfis, mantendo a integridade do ecossistema para as marcas parceiras.</p>
        </>
      )
    },
    {
      question: "Criadores pagam mensalidade?",
      answer: (
        <>
          <p>Não.</p>
          <p>Criadores aprovados não pagam mensalidade nem comissão para a plataforma. O repasse dos contratos fechados é de 100% para o criador.</p>
        </>
      )
    },
    {
      question: "O THE DEAL garante o pagamento dos meus trabalhos?",
      answer: (
        <>
          <p>Sim, através do nosso sistema de **Escrow (Custódia Financeira)**. Quando um contrato é fechado, a marca deposita o valor integral, que fica travado na rede.</p>
          <p>O valor é liberado para o criador assim que a entrega técnica for validada conforme o contrato.</p>
        </>
      )
    },
    {
      question: "O que acontece se eu for reprovado na curadoria?",
      answer: (
        <>
          <p>Se o seu perfil não atingir os critérios técnicos mínimos no momento, você receberá um feedback e poderá realizar uma nova submissão após 90 dias. A taxa de avaliação não é reembolsável.</p>
        </>
      )
    },
    {
      question: "Marcas também passam por curadoria?",
      answer: (
        <>
          <p>Sim. Marcas devem validar seu CNPJ, maturidade comercial e concordar com os protocolos de pagamento via escrow e contratos digitais TD-IP.</p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-thedeal-gold selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        <p className="text-[7px] md:text-[8px] font-bold uppercase text-thedeal-gold tracking-widest leading-tight">Onde influência vira contrato</p>
                    </div>
                </div>
            </div>
            
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                <ArrowLeftIcon size={14} className="text-thedeal-gold" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Voltar</span>
            </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-gold/20 px-4 py-1.5 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-thedeal-gold" />
                <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">Protocolo de Informação Alpha</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-4 uppercase leading-none">
              FAQ — <span className="text-thedeal-gold">THE DEAL.</span>
            </h1>
            <p className="text-thedeal-gray400 font-medium uppercase tracking-[0.2em] text-xs">
              Tudo o que você precisa saber sobre a rede de inteligência.
            </p>
        </header>

        <div className="bg-thedeal-card border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-br from-thedeal-gold/10 to-transparent border border-thedeal-gold/20 rounded-[2.5rem] text-center space-y-6">
           <h3 className="text-xl font-black text-white uppercase tracking-tight">Dúvidas Estratégicas?</h3>
           <p className="text-thedeal-gray400 text-sm font-medium uppercase tracking-widest">Nossa equipe de curadoria está pronta para auxiliar sua transição para o modelo de performance.</p>
           <a href="mailto:suporte@thedeal.com.br" className="inline-block bg-thedeal-gold text-black font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">SOLICITAR SUPORTE</a>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 flex flex-col items-center justify-center px-4 md:px-6 opacity-30 gap-3">
          <p className="text-[7px] md:text-[8px] font-black text-thedeal-gray700 uppercase tracking-[0.4em] md:tracking-[0.5em] text-center">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
          <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto text-center leading-relaxed">
              A REDE THE DEAL OPERA SOB PROTOCOLO DE EXCLUSIVIDADE.
          </p>
      </footer>
    </div>
  );
};

export default FaqPage;