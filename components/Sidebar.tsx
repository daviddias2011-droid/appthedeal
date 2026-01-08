
import React from 'react';
import { 
  Home, Search, Briefcase, MessageSquare, 
  Calculator, Building2, Settings, Lock, ShieldCheck, GraduationCap, Trophy,
  TrendingUp, Wallet, Users, Zap, Map, LogOut, Handshake, Compass, Plus,
  // FIX: Renamed User icon to LucideUser to avoid collision with User type
  User as LucideUser
} from 'lucide-react';
import { DashboardTab, User, UserType } from '../types';

interface SidebarProps {
  activeTab?: DashboardTab;
  onNavigate?: (tab: DashboardTab) => void;
  user?: User;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate, user, onLogout }) => {
  const isAdmin = user?.type === UserType.Admin;
  const isBrand = user?.type === UserType.Brand;

  const menuItems: { icon: any; label: string; tab: DashboardTab; adminOnly?: boolean; brandOnly?: boolean; highlight?: boolean; locked?: boolean }[] = [
    { icon: Home, label: 'Home Dashboard', tab: 'home' },
    { icon: Briefcase, label: 'Meus Deals', tab: 'my-deals' },
    { icon: Search, label: isBrand ? 'Criadores' : 'Marketplace', tab: 'marketplace' },
    // FIX: Explicitly cast tab values to DashboardTab to ensure type safety
    ...(isBrand ? [{ icon: Plus, label: 'Criar Deal', tab: 'create-deal' as DashboardTab, highlight: true }] : []),
    { icon: MessageSquare, label: 'Mensagens', tab: 'messages' },
    // FIX: Used LucideUser renamed icon
    { icon: LucideUser, label: 'Perfil', tab: 'profile' },
    { icon: Settings, label: 'Configurações', tab: 'settings' },
  ];

  return (
    <div className="flex flex-col h-full space-y-2 text-left">
      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
        <p className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-[0.4em] mb-6 ml-4">Geral</p>
        
        {menuItems.filter(i => (!i.adminOnly || isAdmin) && (!i.brandOnly || isBrand)).map((item) => (
          <button
            key={item.tab}
            onClick={() => onNavigate?.(item.tab)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group border border-transparent ${
              activeTab === item.tab 
                ? 'bg-white/5 text-white font-bold border-white/5' 
                : item.highlight ? 'text-thedeal-gold font-bold hover:bg-thedeal-gold/5' : 'text-thedeal-gray400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={18} className={`${activeTab === item.tab ? 'text-thedeal-gold' : ''}`} />
            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            {item.locked && !isAdmin && <Lock size={12} className="ml-auto opacity-30" />}
          </button>
        ))}

        <div className="h-px bg-thedeal-gray700/50 my-6 mx-4"></div>
        <p className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-[0.4em] mb-4 ml-4">Hub Alpha</p>
        
        <button 
          onClick={() => alert('Sincronizando com Alpha Club...')}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-thedeal-gold hover:bg-thedeal-gold/5 transition-all group"
        >
          <Zap size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Club Elite</span>
        </button>
      </nav>

      <div className="pt-6 border-t border-thedeal-gray700/50">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-2xl transition-all uppercase tracking-widest">
          <LogOut size={18} /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
