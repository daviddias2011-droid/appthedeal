
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Building2, ArrowLeft, Globe, Info } from 'lucide-react';
import { BriefcaseIcon } from './Icons';

interface DiscoverPageProps {
  onBack: () => void;
  onSignup: () => void;
}

const DATABASE = {
  influencers: [
    { id: 1, name: "Mari Maria", niche: "Beleza", location: "Brasília, DF", followers: "22M" },
    { id: 2, name: "Boca Rosa (Bianca)", niche: "Beleza", location: "São Paulo, SP", followers: "19M" },
    { id: 3, name: "Niina Secrets", niche: "Beleza", location: "São Paulo, SP", followers: "4M" },
    { id: 4, name: "Franciny Ehlke", niche: "Beleza", location: "Curitiba, PR", followers: "16M" },
    { id: 5, name: "Bruna Tavares", niche: "Beleza", location: "Campinas, SP", followers: "3.5M" },
    { id: 21, name: "Renato Cariani", niche: "Fitness", location: "São Paulo, SP", followers: "8M" },
    { id: 22, name: "Paulo Muzy", niche: "Fitness", location: "São Paulo, SP", followers: "8.5M" },
    { id: 23, name: "Gracyanne Barbosa", niche: "Fitness", location: "Rio de Janeiro, RJ", followers: "11M" },
    { id: 24, name: "Leo Stronda", niche: "Fitness", location: "Rio de Janeiro, RJ", followers: "4M" },
    { id: 25, name: "Juju Salimeni", niche: "Fitness", location: "São Paulo, SP", followers: "20M" },
    { id: 41, name: "Thiago Nigro", niche: "Finanças", location: "São Paulo, SP", followers: "9M" },
    { id: 42, name: "Nathalia Arcuri", niche: "Finanças", location: "São Paulo, SP", followers: "4M" },
    { id: 43, name: "Bruno Perini", niche: "Finanças", location: "São Paulo, SP", followers: "3.5M" },
    { id: 61, name: "Whindersson Nunes", niche: "Humor", location: "São Paulo, SP", followers: "59M" },
    { id: 62, name: "Tatá Werneck", niche: "Humor", location: "Rio de Janeiro, RJ", followers: "57M" },
  ],
  brands: [
    { id: 1, name: "BETC Havas", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 2, name: "VML Brasil", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 3, name: "Africa Creative", category: "Publicidade & Criatividade", location: "São Paulo, SP" },
    { id: 4, name: "AlmapBBDO", category: "Publicidade & Criatividade", location: "São Paulo, SP" },
    { id: 5, name: "WMcCann", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 6, name: "Publicis Brasil", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 7, name: "Ogilvy Brasil", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 8, name: "Galeria.ag", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 9, name: "Artplan", category: "Publicidade Full Service", location: "Rio de Janeiro, RJ / SP" },
    { id: 10, name: "DPZ", category: "Publicidade & Criatividade", location: "São Paulo, SP" },
    { id: 11, name: "Leo Burnett TM", category: "Publicidade & Criatividade", location: "São Paulo, SP" },
    { id: 12, name: "Lew'Lara\\TBWA", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 13, name: "Talent", category: "Publicidade & Estratégia", location: "São Paulo, SP" },
    { id: 14, name: "GUT Criatividade", category: "Criatividade", location: "São Paulo, SP" },
    { id: 15, name: "DAVID", category: "Boutique Criativa", location: "São Paulo, SP" },
    { id: 16, name: "Soko", category: "Earned Media / PR Criativo", location: "São Paulo, SP" },
    { id: 17, name: "CP+B Brasil", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 18, name: "Tech and Soul", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 19, name: "Suno United Creators", category: "Criatividade & Performance", location: "São Paulo, SP" },
    { id: 20, name: "Propeg", category: "Publicidade / Governo", location: "Brasília, DF / SP" },
    { id: 21, name: "Nova/sb", category: "Comunicação Pública", location: "São Paulo, SP / DF" },
    { id: 22, name: "Binder", category: "Publicidade / Varejo", location: "Rio de Janeiro, RJ" },
    { id: 23, name: "MullenLowe Brasil", category: "Publicidade Full Service", location: "São Paulo, SP" },
    { id: 24, name: "FCB Brasil", category: "Publicidade & Dados", location: "São Paulo, SP" },
    { id: 25, name: "Ampfy", category: "Full Service / Digital", location: "São Paulo, SP" },
    { id: 26, name: "Mynd8", category: "Marketing de Influência", location: "São Paulo, SP" },
    { id: 27, name: "Play9", category: "Creator Economy", location: "Rio de Janeiro, RJ" },
    { id: 28, name: "Spark", category: "Marketing de Influência", location: "São Paulo, SP" },
    { id: 29, name: "Non Stop", category: "Agenciamento (Talentos)", location: "São Paulo, SP" },
    { id: 30, name: "Brunch", category: "Influência com Propósito", location: "São Paulo, SP" },
    { id: 31, name: "MField", category: "Marketing de Influência", location: "São Paulo, SP" },
    { id: 32, name: "Squid", category: "Tecnologia & Influência", location: "São Paulo, SP" },
    { id: 33, name: "Influency.me", category: "Plataforma & Influência", location: "São Paulo, SP" },
    { id: 34, name: "Chango", category: "Creator House / GenZ", location: "São Paulo, SP" },
    { id: 35, name: "Farol", category: "Agenciamento Artístico", location: "Rio de Janeiro, RJ" },
    { id: 36, name: "Banca Digital", category: "Rede de Páginas Virais", location: "São Paulo, SP" },
    { id: 37, name: "CoCreators", category: "Marketing de Influência", location: "São Paulo, SP" },
    { id: 38, name: "Post2B", category: "Plataforma de Conexão", location: "Rio de Janeiro, RJ" },
    { id: 39, name: "Tubelab", category: "Vídeo Online / YouTube", location: "São Paulo, SP" },
    { id: 40, name: "Melina Tavares", category: "PR & Agenciamento", location: "São Paulo, SP" },
    { id: 41, name: "Lema+", category: "PR & Cultura", location: "São Paulo, SP" },
    { id: 42, name: "Map Brasil", category: "Agenciamento Artístico", location: "São Paulo, SP" },
    { id: 43, name: "Music2", category: "Música & Entretenimento", location: "São Paulo, SP" },
    { id: 44, name: "Nice House", category: "Content House", location: "São Paulo, SP" },
    { id: 45, name: "Curta", category: "Agência de Creators", location: "São Paulo, SP" },
    { id: 46, name: "Raccoon.Monks", category: "Performance & Mídia", location: "São Carlos, SP" },
    { id: 47, name: "Cadastra", category: "Performance & Consultoria", location: "São Paulo, SP" },
    { id: 48, name: "Mirum Digital", category: "Digital & Inovação", location: "Curitiba, PR / SP" },
    { id: 49, name: "Jüssi", category: "Digital / UX", location: "São Paulo, SP" },
    { id: 50, name: "Corebiz", category: "E-commerce & Tecnologia", location: "Barueri (Alphaville), SP" },
  ]
};

export default function DiscoverPage({ onBack, onSignup }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredResults = useMemo(() => {
    let results: any[] = [];
    if (activeTab === 'all' || activeTab === 'influencers') results = [...results, ...DATABASE.influencers.map(i => ({...i, type: 'influencer'}))];
    if (activeTab === 'all' || activeTab === 'brands') results = [...results, ...DATABASE.brands.map(b => ({...b, type: 'brand'}))];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return results.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.niche && item.niche.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q))
      );
    }
    return results;
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-black text-white font-sans text-left selection:bg-thedeal-gold selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <BriefcaseIcon size={18} className="text-black" />
              </div>
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
            <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10">
            <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-32">
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-2 rounded-full border border-thedeal-gold/20">
            <Globe className="w-4 h-4 text-thedeal-gold" />
            <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest">Base de Dados da Rede v3.0</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            EXPLORE O <br/> <span className="text-thedeal-gold">MERCADO ALPHA.</span>
          </h1>
          <p className="text-thedeal-gray400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Localize os 50 maiores players de publicidade e influência do país por nicho e localização geográfica.
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-thedeal-gray600 group-focus-within:text-thedeal-gold transition-colors" size={22} />
            <input
              type="text"
              placeholder="Ex: 'São Paulo', 'Marketing de Influência' ou nome da agência..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-thedeal-card border border-white/5 rounded-[2rem] pl-16 pr-8 py-6 text-white focus:border-thedeal-gold/50 outline-none font-bold text-lg shadow-2xl transition-all"
            />
          </div>
          <div className="mt-4 flex justify-center">
             <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">{filteredResults.length} Registros Encontrados</p>
          </div>
        </div>

        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide justify-center">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'influencers', label: 'Criadores' },
            { id: 'brands', label: 'Agências & Marcas' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${activeTab === tab.id ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-thedeal-card text-thedeal-gray600 border-white/5 hover:border-white/10'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResults.map((item) => (
            <div 
              key={`${item.type}-${item.id}`} 
              className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-thedeal-gold/30 transition-all group shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {item.type === 'influencer' ? <Users size={120} /> : <Building2 size={120} />}
              </div>
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${item.type === 'influencer' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-thedeal-gold/10 text-thedeal-gold border-thedeal-gold/20'}`}>
                      {item.type === 'influencer' ? 'Criador' : 'Agência / Marca'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-2 group-hover:text-thedeal-gold transition-colors">{item.name}</h3>
                  <p className="text-thedeal-gray400 text-[10px] font-black uppercase tracking-[0.4em] line-clamp-1">{item.niche || item.category}</p>
                </div>

                <div className="flex items-center gap-2 text-thedeal-gray600 bg-black/40 p-3 rounded-xl border border-white/5">
                  <MapPin size={14} className="text-thedeal-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{item.location}</span>
                </div>

                {item.type === 'influencer' && (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Reach Alpha</p>
                    <p className="text-2xl font-black text-white">{item.followers}</p>
                  </div>
                )}
              </div>

              <button 
                onClick={onSignup}
                className="mt-8 w-full py-4 rounded-xl border border-white/5 bg-white/5 text-white font-black uppercase text-[9px] tracking-widest hover:bg-thedeal-gold hover:text-black transition-all active:scale-95"
              >
                Solicitar Conexão
              </button>
            </div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-32 bg-thedeal-card rounded-[3rem] border border-white/5">
            <Info size={48} className="mx-auto text-thedeal-gray700 mb-6" />
            <p className="text-thedeal-gray400 font-black uppercase tracking-[0.3em] text-sm">Nenhum player encontrado para sua busca.</p>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-30 px-6 space-y-4">
        <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.6em]">
            THE DEAL DISCOVER TERMINAL • © 2025 • REDE PRIVADA • ACESSO ALPHA
        </p>
        <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
            OS DADOS REPRESENTAM O CENÁRIO DE MARCAS E AGÊNCIAS DE MAIOR RELEVÂNCIA NO MERCADO BRASILEIRO.
        </p>
      </footer>
    </div>
  );
}
