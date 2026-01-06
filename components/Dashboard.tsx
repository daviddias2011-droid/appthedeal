
import React, { useState, useEffect } from 'react';
import { User, DashboardTab, Post, UserType } from '../types';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PostCard from './PostCard';
import NewPostInput from './NewPostInput';
import AdminDashboard from './AdminDashboard';
import MissionsPanel from './MissionsPanel';
import SimulatorPage from './SimulatorPage';
import KnowledgeHub from './KnowledgeHub';
import PricingPage from './PricingPage';
import DiscoverPage from './DiscoverPage';
import BlacklistPage from './Blacklist';
import { MOCK_POSTS, USERS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, X, ShieldCheck, AlertTriangle, RefreshCw, CheckCircle, Menu } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const { profile, refreshProfile } = useAuth();
  const isAdmin = user.type === UserType.Admin;
  const [activeTab, setActiveTab] = useState<DashboardTab>(isAdmin ? 'painel' : 'feed');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = profile || user;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'painel':
        return <AdminDashboard adminUser={currentUser} allUsers={USERS} allDeals={[]} allApplications={[]} allTransactions={[]} onLogout={onLogout} onUpdateUser={() => {}} onDeleteUser={() => {}} onDeleteDeal={() => {}} onApproveApplication={() => {}} onRejectApplication={() => {}} onMarkAsWonka={() => {}} onAddTransaction={() => {}} onEnterUserView={() => {}} onGoHome={() => setActiveTab('feed')} language="pt" toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} t={{}} />;
      case 'feed':
        return (
          <div className="space-y-6 animate-fade-in px-4 pb-32">
            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-thedeal-gray400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Status Alpha</h3>
                  <div className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                    {currentUser.isVetted ? 'Membro PRO' : 'Aspirante'}
                    {currentUser.isVetted && <CheckCircle className="w-5 h-5 text-thedeal-success" />}
                  </div>
                </div>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-thedeal-gold to-thedeal-goldBright h-full transition-all duration-1000" style={{ width: `${Math.min((currentUser.total_points || 0) / 10 + 10, 100)}%` }}></div>
              </div>
            </div>
            <NewPostInput onPublish={(c) => setPosts([{ id: Date.now(), type: 'social', timestamp: 'Agora', content: c, stats: { likes: 0 }, author: { name: currentUser.name, avatar: currentUser.logoUrl || '', verified: currentUser.isVetted, badge: currentUser.type.toUpperCase() } }, ...posts])} />
            {posts.map(post => <PostCard key={post.id} post={post} isLocked={!currentUser.isVetted && post.type === 'deal'} onAction={() => setActiveTab('planos')} />)}
          </div>
        );
      case 'discover': return <DiscoverPage onBack={() => setActiveTab('feed')} onSignup={() => setActiveTab('planos')} />;
      case 'blacklist': return <BlacklistPage onBack={() => setActiveTab('feed')} />;
      case 'missoes': return <MissionsPanel />;
      case 'planos': return <PricingPage onBack={() => setActiveTab('feed')} />;
      case 'cursos': return <KnowledgeHub onNavigateBack={() => setActiveTab('feed')} />;
      case 'simulador': return <SimulatorPage userIsLoggedIn={true} onRestrictedAction={() => {}} />;
      case 'perfil':
        return (
          <div className="animate-fade-in py-6 space-y-8 px-4 pb-32">
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Meu <span className="text-thedeal-gold">Espaço</span></h1>
            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 flex flex-col items-center shadow-2xl space-y-6">
              <img src={currentUser.logoUrl || `https://ui-avatars.com/api/?name=${currentUser.name}&background=C9A961&color=000`} className="w-32 h-32 rounded-3xl border-4 border-thedeal-gold/30 object-cover shadow-2xl" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{currentUser.name}</h2>
                <p className="text-thedeal-gold font-black uppercase text-xs tracking-widest opacity-80">@{currentUser.username}</p>
                <div className="flex gap-3 pt-6 justify-center">
                  <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10">Editar</button>
                  <button onClick={onLogout} className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500/20">Sair</button>
                </div>
              </div>
            </div>
          </div>
        );
      default: return <div className="p-20 text-center text-thedeal-gray600 uppercase font-black tracking-widest">Em Integração.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans flex flex-col items-center w-full overflow-x-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
              <Briefcase size={18} className="text-black" />
            </div>
            <h1 className="text-lg font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
         </div>
         <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-thedeal-gray400 hover:text-white bg-white/5 rounded-xl border border-white/10">
            <Menu size={24} />
         </button>
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

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} userType={currentUser.type} />
    </div>
  );
};

export default Dashboard;
