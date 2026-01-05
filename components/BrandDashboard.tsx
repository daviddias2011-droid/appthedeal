import React from 'react';
// FIX: Corrected import path for types.
import { User, Deal } from '../types';
import StatCard from './StatCard';
import { BriefcaseIcon, CheckCircleIcon, UsersIcon, PlusCircleIcon, BarChartIcon } from './Icons';
import CreatorCard from './CreatorCard';
import DealCard from './DealCard';

interface BrandDashboardProps {
    user: User;
    deals: Deal[];
    allUsers: User[];
    onAddDeal: () => void;
    onViewDealDetails: (deal: Deal) => void;
    onViewProfile: (user: User) => void;
}

const BrandDashboard: React.FC<BrandDashboardProps> = ({ user, deals, allUsers, onAddDeal, onViewDealDetails, onViewProfile }) => {
    
    const myDeals = deals.filter(deal => deal.brand.name === user.name);
    const activeDeals = myDeals.filter(deal => deal.status === 'active');
    const completedDealsCount = myDeals.filter(deal => deal.status === 'completed').length;
    const totalSpent = myDeals.reduce((sum, deal) => sum + deal.value, 0);
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const topCreators = allUsers
        .filter(u => u.type === 'creator')
        .sort((a, b) => {
            if (b.dealsCompleted !== a.dealsCompleted) {
                return b.dealsCompleted - a.dealsCompleted;
            }
            return (b.rating || 0) - (a.rating || 0);
        })
        .slice(0, 3);
    
    return (
         <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Deals Ativos</h2>
                {activeDeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeDeals.map(deal => (
                            <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-brand-gray border border-brand-border rounded-lg">
                        <p className="text-brand-text-secondary">Você não tem deals ativos no momento.</p>
                        <button onClick={onAddDeal} className="mt-4 bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300">
                            Publicar Primeiro Deal
                        </button>
                    </div>
                )}
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Top Criadores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topCreators.map(creator => (
                                <CreatorCard key={creator.id} creator={creator} onViewProfile={onViewProfile} />
                            ))}
                        </div>
                    </section>
                </div>
                <aside className="space-y-4">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4 font-display">Resumo da Conta</h2>
                         <div className="space-y-3">
                            <StatCard 
                                icon={<BriefcaseIcon className="w-5 h-5"/>} 
                                label="Deals Ativos" 
                                value={String(activeDeals.length)} 
                                colorClass="bg-brand-primary/10 text-brand-primary"
                                tooltipText="Número de oportunidades publicadas que estão aguardando aplicações de criadores."
                            />
                             <StatCard 
                                icon={<CheckCircleIcon className="w-5 h-5"/>} 
                                label="Deals Concluídos" 
                                value={String(completedDealsCount)} 
                                colorClass="bg-brand-primary/10 text-brand-primary"
                                tooltipText="Número de deals que foram finalizados e pagos."
                            />
                            <StatCard 
                                icon={<BarChartIcon className="w-5 h-5"/>} 
                                label="Total Investido (BRL)" 
                                value={currencyFormatter.format(totalSpent)} 
                                colorClass="bg-brand-primary/10 text-brand-primary"
                                tooltipText="Soma do valor de todos os deals criados na plataforma."
                            />
                        </div>
                    </section>
                    <section>
                         <button onClick={onAddDeal} className="w-full bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300 inline-flex items-center justify-center gap-2">
                            <PlusCircleIcon className="w-5 h-5"/>
                            Publicar Novo Deal
                        </button>
                    </section>
                </aside>
            </div>
        </div>
    );
}

export default BrandDashboard;