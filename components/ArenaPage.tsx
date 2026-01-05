
import React from 'react';
import { ArrowLeftIcon, ZapIcon, BrainCircuitIcon, BriefcaseIcon } from './Icons';

interface ArenaPageProps {
    onBack: () => void;
    onNotifyMe?: () => void;
}

const ArenaPage: React.FC<ArenaPageProps> = ({ onBack, onNotifyMe }) => {
    const goldBorderBtn = "border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-black transition-all px-8 py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.3em]";
    
    const steps = [
        "Marcas publicam desafios estratégicos reais",
        "Criadores analisam contexto, objetivo e escopo",
        "Propostas são estruturadas dentro da rede",
        "As melhores soluções avançam para negociação privada",
        "Contratos são formalizados com histórico registrado"
    ];

    return (
        <div className="w-full animate-fade-in space-y-12 pb-20">
            <header className="space-y-4 text-center lg:text-left">
                <button 
                  onClick={onBack} 
                  className="flex items-center gap-2 text-thedeal-gray400 hover:text-thedeal-gold transition-colors mb-8 group mx-auto lg:mx-0"
                >
                  <div className="bg-white/5 p-2 rounded-xl group-hover:bg-thedeal-gold/10 transition-colors">
                    <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Retornar ao Feed</span>
                </button>
                
                <div className="inline-flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
                    <ZapIcon className="w-3 h-3 text-brand-gold animate-pulse" />
                    <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em]">Arena de Desafios de Negócios</span>
                </div>
                <h1 className="text-4xl lg:text-7xl font-display font-black uppercase tracking-tight leading-none text-white">
                    ARENA DE <span className="text-brand-goldBright italic">DESAFIOS.</span>
                </h1>
                <p className="text-thedeal-gray400 text-lg font-light max-w-2xl mx-auto lg:mx-0">
                    Onde desafios reais encontram profissionais prontos para resolver e escalar.
                </p>
            </header>

            <section className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6 text-base lg:text-xl text-thedeal-gray400 leading-relaxed">
                    <p>
                        A Arena de Desafios é o espaço onde marcas lançam desafios reais de negócio — e criadores estratégicos entram para resolver com inteligência, proposta e execução.
                    </p>
                    <p>
                        Aqui não existe briefing genérico nem disputa por atenção. Cada desafio nasce com objetivo claro, critério técnico e potencial real de contrato.
                    </p>
                    <div className="pt-8 border-t border-white/5">
                        <p className="text-white font-serif italic text-2xl lg:text-3xl font-light">
                            "Na Arena de Desafios, você não compete por likes. <span className="text-brand-gold">Você entra para ser considerado.</span>"
                        </p>
                    </div>
                </div>

                <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <BrainCircuitIcon className="w-32 h-32" />
                    </div>
                    <h3 className="text-[10px] font-black uppercase text-brand-gold tracking-[0.4em] mb-8">Protocolo de Operação</h3>
                    <ul className="space-y-5">
                        {steps.map((step, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="text-brand-gold font-black text-xs mt-1">0{i+1}</span>
                                <span className="text-sm font-bold text-white/80 leading-snug">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="bg-gradient-to-br from-thedeal-card to-black border border-brand-gold/20 p-10 lg:p-20 rounded-[3rem] text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                            MODO ALPHA
                        </h4>
                        <p className="text-brand-gold font-black uppercase text-[10px] tracking-[0.5em] flex items-center justify-center gap-3">
                            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
                            Disponível em breve para membros validados
                        </p>
                    </div>

                    <button 
                        onClick={onNotifyMe}
                        className="bg-thedeal-goldBright text-black font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20"
                    >
                        Notificar no Lançamento
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ArenaPage;
