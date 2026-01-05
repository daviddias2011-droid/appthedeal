import React from 'react';
import { User, TrendingUp, Sparkles, Star, ChevronRight } from 'lucide-react';
import { User as UserData } from '../types';

interface RightPanelProps {
  user?: UserData;
  onNavigate?: (view: any) => void;
  onRestrictedAction?: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ user, onNavigate, onRestrictedAction }) => {
  const suggestions = [
    { name: 'Marca de Café Premium', match: 94, niche: 'F&B', avatar: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Fintech Spark', match: 88, niche: 'Tech', avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Glow Wellness', match: 82, niche: 'Health', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop' },
  ];

  const handleAction = (action: () => void) => {
    if (!user) {
      onRestrictedAction?.();
    } else {
      action();
    }
  };

  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen fixed right-0 top-0 bg-thedeal-bg border-l border-thedeal-gray700 p-8 z-40 overflow-y-auto">
      {/* My Stats Card */}
      <div className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <TrendingUp className="w-16 h-16 text-thedeal-gold" />
        </div>
        
        <h3 className="text-thedeal-gray400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-thedeal-gold" fill="currentColor" />
          Minha Performance
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="text-white font-black text-2xl tracking-tighter leading-none">{user?.stats?.activeDeals || 0}</p>
            <p className="text-thedeal-gray400 text-[9px] font-black uppercase tracking-widest mt-1.5 opacity-60">Deals Ativos</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <p className="text-thedeal-goldBright font-black text-2xl tracking-tighter leading-none">{user?.stats?.matchScore || 0}%</p>
              <p className="text-thedeal-gray400 text-[9px] font-black uppercase tracking-widest mt-1.5 opacity-60">Match Score</p>
            </div>
            <div className="h-8 w-px bg-thedeal-gray700"></div>
            <div className="flex-1">
              <p className="text-white font-black text-2xl tracking-tighter leading-none">R$ {(user?.stats?.monthlyEarnings || 0) / 1000}K</p>
              <p className="text-thedeal-gray400 text-[9px] font-black uppercase tracking-widest mt-1.5 opacity-60">Este Mês</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => handleAction(() => onNavigate?.('simulador'))}
          className="w-full mt-8 border border-thedeal-gray700 hover:border-thedeal-gold text-white font-bold text-[10px] py-3 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2"
        >
          Projetar Ganhos
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Match Suggestions */}
      <div className="space-y-6">
        <h3 className="text-thedeal-gray400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 px-2">
          <Sparkles className="w-3.5 h-3.5 text-thedeal-gold" />
          Oportunidades Alpha
        </h3>
        
        <div className="space-y-3">
          {suggestions.map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-4 bg-thedeal-card/50 hover:bg-thedeal-card border border-thedeal-gray700/50 hover:border-thedeal-goldDim/30 rounded-2xl cursor-pointer transition-all group"
              onClick={() => handleAction(() => onNavigate?.('explorar'))}
            >
              <div className="w-11 h-11 rounded-xl bg-thedeal-gray700 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-black truncate uppercase tracking-tight leading-none group-hover:text-thedeal-gold transition-colors">{item.name}</p>
                <p className="text-thedeal-gray400 text-[10px] font-bold uppercase tracking-widest mt-1.5 opacity-60">{item.niche} · {item.match}% match</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => handleAction(() => onNavigate?.('empresas'))}
          className="w-full text-thedeal-gray400 hover:text-thedeal-gold text-[10px] font-black uppercase tracking-widest py-4 transition-colors border-t border-thedeal-gray700/30 flex items-center justify-center gap-2 mt-4"
        >
          Ver todas as empresas
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Network Pulse */}
      <div className="mt-auto pt-10">
        <div className="bg-gradient-to-br from-thedeal-gold/5 to-transparent border border-thedeal-goldDim/10 rounded-2xl p-5">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Rede Ativa</span>
           </div>
           <p className="text-[11px] text-thedeal-gray400 leading-relaxed font-bold uppercase opacity-80">
             127 membros online negociando deals agora.
           </p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;