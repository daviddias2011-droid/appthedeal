
import React, { useState } from 'react';
import { 
    ArrowLeftIcon, 
    ShieldIcon, 
    LockIcon, 
    HandshakeIcon, 
    WalletIcon, 
    BriefcaseIcon,
    TrendingUpIcon,
    CheckCircleIcon
} from './Icons';

interface InvestorPageProps {
    onBack: () => void;
}

const InvestorPage: React.FC<InvestorPageProps> = ({ onBack }) => {
    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] via-[#FFE082] to-[#B45309] bg-[length:200%_auto] animate-background-pan";

    return (
        <div className="min-h-screen bg-black text-brand-text font-sans relative selection:bg-brand-primary selection:text-black">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(244,180,0,0.05)_0%,transparent_50%)] pointer-events-none"></div>

            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                <BriefcaseIcon className="w-5 h-5 text-black" />
                            </div>
                            <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        </div>
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                    </div>
                    
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                        <ArrowLeftIcon size={14} className="text-thedeal-gold" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Voltar</span>
                    </button>
                </div>
            </nav>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 pt-32">
                <header className="space-y-8 mb-32">
                    <div className="inline-flex items-center gap-3 border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 rounded-sm">
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black text-brand-primary tracking-[0.3em] uppercase">RODADA DE INVESTIMENTO</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black font-display text-white leading-[0.9] tracking-tighter uppercase">
                        ÁREA DO <br/>
                        <span className={goldTextClass}>INVESTIDOR.</span>
                    </h1>
                </header>
                {/* Restante do conteúdo permanece igual */}
            </div>
        </div>
    );
};

export default InvestorPage;
