
import React, { useState, useMemo } from 'react';
import { Deal, User, UserType } from '../types';
import DealCard from './DealCard';
import { Search, Filter, Sliders, Check, Target, Zap, Clock, DollarSign, ArrowRight, X } from 'lucide-react';

interface DealsPageProps {
  deals: Deal[];
  onViewDetails: (deal: Deal) => void;
  currentUserLocation: { lat: number; lon: number } | null;
  allUsers: User[];
  onAddDeal: () => void;
  userType: UserType;
}

const MOCK_MARKETPLACE: Deal[] = [
  // FIX: Added missing description to MOCK_MARKETPLACE deals
  { id: 'm1', title: 'Publi Stories - Marca de Moda', description: 'Campanha de stories focada no lançamento da coleção Outono/Inverno.', value: 4500, status: 'active', brand: { name: 'Moda Elite', logoUrl: 'https://picsum.photos/seed/moda/40/40' }, matchScore: 87, deadline: '7 dias', requirements: ['3 Stories', '1 Feed'] },
  { id: 'm2', title: 'Campanha Fintech Lançamento', description: 'Promoção de nova funcionalidade de cashback para usuários Prime.', value: 12000, status: 'active', brand: { name: 'Bank Alpha', logoUrl: 'https://picsum.photos/seed/bank/40/40' }, matchScore: 94, deadline: '15 dias', requirements: ['1 Vídeo YouTube', 'Link na Bio'] },
  { id: 'm3', title: 'Review Suplemento Premium', description: 'Testagem e review honesto de novo pré-treino focado em performance.', value: 2800, status: 'active', brand: { name: 'Glow Wellness', logoUrl: 'https://picsum.photos/seed/glow/40/40' }, matchScore: 72, deadline: '5 dias', requirements: ['1 Reel'] },
];

const DealsPage: React.FC<DealsPageProps> = ({ userType, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valueRange, setValueRange] = useState(50000);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const niches = ['Moda', 'Beleza', 'Fitness', 'Tech', 'Finanças'];

  const filteredDeals = useMemo(() => {
    return MOCK_MARKETPLACE.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesValue = deal.value <= valueRange;
      const matchesNiche = selectedNiches.length === 0 || selectedNiches.some(n => deal.title.toLowerCase().includes(n.toLowerCase()));
      return matchesSearch && matchesValue && matchesNiche;
    });
  }, [searchTerm, valueRange, selectedNiches]);

  const FilterContent = () => (
    <div className="space-y-10">
      <div className="flex items-center gap-2 mb-8">
        <Filter size={18} className="text-thedeal-gold" />
        <h3 className="text-xs font-black text-white uppercase tracking-widest">Filtros Alpha</h3>
      </div>

      {/* VALOR */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Valor do Deal</label>
          <span className="text-xs font-black text-thedeal-gold">R$ {valueRange.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="50000" 
          step="500"
          value={valueRange}
          onChange={(e) => setValueRange(parseInt(e.target.value))}
          className="w-full accent-thedeal-gold bg-thedeal-gray700 h-1 rounded-full cursor-pointer"
        />
      </div>

      {/* NICHO */}
      <div className="space-y-4">
          <label className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Nicho de Atuação</label>
          <div className="grid grid-cols-1 gap-2">
            {niches.map(n => (
              <button 
              key={n}
              onClick={() => setSelectedNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])}
              className={`flex items-center justify-between p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedNiches.includes(n) ? 'bg-thedeal-gold text-black border-thedeal-gold' : 'bg-black/40 border-white/5 text-thedeal-gray600 hover:border-white/10'}`}
              >
                {n}
                {selectedNiches.includes(n) && <Check size={12} />}
              </button>
            ))}
          </div>
      </div>

      <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all border border-white/10">Aplicar Filtros</button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-fade-in px-4 pb-32 text-left max-w-7xl mx-auto">
      {/* MOBILE FILTER TOGGLE */}
      <div className="lg:hidden flex items-center justify-between bg-thedeal-card p-4 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-thedeal-gold" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Filtros de Busca</span>
        </div>
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-thedeal-gold text-black font-black px-5 py-2 rounded-xl text-[9px] uppercase tracking-widest"
        >
          Editar
        </button>
      </div>

      {/* SIDEBAR FILTERS (DESKTOP) */}
      <aside className="hidden lg:block w-72 shrink-0 space-y-8">
        <div className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 shadow-2xl sticky top-24">
          <FilterContent />
        </div>

        <div className="bg-gradient-to-br from-thedeal-gold to-thedeal-goldDim p-8 rounded-[2.5rem] text-black shadow-2xl relative overflow-hidden group">
           <Zap size={32} className="mb-6 opacity-40" />
           <h4 className="text-xl font-black uppercase tracking-tight leading-tight mb-3">Pule a Fila</h4>
           <p className="text-[11px] font-bold leading-relaxed mb-8 opacity-80 uppercase tracking-widest">Torne-se PRO e feche contratos 10x mais rápido.</p>
           <button className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-transform hover:scale-[1.02]">Ver Planos</button>
        </div>
      </aside>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 p-8 animate-fade-in lg:hidden">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-black text-white uppercase tracking-widest">Refinar Busca</h3>
             <button onClick={() => setIsMobileFilterOpen(false)} className="text-white"><X size={24}/></button>
          </div>
          <FilterContent />
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 space-y-10">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-thedeal-gray600 group-focus-within:text-thedeal-gold transition-colors" size={24} />
          <input
            type="text"
            placeholder="Buscar por título, marca ou palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] pl-16 pr-8 py-6 text-white focus:border-thedeal-gold outline-none font-bold placeholder:text-zinc-700 shadow-2xl transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredDeals.map((deal) => (
            <div key={deal.id} className="bg-thedeal-card border border-thedeal-gray700 rounded-[3rem] p-10 hover:border-thedeal-gold/40 transition-all group flex flex-col justify-between shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-thedeal-gold/10 px-5 py-2.5 rounded-bl-3xl border-l border-b border-thedeal-gold/20">
                  <div className="flex items-center gap-2">
                    <Target size={14} className="text-thedeal-gold" />
                    <span className="text-[11px] font-black text-thedeal-gold uppercase tracking-tighter">Match: {deal.matchScore}%</span>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center font-black text-2xl text-thedeal-gold shadow-lg group-hover:scale-105 transition-transform">{deal.brand.name.charAt(0)}</div>
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-thedeal-gold transition-colors">{deal.title}</h3>
                      <p className="text-xs font-bold text-thedeal-gray600 uppercase tracking-[0.2em] mt-2">{deal.brand.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-thedeal-gold/5 flex items-center justify-center"><DollarSign size={16} className="text-thedeal-gold" /></div>
                        <div>
                          <p className="text-[9px] font-black text-thedeal-gray600 uppercase">Valor</p>
                          <p className="text-sm font-black text-white">R$ {deal.value.toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-thedeal-gold/5 flex items-center justify-center"><Clock size={16} className="text-thedeal-gold" /></div>
                        <div>
                          <p className="text-[9px] font-black text-thedeal-gray600 uppercase">Prazo</p>
                          <p className="text-sm font-black text-white">{deal.deadline}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                    {deal.requirements?.map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full shadow-[0_0_5px_rgba(201,169,97,0.5)]"></div>
                        <span className="text-xs font-bold text-thedeal-gray400 uppercase tracking-widest">{r}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="pt-10 flex gap-4">
                  <button 
                    onClick={() => onViewDetails(deal)}
                    className="flex-1 bg-thedeal-gold text-black py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-thedeal-gold/20 active:scale-95"
                  >
                    Aplicar Agora
                  </button>
                  <button 
                    onClick={() => onViewDetails(deal)}
                    className="px-6 border border-white/5 hover:bg-white/5 rounded-2xl transition-all"
                  >
                    <ArrowRight size={20} className="text-white"/>
                  </button>
               </div>
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="py-40 text-center flex flex-col items-center gap-6 animate-fade-in">
             <div className="p-8 bg-white/5 rounded-full"><Sliders size={64} className="text-thedeal-gray700" /></div>
             <div className="space-y-2">
                <p className="text-lg font-black uppercase tracking-[0.3em] text-white">Nenhum deal compatível</p>
                <p className="text-sm text-thedeal-gray600 font-bold uppercase tracking-widest">Ajuste os filtros ou o radar de busca.</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DealsPage;
