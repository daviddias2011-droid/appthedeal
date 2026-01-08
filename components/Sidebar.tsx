
import React from 'react';
import { 
  Home, Search, Briefcase, MessageCircle, 
  Calculator, Building2, Lock, ShieldCheck, GraduationCap, Trophy,
  TrendingUp, Wallet, Users, Zap, Map, LogOut, Compass, Handshake
} from 'lucide-react';
import { DashboardTab, User, UserType } from '../types';

interface SidebarProps {
  activeTab?: DashboardTab;
  onNavigate?: (tab: DashboardTab) => void;
  user?: User;
  onLogout?: () => void;
  onGoToInvestor?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate, user, onLogout, onGoToInvestor }) => {
  const isAdmin = user?.type === UserType.Admin;

  const menuItems: { icon: any; label: string; tab: DashboardTab; badge?: number; locked?: boolean; adminOnly?: boolean; highlight?: boolean }[] = [
    { icon: ShieldCheck, label: 'Governança Master', tab: 'painel', adminOnly: true },
    { icon: Home, label: 'Dashboard', tab: 'feed' },
    { icon: Compass, label: 'Descubra', tab: 'discover' },
    { icon: Trophy, label: 'Objetivos', tab: 'missoes', badge: 1 },
    { icon: Zap, label: 'Acelerar Nível', tab: 'planos', highlight: true },
    { icon: Search, label: 'Explorar Acordos', tab: 'explorar', locked: user ? !user.isVetted && !isAdmin : true },
    { icon: Users, label: 'Rede de Membros', tab: 'criadores' },
    { icon: GraduationCap, label: 'Centro de Formação', tab: 'cursos' },
    { icon: Map, label: 'Mapa de Presença', tab: 'presenca_vip' },
    { icon: Briefcase, label: 'Contratos', tab: 'contratos' },
    { icon: TrendingUp, label: 'Analytics ROI', tab: 'roi' },
    { icon: Wallet, label: 'Carteira', tab: 'carteira' },
    { icon: MessageCircle, label: 'Mensagens', tab: 'mensagens', badge: 3 },
    { icon: Building2, label: 'Marcas', tab: 'empresas' },
    { icon: Calculator, label: 'Simulador', tab: 'simulador' },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
        {menuItems.filter(i => !i.adminOnly || isAdmin).map((item) => (
          <button
            key={item.tab}
            onClick={() => onNavigate?.(item.tab)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative ${
              activeTab === item.tab 
                ? 'bg-white/5 text-white font-bold border border-white/5' 
                : item.highlight ? 'text-thedeal-goldBright font-bold hover:bg-thedeal-gold/5' : 'text-thedeal-gray400 hover:text-thedeal-gold hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.tab ? 'text-thedeal-goldBright' : ''}`} />
            <span className="text-sm tracking-tight">{item.label}</span>
            {item.badge && <span className="ml-auto bg-thedeal-gold text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">{item.badge}</span>}
            {item.locked && !isAdmin && <Lock className="w-3 h-3 ml-auto opacity-30" />}
          </button>
        ))}

        <div className="h-px bg-thedeal-gray700/50 my-6"></div>

        <button 
          onClick={onGoToInvestor}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-thedeal-gold hover:bg-thedeal-gold/10 transition-all"
        >
          <Handshake className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-widest">Investidores</span>
        </button>
      </nav>

      <div className="pt-4 border-t border-thedeal-gray700/50">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
          <LogOut size={18} /> Sair do Terminal
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
