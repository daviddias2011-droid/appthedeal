
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, UserType, AppView } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import InvitationPage from './components/InvitationPage';
import ValidationPage from './components/ValidationPage';
import WelcomePage from './components/WelcomePage';
import AdminAprovar from './components/AdminAprovar';
import VerifyEmailScreen from './components/VerifyEmailScreen';
import HowItWorksPage from './components/HowItWorksPage';
import CookieConsent from './components/CookieConsent';
import MissionsPage from './components/MissionsPage';
import AcademyPage from './components/AcademyPage';
import SimulatorPage from './components/SimulatorPage';
import BlogPage from './components/BlogPage';
import ForBrandsPage from './components/ForBrandsPage';
import ForCreatorsPage from './components/ForCreatorsPage';
import DiscoverPage from './components/DiscoverPage';
import InvestorPage from './components/InvestorPage';
import LegalPage from './components/LegalPage';
import PricingPage from './components/PricingPage';
import SupportChat from './components/SupportChat';
import { translations } from './translations';
import { ReferralSystem } from './lib/referral';
import { BriefcaseIcon, ArrowLeftIcon, ShieldCheck } from './components/Icons';
import { MessageCircle, ShieldAlert, WifiOff } from 'lucide-react';

const AppContent = () => {
  const { profile, loading, connectionError, signIn, signOut } = useAuth();
  const [view, setView] = useState<AppView>('landing');
  const [pendingEmail, setPendingEmail] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [language] = useState<'pt' | 'en'>('pt');
  
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    ReferralSystem.captureFromUrl();
    if (loading) return;
    
    if (profile) {
      if (profile.isVetted && (view === 'landing' || view === 'login' || view === 'invitation')) {
        setView('dashboard');
      } else if (!profile.isVetted && view === 'dashboard') {
        setView('validation');
      }
    } else {
      const restricted: AppView[] = ['dashboard', 'validation', 'welcome', 'admin-approval'];
      if (restricted.includes(view)) setView('landing');
    }
  }, [profile, loading, view]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err: any) {
      setLoginError(err.message || "Credenciais Alpha inválidas.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-2 border-[#C9A961]/20 border-t-[#C9A961] rounded-full animate-spin mb-6"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A961]">Autenticando Terminal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* Alerta de Desconexão com o Banco de Dados */}
      {connectionError && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-red-600 text-white p-2 text-center flex items-center justify-center gap-3 animate-fade-in shadow-2xl">
           <WifiOff size={16} />
           <span className="text-[10px] font-black uppercase tracking-widest">Aviso: Terminal de Banco de Dados Offline. Algumas funções podem falhar.</span>
        </div>
      )}

      {(() => {
        if (view === 'dashboard' && profile) return <Dashboard user={profile} onLogout={signOut} />;
        if (view === 'welcome' && profile) return <WelcomePage userName={profile.name} onContinue={() => setView('dashboard')} />;
        if (view === 'validation' && profile) return <ValidationPage userName={profile.name} userEmail={profile.email} onSelectFree={() => setView('dashboard')} onBack={() => setView('landing')} />;
        if (view === 'admin-approval') return <AdminAprovar onBack={() => setView('dashboard')} />;
        
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
          case 'missions': return <MissionsPage onBack={() => setView('landing')} />;
          case 'academy': return <AcademyPage onBack={() => setView('landing')} userIsLoggedIn={!!profile} onRestrictedAction={() => setView('login')} t={t} />;
          case 'thank-you':
            return (
              <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="max-w-xl w-full bg-thedeal-card border border-thedeal-gold/30 rounded-[3rem] p-10 md:p-16 space-y-10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
                   <div className="w-24 h-24 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto animate-subtle-pulse border border-thedeal-gold/20">
                      <ShieldCheck size={48} className="text-thedeal-gold" />
                   </div>
                   <div className="space-y-6 text-center">
                      <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                        SOLICITAÇÃO <br/><span className="text-thedeal-gold">REGISTRADA.</span>
                      </h1>
                      <p className="text-thedeal-gray400 text-lg font-medium leading-relaxed">
                        Nossa inteligência está auditando seu perfil. Retornaremos via terminal seguro em até 48h.
                      </p>
                      
                      <div className="pt-4 flex flex-col items-center gap-4">
                        <a 
                          href="https://chat.whatsapp.com/LtU8Bqsn7VQ6taTdflImTO" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 bg-[#25D366] text-white font-black px-10 py-5 rounded-2xl text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 w-full"
                        >
                          <MessageCircle size={20} fill="currentColor" />
                          Entrar no Hub WhatsApp
                        </a>
                      </div>
                   </div>
                   <div className="pt-8 border-t border-white/5 text-center">
                      <button onClick={() => setView('landing')} className="bg-white/5 hover:bg-white/10 text-white font-black px-12 py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all border border-white/10">Voltar ao Terminal Principal</button>
                   </div>
                </div>
              </div>
            );

          case 'simulator':
            return (
              <div className="min-h-screen bg-black text-left">
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
                  <SimulatorPage userIsLoggedIn={!!profile} onRestrictedAction={() => setView('login')} />
                </div>
              </div>
            );

          case 'discover': return <DiscoverPage onBack={() => setView('landing')} onSignup={() => setView('invitation')} />;
          case 'investor': return <InvestorPage onBack={() => setView('landing')} />;
          case 'for-brands': return <ForBrandsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;
          case 'for-creators': return <ForCreatorsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} onGoToDiscover={() => setView('discover')} />;
          case 'blog': return <BlogPage posts={[]} onViewArticle={() => {}} onBack={() => setView('landing')} />;
          case 'privacy': return <LegalPage title="Segurança & Dados" content={<p>O processamento de dados na rede THE DEAL segue protocolos de criptografia Alpha v3.0.</p>} onBack={() => setView('landing')} />;
          case 'terms': return <LegalPage title="Normas de Conduta Alpha" content={<p>O ingresso na rede implica na aceitação dos termos de performance e integridade contratual.</p>} onBack={() => setView('landing')} />;
          case 'verify-email': return <VerifyEmailScreen email={pendingEmail} onVerified={() => setView('welcome')} onBack={() => setView('invitation')} />;
          case 'login': return <LoginScreen onLogin={handleLogin} onStartSignup={() => setView('invitation')} onBackToLanding={() => setView('landing')} onForgotPassword={() => {}} error={loginError} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} t={t} />;
          case 'invitation': return <InvitationPage onBack={() => setView('landing')} t={t} language={language} toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} onSignupSuccess={() => setView('thank-you')} />;
          default: return <LandingPage onGoToDemo={() => setView('login')} onGoToSignup={() => setView('invitation')} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} onGoToForBrands={() => setView('for-brands')} onGoToForCreators={() => setView('for-creators')} onGoToHowItWorks={() => setView('how-it-works')} onGoToHub={() => setView('landing')} onGoToBlog={() => setView('blog')} onGoToAcademy={() => setView('academy')} onGoToMissions={() => setView('missions')} onGoToInvestor={() => setView('investor')} onGoToSimulator={() => setView('simulator')} onGoToDiscover={() => setView('discover')} language={language} t={t} />;
        }
      })()}
      <SupportChat />
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
