
import React from 'react';
import { Home, Search, Calculator, Building2, Compass } from 'lucide-react';

interface FooterProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    userType?: string;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'landing', label: 'Início', icon: Home },
        { id: 'for-brands', label: 'Marcas', icon: Building2 },
        { id: 'simulator', label: 'Calculadora', icon: Calculator, primary: true },
        { id: 'for-creators', label: 'Criadores', icon: Search },
        { id: 'discover', label: 'Descubra', icon: Compass },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-4 pb-6 pointer-events-none">
            <nav className="w-full max-w-md h-18 bg-[#0D0D0D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'landing') window.scrollTo({top: 0, behavior: 'smooth'});
                          setActiveTab(item.id);
                        }}
                        className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full group ${
                            item.primary 
                              ? 'bg-thedeal-gold text-black -mt-8 w-14 h-14 rounded-2xl shadow-xl shadow-thedeal-gold/20' 
                              : activeTab === item.id 
                                ? 'text-thedeal-gold' 
                                : 'text-thedeal-gray600 hover:text-white'
                        }`}
                    >
                        <item.icon size={item.primary ? 28 : 20} strokeWidth={activeTab === item.id || item.primary ? 2.5 : 2} className="transition-transform group-active:scale-90" />
                        {!item.primary && (
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1`}>
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
