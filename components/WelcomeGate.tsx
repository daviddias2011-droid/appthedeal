
import React from 'react';
import { LogoIcon, LockIcon, InstagramIcon, TwitterIcon, YouTubeIcon, KwaiIcon, VideoIcon } from './Icons';
import { UserType } from '../types';

interface WelcomeGateProps {
    onComplete: (data: { userType: UserType }) => void;
    onSkipToLogin: () => void;
}

const WelcomeGate: React.FC<WelcomeGateProps> = ({ onComplete, onSkipToLogin }) => {
    const handleStart = (type: UserType) => {
        onComplete({ userType: type });
    };

    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] via-[#FFE082] to-[#B45309] animate-background-pan bg-[length:200%_auto]";

    return (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(244,180,0,0.12)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div className="max-w-xl w-full relative z-10 animate-fade-in text-center">
                <div className="mb-12">
                    <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-3 rounded-2xl w-fit mx-auto mb-4 shadow-2xl shadow-brand-primary/20">
                        <LogoIcon className="w-12 h-12 text-black" />
                    </div>
                    <div className="flex flex-col items-center mb-8">
                        <span className="text-2xl font-black font-display tracking-[0.2em] uppercase leading-none text-white">THE DEAL</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary mt-2">Negócios reais entre criadores e marcas.</span>
                    </div>
                    <h2 className="text-brand-text-secondary text-[10px] uppercase tracking-[0.4em] font-black opacity-60 mb-4">Acesso Restrito</h2>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tighter uppercase leading-[0.9] text-white mb-6">
                        MENOS PUBLI.<br/>
                        <span className={goldTextClass}>MAIS NEGÓCIOS.</span>
                    </h1>
                </div>

                <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <button 
                            onClick={() => handleStart(UserType.Brand)}
                            className="group p-10 bg-brand-gray border border-brand-border rounded-xl hover:border-brand-primary transition-all flex flex-col items-center justify-center text-center"
                        >
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Sou Marca</h3>
                            <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest mt-2 opacity-60">Foco em ROI</p>
                        </button>
                        <button 
                            onClick={() => handleStart(UserType.Creator)}
                            className="group p-10 bg-brand-gray border border-brand-border rounded-xl hover:border-brand-primary transition-all flex flex-col items-center justify-center text-center"
                        >
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Sou Criador</h3>
                            <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest mt-2 opacity-60">Foco em Conversão</p>
                        </button>
                    </div>
                    
                    <div className="pt-8 border-t border-brand-border/20">
                        <button 
                            onClick={onSkipToLogin}
                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary hover:text-white transition-colors group"
                        >
                            <LockIcon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            Já tenho acesso / Fazer Login
                        </button>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-10 w-full text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[9px] font-black uppercase tracking-widest text-brand-text-secondary">
                    <a href="https://instagram.com/thedealbrasil" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-1.5"><InstagramIcon className="w-3.5 h-3.5" /> INSTAGRAM</a>
                    <a href="https://tiktok.com/@thedealbr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-1.5"><VideoIcon className="w-3.5 h-3.5" /> TIKTOK</a>
                    <a href="https://k.kwai.com/u/@thedeal/7QyCvSQ7" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-1.5"><KwaiIcon className="w-3.5 h-3.5" /> KWAI</a>
                    <a href="https://youtube.com/@thedealbr?si=j2JbUJvt2xZxOAVG" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-1.5"><YouTubeIcon className="w-3.5 h-3.5" /> YOUTUBE</a>
                    <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center gap-1.5"><TwitterIcon className="w-3.5 h-3.5" /> X</a>
                </div>
                <p className="text-[8px] font-black text-brand-text-secondary uppercase tracking-[0.6em] opacity-30">
                    THE DEAL TODOS OS DIREITOS RESERVADOS
                </p>
            </footer>
        </div>
    );
};

export default WelcomeGate;
