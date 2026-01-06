
import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Users, Building2, ChevronDown, ArrowLeft, Globe, CheckCircle2, Award, Info } from 'lucide-react';
import { BriefcaseIcon } from './Icons';

interface DiscoverPageProps {
  onBack: () => void;
  onSignup: () => void;
}

const DATABASE = {
  influencers: [
    // 1. Beleza & Maquiagem
    { id: 1, name: "Mari Maria", niche: "Beleza", location: "Brasília/SP", followers: "22M", verified: true },
    { id: 2, name: "Boca Rosa (Bianca)", niche: "Beleza", location: "São Paulo", followers: "19M", verified: true },
    { id: 3, name: "Niina Secrets", niche: "Beleza", location: "São Paulo", followers: "4M", verified: true },
    { id: 4, name: "Franciny Ehlke", niche: "Beleza", location: "Curitiba/SP", followers: "16M", verified: true },
    { id: 5, name: "Bruna Tavares", niche: "Beleza", location: "Campinas (SP)", followers: "3.5M", verified: true },
    { id: 6, name: "Camila Loures", niche: "Beleza", location: "Belo Horizonte", followers: "19M", verified: true },
    { id: 7, name: "Mari Saad", niche: "Beleza", location: "São Paulo", followers: "3.9M", verified: true },
    { id: 8, name: "Evelyn Regly", niche: "Beleza", location: "Rio de Janeiro", followers: "7M", verified: true },
    
    // 2. Fitness & Saúde
    { id: 21, name: "Renato Cariani", niche: "Fitness", location: "São Paulo", followers: "8M", verified: true },
    { id: 22, name: "Paulo Muzy", niche: "Fitness", location: "São Paulo", followers: "8.5M", verified: true },
    { id: 23, name: "Gracyanne Barbosa", niche: "Fitness", location: "Rio de Janeiro", followers: "11M", verified: true },
    { id: 24, name: "Leo Stronda", niche: "Fitness", location: "Rio de Janeiro", followers: "4M", verified: true },
    { id: 25, name: "Juju Salimeni", niche: "Fitness", location: "São Paulo", followers: "20M", verified: true },
    { id: 26, name: "Dr. Barakat", niche: "Saúde", location: "São Paulo", followers: "3M", verified: true },
    
    // 3. Finanças & Negócios
    { id: 41, name: "Thiago Nigro", niche: "Finanças", location: "São Paulo", followers: "9M", verified: true },
    { id: 42, name: "Nathalia Arcuri", niche: "Finanças", location: "São Paulo", followers: "4M", verified: true },
    { id: 43, name: "Bruno Perini", niche: "Finanças", location: "São Paulo", followers: "3.5M", verified: true },
    { id: 44, name: "Carol Dias", niche: "Finanças", location: "São Paulo", followers: "7M", verified: true },
    { id: 45, name: "Breno Perrucho", niche: "Finanças", location: "Rio de Janeiro", followers: "700K", verified: true },
    
    // 4. Humor & Comédia
    { id: 61, name: "Whindersson Nunes", niche: "Humor", location: "São Paulo/Piauí", followers: "59M", verified: true },
    { id: 62, name: "Tatá Werneck", niche: "Humor", location: "Rio de Janeiro", followers: "57M", verified: true },
    { id: 63, name: "Tirullipa", niche: "Humor", location: "Fortaleza/SP", followers: "30M", verified: true },
    { id: 64, name: "Lucas Rangel", niche: "Humor", location: "Belo Horizonte/SP", followers: "20M", verified: true },
    { id: 65, name: "GKAY", niche: "Humor", location: "São Paulo", followers: "19M", verified: true },
    
    // 5. Games & E-Sports
    { id: 81, name: "Nobru", niche: "Games", location: "São Paulo", followers: "14M", verified: true },
    { id: 82, name: "Cerol", niche: "Games", location: "Rio de Janeiro", followers: "9M", verified: true },
    { id: 83, name: "Loud Coringa", niche: "Games", location: "São Paulo", followers: "12M", verified: true },
    { id: 84, name: "PlayHard", niche: "Games", location: "São Paulo", followers: "13M", verified: true },
    { id: 85, name: "Alanzoka", niche: "Games", location: "São Paulo", followers: "3M", verified: true },
    
    // 6. Gastronomia & Culinária
    { id: 101, name: "Paola Carosella", niche: "Gastronomia", location: "São Paulo", followers: "6M", verified: true },
    { id: 102, name: "Erick Jacquin", niche: "Gastronomia", location: "São Paulo", followers: "3M", verified: true },
    { id: 103, name: "Rodrigo Hilbert", niche: "Lifestyle", location: "Rio de Janeiro", followers: "5M", verified: true },
    { id: 104, name: "Ana Maria Braga", niche: "Gastronomia", location: "São Paulo", followers: "13M", verified: true },
    { id: 105, name: "Rita Lobo", niche: "Gastronomia", location: "São Paulo", followers: "2.5M", verified: true },
    
    // 7. Moda & Lifestyle
    { id: 121, name: "Jade Picon", niche: "Moda", location: "Rio de Janeiro", followers: "22M", verified: true },
    { id: 122, name: "Flavia Pavanelli", niche: "Moda", location: "São Paulo", followers: "19M", verified: true },
    { id: 123, name: "Camila Coelho", niche: "Moda", location: "Miami/MG", followers: "10M", verified: true },
    { id: 124, name: "Nah Cardoso", niche: "Moda", location: "São Paulo", followers: "10M", verified: true },
    { id: 125, name: "Silvia Braz", niche: "Moda", location: "Rio de Janeiro/SP", followers: "1.5M", verified: true },
    
    // 8. Tecnologia & Ciência
    { id: 141, name: "Iberê (Manual do Mundo)", niche: "Tecnologia", location: "São Paulo", followers: "6M", verified: true },
    { id: 142, name: "Coisa de Nerd (Leon)", niche: "Tecnologia", location: "Vancouver", followers: "3M", verified: true },
    { id: 143, name: "Sérgio Sacani", niche: "Ciência", location: "São Paulo", followers: "2M", verified: true },
    { id: 144, name: "TecMundo", niche: "Tecnologia", location: "São Paulo", followers: "2.5M", verified: true },
    { id: 145, name: "Átila Iamarino", niche: "Ciência", location: "São Paulo", followers: "1.5M", verified: true },
    
    // 9. Viagem & Turismo
    { id: 161, name: "Estevam Pelo Mundo", niche: "Viagem", location: "Campinas", followers: "2.5M", verified: true },
    { id: 162, name: "Panda (Passagens Imp.)", niche: "Viagem", location: "Campo Grande", followers: "5M", verified: true },
    { id: 163, name: "Eliezer", niche: "Lifestyle", location: "São Paulo", followers: "3.5M", verified: true },
    { id: 164, name: "Emilim Schmitz", niche: "Viagem", location: "SC/Mundo", followers: "2M", verified: true },
    
    // 10. Maternidade & Família
    { id: 181, name: "Viih Tube", niche: "Maternidade", location: "São Paulo", followers: "33M", verified: true },
    { id: 182, name: "Giovanna Ewbank", niche: "Maternidade", location: "Rio de Janeiro", followers: "30M", verified: true },
    { id: 183, name: "Lore Improta", niche: "Maternidade", location: "Salvador", followers: "16M", verified: true },
    { id: 184, name: "Andressa Suita", niche: "Maternidade", location: "Goiânia", followers: "15M", verified: true },
    { id: 185, name: "Tata Fersoza", niche: "Maternidade", location: "Rio de Janeiro", followers: "15M", verified: true },
  ],
  brands: [
    { id: 1001, name: "Natura", category: "Beleza", location: "São Paulo, SP", verified: true },
    { id: 1002, name: "Nubank", category: "Fintech", location: "São Paulo, SP", verified: true },
    { id: 1003, name: "Shopee Brasil", category: "E-commerce", location: "São Paulo, SP", verified: true },
    { id: 1004, name: "Magalu", category: "Varejo", location: "São Paulo, SP", verified: true },
    { id: 1005, name: "SIGAPAY", category: "Fintech", location: "São Paulo, SP", verified: true },
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
      return results.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return results;
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-black text-white font-sans text-left">
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
                <div className="text-[8px] font-black uppercase tracking-widest text-thedeal-gold border border-thedeal-gold/20 px-2 py-1 rounded-full">atualizado em jan/2026</div>
              </div>
              <h3 className="text-lg font-black text-white uppercase group-hover:text-thedeal-gold transition-colors">{item.name}</h3>
              <p className="text-[10px] text-thedeal-gray600 uppercase font-black tracking-widest mt-1">{item.niche || item.category}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[8px] font-black text-thedeal-gray600 uppercase mb-1">Alcance</p>
                  <p className="text-sm font-bold text-white">{item.followers || 'Confidencial'}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-thedeal-gray600 uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-thedeal-gold uppercase tracking-tighter">Verified</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-32 pt-12 border-t border-white/10 space-y-12 pb-20">
            <div className="flex flex-col md:flex-row gap-8 items-start opacity-40">
                <Info size={24} className="text-thedeal-gold shrink-0" />
                <p className="text-[10px] text-thedeal-gray400 leading-relaxed font-medium uppercase text-justify">
                    O The Deal é uma plataforma independente. Todas as marcas comerciais e logotipos apresentados nesta lista são de propriedade de seus respectivos detentores e são utilizados aqui apenas para fins informativos e de identificação (uso nominativo). Não há afiliação, patrocínio ou endosso oficial entre o The Deal e as marcas listadas, salvo indicação expressa.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <p className="text-[8px] font-black text-thedeal-gray600 uppercase tracking-[0.5em]">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
                    <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em]">A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR</p>
                </div>
                <div className="flex gap-8">
                    <a href="mailto:suporte@thedeal.com.br" className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest hover:underline decoration-thedeal-gold underline-offset-4">Apagar Dados</a>
                    <button onClick={onSignup} className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest hover:underline decoration-thedeal-gold underline-offset-4">Atualizar Dados</button>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
