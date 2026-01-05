
import React from 'react';
import { ArrowLeftIcon, BriefcaseIcon } from './Icons';

interface LegalPageProps {
    title: string;
    content: React.ReactNode;
    onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content, onBack }) => {
    return (
        <div className="min-h-screen bg-brand-dark text-brand-text">
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

            <div className="max-w-4xl mx-auto py-12 px-6 pt-32">
                <div className="bg-brand-gray border border-brand-border rounded-lg p-8">
                    <h1 className="text-3xl font-bold font-display text-brand-primary mb-6">{title}</h1>
                    <div className="prose prose-invert max-w-none text-brand-text-secondary space-y-4">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
