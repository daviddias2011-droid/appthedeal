
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
import { translations } from './translations';
import { ReferralSystem } from './lib/referral';
import { BriefcaseIcon, ArrowLeftIcon, ShieldCheck } from './components/Icons';
import { MessageCircle } from 'lucide-react';

const AppContent = () => {
  const { profile, loading, signIn, signOut } = useAuth();
  const [view, setView] = useState<AppView>('landing');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [language] = useState<'pt' | 'en'>('pt');
  
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    ReferralSystem.captureFromUrl();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      setView('dashboard');
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
    if (view === 'dashboard' && profile) return <Dashboard user={profile} onLogout={signOut} />;
    if (view === 'welcome' && profile) return <WelcomePage userName={profile.name} onContinue={() => setView('dashboard')} />;
    if (view === 'validation' && profile) return <ValidationPage userName={profile.name} userEmail={profile.email} onSelectFree={() => setView('welcome')} onBack={() => setView('landing')} />;
    
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
      
      case 'missions':
        return <MissionsPage onBack={() => setView('landing')} onRequireAuth={() => setView('login')} />;
      
      case 'login':
        return <LoginScreen onLogin={handleLogin} onStartSignup={() => setView('invitation')} onBackToLanding={() => setView('landing')} onForgotPassword={() => {}} error={loginError} onGoToPrivacy={() => setView('privacy')} onGoToTerms={() => setView('terms')} t={t} />;
      
      case 'invitation':
        return <InvitationPage onBack={() => setView('landing')} t={t} language={language} toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} onSignupSuccess={() => setView('validation')} />;
      
      case 'pricing':
        return <PricingPage onBack={() => setView('landing')} />;

      case 'for-brands':
        return <ForBrandsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;

      case 'for-creators':
        return <ForCreatorsPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} onGoToDiscover={() => setView('discover')} />;

      case 'how-it-works':
        return <HowItWorksPage onBack={() => setView('landing')} onGoToSignup={() => setView('invitation')} />;

      case 'academy':
        return <AcademyPage onBack={() => setView('landing')} t={t} />;

      case 'simulator':
        return <SimulatorPage userIsLoggedIn={false} onRestrictedAction={() => setView('login')} />;

      case 'blog':
        return <BlogPage posts={[]} onViewArticle={() => {}} onBack={() => setView('landing')} />;

      case 'discover':
        return <DiscoverPage onBack={() => setView('landing')} onSignup={() => setView('invitation')} />;

      case 'investor':
        return <InvestorPage onBack={() => setView('landing')} />;

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
