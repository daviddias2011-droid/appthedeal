
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
import ProfilePage from './ProfilePage';
import MessagingPage from './MessagingPage';
import DealsPage from './DealsPage';
import CreatorsPage from './CreatorsPage';
import { MOCK_POSTS, USERS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { Briefcase, CheckCircle, Menu, X, Bell } from 'lucide-react';

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
  const [notifications, setNotifications] = useState(0);

  const currentUser = profile || user;

  useEffect(() => {
    // Sync notifications or updates from PHP backend
    const checkUpdates = async () => {
      try {
        const data = await api.get('/api/notificacoes.php');
        setNotifications(data.unread_count || 0);
      } catch (e) {
        console.warn("Analytics sync offline.");
      }
    };
    checkUpdates();
    const interval = setInterval(checkUpdates, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'painel':
        return <AdminDashboard adminUser={currentUser} allUsers={USERS} allDeals={[]} allApplications={[]} allTransactions={[]} onLogout={onLogout} onUpdateUser={() => {}} onDeleteUser={() => {}} onDeleteDeal={() => {}} onApproveApplication={() => {}} onRejectApplication={() => {}} onMarkAsWonka={() => {}} onAddTransaction={() => {}} onEnterUserView={() => {}} onGoHome={() => setActiveTab('feed')} language="pt" toggleLanguage={() => {}} theme="dark" toggleTheme={() => {}} t={{}} />;
      
      case 'feed':
        return (
          <div className="space-y-6 animate-fade-in px-4 pb-32 max-w-2xl mx-auto">
            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-thedeal-gray400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Status Alpha</h3>
                  <div className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                    {currentUser.isVetted ? 'Membro PRO' : 'Aspirante'}
                    {currentUser.isVetted && <CheckCircle className="w-5 h-5 text-thedeal-success" />}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">{currentUser.total_points || 0} PTS</p>
                </div>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-thedeal-gold to-thedeal-goldBright h-full transition-all duration-1000" style={{ width: `${Math.min((currentUser.total_points || 0) / 10 + 10, 100)}%` }}></div>
              </div>
            </div>
            <NewPostInput onPublish={(c) => setPosts([{ id: Date.now(), type: 'social', timestamp: 'Agora', content: c, stats: { likes: 0 }, author: { name: currentUser.name, avatar: currentUser.logoUrl || '', verified: currentUser.isVetted, badge: currentUser.type.toUpperCase() } }, ...posts])} />
            <div className="space-y-6">
              {posts.map(post => <PostCard key={post.id} post={post} isLocked={!currentUser.isVetted && post.type === 'deal'} onAction={() => setActiveTab('planos')} />)}
            </div>
          </div>
        );

      case 'explorar':
        return <DealsPage deals={[]} onViewDetails={() => {}} currentUserLocation={null} allUsers={[]} onAddDeal={() => {}} userType={currentUser.type} />;
      
      case 'discover':
        return <DiscoverPage onBack={() => setActiveTab('feed')} onSignup={() => setActiveTab('planos')} />;
      
      case 'missoes':
        return <MissionsPanel />;
      
      case 'planos':
        return <PricingPage onBack={() => setActiveTab('feed')} />;
      
      case 'cursos':
        return <KnowledgeHub onNavigateBack={() => setActiveTab('feed')} />;
      
      case 'simulador':
        return <SimulatorPage userIsLoggedIn={true} onRestrictedAction={() => {}} />;
      
      case 'mensagens':
        return <div className="h-[calc(100vh-12rem)] px-4 pb-20"><MessagingPage currentUser={currentUser} allUsers={USERS} messages={[]} onSendMessage={() => {}} activeConversationWith={null} onConversationSelect={() => {}} /></div>;

      case 'criadores':
        return <CreatorsPage creators={USERS} onViewProfile={() => setActiveTab('perfil')} currentUserLocation={null} />;

      case 'perfil':
        return (
          <div className="animate-fade-in py-6 space-y-8 px-4 pb-32 text-left max-w-4xl mx-auto">
             <ProfilePage 
                user={currentUser} 
                isCurrentUser={true} 
                currentUserType={currentUser.type} 
                portfolioItems={[]} 
                deals={[]} 
                onEditProfile={() => {}}
                onAddPortfolio={() => {}}
                onEditPortfolio={() => {}}
                onInviteToJob={() => {}}
                onViewDealDetails={() => {}}
                onSendMessage={() => setActiveTab('mensagens')}
             />
          </div>
        );
      
      default:
        return (
          <div className="p-20 text-center flex flex-col items-center gap-4 opacity-30">
            <Briefcase size={48} className="text-thedeal-gray600" />
            <p className="text-thedeal-gray600 uppercase font-black tracking-widest text-xs">Módulo Alpha em Sincronização.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans flex flex-col items-center w-full overflow-x-hidden relative">
      {/* App Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 p-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('feed')} className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg shadow-thedeal-gold/10 group-hover:scale-105 transition-transform">
                <Briefcase size={18} className="text-black" />
              </div>
              <h1 className="text-lg font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </button>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="p-2 text-thedeal-gray400 hover:text-white relative">
              <Bell size={20} />
              {notifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-thedeal-gold rounded-full border-2 border-thedeal-bg"></span>}
            </button>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-thedeal-gray400 hover:text-white bg-white/5 rounded-xl border border-white/10">
              <Menu size={24} />
            </button>
         </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
           <div className="absolute right-0 top-0 bottom-0 w-72 bg-thedeal-bg border-l border-thedeal-gray700 p-6 animate-float-in">
              <div className="flex justify-between items-center mb-8">
                <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Protocolo v3.0</p>
                <button onClick={() => setIsSidebarOpen(false)} className="text-thedeal-gray400 hover:text-white"><X size={20}/></button>
              </div>
              <Sidebar activeTab={activeTab} onNavigate={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} user={currentUser} onLogout={onLogout} />
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-6xl pt-24 min-h-screen">
        {renderTabContent()}
      </main>

      {/* Mobile-Friendly Navigation Bottom Bar */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} userType={currentUser.type} />
    </div>
  );
};

export default Dashboard;
