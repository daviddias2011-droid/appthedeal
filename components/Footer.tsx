
import React from 'react';
import { DashboardTab, UserType } from '../types';
import { UserIcon, LayoutGridIcon, ZapIcon, Calculator } from 'lucide-react';

interface FooterProps {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
    userType: UserType;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
    const navItems: { tab: DashboardTab; label: string; icon: any }[] = [
        { tab: 'feed', label: 'Feed', icon: LayoutGridIcon },
        { tab: 'missoes', label: 'Missões', icon: ZapIcon },
        { tab: 'simulador', label: 'Calculadora', icon: Calculator },
        { tab: 'perfil', label: 'Perfil', icon: UserIcon },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none">
            <nav className="w-full max-w-md h-18 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                {navItems.map(item => (
                    <button
                        key={item.tab}
                        onClick={() => setActiveTab(item.tab)}
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
    );
};

export default Footer;