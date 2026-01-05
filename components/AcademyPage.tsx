
import React from 'react';
import { ArrowLeftIcon, Sparkles, Briefcase, PlayCircle, Clock, ArrowRight } from 'lucide-react';

interface AcademyPageProps {
    onBack: () => void;
    t: any;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onBack, t }) => {
    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37]";

    const modulos = [
        {
          titulo: 'Estratégia & Monetização de Conteúdo',
          descricao: 'Transforme sua audiência em uma classe de ativo financeira.',
          icone: '💰',
          aulas: 12,
          duracao: '4h 30min'
        },
        {
          titulo: 'Instagram: Stories e Reels Premium',
          descricao: 'Use o Instagram como um painel de vendas e branding de alto valor.',
          icone: '📸',
          aulas: 8,
          duracao: '3h 15min'
        },
        {
          titulo: 'YouTube: Conteúdo de Longa Duração',
          descricao: 'Não é só visualização, é negócio. Aprenda a monetizar audiência de forma estratégica.',
          icone: '🎥',
          aulas: 10,
          duracao: '5h 00min'
        },
        {
          titulo: 'TikTok: Vídeos Que Viralizam e Convertem',
          descricao: 'Domine as trends sem perder a estratégia. Converta visualizações em acordos reais.',
          icone: '🎵',
          aulas: 6,
          duracao: '2h 45min'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-[#F5F5F5] font-sans selection:bg-thedeal-gold selection:text-black animate-fade-in">
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                <Briefcase size={18} className="text-black" />
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

            <main className="max-w-7xl mx-auto px-6 py-20 pt-32">
                <header className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-gold/20 px-4 py-1.5 rounded-full mb-8">
                        <Sparkles className="w-3 h-3 text-thedeal-gold animate-pulse" />
                        <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">The Deal Academia</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-none uppercase">
                        DOMINE O <br/>
                        <span className={goldTextClass}>MERCADO.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                        Conhecimento estratégico que vira acordo real. Inteligência aplicada a negócios, sem enrolação.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    {modulos.map((modulo, i) => (
                        <div key={i} className="p-10 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold/30 transition-all group cursor-pointer shadow-2xl">
                            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{modulo.icone}</div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-thedeal-gold transition-colors">{modulo.titulo}</h3>
                            <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">{modulo.descricao}</p>
                            
                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <PlayCircle className="w-5 h-5 text-thedeal-gold" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white/60">{modulo.aulas} aulas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-thedeal-gold" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white/60">{modulo.duracao}</span>
                                    </div>
                                </div>
                                <button className="text-thedeal-gold group-hover:translate-x-2 transition-transform"><ArrowRight className="w-6 h-6"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="py-20 border-t border-white/5 text-center">
                <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em]">
                    THE DEAL ACADEMY • © 2025 • REDE PRIVADA
                </p>
            </footer>
        </div>
    );
};

export default AcademyPage;
