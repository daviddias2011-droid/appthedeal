
import React, { useState, useEffect } from 'react';
import { User, DashboardTab, Post, UserType, Deal } from '../types';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PostCard from './PostCard';
import NewPostInput from './NewPostInput';
import AdminDashboard from './AdminDashboard';
import MissionsPanel from './MissionsPanel';
import SimulatorPage from './SimulatorPage';
import AIInsightsPage from './AIInsightsPage';
import KnowledgeHub from './KnowledgeHub';
import PricingPage from './PricingPage';
import DiscoverPage from './DiscoverPage';
import { MOCK_POSTS, USERS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, X, ShieldCheck, CheckCircle, Menu, Zap, LayoutGrid, Calculator, Sparkles, Lock } from 'lucide-react';
import DealsPage from './DealsPage';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const { profile, refreshProfile } = useAuth();
  const isAdmin = user.type === UserType.Admin;
  const [activeTab, setActiveTab] = useState<DashboardTab>(isAdmin ? 'painel' : 'missoes');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = profile || user;

  const ComingSoonOverlay = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
      <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mb-6 animate-subtle-pulse">
        <Lock className="text-thedeal-gold" size={32} />
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{title}</h3>
      <p className="text-thedeal-gray400 text-sm max-w-sm leading-relaxed uppercase font-bold tracking-widest">
        Funcionalidade disponível apenas para membros convidados do nível Alpha.
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'painel':
        return <AdminDashboard adminUser={currentUser} allUsers={USERS} allDeals={[]} allApplications={[]} allTransactions={[]} onLogout={onLogout} onUpdateUser={() => {}} onDeleteUser={() => {}} onDeleteDeal={() => {}} onApproveApplication={() => {}} onRejectApplication={() => {}} onMarkAsWonka={() => {}} onAddTransaction={() => {}} onEnterUserView={() => {}} onGoHome={() => setActiveTab('missoes')} language="pt" toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} t={{}} />;
      
      case 'feed':
        return (
          <div className="space-y-6 animate-fade-in px-4 pb-32">
             <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <h3 className="text-thedeal-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4">Vitrine Alpha</h3>
                <div className="space-y-4 opacity-50 blur-[2px] pointer-events-none select-none">
                  <PostCard post={posts[0]} isLocked={true} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                   <p className="text-white font-black uppercase text-[10px] tracking-[0.4em] bg-black/60 px-6 py-3 rounded-full border border-white/10">Feed em modo demonstração</p>
                </div>
             </div>
          </div>
        );

      case 'missoes':
        return (
          <div className="space-y-8 animate-fade-in px-4 pb-32">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Oportunidades <span className="text-thedeal-gold">PRO</span></h2>
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Onde os deals acontecem</p>
            </div>
            <DealsPage deals={[]} onViewDetails={() => {}} currentUserLocation={null} allUsers={[]} onAddDeal={() => {}} userType={currentUser.type} />
            {/* Mock do MVP */}
            <div className="space-y-4">
               {posts.filter(p => p.type === 'deal').map(dealPost => (
                 <PostCard key={dealPost.id} post={dealPost} onAction={() => setActiveTab('ai-assist')} />
               ))}
            </div>
          </div>
        );

      case 'ai-assist':
        return <div className="px-4 pb-32"><AIInsightsPage /></div>;

      case 'simulador':
        return <div className="px-4 pb-32"><SimulatorPage userIsLoggedIn={true} onRestrictedAction={() => {}} /></div>;

      case 'perfil':
        return (
          <div className="animate-fade-in py-6 space-y-8 px-4 pb-32">
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Identidade <span className="text-thedeal-gold">Alpha</span></h1>
            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 flex flex-col items-center shadow-2xl space-y-6">
              <img src={currentUser.logoUrl || `https://ui-avatars.com/api/?name=${currentUser.name}&background=C9A961&color=000`} className="w-32 h-32 rounded-3xl border-4 border-thedeal-gold/30 object-cover shadow-2xl" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{currentUser.name}</h2>
                <p className="text-thedeal-gold font-black uppercase text-xs tracking-widest opacity-80">Nível {currentUser.plan?.toUpperCase() || 'ASPIRANTE'}</p>
              </div>
            </div>
          </div>
        );

      // DESATIVADOS NO MVP
      case 'roi': return <ComingSoonOverlay title="Analytics de ROI" />;
      case 'presenca_vip': return <ComingSoonOverlay title="Mapa de Presença" />;
      case 'clubalpha': return <ComingSoonOverlay title="Rede Privada ClubAlpha" />;
      
      default: return <div className="p-20 text-center text-thedeal-gray600 uppercase font-black tracking-widest">Em Integração.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans flex flex-col items-center w-full overflow-x-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg">
              <Briefcase size={18} className="text-black" />
            </div>
            <h1 className="text-lg font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
         </div>
         <div className="flex items-center gap-3">
            {currentUser.plan === 'pro' && (
              <div className="hidden sm:flex items-center gap-2 bg-thedeal-gold/10 px-3 py-1 rounded-full border border-thedeal-gold/20">
                <Zap size={12} className="text-thedeal-gold" />
                <span className="text-[8px] font-black text-thedeal-gold uppercase tracking-widest">PRO ACTIVE</span>
              </div>
            )}
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-thedeal-gray400 hover:text-white bg-white/5 rounded-xl border border-white/10">
                <Menu size={24} />
            </button>
         </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
           <div className="absolute right-0 top-0 bottom-0 w-72 bg-thedeal-bg border-l border-thedeal-gray700 p-6 animate-float-in">
              <Sidebar activeTab={activeTab} onNavigate={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} user={currentUser} onLogout={onLogout} />
           </div>
        </div>
      )}

      <main className="w-full max-w-2xl pt-24 min-h-screen">
        {renderTabContent()}
      </main>

      {/* Footer Nav MVP */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none">
            <nav className="w-full max-w-md h-18 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                {[
                  { tab: 'missoes', label: 'Deals', icon: Briefcase },
                  { tab: 'ai-assist', label: 'AI Assist', icon: Sparkles },
                  { tab: 'simulador', label: 'Cachê', icon: Calculator },
                  { tab: 'perfil', label: 'Perfil', icon: ShieldCheck },
                ].map(item => (
                    <button
                        key={item.tab}
                        onClick={() => setActiveTab(item.tab as DashboardTab)}
                        className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 py-3 h-full group ${
                            activeTab === item.tab 
                            ? 'text-thedeal-gold scale-110' 
                            : 'text-thedeal-gray600 hover:text-white'
                        }`}
                    >
                        <item.icon size={22} strokeWidth={activeTab === item.tab ? 2.5 : 2} className="transition-transform group-active:scale-90" />
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-opacity ${activeTab === item.tab ? 'opacity-100' : 'opacity-0'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    </div>
  );
};

export default Dashboard;
