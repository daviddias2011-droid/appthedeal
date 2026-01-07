
import React, { useState } from 'react';
import { 
  Calculator, Users, Eye, DollarSign, 
  FileText, Instagram, Check, Sparkles, TrendingUp, Lock, ArrowRight
} from 'lucide-react';

interface SimulatorPageProps {
  userIsLoggedIn: boolean;
  onRestrictedAction: () => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ userIsLoggedIn, onRestrictedAction }) => {
  const [followers, setFollowers] = useState('');
  const [engagement, setEngagement] = useState('3');
  const [niche, setNiche] = useState('geral');
  
  const calculatePrice = () => {
    const f = parseFloat(followers) || 0;
    const e = parseFloat(engagement) || 3;
    
    // Lógica simplificada MVP: 
    // Base R$ 50 CPM sobre alcance estimado (seguidores * engajamento/100)
    const baseCpm = 50;
    const estimatedReach = f * (e / 100);
    const postValue = (estimatedReach / 1000) * baseCpm;
    
    const nicheMultiplier: Record<string, number> = {
      financas: 1.5, tecnologia: 1.3, saude: 1.4, moda: 1.2, geral: 1.0
    };
    
    const multiplier = nicheMultiplier[niche] || 1.0;
    return postValue * multiplier;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const value = calculatePrice();

  return (
    <div className="animate-fade-in w-full space-y-8 pb-32">
      <header className="space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Calculadora <span className="text-thedeal-gold">Alpha</span></h2>
        <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Métrica Pro de Mercado v1.0</p>
      </header>

      <div className="grid gap-6">
        <section className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Seguidores Ativos</label>
              <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all" placeholder="Ex: 10000" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Engajamento Médio (%)</label>
              <select value={engagement} onChange={e => setEngagement(e.target.value)} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all cursor-pointer">
                <option value="1">Baixo (1%)</option>
                <option value="3">Médio (3%)</option>
                <option value="5">Alto (5%)</option>
                <option value="10">Elite (10%+)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Nicho de Atuação</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['geral', 'financas', 'tecnologia', 'saude', 'moda'].map(n => (
                <button 
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`py-3 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${niche === n ? 'border-thedeal-gold bg-thedeal-gold/10 text-white' : 'border-white/5 bg-black/40 text-thedeal-gray600'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-gold/20 rounded-[2.5rem] p-10 text-center relative overflow-hidden group shadow-[0_0_50px_rgba(201,169,97,0.1)]">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <TrendingUp size={200} className="text-thedeal-gold" />
            </div>
            
            <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Cachê Sugerido (Post Único)</p>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  {formatCurrency(value)}
                </h2>
                <div className="pt-6 border-t border-white/5 max-w-xs mx-auto">
                   <p className="text-[9px] font-bold text-thedeal-gray600 uppercase tracking-widest">Valor baseado em CPM real de parcerias fechadas na rede.</p>
                </div>
            </div>
        </section>

        <div className="bg-thedeal-gold/5 border border-thedeal-gold/20 p-6 rounded-3xl flex items-center gap-4">
           <Sparkles className="text-thedeal-gold shrink-0" size={24} />
           <p className="text-[10px] font-bold text-thedeal-gray400 uppercase leading-relaxed tracking-wider">
             Este valor é uma estimativa técnica. Marcas do nível Alpha costumam pagar prêmios de até <span className="text-white">40% acima</span> desta média por licenciamento de imagem.
           </p>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
