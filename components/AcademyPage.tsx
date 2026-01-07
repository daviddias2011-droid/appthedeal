
import React from 'react';
import { ArrowLeft, Briefcase, Sparkles, GraduationCap } from 'lucide-react';

interface AcademyPageProps {
    onBack: () => void;
    t?: any;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-black text-[#F5F5F5] font-sans selection:bg-thedeal-gold selection:text-black animate-fade-in flex flex-col items-center justify-center">
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <Briefcase size={18} className="text-black" />
                            </div>
                            <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        </div>
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                    </div>
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
                      <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <div className="w-24 h-24 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-10 ring-4 ring-thedeal-gold/5 animate-subtle-pulse">
                    <GraduationCap className="text-thedeal-gold" size={48} />
                </div>
                
                <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-white">
                    CENTRO DE <br/><span className="text-thedeal-gold">FORMAÇÃO.</span>
                </h1>
                
                <div className="p-10 md:p-20 bg-thedeal-card border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold/40 to-transparent"></div>
                    <p className="text-xl md:text-3xl font-serif italic text-thedeal-gray400 leading-relaxed">
                        “Em breve: conteúdos práticos para quem fecha negócio de verdade.”
                    </p>
                </div>

                <div className="pt-10 flex flex-col items-center gap-4 opacity-40">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-thedeal-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocolo de Inteligência Alpha</span>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-10 w-full text-center opacity-20">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL ACADEMY • EXCLUSIVE ACCESS ONLY</p>
            </footer>
        </div>
    );
};

export default AcademyPage;
