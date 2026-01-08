
import React from 'react';
import { DashboardTab, UserType } from '../types';
import { User, Home, Search, MessageSquare, Plus, Briefcase } from 'lucide-react';

interface FooterProps {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
    userType: UserType;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab, userType }) => {
    const isBrand = userType === UserType.Brand;
    
    // FIX: Explicitly typed navItems to DashboardTab union
    const navItems: { tab: DashboardTab; label: string; icon: any; primary?: boolean }[] = [
        { tab: 'home', label: 'Home', icon: Home },
        { tab: 'my-deals', label: 'Meus Deals', icon: Briefcase },
        ...(isBrand 
            ? [{ tab: 'create-deal' as DashboardTab, label: 'Novo', icon: Plus, primary: true }] 
            : [{ tab: 'marketplace' as DashboardTab, label: 'Deals', icon: Search, primary: true }]),
        { tab: 'messages', label: 'Inbox', icon: MessageSquare },
        { tab: 'profile', label: 'Perfil', icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none md:hidden">
            <nav className="w-full max-w-md h-18 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                {navItems.map(item => (
                    <button
                        key={item.tab}
                        onClick={() => setActiveTab(item.tab)}
                        className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full group ${
                            item.primary 
                              ? 'bg-thedeal-gold text-black -mt-8 w-14 h-14 rounded-2xl shadow-xl shadow-thedeal-gold/20' 
                              : activeTab === item.tab 
                                ? 'text-thedeal-gold' 
                                : 'text-thedeal-gray600 hover:text-white'
                        }`}
                    >
                        <item.icon size={item.primary ? 28 : 20} strokeWidth={activeTab === item.tab || item.primary ? 2.5 : 2} className="transition-transform group-active:scale-90" />
                        {!item.primary && (
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${activeTab === item.tab ? 'opacity-100' : 'opacity-0'}`}>
                                {item.label}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Footer;
