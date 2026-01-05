
import React, { useState, useMemo } from 'react';
import { 
  Calculator, TrendingUp, Users, Eye, DollarSign, 
  FileText, Instagram, Youtube, Check, ChevronDown, Sparkles, MapPin, ShieldCheck, ArrowRight, Clock
} from 'lucide-react';

interface SimulatorPageProps {
  userIsLoggedIn: boolean;
  onRestrictedAction: () => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ userIsLoggedIn, onRestrictedAction }) => {
  // 1. Estados das Métricas
  const [followers, setFollowers] = useState('');
  const [storyViews, setStoryViews] = useState('');
  const [reelsViews, setReelsViews] = useState('');
  const [feedEngagement, setFeedEngagement] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [niche, setNiche] = useState('geral');
  
  // 2. Estados de Formatos Selecionados
  const [selectedFormats, setSelectedFormats] = useState({
    stories: false,
    reels: false,
    feed: false,
    youtube: false,
    presenca: false
  });
  
  // 3. Estados de Quantidades
  const [quantities, setQuantities] = useState({
    stories: 1,
    reels: 1,
    feed: 1,
    youtube: 1
  });
  
  // 4. Detalhes da Campanha e Direitos
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

  // --- Lógica de Cálculo ---

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
      tecnologia: 1.4,
      financas: 1.5,
      saude: 1.3,
      beleza: 1.2,
      moda: 1.2,
      fitness: 1.15,
      games: 1.1,
      geral: 1.0,
      lifestyle: 0.95,
      entretenimento: 0.9
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
    const productionCosts = {
      nano: 100,
      micro: 150,
      medio: 250,
      macro: 400,
      mega: 600
    };
    
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
    const avgViews = (parseFloat(reelsViews) || 0) * 0.6 || 5000;
    const cpm = getCPM() * 2;
    
    const tier = getTier();
    const productionCosts = {
      nano: 300,
      micro: 500,
      medio: 800,
      macro: 1500,
      mega: 3000
    };
    
    const baseValue = (avgViews / 1000) * cpm + productionCosts[tier];
    return baseValue * quantities.youtube;
  };

  const calculatePresenca = () => {
    const tier = getTier();
    const hourlyRates = {
      nano: 150,
      micro: 300,
      medio: 600,
      macro: 1200,
      mega: 3000
    };
    
    const distanceCosts = {
      local: 0,
      proximidade: 250,
      estadual: 600,
      nacional: 1800
    };
    
    const hourlyRate = hourlyRates[tier];
    const baseValue = hourlyRate * campaignDetails.eventHours;
    const travel = distanceCosts[campaignDetails.eventDistance];
    const lostProduction = hourlyRate * 8 * campaignDetails.lostProductionDays;
    
    return baseValue + travel + lostProduction;
  };

  const calculateSubtotal = () => {
    let subtotalValue = 0;
    if (selectedFormats.stories) subtotalValue += calculateStories();
    if (selectedFormats.reels) subtotalValue += calculateReels();
    if (selectedFormats.feed) subtotalValue += calculateFeed();
    if (selectedFormats.youtube) subtotalValue += calculateYoutube();
    if (selectedFormats.presenca) subtotalValue += calculatePresenca();
    return subtotalValue;
  };

  const calculateTotal = () => {
    let totalValue = calculateSubtotal();
    
    const formatsCount = Object.values(selectedFormats).filter(Boolean).length;
    if (formatsCount >= 4) {
      totalValue *= 0.85; // 15% desc
    } else if (formatsCount >= 3) {
      totalValue *= 0.9; // 10% desc
    }
    
    if (campaignDetails.exclusivity) {
      totalValue *= 1.25;
    }
    
    if (campaignDetails.trafficRights) {
      const durationMultiplier = campaignDetails.trafficDuration / 30;
      totalValue *= (1 + (0.4 * durationMultiplier));
    }
    
    if (campaignDetails.offlineRights) {
      const durationMultiplier = campaignDetails.offlineDuration / 90;
      totalValue *= (1 + (0.8 * durationMultiplier));
    }
    
    return totalValue;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTierName = () => {
    const tier = getTier();
    const names = {
      nano: 'Nano (até 10k)',
      micro: 'Micro (10k-50k)',
      medio: 'Médio (50k-250k)',
      macro: 'Macro (250k-1M)',
      mega: 'Mega (1M+)'
    };
    return names[tier];
  };

  const getDiscountText = () => {
    const count = Object.values(selectedFormats).filter(Boolean).length;
    if (count >= 4) return '15% de desconto aplicado';
    if (count >= 3) return '10% de desconto aplicado';
    return 'Sem desconto de pacote';
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

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
        <p className="text-thedeal-gray400 text-lg font-light max-w-2xl mx-auto">
          Analise seu valor justo de mercado baseado em dados reais de conversão, nicho e direitos de licenciamento.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-start px-4">
        
        {/* Lado Esquerdo: Inputs e Formatos */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Suas Métricas */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <Users className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Suas Métricas</h2>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Total de Seguidores</label>
                  <input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    placeholder="Ex: 50000"
                    className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-white/10"
                  />
                  <p className="text-[9px] font-bold text-thedeal-gold uppercase tracking-widest mt-2">Categoria: {getTierName()}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Taxa de Engajamento (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    placeholder="Ex: 5.5"
                    className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Views Médias - Stories (24h)</label>
                  <input
                    type="number"
                    value={storyViews}
                    onChange={(e) => setStoryViews(e.target.value)}
                    placeholder="Ex: 5000"
                    className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Views Médias - Reels</label>
                  <input
                    type="number"
                    value={reelsViews}
                    onChange={(e) => setReelsViews(e.target.value)}
                    placeholder="Ex: 15000"
                    className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Nicho de Atuação</label>
                  <div className="relative">
                    <select
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black focus:border-thedeal-gold outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="geral">Geral / Variedades</option>
                        <option value="financas">Finanças / Investimentos</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="saude">Saúde / Medicina</option>
                        <option value="beleza">Beleza / Cosméticos</option>
                        <option value="moda">Moda</option>
                        <option value="fitness">Fitness / Nutrição</option>
                        <option value="games">Games / eSports</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="entretenimento">Entretenimento</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-thedeal-gray600 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="bg-thedeal-gold/5 border border-thedeal-gold/20 rounded-2xl p-6 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.2em] mb-1">Seu CPM Base</p>
                            <p className="text-2xl font-black text-white">{formatCurrency(getCPM())}</p>
                        </div>
                        <Eye size={24} className="text-thedeal-gold opacity-30" />
                    </div>
                </div>
             </div>
          </section>

          {/* Formatos e Entregáveis */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <FileText className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Formatos e Entregáveis</h2>
             </div>

             <div className="grid gap-6">
                {/* Stories */}
                <div className={`p-6 rounded-3xl border-2 transition-all group ${selectedFormats.stories ? 'border-thedeal-goldBright bg-thedeal-gold/5' : 'border-white/5 bg-black/20 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input 
                          type="checkbox" 
                          checked={selectedFormats.stories} 
                          onChange={(e) => setSelectedFormats({...selectedFormats, stories: e.target.checked})} 
                          className="mt-1.5 w-6 h-6 rounded-lg text-thedeal-gold border-white/20 bg-black/40 focus:ring-thedeal-gold focus:ring-offset-0" 
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Instagram size={18} className="text-pink-500" />
                                  <span className="text-sm font-black uppercase text-white tracking-widest">Stories (Sequência de 3)</span>
                                </div>
                                <span className="text-lg font-black text-thedeal-gold">{formatCurrency(calculateStories())}</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest mb-4">Conteúdo efêmero de 24h • Foco em Cliques e Conversão</p>
                            {selectedFormats.stories && (
                                <div className="flex items-center gap-4 animate-fade-in bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="flex-1">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-2">Qtd de Sequências</label>
                                        <input 
                                          type="number" 
                                          min="1" 
                                          value={quantities.stories} 
                                          onChange={(e) => setQuantities({...quantities, stories: parseInt(e.target.value) || 1})} 
                                          className="bg-transparent border-none outline-none text-white font-black w-full text-xl" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reels */}
                <div className={`p-6 rounded-3xl border-2 transition-all group ${selectedFormats.reels ? 'border-thedeal-goldBright bg-thedeal-gold/5' : 'border-white/5 bg-black/20 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input 
                          type="checkbox" 
                          checked={selectedFormats.reels} 
                          onChange={(e) => setSelectedFormats({...selectedFormats, reels: e.target.checked})} 
                          className="mt-1.5 w-6 h-6 rounded-lg text-thedeal-gold border-white/20 bg-black/40 focus:ring-thedeal-gold focus:ring-offset-0" 
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Instagram size={18} className="text-purple-500" />
                                  <span className="text-sm font-black uppercase text-white tracking-widest">Reels / TikTok / Shorts</span>
                                </div>
                                <span className="text-lg font-black text-thedeal-gold">{formatCurrency(calculateReels())}</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest mb-4">Conteúdo Permanente • Foco em Alcance e Retenção</p>
                            {selectedFormats.reels && (
                                <div className="flex items-center gap-4 animate-fade-in bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="flex-1">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-2">Qtd de Vídeos</label>
                                        <input 
                                          type="number" 
                                          min="1" 
                                          value={quantities.reels} 
                                          onChange={(e) => setQuantities({...quantities, reels: parseInt(e.target.value) || 1})} 
                                          className="bg-transparent border-none outline-none text-white font-black w-full text-xl" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Youtube */}
                <div className={`p-6 rounded-3xl border-2 transition-all group ${selectedFormats.youtube ? 'border-thedeal-goldBright bg-thedeal-gold/5' : 'border-white/5 bg-black/20 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input 
                          type="checkbox" 
                          checked={selectedFormats.youtube} 
                          onChange={(e) => setSelectedFormats({...selectedFormats, youtube: e.target.checked})} 
                          className="mt-1.5 w-6 h-6 rounded-lg text-thedeal-gold border-white/20 bg-black/40 focus:ring-thedeal-gold focus:ring-offset-0" 
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Youtube size={18} className="text-red-500" />
                                  <span className="text-sm font-black uppercase text-white tracking-widest">Vídeo YouTube</span>
                                </div>
                                <span className="text-lg font-black text-thedeal-gold">{formatCurrency(calculateYoutube())}</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest mb-4">Alta Produção • Foco em LTV e Educação</p>
                            {selectedFormats.youtube && (
                                <div className="flex items-center gap-4 animate-fade-in bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="flex-1">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-2">Qtd de Vídeos</label>
                                        <input 
                                          type="number" 
                                          min="1" 
                                          value={quantities.youtube} 
                                          onChange={(e) => setQuantities({...quantities, youtube: parseInt(e.target.value) || 1})} 
                                          className="bg-transparent border-none outline-none text-white font-black w-full text-xl" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Presença VIP */}
                <div className={`p-6 rounded-3xl border-2 transition-all group ${selectedFormats.presenca ? 'border-thedeal-goldBright bg-thedeal-gold/5' : 'border-white/5 bg-black/20 hover:border-white/10'}`}>
                    <div className="flex items-start gap-4">
                        <input 
                          type="checkbox" 
                          checked={selectedFormats.presenca} 
                          onChange={(e) => setSelectedFormats({...selectedFormats, presenca: e.target.checked})} 
                          className="mt-1.5 w-6 h-6 rounded-lg text-thedeal-gold border-white/20 bg-black/40 focus:ring-thedeal-gold focus:ring-offset-0" 
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <MapPin size={18} className="text-thedeal-success" />
                                  <span className="text-sm font-black uppercase text-white tracking-widest">Presença VIP em Evento</span>
                                </div>
                                <span className="text-lg font-black text-thedeal-gold">{formatCurrency(calculatePresenca())}</span>
                            </div>
                            <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest mb-4">Sua Imagem e Autoridade Física no Local</p>
                            {selectedFormats.presenca && (
                                <div className="grid md:grid-cols-3 gap-4 mt-4 animate-fade-in">
                                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-1">Horas Totais</label>
                                        <input 
                                          type="number" 
                                          min="1" 
                                          value={campaignDetails.eventHours} 
                                          onChange={(e) => setCampaignDetails({...campaignDetails, eventHours: parseInt(e.target.value) || 2})} 
                                          className="bg-transparent border-none outline-none text-white font-black w-full text-lg" 
                                        />
                                    </div>
                                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-1">Distância</label>
                                        <select 
                                          value={campaignDetails.eventDistance} 
                                          onChange={(e) => setCampaignDetails({...campaignDetails, eventDistance: e.target.value as any})} 
                                          className="bg-transparent border-none outline-none text-white font-bold w-full text-xs uppercase cursor-pointer"
                                        >
                                            <option value="local">Local</option>
                                            <option value="proximidade">Proximidade</option>
                                            <option value="estadual">Estadual</option>
                                            <option value="nacional">Nacional</option>
                                        </select>
                                    </div>
                                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                                        <label className="text-[9px] font-black uppercase text-thedeal-gray600 block mb-1">Dias de Deslocamento</label>
                                        <input 
                                          type="number" 
                                          min="0" 
                                          value={campaignDetails.lostProductionDays} 
                                          onChange={(e) => setCampaignDetails({...campaignDetails, lostProductionDays: parseInt(e.target.value) || 0})} 
                                          className="bg-transparent border-none outline-none text-white font-black w-full text-lg" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
             </div>
          </section>

          {/* Direitos de Uso e Exclusividade */}
          <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-3 border-b border-thedeal-gray700/50 pb-4">
                <ShieldCheck className="w-6 h-6 text-thedeal-gold" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Licenciamento e Exclusividade</h2>
             </div>

             <div className="grid gap-6">
                <label className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all cursor-pointer ${campaignDetails.exclusivity ? 'border-orange-500 bg-orange-500/5 shadow-xl shadow-orange-500/5' : 'border-white/5 bg-black/20'}`}>
                    <input 
                      type="checkbox" 
                      checked={campaignDetails.exclusivity} 
                      onChange={(e) => setCampaignDetails({...campaignDetails, exclusivity: e.target.checked})} 
                      className="mt-1 w-6 h-6 rounded-lg text-orange-500 border-white/20 bg-black/40 focus:ring-orange-500 focus:ring-offset-0" 
                    />
                    <div>
                        <div className="font-black text-white uppercase text-sm mb-1 tracking-widest">Exclusividade de Categoria (+25%)</div>
                        <p className="text-[10px] text-thedeal-gray400 uppercase tracking-widest">Bloqueio total de marcas concorrentes durante o contrato</p>
                    </div>
                </label>

                <label className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all cursor-pointer ${campaignDetails.trafficRights ? 'border-thedeal-success bg-thedeal-success/5 shadow-xl shadow-thedeal-success/5' : 'border-white/5 bg-black/20'}`}>
                    <input 
                      type="checkbox" 
                      checked={campaignDetails.trafficRights} 
                      onChange={(e) => setCampaignDetails({...campaignDetails, trafficRights: e.target.checked})} 
                      className="mt-1 w-6 h-6 rounded-lg text-thedeal-success border-white/20 bg-black/40 focus:ring-thedeal-success focus:ring-offset-0" 
                    />
                    <div className="flex-1">
                        <div className="font-black text-white uppercase text-sm mb-1 tracking-widest">Direitos de Tráfego Pago / Ads (+40% Base)</div>
                        <p className="text-[10px] text-thedeal-gray400 uppercase tracking-widest mb-4">Autorização para a marca impulsionar seus ativos digitais</p>
                        {campaignDetails.trafficRights && (
                            <div className="flex items-center gap-4 animate-fade-in bg-black/40 p-4 rounded-2xl border border-white/5">
                                <label className="text-[9px] font-black uppercase text-thedeal-gray600">Duração do Direito (dias):</label>
                                <input 
                                  type="number" 
                                  min="1" 
                                  value={campaignDetails.trafficDuration} 
                                  onChange={(e) => setCampaignDetails({...campaignDetails, trafficDuration: parseInt(e.target.value) || 30})} 
                                  className="bg-transparent border-none outline-none text-white font-black w-24 text-lg" 
                                />
                            </div>
                        )}
                    </div>
                </label>

                <label className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all cursor-pointer ${campaignDetails.offlineRights ? 'border-red-500 bg-red-500/5 shadow-xl shadow-red-500/5' : 'border-white/5 bg-black/20'}`}>
                    <input 
                      type="checkbox" 
                      checked={campaignDetails.offlineRights} 
                      onChange={(e) => setCampaignDetails({...campaignDetails, offlineRights: e.target.checked})} 
                      className="mt-1 w-6 h-6 rounded-lg text-red-500 border-white/20 bg-black/40 focus:ring-red-500 focus:ring-offset-0" 
                    />
                    <div className="flex-1">
                        <div className="font-black text-white uppercase text-sm mb-1 tracking-widest">Mídia Offline / OOH (+80% Base)</div>
                        <p className="text-[10px] text-thedeal-gray400 uppercase tracking-widest mb-4">Uso em TV, Outdoor, PDV e Materiais Impressos</p>
                        {campaignDetails.offlineRights && (
                            <div className="flex items-center gap-4 animate-fade-in bg-black/40 p-4 rounded-2xl border border-white/5">
                                <label className="text-[9px] font-black uppercase text-thedeal-gray600">Duração (dias):</label>
                                <input 
                                  type="number" 
                                  min="1" 
                                  value={campaignDetails.offlineDuration} 
                                  onChange={(e) => setCampaignDetails({...campaignDetails, offlineDuration: parseInt(e.target.value) || 90})} 
                                  className="bg-transparent border-none outline-none text-white font-black w-24 text-lg" 
                                />
                            </div>
                        )}
                    </div>
                </label>
             </div>
          </section>
        </div>

        {/* Lado Direito: Resumo Alpha */}
        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-goldBright/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity hidden md:block">
                    <DollarSign size={200} className="text-thedeal-gold" />
                </div>
                
                <div className="relative z-10 space-y-10">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-3 py-1 rounded-full mb-4">
                            <Sparkles className="w-3 h-3 text-thedeal-gold" />
                            <span className="text-[8px] font-black text-thedeal-gold uppercase tracking-[0.2em]">Resumo da Proposta Alpha</span>
                        </div>
                        <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.4em] mb-2">Valor Total do Deal</p>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-1">
                            {formatCurrency(total)}
                        </h2>
                        <div className="h-1 w-20 bg-thedeal-gold rounded-full mt-4"></div>
                    </div>

                    <div className="space-y-4 border-t border-white/5 pt-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-thedeal-gray400 tracking-widest">Subtotal Bruto</span>
                            <span className="text-sm font-bold text-white/60">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-thedeal-gray400 tracking-widest">Benefício Pacote</span>
                            <span className="text-[10px] font-black uppercase text-thedeal-success tracking-widest">{getDiscountText()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-thedeal-gray400 tracking-widest">Entregáveis Selecionados</span>
                            <span className="text-sm font-bold text-white">{Object.values(selectedFormats).filter(Boolean).length}</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => !userIsLoggedIn ? onRestrictedAction() : alert('Abrindo gerador de proposta formal...')}
                        className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl text-xs uppercase tracking-widest shadow-2xl shadow-thedeal-gold/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        Criar Proposta Oficial
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8">
                <h3 className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-[0.4em] mb-6">Regras de Negociação</h3>
                <ul className="space-y-4">
                    {[
                        "Este valor é uma base técnica sugerida.",
                        "Cobre 50% de sinal antes do início.",
                        "Documente todas as cláusulas de tráfego.",
                        "Mantenha Media Kit auditado e atualizado."
                    ].map((dica, i) => (
                        <li key={i} className="flex gap-3">
                            <Check size={14} className="text-thedeal-gold shrink-0 mt-0.5" />
                            <p className="text-[11px] font-medium text-thedeal-gray400 leading-relaxed uppercase">{dica}</p>
                        </li>
                    ))}
                </ul>
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
