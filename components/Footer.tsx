
import React from 'react';
import { DashboardTab, UserType } from '../types';
import { UserIcon, LayoutGridIcon, ZapIcon, Calculator, Compass } from 'lucide-react';

interface FooterProps {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
    userType: UserType;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
    const navItems: { tab: DashboardTab; label: string; icon: any; isCenter?: boolean }[] = [
        { tab: 'feed', label: 'Feed', icon: LayoutGridIcon },
        { tab: 'missoes', label: 'Missões', icon: ZapIcon },
        { tab: 'discover', label: 'Descubra', icon: Compass, isCenter: true },
        { tab: 'simulador', label: 'Meu Valor', icon: Calculator },
        { tab: 'perfil', label: 'Perfil', icon: UserIcon },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none">
            <nav className="w-full max-w-md h-18 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto px-2 relative">
                {navItems.map(item => (
                    item.isCenter ? (
                        <button
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className="relative -mt-10 flex flex-col items-center group transition-all"
                        >
                            <div className={`p-4 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded-2xl shadow-[0_10px_30px_rgba(201,169,97,0.3)] border-4 border-thedeal-bg transition-transform group-active:scale-90 ${activeTab === item.tab ? 'scale-110' : 'hover:scale-105'}`}>
                                <item.icon size={26} strokeWidth={2.5} className="text-black" />
                            </div>
                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] mt-2 transition-opacity ${activeTab === item.tab ? 'text-thedeal-gold opacity-100' : 'text-thedeal-gray600 opacity-80'}`}>
                                {item.label}
                            </span>
                        </button>
                    ) : (
                        <button
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 py-3 h-full group ${
                                activeTab === item.tab 
                                ? 'text-thedeal-gold scale-110' 
                                : 'text-thedeal-gray600 hover:text-white'
                            }`}
                        >
                            <item.icon size={20} strokeWidth={activeTab === item.tab ? 2.5 : 2} className="transition-transform group-active:scale-90" />
                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-opacity ${activeTab === item.tab ? 'opacity-100' : 'opacity-80'}`}>
                                {item.label}
                            </span>
                        </button>
                    )
                ))}
            </nav>
        </div>
    );
};

export default Footer;
