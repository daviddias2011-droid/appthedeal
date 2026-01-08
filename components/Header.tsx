
import React from 'react';
import { User, DashboardTab, UserType } from '../types';
import { LogoIcon } from './Icons';

interface HeaderProps {
  user: User;
  onNavigate: (tab: DashboardTab) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <header className="h-20 px-6 lg:px-10 border-b border-brand-border bg-brand-dark/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <button 
          onClick={() => onNavigate('feed')} 
          className="flex items-center gap-3 group transition-all"
        >
          <div className="bg-brand-primary p-1.5 rounded-lg shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
            <LogoIcon className="w-6 h-6 text-brand-dark" />
          </div>
          <span className="font-black tracking-[0.2em] text-sm uppercase text-white group-hover:text-brand-primary transition-colors">
            THE DEAL
          </span>
        </button>
        
        <nav className="hidden xl:flex items-center gap-6">
          <button onClick={() => onNavigate('feed')} className="text-[10px] font-black uppercase tracking-widest text-white hover:text-brand-primary transition-colors">Dashboard</button>
          <button onClick={() => onNavigate('discover')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">Descubra</button>
          <button onClick={() => onNavigate('deals')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">Deals</button>
          <button onClick={() => onNavigate('clubalpha')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">ClubAlpha</button>
          
          {user.type === UserType.Brand ? (
            <>
                <button onClick={() => onNavigate('presenca_vip')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">Mapa VIP</button>
                <button onClick={() => onNavigate('pagamentos')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">Pagamentos</button>
            </>
          ) : (
            <>
                <button onClick={() => onNavigate('roi')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">ROI Tracker</button>
                <button onClick={() => onNavigate('carteira')} className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:text-white transition-colors">Carteira</button>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button 
            onClick={() => onNavigate('mensagens')}
            className="p-2 text-brand-text-secondary hover:text-brand-primary transition-colors relative"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-dark"></span>
        </button>

        <div className="w-px h-6 bg-brand-border mx-1"></div>

        <button 
          onClick={() => onNavigate('perfil')}
          className="flex items-center gap-3 pl-2 group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">{user.name}</p>
            <p className="text-[8px] font-bold text-brand-primary uppercase tracking-widest mt-1">
                {user.type === UserType.Admin ? 'Master Access' : user.isVetted ? 'Membro Vetted' : 'Acesso Beta'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl border border-brand-border bg-brand-gray overflow-hidden group-hover:border-brand-primary transition-colors flex items-center justify-center shadow-lg">
            {user.logoUrl ? (
              <img src={user.logoUrl} className="w-full h-full object-cover" alt={user.name} />
            ) : (
              <span className="text-xs font-black text-brand-primary">{user.name.charAt(0)}</span>
            )}
          </div>
        </button>
        
        <button 
            onClick={onLogout}
            className="p-2 text-brand-text-secondary hover:text-red-500 transition-colors"
            title="Sair"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
