
import React, { useState, useEffect } from 'react';
import { User, DashboardTab, UserType, Deal, Mission, Activity, DealStatus } from '../types';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MessagingPage from './MessagingPage';
import ProfilePage from './ProfilePage';
import DealsPage from './DealsPage';
import SettingsPage from './SettingsPage';
import AdminDashboard from './AdminDashboard';
import CreateDealWizard from './CreateDealWizard';
import DealDetailsPage from './DealDetailsPage';
import { 
  Briefcase, CheckCircle, Bell, Menu, X, TrendingUp, 
  Plus, ArrowRight, Clock, ShieldCheck, Zap, Star,
  DollarSign, MessageSquare, Search, MoreHorizontal, Settings as SettingsIcon, LogOut
} from 'lucide-react';
import { USERS } from '../constants';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Mock Data
  const missions: Mission[] = [
    { id: '1', title: 'Perfil 100% completo', points: 50, completed: true },
    { id: '2', title: 'Conectar Instagram', points: 30, completed: false },
    { id: '3', title: 'Fechar primeiro deal', points: 100, completed: false },
    { id: '4', title: 'Receber 5 avaliações positivas', points: 80, completed: false },
  ];

  const activities: Activity[] = [
    { id: 'a1', type: 'deal_paid', message: 'Deal #1234 foi pago. Dinheiro bloqueado.', timestamp: '2h atrás', icon: '💰' },
    { id: 'a2', type: 'proposal_received', message: '@marcaY enviou proposta de R$ 5.000', timestamp: '5h atrás', icon: '📄' },
    { id: 'a3', type: 'mission_completed', message: 'Você completou a missão: Perfil 100%', timestamp: '1 dia atrás', icon: '✅' },
  ];

  const recentDeals: Deal[] = [
    { 
      id: 'd1', 
      title: 'Publi Stories - @marcaX', 
      description: 'Divulgação estratégica de nova funcionalidade via stories sequenciais.',
      value: 3500, 
      status: 'pending_delivery', 
      brand: { name: 'Marca X', logoUrl: 'https://picsum.photos/seed/marcx/40/40' } 
    },
    { 
      id: 'd2', 
      title: 'Review Tech - Spark', 
      description: 'Análise técnica de gadget premium focado em produtividade.',
      value: 1200, 
      status: 'completed', 
      brand: { name: 'Spark', logoUrl: 'https://picsum.photos/seed/spark/40/40' } 
    },
  ];

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'active': return <span className="flex items-center gap-1.5 text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Pago e Ativo</span>;
      case 'pending_delivery': return <span className="flex items-center gap-1.5 text-yellow-500"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Aguardando Entrega</span>;
      case 'disputed': return <span className="flex items-center gap-1.5 text-red-500"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Em Disputa</span>;
      case 'completed': return <span className="flex items-center gap-1.5 text-blue-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Concluído</span>;
      case 'cancelled': return <span className="flex items-center gap-1.5 text-gray-500"><div className="w-1.5 h-1.5 rounded-full bg-gray-500" /> Cancelado</span>;
      default: return null;
    }
  };

  const renderHome = () => (
    <div className="space-y-10 animate-fade-in pb-32 max-w-6xl mx-auto px-4 text-left">
      {/* SECTION 1: QUICK ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-thedeal-card border border-thedeal-gray700 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
          <p className="text-4xl font-black text-white tracking-tighter">3</p>
          <p className="text-thedeal-gray400 text-xs font-bold uppercase tracking-widest mt-1">Deals em andamento</p>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-[10px] font-black bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full uppercase tracking-tighter border border-yellow-500/20">2 aguardando entrega</span>
            <button onClick={() => setActiveTab('my-deals')} className="text-white hover:text-thedeal-gold transition-colors font-black text-[10px] uppercase tracking-widest border-b border-white/20 pb-0.5">Ver Todos</button>
          </div>
        </div>

        <div className="bg-thedeal-card border border-thedeal-gray700 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
          <p className="text-4xl font-black text-white tracking-tighter">
            {user.type === UserType.Creator ? '5' : '12'}
          </p>
          <p className="text-thedeal-gray400 text-xs font-bold uppercase tracking-widest mt-1">
            {user.type === UserType.Creator ? 'Propostas Abertas' : 'Criadores Disponíveis'}
          </p>
          <div className="mt-8">
            <button 
              onClick={() => setActiveTab(user.type === UserType.Creator ? 'marketplace' : 'marketplace')} 
              className="bg-thedeal-gold text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-thedeal-gold/20"
            >
              Explorar Agora
            </button>
          </div>
        </div>

        <div className="bg-thedeal-card border border-thedeal-gray700 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
          <p className="text-4xl font-black text-thedeal-goldBright tracking-tighter">R$ 12.450</p>
          <p className="text-thedeal-gray400 text-xs font-bold uppercase tracking-widest mt-1">
            {user.type === UserType.Creator ? 'Ganhos do Mês' : 'Investimento do Mês'}
          </p>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-[10px] font-black text-thedeal-success uppercase">+34% vs mês passado</span>
            <button className="text-white hover:text-thedeal-gold transition-colors font-black text-[10px] uppercase tracking-widest border-b border-white/20 pb-0.5">Relatório</button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* SECTION 2: MISSIONS */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] px-2">Complete para Subir de Nível</h3>
          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 space-y-8 shadow-2xl">
            <div className="space-y-6">
              {missions.map(m => (
                <div key={m.id} className="flex items-center gap-4 group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${m.completed ? 'bg-thedeal-success border-thedeal-success' : 'border-thedeal-gray700 group-hover:border-thedeal-gold'}`}>
                    {m.completed && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-tight ${m.completed ? 'text-thedeal-gray600 line-through' : 'text-white'}`}>{m.title}</p>
                    {!m.completed && <p className="text-[9px] font-black text-thedeal-gold mt-0.5">+{m.points} PTS</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <div className="flex justify-between items-end mb-3">
                 <p className="text-[10px] font-black text-white uppercase tracking-widest">Nível 2: Aspirante</p>
                 <p className="text-[9px] font-bold text-thedeal-gray600 uppercase">180/500 PTS</p>
              </div>
              <div className="h-2 w-full bg-black rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-thedeal-gold to-thedeal-goldBright w-[36%] transition-all duration-1000 shadow-[0_0_10px_rgba(201,169,97,0.4)]"></div>
              </div>
              <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.2em] mt-4 text-center opacity-60">Faltam 320 pontos para PRO</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: RECENT DEALS */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] px-2">Deals Recentes</h3>
          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/40 text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Deal</th>
                    <th className="px-6 py-5">Valor</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentDeals.map(d => (
                    <tr key={d.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <img src={d.brand.logoUrl} className="w-8 h-8 rounded-lg object-cover border border-white/10" alt="" />
                          <p className="text-sm font-bold text-white uppercase tracking-tight">{d.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-black text-white">R$ {d.value.toLocaleString()}</td>
                      <td className="px-6 py-6">
                        <div className="text-[9px] font-black uppercase tracking-tighter">
                          {getStatusBadge(d.status)}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button 
                          onClick={() => { setSelectedDeal(d); setActiveTab('my-deals'); }}
                          className="bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all border border-white/5"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setActiveTab('my-deals')} className="w-full py-5 text-[9px] font-black uppercase text-thedeal-gray600 hover:text-thedeal-gold transition-colors bg-black/20 border-t border-white/5 tracking-[0.3em]">
              Ver Todos os Deals
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: ACTIVITY FEED */}
      <div className="space-y-6">
         <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] px-2">Últimas Atualizações</h3>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map(a => (
              <div key={a.id} className="flex gap-4 p-6 bg-thedeal-card border border-white/5 rounded-2xl hover:border-thedeal-gold/20 transition-all items-center shadow-lg group">
                 <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{a.icon}</div>
                 <div className="flex-1">
                   <p className="text-xs font-bold text-thedeal-gray100 leading-snug">{a.message}</p>
                   <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mt-1.5">{a.timestamp}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedDeal) {
      return <DealDetailsPage deal={selectedDeal} user={user} onBack={() => setSelectedDeal(null)} onApply={() => {}} />;
    }

    switch (activeTab) {
      case 'home': return renderHome();
      case 'marketplace': return <DealsPage deals={[]} onViewDetails={setSelectedDeal} currentUserLocation={null} allUsers={USERS} onAddDeal={() => {}} userType={user.type} />;
      case 'create-deal': return <CreateDealWizard onComplete={() => setActiveTab('home')} onCancel={() => setActiveTab('home')} brand={user} />;
      case 'messages': return <div className="h-[calc(100vh-12rem)] px-4"><MessagingPage currentUser={user} allUsers={USERS} messages={[]} onSendMessage={() => {}} activeConversationWith={null} onConversationSelect={() => {}} /></div>;
      case 'profile': return <div className="px-4"><ProfilePage user={user} isCurrentUser={true} currentUserType={user.type} portfolioItems={[]} deals={[]} onEditProfile={() => {}} onAddPortfolio={() => {}} onEditPortfolio={() => {}} onInviteToJob={() => {}} onViewDealDetails={() => {}} onSendMessage={() => {}} /></div>;
      case 'settings': return <SettingsPage user={user} onLogout={onLogout} />;
      default: return renderHome();
    }
  };

  const isAdmin = user.type === UserType.Admin;

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans flex flex-col items-center w-full overflow-x-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-50 bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 flex items-center justify-between px-6">
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Briefcase size={18} className="text-black" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
              <p className="text-[7px] md:text-[8px] font-bold uppercase text-thedeal-gold tracking-widest leading-tight">Onde influência vira contrato</p>
            </div>
         </div>
         
         <div className="flex items-center gap-2 sm:gap-6">
            <button className="p-2.5 text-thedeal-gray400 hover:text-white relative bg-white/5 rounded-xl border border-white/5">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-thedeal-gold rounded-full border-2 border-thedeal-bg"></span>
            </button>

            <div className="h-8 w-px bg-thedeal-gray700 mx-1 hidden md:block"></div>

            <button onClick={() => setActiveTab('profile')} className="flex items-center gap-3 group px-2 py-1 rounded-2xl hover:bg-white/5 transition-all">
               <div className="text-right hidden sm:block">
                 <p className="text-[10px] font-black text-white uppercase leading-none">{user.name}</p>
                 <p className="text-[8px] font-black text-thedeal-gold uppercase tracking-[0.2em] mt-1">{user.type === UserType.Creator ? 'Nível 2: Aspirante' : 'Marca Verificada'}</p>
               </div>
               <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 overflow-hidden group-hover:border-thedeal-gold/50 transition-all flex items-center justify-center shadow-inner">
                 {user.logoUrl ? <img src={user.logoUrl} className="w-full h-full object-cover" alt="" /> : <span className="text-xs font-black text-thedeal-gold">{user.name.charAt(0)}</span>}
               </div>
            </button>

            <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 text-thedeal-gray400 hover:text-white bg-white/5 rounded-xl border border-white/5">
              <Menu size={22} />
            </button>
         </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] animate-fade-in text-left">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
           <div className="absolute right-0 top-0 bottom-0 w-72 bg-thedeal-bg border-l border-thedeal-gray700 p-8 animate-float-in flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-10">
                <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-[0.4em]">Menu Operacional</p>
                <button onClick={() => setIsSidebarOpen(false)} className="text-thedeal-gray400 hover:text-white transition-colors"><X size={24}/></button>
              </div>
              <nav className="space-y-1.5 flex-1">
                {[
                  { id: 'home', label: 'Dashboard', icon: ShieldCheck },
                  { id: 'my-deals', label: 'Meus Deals', icon: Briefcase },
                  { id: 'marketplace', label: user.type === UserType.Creator ? 'Marketplace' : 'Explorar', icon: Search },
                  ...(user.type === UserType.Brand ? [{ id: 'create-deal', label: 'Criar Deal', icon: Plus }] : []),
                  { id: 'messages', label: 'Mensagens', icon: MessageSquare },
                  { id: 'profile', label: 'Perfil', icon: Star },
                  { id: 'settings', label: 'Configurações', icon: SettingsIcon }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); setSelectedDeal(null); }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border border-transparent ${activeTab === item.id ? 'bg-thedeal-gold text-black font-black shadow-lg shadow-thedeal-gold/20' : 'text-thedeal-gray400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </nav>
              <button onClick={onLogout} className="mt-auto py-5 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3">
                <LogOut size={16} /> Sair do Terminal
              </button>
           </div>
        </div>
      )}

      <main className="w-full pt-28 md:pt-32 min-h-screen">
        {renderContent()}
      </main>

      <Footer activeTab={activeTab as any} setActiveTab={(t) => { setActiveTab(t as any); setSelectedDeal(null); }} userType={user.type} />
    </div>
  );
};

export default Dashboard;
