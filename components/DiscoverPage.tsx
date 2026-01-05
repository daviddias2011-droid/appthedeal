
import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Users, Building2, ChevronDown, ArrowLeft, Globe, CheckCircle2, Award, Info } from 'lucide-react';
import { BriefcaseIcon } from './Icons';

interface DiscoverPageProps {
  onBack: () => void;
  onSignup: () => void;
}

const DATABASE = {
  influencers: [
    { id: 1, name: "Whindersson Nunes", niche: "Comédia", location: "São Paulo, SP", followers: "59M", engagement: "4.2%", verified: true },
    { id: 2, name: "Viih Tube", niche: "Lifestyle", location: "São Paulo, SP", followers: "32M", engagement: "5.8%", verified: true },
    { id: 5, name: "Virginia Fonseca", niche: "Lifestyle", location: "Goiânia, GO", followers: "48M", engagement: "7.1%", verified: true },
    { id: 11, name: "Anitta", niche: "Música", location: "Rio de Janeiro, RJ", followers: "65M", engagement: "8.2%", verified: true },
    { id: 20, name: "Casimiro", niche: "Games", location: "Rio de Janeiro, RJ", followers: "8.9M", engagement: "8.8%", verified: true },
    // Mock base for testing UI
  ],
  brands: [
    { id: 101, name: "Natura", category: "Beleza", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 104, name: "Nubank", category: "Fintech", location: "São Paulo, SP", campaigns: 15, budget: "Alto", verified: true },
    { id: 116, name: "Shopee Brasil", category: "E-commerce", location: "São Paulo, SP", campaigns: 35, budget: "Alto", verified: true },
    // Mock base for testing UI
  ]
};

export default function DiscoverPage({ onBack }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResults = useMemo(() => {
    let results: any[] = [];
    if (activeTab === 'all' || activeTab === 'influencers') results = [...results, ...DATABASE.influencers.map(i => ({...i, type: 'influencer'}))];
    if (activeTab === 'all' || activeTab === 'brands') results = [...results, ...DATABASE.brands.map(b => ({...b, type: 'brand'}))];
    
    if (searchQuery) {
      return results.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return results;
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20">
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

      <main className="max-w-5xl mx-auto px-4 py-32">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-gold/20 mb-6">
            <Globe className="w-4 h-4 text-thedeal-gold" />
            <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Base de dados pública</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-tight">
            Explore o ecossistema de <br/> <span className="text-thedeal-gold">marcas e influenciadores</span>
          </h1>
        </header>

        <div className="mb-8 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-thedeal-gray600" size={22} />
          <input
            type="text"
            placeholder="Buscar ativo na rede..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white focus:border-thedeal-gold/50 outline-none font-bold"
          />
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setActiveTab('all')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest ${activeTab === 'all' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Todos</button>
          <button onClick={() => setActiveTab('influencers')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest ${activeTab === 'influencers' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Influenciadores</button>
          <button onClick={() => setActiveTab('brands')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest ${activeTab === 'brands' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Marcas</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(item => (
            <div key={item.id} className="bg-zinc-950 border border-white/5 rounded-[2rem] p-8 hover:border-thedeal-gold/30 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-xl text-thedeal-gold">{item.name.charAt(0)}</div>
                {item.verified && <CheckCircle2 size={18} className="text-thedeal-gold" />}
              </div>
              <h3 className="text-lg font-black text-white uppercase group-hover:text-thedeal-gold transition-colors">{item.name}</h3>
              <p className="text-[10px] text-thedeal-gray600 uppercase font-black tracking-widest mt-1">{item.niche || item.category}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[8px] font-black text-thedeal-gray600 uppercase mb-1">Alcance</p>
                  <p className="text-sm font-bold text-white">{item.followers || item.campaigns}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-thedeal-gray600 uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-thedeal-gold">Verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DISCLAIMER E LINKS DE REMOÇÃO */}
        <footer className="mt-32 pt-12 border-t border-white/10 space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start opacity-40">
                <Info size={24} className="text-thedeal-gold shrink-0" />
                <p className="text-[10px] text-thedeal-gray400 leading-relaxed font-medium uppercase text-justify">
                    O The Deal é uma plataforma independente. Todas as marcas comerciais e logotipos apresentados nesta lista são de propriedade de seus respectivos detentores e são utilizados aqui apenas para fins informativos e de identificação (uso nominativo). Não há afiliação, patrocínio ou endosso oficial entre o The Deal e as marcas listadas, salvo indicação expressa.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-[0.4em]">THE DEAL HUB • © 2025</p>
                <div className="flex gap-8">
                    <button className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest hover:underline decoration-thedeal-gold underline-offset-4">Remover meu Perfil</button>
                    <button className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest hover:underline decoration-thedeal-gold underline-offset-4">Atualizar Dados</button>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}