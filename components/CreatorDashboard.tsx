import React, { useState } from 'react';
// FIX: Corrected import path for types.
import { User, Deal, PortfolioItem, Transaction } from '../types';
import StatCard from './StatCard';
import { BriefcaseIcon, CheckCircleIcon, BarChartIcon, StarIcon, VideoIcon, ImageIcon, PlusCircleIcon } from './Icons';
import DealCard from './DealCard';


interface CreatorDashboardProps {
    user: User;
    deals: Deal[];
    allPortfolioItems: PortfolioItem[];
    allTransactions: Transaction[];
    onAddPortfolioItem: () => void;
    onViewDealDetails: (deal: Deal) => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ user, deals, allPortfolioItems, allTransactions, onAddPortfolioItem, onViewDealDetails }) => {
    const [expandedStat, setExpandedStat] = useState<string | null>(null);

    const handleStatClick = (label: string) => {
        setExpandedStat(current => (current === label ? null : label));
    };

    const myPortfolio = allPortfolioItems.filter(item => item.creatorId === user.id);
    const myInProgressDeals = deals.filter(d => d.creatorId === user.id && d.status === 'in progress');
    const recommendedDeals = deals.filter(d => d.status === 'active' && !d.creatorId).slice(0, 2);
    const completedDeals = deals.filter(deal => deal.status === 'completed' && deal.creatorId === user.id);

    const totalValue = allTransactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
    return (
         <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {myInProgressDeals.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Deals em Andamento</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myInProgressDeals.map(deal => (
                                    <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails} />
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Novas Oportunidades</h2>
                        {recommendedDeals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {recommendedDeals.map(deal => (
                                    <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails} />
                                ))}
                            </div>
                        ) : (
                             <div className="text-center py-10 bg-brand-gray border border-brand-border rounded-lg">
                                <p className="text-brand-text-secondary">Nenhuma nova oportunidade no momento. Volte em breve!</p>
                            </div>
                        )}
                    </section>

                    <section>
                            <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Meu Portfólio</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {myPortfolio.slice(0,5).map((item) => (
                                <div key={item.id} className="group aspect-square bg-brand-gray border border-brand-border rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <div className="flex flex-col items-center justify-center text-brand-text-secondary transition-transform group-hover:scale-110">
                                        {item.type === 'video' ? <VideoIcon className="w-10 h-10"/> : <ImageIcon className="w-10 h-10"/>}
                                    </div>
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                        <p className="font-bold text-white text-sm">{item.title}</p>
                                        <p className="text-xs text-brand-primary font-bold">{item.metric}</p>
                                    </div>
                                </div>
                            ))}
                            <button onClick={onAddPortfolioItem} className="aspect-square bg-transparent border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-brand-gray hover:border-brand-primary/50 text-brand-text-secondary hover:text-white transition-colors">
                                <PlusCircleIcon className="w-8 h-8"/>
                                <span className="text-sm mt-2 font-semibold">Adicionar</span>
                            </button>
                        </div>
                    </section>
                </div>
                <aside className="space-y-4">
                        <section>
                                <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Meus Dados</h2>
                                <div className="space-y-3">
                                <StatCard 
                                    icon={<BriefcaseIcon className="w-5 h-5"/>} 
                                    label="Deals Concluídos" 
                                    value={String(user.dealsCompleted)} 
                                    colorClass="bg-brand-primary/10 text-brand-primary"
                                    tooltipText="Número total de jobs finalizados e aprovados pelas marcas."
                                    onClick={() => handleStatClick('Deals Concluídos')}
                                    isExpanded={expandedStat === 'Deals Concluídos'}
                                >
                                    <ul className="text-sm space-y-2">
                                        {completedDeals.slice(0, 3).map(deal => (
                                            <li key={deal.id} className="flex justify-between items-center text-brand-text-secondary">
                                                <span className="truncate max-w-[120px]">{deal.title}</span>
                                                <span className="font-bold text-white">{currencyFormatter.format(deal.value)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </StatCard>
                                <StatCard 
                                    icon={<BarChartIcon className="w-5 h-5"/>} 
                                    label="Valor Total (BRL)" 
                                    value={currencyFormatter.format(totalValue)} 
                                    colorClass="bg-brand-primary/10 text-brand-primary"
                                    tooltipText="Soma de todos os pagamentos recebidos por deals fechados na plataforma."
                                    onClick={() => handleStatClick('Valor Total')}
                                    isExpanded={expandedStat === 'Valor Total'}
                                >
                                    <p className="text-xs text-brand-text-secondary">Seus últimos ganhos:</p>
                                    <ul className="text-sm space-y-1 mt-1">
                                        {allTransactions.filter(t => t.type === 'credit').slice(0, 2).map(tx => (
                                            <li key={tx.id} className="flex justify-between items-center text-brand-text-secondary">
                                                <span className="truncate max-w-[120px]">{tx.description}</span>
                                                <span className="font-bold text-green-400">{currencyFormatter.format(tx.amount)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </StatCard>
                                <StatCard 
                                    icon={<CheckCircleIcon className="w-5 h-5"/>} 
                                    label="Taxa de Sucesso" 
                                    value={`${Math.round((user.rating || 0) / 5 * 100)}%`}
                                    colorClass="bg-brand-primary/10 text-brand-primary"
                                    tooltipText="Sua avaliação média convertida em porcentagem. Baseado em feedback das marcas parceiras."
                                    onClick={() => handleStatClick('Taxa de Sucesso')}
                                    isExpanded={expandedStat === 'Taxa de Sucesso'}
                                >
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i}>
                                                <StarIcon isFilled={i < Math.round(user.rating || 0)} className={`w-4 h-4 ${i < Math.round(user.rating || 0) ? 'text-brand-primary' : 'text-brand-border'}`} />
                                            </div>
                                        ))}
                                        <span className="text-sm font-bold text-white">{user.rating?.toFixed(1)} de 5.0</span>
                                    </div>
                                    <p className="text-xs text-brand-text-secondary mt-1">Baseado em {user.reviews} avaliações de marcas.</p>
                                </StatCard>
                                </div>
                        </section>
                </aside>
            </div>
        </div>
    );
}

export default CreatorDashboard;