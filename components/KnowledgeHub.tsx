
import React, { useState } from 'react';
import { BookOpen, Video, Mic, ArrowLeft, ArrowRight, PlayCircle, Clock, Sparkles, Zap, Search, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface KnowledgeHubProps {
  onNavigateBack: () => void;
  onRestrictedAction?: () => void;
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigateBack, onRestrictedAction }) => {
  const { profile } = useAuth();
  const userIsLoggedIn = !!profile;
  const [view, setView] = useState<'hub' | 'cursos' | 'artigos'>('hub');

  const modulos = [
    { id: 1, titulo: 'Estratégia & Monetização', desc: 'Transforme audiência em ativo financeiro.', icon: '💰', aulas: 12, duracao: '4h 30min' },
    { id: 2, titulo: 'Engenharia de Contratos', desc: 'Domine cláusulas de Equity e RevShare.', icon: '📑', aulas: 8, duracao: '3h 15min' },
    { id: 3, titulo: 'Performance Criativa', desc: 'Conteúdo focado 100% em conversão e ROI.', icon: '🎯', aulas: 10, duracao: '5h' },
  ];

  const handleAction = (targetView: 'cursos' | 'artigos') => {
      if (!userIsLoggedIn) {
          onRestrictedAction?.();
          return;
      }
      setView(targetView);
  };

  const artigos = [
    { title: 'O Fim do #Publi Tradicional', cat: 'Mercado', time: '12 min', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Matemática do Revenue Share', cat: 'Estratégia', time: '8 min', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop' },
  ];

  if (view === 'cursos') {
    return (
      <div className="animate-fade-in space-y-10">
        <button onClick={() => setView('hub')} className="flex items-center gap-2 text-thedeal-gray400 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Retornar ao Hub</span>
        </button>
        <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight">Formação <span className="text-thedeal-goldBright">Estratégica</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          {modulos.map(m => (
            <div key={m.id} className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-10 hover:border-thedeal-gold transition-all group cursor-pointer shadow-2xl">
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{m.icon}</div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">{m.titulo}</h3>
              <p className="text-thedeal-gray400 text-sm mb-8 leading-relaxed font-medium">{m.desc}</p>
              <div className="pt-8 border-t border-thedeal-gray700/50 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest"><PlayCircle size={14} className="text-thedeal-gold" /> {m.aulas} aulas</div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest"><Clock size={14} className="text-thedeal-gold" /> {m.duracao}</div>
                </div>
                <ArrowRight size={20} className="text-thedeal-gold group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'artigos') {
    return (
      <div className="animate-fade-in space-y-10">
        <button onClick={() => setView('hub')} className="flex items-center gap-2 text-thedeal-gray400 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Retornar ao Hub</span>
        </button>
        <h2 className="text-4xl font-display font-black text-white uppercase tracking-tight">Artigos de <span className="text-thedeal-goldBright">Alta Performance</span></h2>
        <div className="space-y-6">
          {artigos.map((art, i) => (
            <div key={i} className="flex gap-8 bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-6 group cursor-pointer hover:border-thedeal-gold/50 transition-all shadow-xl">
               <div className="w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={art.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               </div>
               <div className="flex-1 py-4 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-3 mb-4">
                      <span className="text-[8px] font-black uppercase tracking-widest text-thedeal-gold border border-thedeal-goldDim/30 px-3 py-1 rounded-sm">{art.cat}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-thedeal-gray600 py-1">{art.time} LEITURA</span>
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight uppercase group-hover:text-thedeal-goldBright transition-colors">{art.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-thedeal-gray400 tracking-widest group-hover:text-white">Expandir Insights <ArrowRight size={14} /></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-16 pb-20">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-goldDim/20">
           <Sparkles className="w-4 h-4 text-thedeal-gold" />
           <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Centro de Inteligência</span>
        </div>
        <h1 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">HUB DE <br/><span className="text-thedeal-goldBright italic">PODER.</span></h1>
        <p className="text-thedeal-gray400 text-xl font-light max-w-2xl">Onde a influência vira estratégia. Conhecimento de elite para quem joga no topo do mercado.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button onClick={() => handleAction('cursos')} className="p-10 bg-thedeal-card rounded-[2.5rem] border border-thedeal-gray700 text-left hover:border-thedeal-gold transition-all group shadow-2xl hover:shadow-thedeal-gold/10 relative">
          {!userIsLoggedIn && <Lock size={18} className="absolute top-6 right-6 text-thedeal-gold/30" />}
          <BookOpen className="w-12 h-12 text-thedeal-gold mb-8 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Formação Alpha</h3>
          <p className="text-sm text-thedeal-gray400 font-medium leading-relaxed">Cursos práticos sobre monetização, negociação e equity.</p>
        </button>

        <button onClick={() => handleAction('artigos')} className="p-10 bg-thedeal-card rounded-[2.5rem] border border-thedeal-gray700 text-left hover:border-thedeal-gold transition-all group shadow-2xl hover:shadow-thedeal-gold/10 relative">
          {!userIsLoggedIn && <Lock size={18} className="absolute top-6 right-6 text-thedeal-gold/30" />}
          <Zap className="w-12 h-12 text-thedeal-gold mb-8 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Intelligence</h3>
          <p className="text-sm text-thedeal-gray400 font-medium leading-relaxed">Análises profundas de mercado e tendências da creator economy.</p>
        </button>

        <button className="p-10 bg-thedeal-card rounded-[2.5rem] border border-thedeal-gray700 text-left hover:border-thedeal-gold transition-all group shadow-2xl hover:shadow-thedeal-gold/10 relative overflow-hidden">
          <Mic className="w-12 h-12 text-thedeal-gold mb-8 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Alpha Talks</h3>
          <p className="text-sm text-thedeal-gray400 font-medium leading-relaxed">Palestras gravadas e ao vivo com os maiores decisores da rede.</p>
          <div className="absolute top-4 right-4 bg-thedeal-gray700 text-[8px] font-black px-3 py-1 rounded-sm uppercase text-white tracking-widest">Em Breve</div>
        </button>
      </div>

      {!userIsLoggedIn && (
        <div className="bg-gradient-to-r from-thedeal-gold/10 to-transparent border border-thedeal-gold/20 p-8 rounded-3xl text-center">
            <p className="text-thedeal-gold font-black uppercase text-[10px] tracking-[0.3em] mb-4">Acesso limitado ao terminal de conhecimento</p>
            <button 
                onClick={onRestrictedAction}
                className="bg-thedeal-gold text-black font-black px-8 py-3 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
            >
                Fazer Login para Desbloquear
            </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-thedeal-card to-thedeal-bg border-2 border-thedeal-goldDim/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-10 opacity-5"><Video size={200} className="text-thedeal-gold" /></div>
         <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter italic">"Amadores buscam views. <br/>Profissionais buscam <span className="text-thedeal-gold">conhecimento estratégico.</span>"</h2>
            <p className="text-thedeal-gray400 text-lg font-medium opacity-80 uppercase tracking-widest max-w-2xl mx-auto">Tudo o que você precisa para dominar o modelo de performance está aqui.</p>
         </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
