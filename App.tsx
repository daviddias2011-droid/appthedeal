
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppView } from './types';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import InvitationPage from './components/InvitationPage';
import ValidationPage from './components/ValidationPage';
import WelcomePage from './components/WelcomePage';
import HowItWorksPage from './components/HowItWorksPage';
import CookieConsent from './components/CookieConsent';
import SimulatorPage from './components/SimulatorPage';
import ForBrandsPage from './components/ForBrandsPage';
import ForCreatorsPage from './components/ForCreatorsPage';
import DiscoverPage from './components/DiscoverPage';
import PricingPage from './components/PricingPage';
import FaqPage from './components/FaqPage';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';
import { translations } from './translations';
import { BriefcaseIcon, ArrowLeftIcon } from './components/Icons';
// FIX: Added CheckCircle2 import from lucide-react.
import { CheckCircle2 } from 'lucide-react';

const AppContent = () => {
  const [view, setView] = useState<AppView | any>('landing');
  const [language] = useState<'pt' | 'en'>('pt');
  const t = useMemo(() => translations[language], [language]);

  const showFooter = !['invitation', 'welcome', 'privacy', 'terms'].includes(view);

  const termsContent = (
    <div className="space-y-6 text-thedeal-gray400 text-sm leading-relaxed">
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">1. A PLATAFORMA E SUA NATUREZA JURÍDICA</h3>
        <p>1.1. O THE DEAL é uma plataforma tecnológica de infraestrutura ("SaaS") destinada à aproximação comercial, gestão de fluxo de trabalho e formalização de contratos entre Marcas (Contratantes) e Criadores de Conteúdo (Contratados).</p>
        <p>1.2. <strong className="text-white font-black">INEXISTÊNCIA DE VÍNCULO TRABALHISTA:</strong> O THE DEAL não exerce poder diretivo, fiscalizatório ou disciplinar sobre os Criadores. A relação estabelecida é estritamente comercial e cível (B2B). Não há, em hipótese alguma, vínculo empregatício entre a Plataforma, as Marcas e os Criadores.</p>
        <p>1.3. O THE DEAL não é agência de publicidade, não é agência de talentos e não atua como representante legal das partes, figurando apenas como Intermediador Tecnológico.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">2. DO ACESSO E CURADORIA (BACKGROUND CHECK)</h3>
        <p>2.1. O cadastro na plataforma não garante aprovação imediata. O THE DEAL reserva-se o direito de "Direito de Admissão", baseando-se em critérios técnicos de curadoria.</p>
        <p>2.2. Taxa de Verificação: Poderá ser cobrada uma taxa única de curadoria/verificação de dados para Criadores. Este valor refere-se aos custos administrativos de análise de perfil e background check, não sendo reembolsável em caso de reprovação futura por conduta inadequada.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">3. FLUXO FINANCEIRO E CUSTÓDIA (ESCROW)</h3>
        <p>3.1. Pagamento em Garantia: Para segurança da transação, os valores negociados nos contratos ("Jobs") serão depositados pela Marca em uma conta de custódia (Escrow) gerida por Instituição de Pagamento parceira e regulada pelo Banco Central.</p>
        <p>3.2. O THE DEAL não detém a posse definitiva dos valores dos contratos, atuando apenas no gatilho de liberação (split de pagamento) mediante o cumprimento das entregas pactuadas.</p>
        <p>3.3. A liberação dos valores ao Criador ocorrerá somente após o aceite formal della entrega pela Marca ou decurso de prazo automático previsto no contrato individual do Job.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">4. OBRIGAÇÕES E RESPONSABILIDADES</h3>
        <p>4.1. Da Marca: Compromete-se a depositar o valor integral do contrato antes do início da execução e a fornecer briefings claros.</p>
        <p>4.2. Do Criador: Compromete-se a cumprir os prazos e especificações técnicas. A não entrega ou entrega em desconformidade autoriza o estorno dos valores à Marca (Cashback), deduzidas as taxas administrativas da plataforma.</p>
        <p>4.3. Da Plataforma: O THE DEAL não se responsabiliza pelo teor do conteúdo produzido, nem por danos indiretos, lucros cessantes ou insucesso das campanhas publicitárias (ROI).</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">5. PROPRIEDADE INTELECTUAL</h3>
        <p>5.1. Salvo estipulação contrária no contrato individual do Job, os direitos patrimoniais sobre os conteúdos produzidos são licenciados à Marca pelo período contratado, mantendo-se os direitos morais do Criador.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">6. FORO</h3>
        <p>6.1. Fica eleito o foro da Comarca de Leme/SP para dirimir quaisquer litígios oriundos destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
      </section>
    </div>
  );

  const privacyContent = (
    <div className="space-y-8 text-thedeal-gray400 text-sm leading-relaxed">
      <div className="border-b border-white/5 pb-6">
        <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Última atualização: Janeiro de 2026</p>
        <p className="text-xs italic opacity-60">Vigência: A partir da publicação</p>
      </div>

      <p>Esta Política descreve como o THE DEAL coleta, usa, armazena e protege seus dados pessoal, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>

      <section className="space-y-4">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">1. IDENTIFICAÇÃO DO CONTROLADOR</h3>
        <p><strong className="text-white">Razão Social:</strong> THE DEAL<br />
        <strong className="text-white">Endereço:</strong> Leme/SP<br />
        <strong className="text-white">E-mail de contato:</strong> suporte@thedeal.com.br</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">2. PAPÉIS NO TRATAMENTO DE DADOS</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-thedeal-gold font-bold uppercase text-[10px] tracking-widest mb-2">2.1. CONTROLADOR</h4>
            <p>Dos dados cadastrais e operacionais da plataforma:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nome completo, CPF/CNPJ</li>
              <li>E-mail, telefone</li>
              <li>Dados bancários (para repasse de valores)</li>
              <li>Informações de perfil profissional (portfólio, seguidores, nichos)</li>
              <li>Histórico de transações na plataforma</li>
            </ul>
            <p className="mt-2 text-xs italic"><strong className="text-white not-italic">Finalidade:</strong> Gestão de contas, processamento de pagamentos, curadoria, prevenção à fraude e cumprimento de obrigações legais.</p>
          </div>
          <div>
            <h4 className="text-thedeal-gold font-bold uppercase text-[10px] tracking-widest mb-2">2.2. OPERADOR</h4>
            <p>Dos dados compartilhados nos contratos entre Marca e Criador:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Briefings de campanha</li>
              <li>Arquivos trocados entre as partes</li>
              <li>Dados de desempenho de campanhas</li>
            </ul>
            <p className="mt-2 text-xs italic"><strong className="text-white not-italic">Finalidade:</strong> Viabilizar a execução técnica dos contratos firmados entre as partes. O THE DEAL trata esses dados apenas sob instrução das partes contratantes.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4 overflow-x-auto">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">3. BASES LEGAIS PARA TRATAMENTO (Art. 7º e 11º da LGPD)</h3>
        <table className="w-full border-collapse border border-white/10 text-[10px] uppercase font-bold tracking-tight">
          <thead>
            <tr className="bg-white/5">
              <th className="border border-white/10 p-3 text-left text-thedeal-gold">Dado Coletado</th>
              <th className="border border-white/10 p-3 text-left text-thedeal-gold">Base Legal</th>
              <th className="border border-white/10 p-3 text-left text-thedeal-gold">Finalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white/10 p-3">Nome, CPF/CNPJ, E-mail, Telefone</td>
              <td className="border border-white/10 p-3">Execução de Contrato (Art. 7º, V)</td>
              <td className="border border-white/10 p-3">Criação e gestão de conta</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="border border-white/10 p-3">Dados bancários</td>
              <td className="border border-white/10 p-3">Execução de Contrato (Art. 7º, V)</td>
              <td className="border border-white/10 p-3">Processamento de pagamentos</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-3">Dados financeiros/transacionais</td>
              <td className="border border-white/10 p-3">Cumprimento de Obrigação Legal (Art. 7º, II)</td>
              <td className="border border-white/10 p-3">Formalização de acordos e prestação de contas</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="border border-white/10 p-3">Análise de perfil para curadoria</td>
              <td className="border border-white/10 p-3">Legítimo Interesse (Art. 7º, IX)</td>
              <td className="border border-white/10 p-3">Prevenção à fraude e qualidade</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-3">Dados de navegação (cookies)</td>
              <td className="border border-white/10 p-3">Consentimento (Art. 7º, I)</td>
              <td className="border border-white/10 p-3">Melhoria da experiência</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">4. DADOS COLETADOS</h3>
        <p><strong className="text-white">4.1. Dados fornecidos diretamente por você:</strong> Criadores (CPF, dados bancários, portfólio) e Marcas (CNPJ, dados do responsável).</p>
        <p><strong className="text-white">4.2. Dados coletados automaticamente:</strong> Endereço IP, tipo de dispositivo, páginas visitadas e logs de acesso.</p>
        <p><strong className="text-white">4.3. Dados sensíveis:</strong> NÃO coletamos dados sensíveis (origem racial, convicções religiosas, etc), salvo se estritamente necessário para execução de contrato específico.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">5. COMPARTILHAMENTO DE DADOS</h3>
        <p>Não vendemos ou comercializamos seus dados pessoais. Compartilhamos apenas com prestadores essenciais (AWS, gateways de pagamento) e entre as partes contratantes (apenas dados necessários para a formalização do Job).</p>
      </section>

      <section className="space-y-4 overflow-x-auto">
        <h3 className="text-white font-black uppercase tracking-widest text-xs">8. SEUS DIREITOS COMO TITULAR DE DADOS (Art. 18 da LGPD)</h3>
        <table className="w-full border-collapse border border-white/10 text-[10px] uppercase font-bold tracking-tight">
          <thead>
            <tr className="bg-white/5">
              <th className="border border-white/10 p-3 text-left text-thedeal-gold">Direito</th>
              <th className="border border-white/10 p-3 text-left text-thedeal-gold">O que significa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white/10 p-3">Confirmação e Acesso</td>
              <td className="border border-white/10 p-3">Saber se tratamos seus dados e solicitar cópia</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="border border-white/10 p-3">Correção</td>
              <td className="border border-white/10 p-3">Atualizar dados incompletos ou inexatos</td>
            </tr>
            <tr>
              <td className="border border-white/10 p-3">Eliminação</td>
              <td className="border border-white/10 p-3">Solicitar exclusão de dados desnecessários</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="border border-white/10 p-3">Portabilidade</td>
              <td className="border border-white/10 p-3">Receber dados em formato estruturado (JSON/CSV)</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 p-4 bg-thedeal-gold/5 border border-thedeal-gold/20 rounded-xl text-xs">
          <strong className="text-white uppercase tracking-widest block mb-2">Como exercer:</strong>
          Envie solicitação para: <strong className="text-thedeal-gold">dpo@thedeal.com.br</strong>. Prazo de resposta: Até 15 dias úteis.
        </p>
      </section>

      <section className="pt-10 border-t border-white/5 space-y-4 opacity-80">
        <div className="flex items-center gap-3 text-thedeal-success">
          <CheckCircle2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Documento em conformidade com LGPD (Lei 13.709/2018)</span>
        </div>
        <div className="flex items-center gap-3 text-thedeal-success">
          <CheckCircle2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Conforme Marco Civil da Internet (Lei 12.965/2014)</span>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {(() => {
        if (view === 'welcome') return <WelcomePage userName="Membro" onContinue={() => setView('landing')} />;
        
        switch (view) {
          case 'landing':
            return <LandingPage 
              onGoToDemo={() => setView('login')} onGoToSignup={() => setView('invitation')}
              onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')}
              onGoToForBrands={() => setView('for-brands')} onGoToForCreators={() => setView('for-creators')}
              onGoToHowItWorks={() => setView('how-it-works')} onGoToHub={() => setView('landing')}
              onGoToBlog={() => setView('blog')} onGoToAcademy={() => setView('academy')}
              onGoToMissions={() => setView('missions')} onGoToInvestor={() => setView('investor')}
              onGoToSimulator={() => setView('simulator')} onGoToDiscover={() => setView('discover')}
              onGoToPricing={() => setView('pricing')} onGoToFaq={() => setView('faq')}
              language={language} t={t}
            />;
          
          case 'pricing': return <PricingPage onBack={() => setView('landing')} />;
          case 'how-it-works': return <HowItWorksPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;
          case 'faq': return <FaqPage onBack={() => setView('landing')} />;
          case 'privacy': return <LegalPage title="Política de Privacidade e Proteção de Dados" content={privacyContent} onBack={() => setView('landing')} />;
          case 'terms': return <LegalPage title="Termos e Condições de Uso" content={termsContent} onBack={() => setView('landing')} />;
          
          case 'simulator':
            return (
              <div className="min-h-screen bg-black text-left pb-32">
                <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                        <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={() => setView('landing')}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                    <BriefcaseIcon size={18} className="text-black" />
                                </div>
                                <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                            </div>
                            <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                        </div>
                        <button onClick={() => setView('landing')} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10">
                            <ArrowLeftIcon size={14} className="text-thedeal-gold" /> Voltar
                        </button>
                    </div>
                </nav>
                <div className="pt-24 px-6 max-w-7xl mx-auto">
                  <SimulatorPage userIsLoggedIn={true} onRestrictedAction={() => setView('login')} />
                </div>
              </div>
            );

          case 'discover': return <DiscoverPage onBack={() => setView('landing')} onSignup={() => setView('invitation')} />;
          case 'for-brands': return <ForBrandsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;
          case 'for-creators': return <ForCreatorsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} onGoToDiscover={() => setView('discover')} />;
          case 'invitation': return <InvitationPage onBack={() => setView('landing')} t={t} language={language} toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} onSignupSuccess={() => setView('welcome')} />;
          default: return <LandingPage onGoToDemo={() => setView('login')} onGoToSignup={() => setView('invitation')} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} onGoToForBrands={() => setView('for-brands')} onGoToForCreators={() => setView('for-creators')} onGoToHowItWorks={() => setView('how-it-works')} onGoToHub={() => setView('landing')} onGoToBlog={() => setView('blog')} onGoToAcademy={() => setView('academy')} onGoToMissions={() => setView('missions')} onGoToInvestor={() => setView('investor')} onGoToSimulator={() => setView('simulator')} onGoToDiscover={() => setView('discover')} language={language} t={t} />;
        }
      })()}

      {showFooter && (
        <Footer activeTab={view} setActiveTab={(newTab) => setView(newTab)} />
      )}
      
      <CookieConsent onAccept={() => {}} onDecline={() => {}} />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </Router>
);

export default App;
