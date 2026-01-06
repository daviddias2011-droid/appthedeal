
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
    // 2. Fitness & Saúde
    { id: 21, name: "Renato Cariani", niche: "Fitness", location: "São Paulo", followers: "8M", verified: true },
    { id: 22, name: "Paulo Muzy", niche: "Fitness", location: "São Paulo", followers: "8.5M", verified: true },
    { id: 23, name: "Gracyanne Barbosa", niche: "Fitness", location: "Rio de Janeiro", followers: "11M", verified: true },
    { id: 24, name: "Leo Stronda", niche: "Fitness", location: "Rio de Janeiro", followers: "4M", verified: true },
    { id: 25, name: "Juju Salimeni", niche: "Fitness", location: "São Paulo", followers: "20M", verified: true },
    // 3. Finanças & Negócios
    { id: 41, name: "Thiago Nigro (Primo Rico)", niche: "Finanças", location: "São Paulo", followers: "9M", verified: true },
    { id: 42, name: "Nathalia Arcuri (Me Poupe!)", niche: "Finanças", location: "São Paulo", followers: "4M", verified: true },
    { id: 43, name: "Bruno Perini", niche: "Finanças", location: "São Paulo", followers: "3.5M", verified: true },
    { id: 44, name: "Nath Finanças", niche: "Finanças", location: "Rio de Janeiro", followers: "600K", verified: true },
    { id: 45, name: "Charles Mendlowicz", niche: "Finanças", location: "Minas Gerais", followers: "1M", verified: true },
    // 4. Humor & Comédia
    { id: 61, name: "Whindersson Nunes", niche: "Humor", location: "São Paulo/Piauí", followers: "59M", verified: true },
    { id: 62, name: "Tatá Werneck", niche: "Humor", location: "Rio de Janeiro", followers: "57M", verified: true },
    { id: 63, name: "Tirullipa", niche: "Humor", location: "Fortaleza/SP", followers: "30M", verified: true },
    { id: 64, name: "GKAY", niche: "Humor", location: "São Paulo", followers: "19M", verified: true },
    { id: 65, name: "Lucas Rangel", niche: "Humor", location: "Belo Horizonte/SP", followers: "20M", verified: true },
    // 5. Games & E-Sports
    { id: 81, name: "Nobru", niche: "Games", location: "São Paulo", followers: "14M", verified: true },
    { id: 82, name: "Cerol", niche: "Games", location: "Rio de Janeiro", followers: "9M", verified: true },
    { id: 83, name: "Loud Coringa", niche: "Games", location: "São Paulo", followers: "12M", verified: true },
    { id: 84, name: "PlayHard", niche: "Games", location: "São Paulo", followers: "13M", verified: true },
    { id: 85, name: "Alanzoka", niche: "Games", location: "São Paulo", followers: "3M", verified: true },
    // 6. Gastronomia & Culinária
    { id: 101, name: "Paola Carosella", niche: "Gastronomia", location: "São Paulo", followers: "6M", verified: true },
    { id: 102, name: "Erick Jacquin", niche: "Gastronomia", location: "São Paulo", followers: "3M", verified: true },
    { id: 103, name: "Rita Lobo", niche: "Gastronomia", location: "São Paulo", followers: "2.5M", verified: true },
    { id: 104, name: "Rodrigo Hilbert", niche: "Gastronomia", location: "Rio de Janeiro", followers: "5M", verified: true },
    { id: 105, name: "Ana Maria Braga", niche: "Gastronomia", location: "São Paulo", followers: "13M", verified: true },
    // 7. Moda & Lifestyle
    { id: 121, name: "Jade Picon", niche: "Moda", location: "Rio de Janeiro", followers: "22M", verified: true },
    { id: 122, name: "Thássia Naves", niche: "Moda", location: "Uberlândia (MG)", followers: "4M", verified: true },
    { id: 123, name: "Camila Coelho", niche: "Moda", location: "Miami/MG", followers: "10M", verified: true },
    { id: 124, name: "Malu Borges", niche: "Moda", location: "Rio de Janeiro", followers: "2M", verified: true },
    { id: 125, name: "Flavia Pavanelli", niche: "Moda", location: "São Paulo", followers: "19M", verified: true },
    // 8. Tecnologia & Ciência
    { id: 141, name: "Iberê (Manual do Mundo)", niche: "Tecnologia", location: "São Paulo", followers: "6M", verified: true },
    { id: 142, name: "Coisa de Nerd (Leon)", niche: "Tecnologia", location: "Vancouver (Canadá)", followers: "3M", verified: true },
    { id: 143, name: "Átila Iamarino", niche: "Ciência", location: "São Paulo", followers: "1.5M", verified: true },
    { id: 144, name: "Sérgio Sacani (SpaceToday)", niche: "Ciência", location: "São Paulo", followers: "2M", verified: true },
    { id: 145, name: "Pedro Loos (Ciência Td Dia)", niche: "Ciência", location: "Santa Catarina", followers: "800K", verified: true },
    // 9. Viagem & Turismo
    { id: 161, name: "Estevam Pelo Mundo", niche: "Viagem", location: "Campinas/Mundo", followers: "2.5M", verified: true },
    { id: 162, name: "Emilim Schmitz", niche: "Viagem", location: "SC/Mundo", followers: "2M", verified: true },
    { id: 163, name: "Carioca no Mundo (Jayme)", niche: "Viagem", location: "Rio de Janeiro", followers: "1M", verified: true },
    { id: 164, name: "Eliezer", niche: "Viagem", location: "São Paulo", followers: "3.5M", verified: true },
    { id: 165, name: "Mundo Sem Fim", niche: "Viagem", location: "Mundo (Itinerante)", followers: "1M", verified: true },
    // 10. Maternidade & Família
    { id: 181, name: "Viih Tube", niche: "Maternidade", location: "São Paulo", followers: "33M", verified: true },
    { id: 182, name: "Tata Fersoza", niche: "Maternidade", location: "Rio de Janeiro", followers: "15M", verified: true },
    { id: 183, name: "Giovanna Ewbank", niche: "Maternidade", location: "Rio de Janeiro", followers: "30M", verified: true },
    { id: 184, name: "Andressa Suita", niche: "Maternidade", location: "Goiânia", followers: "15M", verified: true },
    { id: 185, name: "Lore Improta", niche: "Maternidade", location: "Salvador", followers: "16M", verified: true },
  ],
  brands: [
    // 1. Beleza & Cosméticos
    { id: 1001, name: "O Boticário", category: "Beleza", location: "São Paulo, SP", verified: true },
    { id: 1002, name: "Natura", category: "Beleza", location: "São Paulo, SP", verified: true },
    { id: 1003, name: "Sephora Brasil", category: "Beleza", location: "São Paulo, SP", verified: true },
    { id: 1004, name: "Avon", category: "Beleza", location: "São Paulo, SP", verified: true },
    { id: 1005, name: "MAC Cosmetics", category: "Beleza", location: "São Paulo, SP", verified: true },
    // 2. Fitness & Suplementação
    { id: 1021, name: "Nike", category: "Fitness", location: "São Paulo, SP", verified: true },
    { id: 1022, name: "Adidas", category: "Fitness", location: "São Paulo, SP", verified: true },
    { id: 1023, name: "Puma", category: "Fitness", location: "São Paulo, SP", verified: true },
    { id: 1024, name: "Smart Fit", category: "Fitness", location: "São Paulo, SP", verified: true },
    { id: 1025, name: "Growth Supplements", category: "Fitness", location: "São Paulo, SP", verified: true },
    // 3. Finanças & Bancos
    { id: 1041, name: "Nubank", category: "Finanças", location: "São Paulo, SP", verified: true },
    { id: 1042, name: "Banco Inter", category: "Finanças", location: "Belo Horizonte, MG", verified: true },
    { id: 1043, name: "XP Investimentos", category: "Finanças", location: "São Paulo, SP", verified: true },
    { id: 1044, name: "C6 Bank", category: "Finanças", location: "São Paulo, SP", verified: true },
    { id: 1045, name: "Itaú", category: "Finanças", location: "São Paulo, SP", verified: true },
    // 4. Alimentos, Bebidas & Fast Food
    { id: 1061, name: "Coca-Cola", category: "Alimentos", location: "São Paulo, SP", verified: true },
    { id: 1062, name: "Ambev", category: "Alimentos", location: "São Paulo, SP", verified: true },
    { id: 1063, name: "iFood", category: "Alimentos", location: "São Paulo, SP", verified: true },
    { id: 1064, name: "McDonald's", category: "Alimentos", location: "São Paulo, SP", verified: true },
    { id: 1065, name: "Red Bull", category: "Alimentos", location: "São Paulo, SP", verified: true },
    // 5. Games & Tecnologia Gamer
    { id: 1081, name: "PlayStation", category: "Games", location: "São Paulo, SP", verified: true },
    { id: 1082, name: "Xbox", category: "Games", location: "São Paulo, SP", verified: true },
    { id: 1083, name: "Razer", category: "Games", location: "São Paulo, SP", verified: true },
    { id: 1084, name: "Logitech G", category: "Games", location: "São Paulo, SP", verified: true },
    { id: 1085, name: "Kabum!", category: "Games", location: "Limeira, SP", verified: true },
    // 6. Eletrodomésticos & Casa
    { id: 1101, name: "Brastemp", category: "Casa", location: "São Paulo, SP", verified: true },
    { id: 1102, name: "Electrolux", category: "Casa", location: "São Paulo, SP", verified: true },
    { id: 1103, name: "KitchenAid", category: "Casa", location: "São Paulo, SP", verified: true },
    { id: 1104, name: "Tramontina", category: "Casa", location: "Carlos Barbosa, RS", verified: true },
    { id: 1105, name: "Tok&Stok", category: "Casa", location: "São Paulo, SP", verified: true },
    // 7. Moda & Varejo
    { id: 1121, name: "Renner", category: "Varejo", location: "Porto Alegre, RS", verified: true },
    { id: 1122, name: "Riachuelo", category: "Varejo", location: "São Paulo, SP", verified: true },
    { id: 1123, name: "C&A", category: "Varejo", location: "São Paulo, SP", verified: true },
    { id: 1124, name: "Zara", category: "Varejo", location: "São Paulo, SP", verified: true },
    { id: 1125, name: "Shein", category: "Varejo", location: "Internacional", verified: true },
    // 8. Tecnologia de Consumo
    { id: 1141, name: "Samsung", category: "Tecnologia", location: "São Paulo, SP", verified: true },
    { id: 1142, name: "Apple", category: "Tecnologia", location: "São Paulo, SP", verified: true },
    { id: 1143, name: "Xiaomi", category: "Tecnologia", location: "São Paulo, SP", verified: true },
    { id: 1144, name: "Amazon", category: "Tecnologia", location: "São Paulo, SP", verified: true },
    { id: 1145, name: "Google", category: "Tecnologia", location: "São Paulo, SP", verified: true },
    // 9. Viagem & Turismo
    { id: 1161, name: "Latam Airlines", category: "Viagem", location: "São Paulo, SP", verified: true },
    { id: 1162, name: "Gol", category: "Viagem", location: "São Paulo, SP", verified: true },
    { id: 1163, name: "Azul", category: "Viagem", location: "São Paulo, SP", verified: true },
    { id: 1164, name: "CVC", category: "Viagem", location: "São Paulo, SP", verified: true },
    { id: 1165, name: "Booking.com", category: "Viagem", location: "Internacional", verified: true },
    // 10. Maternidade & Infantil
    { id: 1181, name: "Pampers", category: "Maternidade", location: "São Paulo, SP", verified: true },
    { id: 1182, name: "Huggies", category: "Maternidade", location: "São Paulo, SP", verified: true },
    { id: 1183, name: "Fisher-Price", category: "Maternidade", location: "São Paulo, SP", verified: true },
    { id: 1184, name: "Lego", category: "Maternidade", location: "São Paulo, SP", verified: true },
    { id: 1185, name: "Ri Happy", category: "Maternidade", location: "São Paulo, SP", verified: true },
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
      return results.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.niche && item.niche.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
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
            placeholder="Buscar por nome, nicho ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white focus:border-thedeal-gold/50 outline-none font-bold placeholder:text-zinc-700"
          />
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setActiveTab('all')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Todos</button>
          <button onClick={() => setActiveTab('influencers')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'influencers' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Influenciadores</button>
          <button onClick={() => setActiveTab('brands')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'brands' ? 'bg-white text-black' : 'bg-zinc-900 text-thedeal-gray600'}`}>Marcas</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? filteredResults.map(item => (
            <div key={item.id} className="bg-zinc-950 border border-white/5 rounded-[2rem] p-8 hover:border-thedeal-gold/30 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-xl text-thedeal-gold">{item.name.charAt(0)}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-thedeal-gold border border-thedeal-gold/20 px-2 py-1 rounded-full">atualizado em jan/2026</div>
                </div>
                <h3 className="text-lg font-black text-white uppercase group-hover:text-thedeal-gold transition-colors leading-tight">{item.name}</h3>
                <p className="text-[10px] text-thedeal-gray600 uppercase font-black tracking-widest mt-2">{item.niche || item.category}</p>
                <p className="text-[9px] text-thedeal-gray700 font-bold uppercase mt-1 flex items-center gap-1">
                   <MapPin size={10} /> {item.location}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
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
          )) : (
            <div className="col-span-full py-20 text-center opacity-30">
               <Search size={48} className="mx-auto mb-4" />
               <p className="text-xs font-black uppercase tracking-widest">Nenhum resultado para "{searchQuery}"</p>
            </div>
          )}
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
