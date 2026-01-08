
import React from 'react';
import { DashboardTab, UserType } from '../types';
import { Home, Building2, Compass, Users, Zap } from 'lucide-react';

interface FooterProps {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
    userType: UserType;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
    const navItems: { tab: DashboardTab; label: string; icon: any; isSpecial?: boolean }[] = [
        { tab: 'feed', label: 'HOME', icon: Home },
        { tab: 'empresas', label: 'MARCAS', icon: Building2 },
        { tab: 'discover', label: 'DESCUBRA', icon: Compass, isSpecial: true },
        { tab: 'criadores', label: 'CRIADORES', icon: Users },
        { tab: 'planos', label: 'PREÇOS', icon: Zap },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none">
            <nav className="w-full max-w-lg h-20 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto px-2">
                {navItems.map(item => (
                    <button
                        key={item.tab}
                        onClick={() => setActiveTab(item.tab)}
                        className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full group relative ${
                            activeTab === item.tab 
                            ? (item.isSpecial ? 'text-thedeal-goldBright scale-110' : 'text-white scale-110') 
                            : (item.isSpecial ? 'text-thedeal-goldDim hover:text-thedeal-goldBright' : 'text-thedeal-gray600 hover:text-thedeal-gray400')
                        }`}
                    >
                        {item.isSpecial ? (
                            <div className="flex flex-col items-center justify-center -mt-10 bg-[#0D0D0D] p-3 rounded-full border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-thedeal-gold/20 to-transparent opacity-50"></div>
                                <div className={`p-3.5 rounded-full transition-all duration-500 relative z-10 ${activeTab === item.tab ? 'bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-thedeal-goldBright'}`}>
                                    <item.icon size={26} strokeWidth={2.5} className={activeTab === item.tab ? '' : 'animate-subtle-pulse'} />
                                </div>
                                <span className={`text-[7px] font-black uppercase tracking-[0.25em] mt-2 relative z-10 ${activeTab === item.tab ? 'text-thedeal-goldBright' : 'text-thedeal-goldDim'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ) : (
                            <>
                                <item.icon size={20} strokeWidth={activeTab === item.tab ? 2.5 : 2} className="transition-transform group-active:scale-90" />
                                <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-opacity ${activeTab === item.tab ? 'opacity-100' : 'opacity-60'}`}>
                                    {item.label}
                                </span>
                                {activeTab === item.tab && (
                                    <span className="absolute bottom-2 w-1.5 h-1.5 bg-thedeal-gold rounded-full shadow-[0_0_8px_rgba(201,169,97,0.8)]"></span>
                                )}
                            </>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Footer;
