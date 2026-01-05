
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, UserType, AppView } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './src/components/LoginScreen';
import Dashboard from './src/components/Dashboard';
import LandingPage from './src/components/LandingPage';
import InvitationPage from './src/components/InvitationPage';
import ValidationPage from './src/components/ValidationPage';
import WelcomePage from './src/components/WelcomePage';
import AdminAprovar from './src/components/AdminAprovar';
import VerifyEmailScreen from './src/components/VerifyEmailScreen';
import HowItWorksPage from './src/components/HowItWorksPage';
import CookieConsent from './src/components/CookieConsent';
import MissionsPage from './src/components/MissionsPage';
import MissionDashboard from './src/components/MissionDashboard';
import AcademyPage from './src/components/AcademyPage';
import SimulatorPage from './src/components/SimulatorPage';
import BlogPage from './src/components/BlogPage';
import ForBrandsPage from './src/components/ForBrandsPage';
import ForCreatorsPage from './src/components/ForCreatorsPage';
import DiscoverPage from './src/components/DiscoverPage';
import InvestorPage from './src/components/InvestorPage';
import LegalPage from './src/components/LegalPage';
import PricingPage from './src/components/PricingPage';
import { translations } from './translations';
import { ReferralSystem } from './lib/referral';

const AppContent = () => {
  const { profile, loading, signIn, signOut } = useAuth();
  const [view, setView] = useState<AppView>('landing');
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const [missionCode, setMissionCode] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [language] = useState<'pt' | 'en'>('pt');
  
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    ReferralSystem.captureFromUrl();

    // Detectar código de missão na URL
    const params = new URLSearchParams(window.location.search);
    const missionParam = params.get('mission');
    if (missionParam) {
      setMissionCode(missionParam);
      setView('mission-dashboard');
    }

    if (loading) return;

    if (profile) {
      if (!profile.isEmailVerified && view !== 'verify-email' && view !== 'welcome') {
        setPendingEmail(profile.email);
        setView('verify-email');
        return;
      }

      if (!profile.isVetted && (view === 'landing' || view === 'login' || view === 'invitation')) {
        setView('validation');
      } else if (profile.isVetted && (view === 'landing' || view === 'login' || view === 'invitation')) {
        setView('dashboard');
      }
    } else {
      const restricted: AppView[] = ['dashboard', 'validation', 'welcome', 'admin-approval', 'verify-email'];
      if (restricted.includes(view)) {
        setView('landing');
      }
    }
  }, [profile, loading, view]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err: any) {
      setLoginError(err.message || "Credenciais inválidas.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-[#C9A961]/20 border-t-[#C9A961] rounded-full animate-spin mb-4"></div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A961]">Auditando Terminal...</p>
      </div>
    );
  }

  const renderView = () => {
    // Redirecionamentos de estado de perfil
    if (view === 'dashboard' && profile) return <Dashboard user={profile} onLogout={signOut} />;
    if (view === 'welcome' && profile) return <WelcomePage userName={profile.name} onContinue={() => setView('dashboard')} />;
    if (view === 'validation' && profile) return <ValidationPage userName={profile.name} userEmail={profile.email} onSelectFree={() => setView('dashboard')} onBack={() => setView('landing')} />;
    if (view === 'mission-dashboard') return <MissionDashboard activationCode={missionCode || undefined} onBack={() => setView('landing')} />;
    
    // Switch de Views Principais
    switch (view) {
      case 'landing':
        return <LandingPage 
          onGoToDemo={() => setView('login')} 
          onGoToSignup={() => setView('invitation')}
          onGoToPrivacy={() => setView('privacy')} 
          onGoToTerms={() => setView('terms')}
          onGoToForBrands={() => setView('for-brands')} 
          onGoToForCreators={() => setView('for-creators')}
          onGoToHowItWorks={() => setView('how-it-works')} 
          onGoToHub={() => setView('landing')}
          onGoToBlog={() => setView('blog')} 
          onGoToAcademy={() => setView('academy')}
          onGoToMissions={() => setView('missions')} 
          onGoToInvestor={() => setView('investor')}
          onGoToSimulator={() => setView('simulator')} 
          onGoToDiscover={() => setView('discover')}
          language={language} 
          t={t}
        />;
      
      case 'how-it-works':
        return <HowItWorksPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;
      
      case 'missions':
        return <MissionsPage onBack={() => setView('landing')} />;
      
      case 'academy':
        return <AcademyPage onBack={() => setView('landing')} t={t} />;

      case 'simulator':
        return (
          <div className="min-h-screen bg-black pt-20 px-6">
            <button onClick={() => setView('landing')} className="text-white flex items-center gap-2 mb-8 uppercase text-[10px] font-black">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Voltar
            </button>
            <SimulatorPage userIsLoggedIn={!!profile} onRestrictedAction={() => setView('login')} />
          </div>
        );

      case 'discover':
        return <DiscoverPage onBack={() => setView('landing')} onSignup={() => setView('invitation')} />;

      case 'investor':
        return <InvestorPage onBack={() => setView('landing')} />;

      case 'for-brands':
        return <ForBrandsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;

      case 'for-creators':
        return <ForCreatorsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;

      case 'blog':
        return <BlogPage posts={[]} onViewArticle={() => {}} onBack={() => setView('landing')} />;

      case 'privacy':
        return <LegalPage title="Política de Privacidade" content={<p>Conteúdo em auditoria...</p>} onBack={() => setView('landing')} />;

      case 'terms':
        return <LegalPage title="Termos de Uso" content={<p>Conteúdo em auditoria...</p>} onBack={() => setView('landing')} />;

      case 'verify-email':
        return <VerifyEmailScreen email={pendingEmail} onVerified={() => {
          // Após verificação, se usuário escolheu plano PRO, ir para oferta de checkout
          if (pendingPlan === 'pro') setView('signup-complete');
          else setView('welcome');
        }} onBack={() => setView('invitation')} />;
      
      case 'login':
        return <LoginScreen onLogin={handleLogin} onStartSignup={() => setView('invitation')} onBackToLanding={() => setView('landing')} onForgotPassword={() => {}} error={loginError} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} t={t} />;
      
      case 'invitation':
        return <InvitationPage onBack={() => setView('landing')} t={t} language={language} toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} onSignupSuccess={(email, plan) => { setPendingEmail(email); setPendingPlan(plan || null); setView('verify-email'); }} />;

      case 'signup-complete':
        return <div className="min-h-screen bg-black pt-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-white font-black text-3xl mb-4">Cadastro concluído</h2>
            <p className="text-thedeal-gray400 mb-6">Um e-mail de confirmação foi enviado para <strong className="text-white">{pendingEmail}</strong>.</p>
            {pendingPlan === 'pro' ? (
              <div className="space-y-4">
                <p className="text-thedeal-gray400">Você escolheu o Plano PRO. Complete a ativação com o checkout abaixo.</p>
                <button onClick={() => setView('pricing')} className="bg-thedeal-goldBright text-black font-black py-4 px-6 rounded-2xl">Ir para Checkout PRO</button>
                <button onClick={() => { setPendingPlan(null); setView('landing'); }} className="text-white/70 underline">Voltar à página inicial</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setView('landing')} className="bg-thedeal-goldBright text-black font-black py-4 px-6 rounded-2xl">Voltar à página inicial</button>
              </div>
            )}
          </div>
        </div>;
      
      case 'pricing':
        return <PricingPage onBack={() => setView('landing')} />;

      default:
        return <LandingPage onGoToDemo={() => setView('login')} onGoToSignup={() => setView('invitation')} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} onGoToForBrands={() => setView('for-brands')} onGoToForCreators={() => setView('for-creators')} onGoToHowItWorks={() => setView('how-it-works')} onGoToHub={() => setView('landing')} onGoToBlog={() => setView('blog')} onGoToAcademy={() => setView('academy')} onGoToMissions={() => setView('missions')} onGoToInvestor={() => setView('investor')} onGoToSimulator={() => setView('simulator')} onGoToDiscover={() => setView('discover')} language={language} t={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {renderView()}
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
