
import React, { useState } from 'react';
import { 
  Calculator, Users, Eye, DollarSign, 
  FileText, Instagram, Youtube, Check, ChevronDown, Sparkles, MapPin, ShieldCheck, ArrowRight
} from 'lucide-react';

interface SimulatorPageProps {
  userIsLoggedIn: boolean;
  onRestrictedAction: () => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ userIsLoggedIn, onRestrictedAction }) => {
  const [followers, setFollowers] = useState('');
  const [storyViews, setStoryViews] = useState('');
  const [reelsViews, setReelsViews] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [niche, setNiche] = useState('geral');
  
  const [selectedFormats, setSelectedFormats] = useState({
    stories: false, reels: false, feed: false, youtube: false, presenca: false
  });
  
  const [quantities, setQuantities] = useState({ stories: 1, reels: 1, feed: 1, youtube: 1 });
  
  const [campaignDetails, setCampaignDetails] = useState({
    exclusivity: false, trafficRights: false, trafficDuration: 30, offlineRights: false,
    offlineDuration: 90, eventHours: 2, eventDistance: 'local' as 'local' | 'proximidade' | 'estadual' | 'nacional',
    lostProductionDays: 0
  });

  const getTier = () => {
    const f = parseFloat(followers) || 0;
    if (f < 10000) return 'nano';
    if (f < 50000) return 'micro';
    if (f < 250000) return 'medio';
    if (f < 1000000) return 'macro';
    return 'mega';
  };

  const getCPM = () => {
    const tier = getTier();
    const baseRates = {
      nano: { min: 40, max: 100 }, micro: { min: 30, max: 80 }, medio: { min: 20, max: 50 },
      macro: { min: 15, max: 40 }, mega: { min: 10, max: 30 }
    };
    const nicheMultiplier: Record<string, number> = {
      tecnologia: 1.4, financas: 1.5, saude: 1.3, beleza: 1.2, moda: 1.2,
      fitness: 1.15, games: 1.1, geral: 1.0, lifestyle: 0.95, entretenimento: 0.9
    };
    const multiplier = nicheMultiplier[niche] || 1.0;
    const avgCPM = ((baseRates[tier].min + baseRates[tier].max) / 2) * multiplier;
    const engagement = parseFloat(engagementRate) || 0;
    if (engagement > 10) return avgCPM * 1.3;
    if (engagement < 2) return avgCPM * 0.85;
    return avgCPM;
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const calculateTotal = () => {
    let subtotal = 0;
    const cpm = getCPM();
    if (selectedFormats.stories) subtotal += (parseFloat(storyViews) || 0) / 1000 * cpm * quantities.stories;
    if (selectedFormats.reels) subtotal += (parseFloat(reelsViews) || 0) / 1000 * cpm * 1.5 * quantities.reels;
    
    if (campaignDetails.exclusivity) subtotal *= 1.25;
    if (campaignDetails.trafficRights) subtotal *= 1.4;
    
    return subtotal;
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto space-y-12 pb-32">
      <header className="text-center space-y-4 pt-12 px-6">
        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-goldDim/20">
           <Calculator className="w-4 h-4 text-thedeal-gold" />
           <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Calculadora Alpha de Mercado v3.0</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
          Simulador de <span className="text-thedeal-goldBright">Cachê Profissional.</span>
        </h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 px-4">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <Users className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Suas Métricas</h2>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Total de Seguidores</label>
                  <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none" placeholder="Ex: 50000" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Views Stories (24h)</label>
                  <input type="number" value={storyViews} onChange={e => setStoryViews(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none" placeholder="Ex: 5000" />
                </div>
             </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-goldBright/20 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
              <div className="relative z-10 space-y-10">
                  <div>
                      <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-2">Valor Total do Deal</p>
                      <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-1">
                          {formatCurrency(calculateTotal())}
                      </h2>
                      <div className="h-1 w-20 bg-thedeal-gold rounded-full mt-4"></div>
                  </div>
                  <button 
                      onClick={() => !userIsLoggedIn ? onRestrictedAction() : alert('Processando proposta...')}
                      className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-thedeal-gold/20"
                  >
                      Criar Proposta Oficial
                      <ArrowRight size={18} />
                  </button>
              </div>
          </div>
        </aside>
      </div>

      <footer className="text-center opacity-30 pt-20 border-t border-white/5 px-6">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">
            Valores projetados com base no mercado publicitário 2025 • Terminal Alpha v3.0
        </p>
      </footer>
    </div>
  );
};

export default SimulatorPage;
