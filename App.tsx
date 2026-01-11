
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

const AppContent = () => {
  const [view, setView] = useState<AppView | any>('landing');
  const [language] = useState<'pt' | 'en'>('pt');
  const t = useMemo(() => translations[language], [language]);

  const showFooter = !['invitation', 'welcome', 'privacy', 'terms'].includes(view);

  const termsContent = (
    <div className="space-y-6 text-thedeal-gray400 text-sm leading-relaxed">
      <section>
        <h3 className="text-white font-bold mb-2">1. A PLATAFORMA E SUA NATUREZA JURÍDICA</h3>
        <p>1.1. O THE DEAL é uma plataforma tecnológica de infraestrutura ("SaaS") destinada à aproximação comercial, gestão de fluxo de trabalho e formalização de contratos entre Marcas (Contratantes) e Criadores de Conteúdo (Contratados).</p>
        <p>1.2. <strong className="text-white font-black">INEXISTÊNCIA DE VÍNCULO TRABALHISTA:</strong> O THE DEAL não exerce poder diretivo, fiscalizatório ou disciplinar sobre os Criadores. A relação estabelecida é estritamente comercial e cível (B2B). Não há, em hipótese alguma, vínculo empregatício entre a Plataforma, as Marcas e os Criadores.</p>
        <p>1.3. O THE DEAL não é agência de publicidade, não é agência de talentos e não atua como representante legal das partes, figurando apenas como Intermediador Tecnológico.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">2. DO ACESSO E CURADORIA (BACKGROUND CHECK)</h3>
        <p>2.1. O cadastro na plataforma não garante aprovação imediata. O THE DEAL reserva-se o direito de "Direito de Admissão", baseando-se em critérios técnicos de curadoria.</p>
        <p>2.2. Taxa de Verificação: Poderá ser cobrada uma taxa única de curadoria/verificação de dados para Criadores. Este valor refere-se aos custos administrativos de análise de perfil e background check, não sendo reembolsável em caso de reprovação futura por conduta inadequada.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">3. FLUXO FINANCEIRO E CUSTÓDIA (ESCROW)</h3>
        <p>3.1. Pagamento em Garantia: Para segurança da transação, os valores negociados nos contratos ("Jobs") serão depositados pela Marca em uma conta de custódia (Escrow) gerida por Instituição de Pagamento parceira e regulada pelo Banco Central.</p>
        <p>3.2. O THE DEAL não detém a posse definitiva dos valores dos contratos, atuando apenas no gatilho de liberação (split de pagamento) mediante o cumprimento das entregas pactuadas.</p>
        <p>3.3. A liberação dos valores ao Criador ocorrerá somente após o aceite formal della entrega pela Marca ou decurso de prazo automático previsto no contrato individual do Job.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">4. OBRIGAÇÕES E RESPONSABILIDADES</h3>
        <p>4.1. Da Marca: Compromete-se a depositar o valor integral do contrato antes do início da execução e a fornecer briefings claros.</p>
        <p>4.2. Do Criador: Compromete-se a cumprir os prazos e especificações técnicas. A não entrega ou entrega em desconformidade autoriza o estorno dos valores à Marca (Cashback), deduzidas as taxas administrativas da plataforma.</p>
        <p>4.3. Da Plataforma: O THE DEAL não se responsabiliza pelo teor do conteúdo produzido, nem por danos indiretos, lucros cessantes ou insucesso das campanhas publicitárias (ROI).</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">5. PROPRIEDADE INTELECTUAL</h3>
        <p>5.1. Salvo estipulação contrária no contrato individual do Job, os direitos patrimoniais sobre os conteúdos produzidos são licenciados à Marca pelo período contratado, mantendo-se os direitos morais do Criador.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">6. FORO</h3>
        <p>6.1. Fica eleito o foro da Comarca de Leme/SP para dirimir quaisquer litígios oriundos destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
      </section>
    </div>
  );

  const privacyContent = (
    <div className="space-y-6 text-thedeal-gray400 text-sm leading-relaxed">
      <section>
        <h3 className="text-white font-bold mb-2">1. CONTROLADOR E OPERADOR DE DADOS</h3>
        <p>1.1. Para fins da Lei Geral de Proteção de Dados (Lei 13.709/2018), o THE DEAL atua como:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-white">CONTROLADOR</strong> dos dados cadastrais (Nome, CPF/CNPJ, E-mail, Dados Bancários) para fins de gestão de conta e faturamento da plataforma.</li>
          <li><strong className="text-white">OPERADOR</strong> dos dados transacionados nos contratos privados entre Marca e Criador.</li>
        </ul>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">2. BASES LEGAIS PARA TRATAMENTO</h3>
        <p>Tratamos seus dados com base nas seguintes hipóteses legais (Art. 7º da LGPD):</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-white">Execução de Contrato:</strong> Para processar pagamentos, gerar minutas contratuais e validar entregas.</li>
          <li><strong className="text-white">Cumprimento de Obrigação Legal:</strong> Para emissão de notas fiscais e retenção de registros financeiros (Lei do Marco Civil da Internet e normas da Receita Federal).</li>
          <li><strong className="text-white">Legítimo Interesse:</strong> Para prevenção à fraude (análise de risco) e melhoria da infraestrutura.</li>
        </ul>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">3. COMPARTILHAMENTO DE DADOS</h3>
        <p>Não vendemos seus dados. O compartilhamento ocorre estritamente com:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Instituições de Pagamento/Gateways: Para processamento financeiro e split de notas.</li>
          <li>Autoridades Governamentais: Quando exigido por lei ou ordem judicial.</li>
          <li>Entre as Partes (Marca e Criador): Apenas os dados estritamente necessários para a formalização do contrato jurídico do Job.</li>
        </ul>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">4. RETENÇÃO DE DADOS</h3>
        <p>4.1. Dados financeiros e de transações serão mantidos por 5 (cinco) anos, conforme exigência tributária e civil.</p>
        <p>4.2. Dados de perfil público podem ser inativados mediante solicitação, salvo se houver pendências financeiras ou legais.</p>
      </section>
      <section>
        <h3 className="text-white font-bold mb-2">5. ENCARREGADO DE DADOS (DPO)</h3>
        <p>5.1. Para exercer seus direitos de titular (acesso, correção, anonimização), entre em contato com nosso Encarregado de Proteção de Dados através do e-mail: <strong className="text-thedeal-gold">suporte@thedeal.com.br</strong></p>
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
          case 'privacy': return <LegalPage title="Política de Privacidade (LGPD)" content={privacyContent} onBack={() => setView('landing')} />;
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
