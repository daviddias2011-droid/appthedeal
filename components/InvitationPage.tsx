
import React from 'react';
import { ArrowLeftIcon, BriefcaseIcon } from './Icons';
import { Language } from '../translations';
import SignupForm from './SignupForm';

interface InvitationPageProps {
    onBack: () => void;
    t: any;
    language: Language;
    toggleLanguage: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    onSignupSuccess?: (email: string) => void;
}

const InvitationPage: React.FC<InvitationPageProps> = ({ onBack, onSignupSuccess }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-black text-white selection:bg-brand-primary selection:text-black font-sans max-w-full overflow-x-hidden">
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
                    
                    <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
                        Cancelar
                    </button>
                </div>
            </nav>

            <main className="flex-1 pt-24 md:pt-32 pb-16 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
                   <h1 className="text-3xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4">Junte-se à <span className="text-thedeal-gold">Elite.</span></h1>
                   <p className="text-thedeal-gray400 text-sm md:text-lg font-medium uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-60">Rede social privada • Curadoria extrema</p>
                </div>
                
                <div className="max-w-full">
                  <SignupForm onBack={onBack} onSuccess={(email) => onSignupSuccess?.(email)} />
                </div>
            </main>

            <footer className="py-8 md:py-12 border-t border-white/5 flex flex-col items-center justify-center px-4 md:px-6 opacity-30">
                <p className="text-[7px] md:text-[8px] font-black text-thedeal-gray700 uppercase tracking-[0.4em] md:tracking-[0.5em] text-center">Protocolo de Expansão Privada • v3.0</p>
            </footer>
        </div>
    );
};

export default InvitationPage;
