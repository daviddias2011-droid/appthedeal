import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { ArrowLeftIcon, BriefcaseIcon } from './Icons';

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
          <p>O THE DEAL é uma infraestrutura privada para fechar contratos entre marcas e criadores com proteção jurídica e financeira.</p>
          <p>Aqui, influência é tratada como mídia profissional, com processo, contrato e pagamento garantido.</p>
        </>
      )
    },
    {
      question: "O THE DEAL é uma agência?",
      answer: (
        <>
          <p>Não.</p>
          <p>O THE DEAL não intermedia conteúdo, não representa criadores e não negocia por eles.</p>
          <p>A plataforma fornece infraestrutura, não gestão de ego ou assessoria.</p>
        </>
      )
    },
    {
      question: "Quem pode se cadastrar?",
      answer: (
        <>
          <p>Criadores e marcas que operam ou desejam operar de forma profissional.</p>
          <p>O acesso é feito por curadoria, não por cadastro automático.</p>
        </>
      )
    },
    {
      question: "Como funciona a curadoria?",
      answer: (
        <>
          <p>Todo perfil passa por uma avaliação técnica que analisa:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>posicionamento</li>
            <li>clareza de proposta</li>
            <li>capacidade de entrega</li>
            <li>maturidade profissional</li>
          </ul>
          <p className="mt-2">O objetivo é manter uma rede funcional, sem spam ou amadorismo.</p>
        </>
      )
    },
    {
      question: "Criadores pagam para usar o THE DEAL?",
      answer: (
        <>
          <p>Não.</p>
          <p>Criadores não pagam mensalidade nem comissão.</p>
          <p>Após aprovação, existe apenas uma taxa única de curadoria (R$ 99) para entrada na rede.</p>
        </>
      )
    },
    {
      question: "Por que existe a taxa de curadoria?",
      answer: (
        <>
          <p>A taxa cobre:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>análise técnica do perfil</li>
            <li>manutenção da integridade da rede</li>
            <li>prevenção de perfis oportunistas ou amadores</li>
          </ul>
          <p className="mt-2">Ela só é aplicada após a aprovação.</p>
        </>
      )
    },
    {
      question: "Criadores recebem 100% do valor do contrato?",
      answer: (
        <>
          <p>Sim.</p>
          <p>O THE DEAL não retém comissão de criadores.</p>
          <p>O valor acordado em contrato é integralmente repassado ao criador após a entrega.</p>
        </>
      )
    },
    {
      question: "Quem paga o THE DEAL?",
      answer: (
        <>
          <p>Quem gera receita.</p>
          <p>As marcas pagam:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>acesso anual à plataforma</li>
            <li>comissão de 10% apenas quando um contrato é fechado</li>
          </ul>
        </>
      )
    },
    {
      question: "Como funciona o pagamento?",
      answer: (
        <>
          <p>O pagamento é feito via custódia (escrow).</p>
          <p>O valor fica protegido e só é liberado após a entrega acordada em contrato.</p>
        </>
      )
    },
    {
      question: "O THE DEAL garante pagamento?",
      answer: (
        <>
          <p>Sim, desde que a entrega seja realizada conforme os termos contratuais.</p>
          <p>Não há liberação de verba sem contrato e sem validação da entrega.</p>
        </>
      )
    },
    {
      question: "Marcas precisam pagar antes de fechar contrato?",
      answer: (
        <>
          <p>Não.</p>
          <p>A comissão só é aplicada sobre contratos efetivamente fechados.</p>
        </>
      )
    },
    {
      question: "Posso negociar direto com a marca/criador?",
      answer: (
        <>
          <p>Sim.</p>
          <p>O THE DEAL não interfere na negociação.</p>
          <p>Ele garante que o acordo tenha forma jurídica, registro e pagamento protegido.</p>
        </>
      )
    },
    {
      question: "O THE DEAL está em desenvolvimento?",
      answer: (
        <>
          <p>Sim.</p>
          <p>A plataforma está em fase de desenvolvimento e validação, com acesso controlado por curadoria.</p>
        </>
      )
    },
    {
      question: "Como solicitar acesso?",
      answer: (
        <>
          <p>Através do processo de curadoria disponível no site.</p>
          <p>O cadastro inicia uma avaliação técnica, não um acesso imediato.</p>
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
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <BriefcaseIcon size={18} className="text-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                </div>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
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
                <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">Protocolo de Informação</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-4 uppercase leading-none">
              FAQ — <span className="text-thedeal-gold">THE DEAL.</span>
            </h1>
            <p className="text-thedeal-gray400 font-medium uppercase tracking-[0.2em] text-xs">
              Tudo o que você precisa saber sobre a rede.
            </p>
        </header>

        <div className="bg-thedeal-card border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl">
          {faqData.map((item, index) => (
            // FIX: Corrected typo in FaqItem component name.
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-br from-thedeal-gold/10 to-transparent border border-thedeal-gold/20 rounded-[2.5rem] text-center space-y-6">
           <h3 className="text-xl font-black text-white uppercase tracking-tight">Ainda tem dúvidas estratégicas?</h3>
           <p className="text-thedeal-gray400 text-sm font-medium uppercase tracking-widest">Nossa equipe de curadoria está pronta para auxiliar.</p>
           <a href="mailto:suporte@thedeal.com.br" className="inline-block bg-thedeal-gold text-black font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">SOLICITAR SUPORTE</a>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 flex flex-col items-center justify-center px-4 md:px-6 opacity-30 gap-3">
          <p className="text-[7px] md:text-[8px] font-black text-thedeal-gray700 uppercase tracking-[0.4em] md:tracking-[0.5em] text-center">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
          <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto text-center leading-relaxed">
              A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS.
          </p>
      </footer>
    </div>
  );
};

export default FaqPage;