
import React from 'react';
import { 
  Home, Search, Briefcase, MessageCircle, 
  Calculator, Building2, Lock, ShieldCheck, GraduationCap, Trophy,
  TrendingUp, Wallet, Users, Zap, Map, LogOut, Handshake, Sparkles
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

  const menuItems: { icon: any; label: string; tab: DashboardTab; badge?: string; locked?: boolean; adminOnly?: boolean; highlight?: boolean; soon?: boolean }[] = [
    { icon: ShieldCheck, label: 'Painel Admin', tab: 'painel', adminOnly: true },
    { icon: Briefcase, label: 'Missões & Deals', tab: 'missoes', highlight: true },
    { icon: Sparkles, label: 'AI Pitch Assist', tab: 'ai-assist' },
    { icon: Calculator, label: 'Simulador Pro', tab: 'simulador' },
    { icon: Home, label: 'Vitrine (Feed)', tab: 'feed' },
    { icon: GraduationCap, label: 'Academia', tab: 'cursos', soon: true },
    { icon: TrendingUp, label: 'ROI Analytics', tab: 'roi', locked: true },
    { icon: Map, label: 'Mapa Presença', tab: 'presenca_vip', locked: true },
    { icon: Crown, label: 'ClubAlpha', tab: 'clubalpha', locked: true },
    { icon: Wallet, label: 'Minha Carteira', tab: 'carteira' },
    { icon: MessageCircle, label: 'Chat Direto', tab: 'mensagens', soon: true },
  ];

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="mb-6 px-4 pt-2">
        <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em]">Terminal de Negócios</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
        {menuItems.filter(i => !i.adminOnly || isAdmin).map((item) => (
          <button
            key={item.tab}
            onClick={() => !item.locked && onNavigate?.(item.tab)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
              activeTab === item.tab 
                ? 'bg-white/5 text-white font-bold border border-white/5 shadow-lg' 
                : item.highlight ? 'text-thedeal-goldBright font-bold hover:bg-thedeal-gold/5' : 'text-thedeal-gray400 hover:text-thedeal-gold hover:bg-white/5'
            } ${item.locked ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.tab ? 'text-thedeal-goldBright' : ''}`} />
            <span className="text-sm tracking-tight">{item.label}</span>
            
            {item.locked && <Lock className="w-3 h-3 ml-auto opacity-50" />}
            {item.soon && <span className="ml-auto text-[7px] font-black uppercase text-thedeal-gold border border-thedeal-goldDim/30 px-1.5 py-0.5 rounded-sm">SOON</span>}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-thedeal-gray700/50">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all">
          <LogOut size={18} /> Encerrar Sessão
        </button>
      </div>
    </div>
  );
};

const Crown = ({ className, size }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
);

export default Sidebar;
