
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
import Footer from './components/Footer';
import { translations } from './translations';
import { BriefcaseIcon, ArrowLeftIcon } from './components/Icons';

const AppContent = () => {
  const [view, setView] = useState<AppView | any>('landing');
  const [language] = useState<'pt' | 'en'>('pt');
  const t = useMemo(() => translations[language], [language]);

  const showFooter = !['invitation', 'welcome'].includes(view);

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
              onGoToPricing={() => setView('pricing')}
              language={language} t={t}
            />;
          
          case 'pricing': return <PricingPage onBack={() => setView('landing')} />;
          case 'how-it-works': return <HowItWorksPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;
          
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
