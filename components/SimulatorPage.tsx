
import React, { useState } from 'react';
import { 
  Calculator, Users, Eye, DollarSign, 
  FileText, Instagram, Youtube, Check, ChevronDown, Sparkles, MapPin, ShieldCheck, ArrowRight, Lock, TrendingUp, Twitter, Video
} from 'lucide-react';
import { KwaiIcon } from './Icons';

interface SimulatorPageProps {
  userIsLoggedIn: boolean;
  onRestrictedAction: () => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ userIsLoggedIn, onRestrictedAction }) => {
  const [followers, setFollowers] = useState('');
  const [storyViews, setStoryViews] = useState('');
  const [reelsViews, setReelsViews] = useState('');
  const [feedEngagement, setFeedEngagement] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [niche, setNiche] = useState('geral');
  
  const [selectedFormats, setSelectedFormats] = useState({
    stories: false, reels: false, feed: false, youtube: false, presenca: false
  });
  
  const [quantities, setQuantities] = useState({ stories: 1, reels: 1, feed: 1, youtube: 1 });
  
  const [campaignDetails, setCampaignDetails] = useState({
    exclusivity: false, 
    trafficRights: false, 
    trafficDuration: 30, 
    offlineRights: false,
    offlineDuration: 90, 
    eventHours: 2, 
    eventDistance: 'local' as 'local' | 'proximidade' | 'estadual' | 'nacional',
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
      nano: { min: 40, max: 100 }, 
      micro: { min: 30, max: 80 }, 
      medio: { min: 20, max: 50 },
      macro: { min: 15, max: 40 }, 
      mega: { min: 10, max: 30 }
    };
    const nicheMultiplier: Record<string, number> = {
      tecnologia: 1.4, financas: 1.5, saude: 1.3, beleza: 1.2, moda: 1.2,
      fitness: 1.15, games: 1.1, geral: 1.0, lifestyle: 0.95, entretenimento: 0.9
    };
    const rate = baseRates[tier];
    const multiplier = nicheMultiplier[niche] || 1.0;
    const avgCPM = ((rate.min + rate.max) / 2) * multiplier;
    
    const engagement = parseFloat(engagementRate) || 0;
    if (engagement > 15) return avgCPM * 1.5;
    if (engagement > 10) return avgCPM * 1.3;
    if (engagement > 5) return avgCPM * 1.15;
    if (engagement < 2) return avgCPM * 0.85;
    if (engagement < 1) return avgCPM * 0.7;
    return avgCPM;
  };

  const calculateStories = () => {
    const views = parseFloat(storyViews) || 0;
    const cpm = getCPM();
    const baseValue = (views / 1000) * cpm;
    return baseValue * quantities.stories;
  };

  const calculateReels = () => {
    const views = parseFloat(reelsViews) || 0;
    const cpm = getCPM();
    const tier = getTier();
    const productionCosts = { nano: 100, micro: 150, medio: 250, macro: 400, mega: 600 };
    const productionCost = productionCosts[tier];
    const viralityMultiplier = views > 100000 ? 1.8 : views > 50000 ? 1.5 : 1.3;
    const baseValue = ((views / 1000) * cpm * viralityMultiplier) + productionCost;
    return baseValue * quantities.reels;
  };

  const calculateFeed = () => {
    const avgEngagement = parseFloat(feedEngagement) || ((parseFloat(followers) || 0) * ((parseFloat(engagementRate) || 3) / 100));
    const cpm = getCPM();
    const baseValue = (avgEngagement / 1000) * cpm * 1.2;
    return baseValue * quantities.feed;
  };

  const calculateYoutube = () => {
    const avgViews = (parseFloat(reelsViews) * 0.6) || 5000;
    const cpm = getCPM() * 2;
    const tier = getTier();
    const productionCosts = { nano: 300, micro: 500, medio: 800, macro: 1500, mega: 3000 };
    const baseValue = (avgViews / 1000) * cpm + productionCosts[tier];
    return baseValue * quantities.youtube;
  };

  const calculatePresenca = () => {
    const tier = getTier();
    const hourlyRates = { nano: 150, micro: 300, medio: 600, macro: 1200, mega: 3000 };
    const distanceCosts = { local: 0, proximidade: 250, estadual: 600, nacional: 1800 };
    const hourlyRate = hourlyRates[tier];
    const baseValue = hourlyRate * campaignDetails.eventHours;
    const travel = distanceCosts[campaignDetails.eventDistance];
    const lostProduction = hourlyRate * 8 * campaignDetails.lostProductionDays;
    return baseValue + travel + lostProduction;
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    if (selectedFormats.stories) subtotal += calculateStories();
    if (selectedFormats.reels) subtotal += calculateReels();
    if (selectedFormats.feed) subtotal += calculateFeed();
    if (selectedFormats.youtube) subtotal += calculateYoutube();
    if (selectedFormats.presenca) subtotal += calculatePresenca();
    return subtotal;
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();
    const formatsCount = Object.values(selectedFormats).filter(Boolean).length;
    
    if (formatsCount >= 4) {
      total *= 0.85;
    } else if (formatsCount >= 3) {
      total *= 0.9;
    }
    
    if (campaignDetails.exclusivity) {
      total *= 1.25;
    }
    
    if (campaignDetails.trafficRights) {
      const durationMultiplier = campaignDetails.trafficDuration / 30;
      total *= (1 + (0.4 * durationMultiplier));
    }
    
    if (campaignDetails.offlineRights) {
      const durationMultiplier = campaignDetails.offlineDuration / 90;
      total *= (1 + (0.8 * durationMultiplier));
    }
    
    return total;
  };

  const formatCurrency = (val: number) => {
    if (!userIsLoggedIn) return "R$ ••••••";
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getTierName = () => {
    const tier = getTier();
    const names = { nano: 'Nano (até 10k)', micro: 'Micro (10k-50k)', medio: 'Médio (50k-250k)', macro: 'Macro (250k-1M)', mega: 'Mega (1M+)' };
    return names[tier];
  };

  const getDiscountText = () => {
    const count = Object.values(selectedFormats).filter(Boolean).length;
    if (count >= 4) return '15% de desconto (pacote completo)';
    if (count >= 3) return '10% de desconto (pacote)';
    return 'Sem desconto de pacote';
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto space-y-12 pb-32 pt-8">
      <header className="text-center space-y-4 px-6">
        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-goldDim/20">
           <Calculator className="w-4 h-4 text-thedeal-gold" />
           <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Calculadora Alpha de Mercado v3.0</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
          Simulador de <span className="text-thedeal-goldBright">Cachê Profissional.</span>
        </h1>
        <p className="text-thedeal-gray400 text-lg font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Calcule seu valor de mercado com precisão técnica
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 px-4">
        <div className="lg:col-span-2 space-y-8">
          {/* MÉTRICAS */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <Users className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Suas Métricas</h2>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Total de Seguidores</label>
                  <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700" placeholder="Ex: 50000" />
                  <p className="text-[9px] text-thedeal-gold font-black uppercase tracking-widest ml-1">Categoria: {getTierName()}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Taxa de Engajamento (%)</label>
                  <input type="number" step="0.1" value={engagementRate} onChange={e => setEngagementRate(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700" placeholder="Ex: 5.5" />
                  <p className="text-[9px] text-thedeal-gray600 font-bold uppercase tracking-widest ml-1">Curtidas + Comentários / Seguidores x 100</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Views Médias - Stories (24h)</label>
                  <input type="number" value={storyViews} onChange={e => setStoryViews(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700" placeholder="Ex: 5000" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Views Médias - Reels</label>
                  <input type="number" value={reelsViews} onChange={e => setReelsViews(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700" placeholder="Ex: 15000" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Engajamento Médio - Feed</label>
                  <input type="number" value={feedEngagement} onChange={e => setFeedEngagement(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700" placeholder="Curtidas + Comentários" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Nicho de Atuação</label>
                  <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-thedeal-gray100 font-black focus:border-thedeal-gold outline-none transition-all appearance-none cursor-pointer">
                    <option value="geral" className="bg-zinc-900 text-white">Geral / Variedades</option>
                    <option value="financas" className="bg-zinc-900 text-white">Finanças / Investimentos</option>
                    <option value="tecnologia" className="bg-zinc-900 text-white">Tecnologia</option>
                    <option value="saude" className="bg-zinc-900 text-white">Saúde / Medicina</option>
                    <option value="beleza" className="bg-zinc-900 text-white">Beleza / Cosméticos</option>
                    <option value="moda" className="bg-zinc-900 text-white">Moda</option>
                    <option value="fitness" className="bg-zinc-900 text-white">Fitness / Nutrição</option>
                    <option value="games" className="bg-zinc-900 text-white">Games / eSports</option>
                    <option value="lifestyle" className="bg-zinc-900 text-white">Lifestyle</option>
                    <option value="entretenimento" className="bg-zinc-900 text-white">Entretenimento</option>
                  </select>
                </div>
             </div>

             <div className="mt-4 p-6 bg-thedeal-gold/5 border border-thedeal-gold/20 rounded-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-thedeal-gold" />
                        <div>
                            <span className="font-black text-thedeal-gold uppercase text-[10px] tracking-widest">Seu CPM Base Estimado</span>
                            <p className="text-[8px] text-thedeal-gray600 uppercase tracking-widest mt-0.5">Custo por mil visualizações baseado no seu nicho</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-white">
                        {formatCurrency(getCPM())}
                    </div>
                </div>
             </div>
          </section>

          {/* FORMATOS */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <FileText className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Formatos e Entregáveis</h2>
             </div>

             <div className="grid gap-4">
                {/* STORIES */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${selectedFormats.stories ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedFormats.stories} onChange={e => setSelectedFormats({...selectedFormats, stories: e.target.checked})} className="mt-1 w-5 h-5 accent-thedeal-gold" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Instagram className="w-4 h-4 text-pink-500" />
                                <span className="font-black text-white uppercase text-sm tracking-widest">Stories (Sequência de 3)</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest mb-4">Conteúdo efêmero estratégico</p>
                            
                            {selectedFormats.stories && (
                                <div className="flex items-center gap-4 mb-4 animate-fade-in">
                                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Quantidade:</label>
                                    <input type="number" min="1" value={quantities.stories} onChange={e => setQuantities({...quantities, stories: parseInt(e.target.value) || 1})} className="w-20 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                                </div>
                            )}
                            <div className="text-lg font-black text-thedeal-goldBright">
                                {formatCurrency(calculateStories())}
                            </div>
                        </div>
                    </div>
                </div>

                {/* REELS */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${selectedFormats.reels ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedFormats.reels} onChange={e => setSelectedFormats({...selectedFormats, reels: e.target.checked})} className="mt-1 w-5 h-5 accent-thedeal-gold" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Instagram className="w-4 h-4 text-thedeal-gold" />
                                <span className="font-black text-white uppercase text-sm tracking-widest">Reels / TikTok / Shorts</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest mb-4">Conteúdo permanente + produção</p>
                            
                            {selectedFormats.reels && (
                                <div className="flex items-center gap-4 mb-4 animate-fade-in">
                                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Quantidade:</label>
                                    <input type="number" min="1" value={quantities.reels} onChange={e => setQuantities({...quantities, reels: parseInt(e.target.value) || 1})} className="w-20 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                                </div>
                            )}
                            <div className="text-lg font-black text-thedeal-goldBright">
                                {formatCurrency(calculateReels())}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEED */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${selectedFormats.feed ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedFormats.feed} onChange={e => setSelectedFormats({...selectedFormats, feed: e.target.checked})} className="mt-1 w-5 h-5 accent-thedeal-gold" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Instagram className="w-4 h-4 text-blue-400" />
                                <span className="font-black text-white uppercase text-sm tracking-widest">Post no Feed</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest mb-4">Foto ou carrossel de alto impacto</p>
                            
                            {selectedFormats.feed && (
                                <div className="flex items-center gap-4 mb-4 animate-fade-in">
                                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Quantidade:</label>
                                    <input type="number" min="1" value={quantities.feed} onChange={e => setQuantities({...quantities, feed: parseInt(e.target.value) || 1})} className="w-20 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                                </div>
                            )}
                            <div className="text-lg font-black text-thedeal-goldBright">
                                {formatCurrency(calculateFeed())}
                            </div>
                        </div>
                    </div>
                </div>

                {/* YOUTUBE */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${selectedFormats.youtube ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedFormats.youtube} onChange={e => setSelectedFormats({...selectedFormats, youtube: e.target.checked})} className="mt-1 w-5 h-5 accent-thedeal-gold" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Youtube className="w-4 h-4 text-red-500" />
                                <span className="font-black text-white uppercase text-sm tracking-widest">Vídeo YouTube</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest mb-4">Produção completa + edição avançada</p>
                            
                            {selectedFormats.youtube && (
                                <div className="flex items-center gap-4 mb-4 animate-fade-in">
                                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Quantidade:</label>
                                    <input type="number" min="1" value={quantities.youtube} onChange={e => setQuantities({...quantities, youtube: parseInt(e.target.value) || 1})} className="w-20 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                                </div>
                            )}
                            <div className="text-lg font-black text-thedeal-goldBright">
                                {formatCurrency(calculateYoutube())}
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRESENCA VIP */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${selectedFormats.presenca ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedFormats.presenca} onChange={e => setSelectedFormats({...selectedFormats, presenca: e.target.checked})} className="mt-1 w-5 h-5 accent-thedeal-gold" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin className="w-4 h-4 text-thedeal-gold" />
                                <span className="font-black text-white uppercase text-sm tracking-widest">Presença VIP em Evento</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest mb-4">Sua imagem e tempo em campo</p>
                            
                            {selectedFormats.presenca && (
                                <div className="space-y-6 bg-black/40 p-6 rounded-2xl border border-white/5 animate-fade-in mb-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Horas no Evento</label>
                                            <input type="number" min="1" value={campaignDetails.eventHours} onChange={e => setCampaignDetails({...campaignDetails, eventHours: parseInt(e.target.value) || 2})} className="w-full bg-black border border-thedeal-gray700 rounded-lg p-3 text-thedeal-gray100 text-xs font-black" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Dias de Deslocamento</label>
                                            <input type="number" min="0" value={campaignDetails.lostProductionDays} onChange={e => setCampaignDetails({...campaignDetails, lostProductionDays: parseInt(e.target.value) || 0})} className="w-full bg-black border border-thedeal-gray700 rounded-lg p-3 text-thedeal-gray100 text-xs font-black" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Distância Geográfica</label>
                                        <select value={campaignDetails.eventDistance} onChange={e => setCampaignDetails({...campaignDetails, eventDistance: e.target.value as any})} className="w-full bg-black border border-thedeal-gray700 rounded-lg p-3 text-thedeal-gray100 text-xs font-black outline-none appearance-none cursor-pointer">
                                            <option value="local" className="bg-zinc-900">Local (mesma cidade)</option>
                                            <option value="proximidade" className="bg-zinc-900">Proximidade (até 100km)</option>
                                            <option value="estadual" className="bg-zinc-900">Estadual (outro estado)</option>
                                            <option value="nacional" className="bg-zinc-900">Nacional (voo necessário)</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            <div className="text-lg font-black text-thedeal-goldBright">
                                {formatCurrency(calculatePresenca())}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* DIREITOS DE USO */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <ShieldCheck className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Direitos de Uso & Exclusividade</h2>
             </div>

             <div className="space-y-4">
                <button 
                  onClick={() => setCampaignDetails({...campaignDetails, exclusivity: !campaignDetails.exclusivity})}
                  className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex items-center justify-between group ${campaignDetails.exclusivity ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 bg-black/40'}`}
                >
                   <div>
                      <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${campaignDetails.exclusivity ? 'text-orange-500' : 'text-white'}`}>Exclusividade de Categoria (+25%)</h4>
                      <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest">Restrição de divulgação para concorrentes diretos</p>
                   </div>
                   {campaignDetails.exclusivity && <Check className="text-orange-500" size={20} />}
                </button>

                <div className={`p-6 rounded-3xl border-2 transition-all space-y-6 ${campaignDetails.trafficRights ? 'border-thedeal-success bg-thedeal-success/5' : 'border-white/5 bg-black/40'}`}>
                   <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-1" onClick={() => setCampaignDetails({...campaignDetails, trafficRights: !campaignDetails.trafficRights})}>
                        <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${campaignDetails.trafficRights ? 'text-thedeal-success' : 'text-white'}`}>Tráfego Pago / Ads (+40% base)</h4>
                        <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest">Direito de impulsionamento do conteúdo</p>
                      </div>
                      {campaignDetails.trafficRights && <Check className="text-thedeal-success" size={20} />}
                   </div>
                   {campaignDetails.trafficRights && (
                      <div className="animate-fade-in flex items-center gap-4 pt-4 border-t border-white/5">
                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Duração (dias):</label>
                        <input type="number" min="1" value={campaignDetails.trafficDuration} onChange={e => setCampaignDetails({...campaignDetails, trafficDuration: parseInt(e.target.value) || 30})} className="w-24 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                      </div>
                   )}
                </div>

                <div className={`p-6 rounded-3xl border-2 transition-all space-y-6 ${campaignDetails.offlineRights ? 'border-red-500 bg-red-500/5' : 'border-white/5 bg-black/40'}`}>
                   <div className="flex items-center justify-between">
                      <div className="cursor-pointer flex-1" onClick={() => setCampaignDetails({...campaignDetails, offlineRights: !campaignDetails.offlineRights})}>
                        <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${campaignDetails.offlineRights ? 'text-red-500' : 'text-white'}`}>Mídia Offline (+80% base)</h4>
                        <p className="text-[10px] text-thedeal-gray600 uppercase font-bold tracking-widest">TV, Outdoor, PDV, Materiais Impressos</p>
                      </div>
                      {campaignDetails.offlineRights && <Check className="text-red-500" size={20} />}
                   </div>
                   {campaignDetails.offlineRights && (
                      <div className="animate-fade-in flex items-center gap-4 pt-4 border-t border-white/5">
                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Duração (dias):</label>
                        <input type="number" min="1" value={campaignDetails.offlineDuration} onChange={e => setCampaignDetails({...campaignDetails, offlineDuration: parseInt(e.target.value) || 90})} className="w-24 bg-black border border-thedeal-gray700 rounded-lg p-2 text-thedeal-gray100 text-xs font-black text-center" />
                      </div>
                   )}
                </div>
             </div>
          </section>
        </div>

        {/* SIDEBAR RESULTADO */}
        <aside className="space-y-6">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-goldBright/20 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-[0_0_80px_rgba(201,169,97,0.1)]">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <TrendingUp size={200} className="text-thedeal-gold" />
                </div>
                
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-thedeal-gold" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Resumo do Deal</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Subtotal</span>
                            <span className="text-sm font-black text-white">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Entregáveis</span>
                            <span className="text-sm font-black text-white">{Object.values(selectedFormats).filter(Boolean).length}</span>
                        </div>
                        <div className="text-right">
                           <span className="text-[9px] font-black uppercase text-thedeal-goldBright tracking-tighter">{getDiscountText()}</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-thedeal-goldDim/30">
                        <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-4">Cachê Final Projetado</p>
                        
                        {!userIsLoggedIn ? (
                          <div className="space-y-8">
                             <div className="flex items-baseline gap-1">
                                <h2 className="text-5xl font-black text-white/10 tracking-tighter leading-none blur-sm select-none">
                                  R$ 4.750
                                </h2>
                                <Lock size={20} className="text-thedeal-gold" />
                             </div>
                             <div className="bg-thedeal-gold/5 border border-thedeal-gold/20 p-4 rounded-2xl text-center">
                                <p className="text-[10px] font-black text-thedeal-gold uppercase leading-relaxed tracking-widest">Acesso restrito para convidados. Cadastre-se para desbloquear o terminal de cálculo completo.</p>
                             </div>
                             <button 
                                onClick={onRestrictedAction}
                                className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-thedeal-gold/20"
                             >
                                <Sparkles size={16} />
                                Criar Minha Conta Alpha
                                <ArrowRight size={16} />
                             </button>
                          </div>
                        ) : (
                          <div className="space-y-8">
                             <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                {formatCurrency(total)}
                             </h2>
                             <button 
                                onClick={() => alert('Processando proposta oficial no terminal...')}
                                className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-thedeal-gold/20"
                             >
                                Enviar Proposta de Deal
                                <ArrowRight size={18} />
                             </button>
                          </div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <h4 className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest mb-4">Protocolo de Negociação</h4>
                        <ul className="space-y-3">
                           {[
                             "Valores baseados em CPM por nicho",
                             "Custo de produção técnica incluso",
                             "Padrão de licenciamento TD-IP",
                             "Sujeito a aprovação de conformidade"
                           ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-[9px] font-bold text-thedeal-gray400 uppercase tracking-widest">
                               <div className="w-1 h-1 bg-thedeal-gold rounded-full"></div>
                               {item}
                             </li>
                           ))}
                        </ul>
                    </div>
                </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5 mt-20">
        <div className="flex justify-center gap-8">
          <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
          <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
          <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
          <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
        </div>
        <div className="space-y-4 opacity-50">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
          <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
              A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimulatorPage;
