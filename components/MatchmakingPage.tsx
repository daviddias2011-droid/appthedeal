
import React from 'react';
import { Deal, User } from '../types';
import { BriefcaseIcon, ArrowRightIcon, CheckCircleIcon, UserIcon } from './Icons';

interface MatchmakingPageProps {
  allDeals: Deal[];
  allUsers: User[];
  onViewDealDetails: (deal: Deal) => void;
  onViewProfile: (user: User) => void;
}

const MatchmakingPage: React.FC<MatchmakingPageProps> = ({ allDeals, allUsers, onViewDealDetails, onViewProfile }) => {
    
    const matchedDeals = allDeals.filter(d => d.creatorId && (d.status === 'in progress' || d.status === 'completed'));
    
    const getStatusInfo = (status: Deal['status']) => {
        switch (status) {
            case 'in progress':
                return { label: 'Em Negociação', color: 'bg-blue-400/10 text-blue-400' };
            case 'completed':
                return { label: 'Finalizado', color: 'bg-green-400/10 text-green-400' };
            default:
                return { label: 'Pendente', color: 'bg-yellow-400/10 text-yellow-400' };
        }
    };
    
    return (
        <div className="space-y-8">
            <header>
                 <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display">Deals em Andamento</h1>
                 <p className="text-brand-text-secondary mt-1">Acompanhe os matches e o progresso dos deals fechados na plataforma.</p>
            </header>

            {matchedDeals.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {matchedDeals.map(deal => {
                        const brand = allUsers.find(u => u.name === deal.brand.name);
                        const creator = allUsers.find(u => u.id === deal.creatorId);
                        const statusInfo = getStatusInfo(deal.status);

                        if (!brand || !creator) return null;

                        return (
                             <div key={deal.id} className="bg-brand-gray border border-brand-border rounded-lg p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-brand-text font-display truncate max-w-xs">{deal.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                                        {statusInfo.label}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between gap-4">
                                    <button onClick={() => onViewProfile(brand)} className="flex items-center gap-3 text-left p-2 rounded-md hover:bg-brand-light-gray/50 flex-1">
                                         <div className="w-10 h-10 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0">
                                            <BriefcaseIcon className="w-5 h-5 text-brand-text-secondary"/>
                                        </div>
                                        <div>
                                            <p className="text-xs text-brand-text-secondary">Marca</p>
                                            <p className="font-bold text-brand-text text-sm">{brand.name}</p>
                                        </div>
                                    </button>
                                    
                                     <div className="text-brand-text-secondary">X</div>

                                     <button onClick={() => onViewProfile(creator)} className="flex items-center gap-3 text-left p-2 rounded-md hover:bg-brand-light-gray/50 flex-1">
                                        <div className="w-10 h-10 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0">
                                            <UserIcon className="w-5 h-5 text-brand-text-secondary"/>
                                        </div>
                                        <div>
                                            <p className="text-xs text-brand-text-secondary">Criador</p>
                                            <p className="font-bold text-brand-text text-sm">{creator.name}</p>
                                        </div>
                                    </button>
                                </div>
                                <button onClick={() => onViewDealDetails(deal)} className="w-full mt-2 bg-brand-light-gray text-brand-primary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors">
                                    Ver Detalhes do Deal
                                </button>
                             </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-brand-gray border border-brand-border rounded-lg">
                    <BriefcaseIcon className="w-12 h-12 mx-auto text-brand-text-secondary mb-4"/>
                    <p className="text-brand-text-secondary">Nenhum deal em andamento ou finalizado ainda.</p>
                </div>
            )}
        </div>
    );
};

export default MatchmakingPage;
