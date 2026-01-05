
import React from 'react';
import { ArrowLeft, Shield, TrendingUp, Globe, Briefcase, Award, Zap, Handshake } from 'lucide-react';
import { BriefcaseIcon } from './Icons';

interface InvestorPageProps {
    onBack: () => void;
}

const InvestorPage: React.FC<InvestorPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-thedeal-gold selection:text-black">
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                <BriefcaseIcon size={18} className="text-black" />
                            </div>
                            <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        </div>
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                    </div>
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white">
                        <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-gold/20 mb-8">
                        <TrendingUp className="w-4 h-4 text-thedeal-gold" />
                        <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Rodada Alpha 2025</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black font-display tracking-tighter mb-8 leading-[0.9] uppercase">
                        O PRÓXIMO <br/> <span className="text-thedeal-gold">GRANDE DEAL.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-thedeal-gray400 max-w-2xl mx-auto font-light leading-relaxed">
                        Investindo na infraestrutura que formaliza a Creator Economy. Onde a atenção vira ativo financeiro real.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-12 mb-32">
                    <div className="p-10 bg-thedeal-card border border-white/5 rounded-[3rem] space-y-6">
                        <Globe className="text-thedeal-gold" size={40} />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Tese: LTV Economy</h3>
                        <p className="text-thedeal-gray400 leading-relaxed font-medium">
                            Não somos mais um marketplace. Somos uma rede de governança que resolve o problema de retenção (LTV) e escala comercial para marcas através de criadores auditados.
                        </p>
                    </div>
                    <div className="p-10 bg-thedeal-card border border-white/5 rounded-[3rem] space-y-6">
                        <Shield className="text-thedeal-gold" size={40} />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Infraestrutura Alpha</h3>
                        <p className="text-thedeal-gray400 leading-relaxed font-medium">
                            Desenvolvemos protocolos de custódia financeira e licenciamento de IP nativos, reduzindo a fricção jurídica e aumentando o ticket médio das parcerias.
                        </p>
                    </div>
                </div>

                <section className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-gold/20 p-12 md:p-24 rounded-[4rem] text-center">
                    <Handshake size={60} className="text-thedeal-gold mx-auto mb-10" />
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">Conversas Estratégicas</h2>
                    <p className="text-thedeal-gray400 mb-12 max-w-xl mx-auto">Interessado em participar da nossa rodada de expansão privada? Solicite acesso ao Data Room Alpha.</p>
                    <button className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Solicitar Reunião</button>
                </section>
            </main>

            <footer className="py-20 border-t border-white/5 text-center opacity-30">
                <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL VENTURES • PRIVATE NETWORK</p>
            </footer>
        </div>
    );
};

export default InvestorPage;