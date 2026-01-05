
import React from 'react';
import { Deal } from '../types';
import { BriefcaseIcon, ArrowRightIcon } from './Icons';

interface ROIDealsListPageProps {
    deals: Deal[];
    onSelectDeal: (deal: Deal) => void;
}

const ROIDealsListPage: React.FC<ROIDealsListPageProps> = ({ deals, onSelectDeal }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display">Rastreamento de ROI</h1>
                <p className="text-brand-text-secondary mt-1">Selecione um deal para configurar ou visualizar o rastreamento de resultados.</p>
            </header>

            {deals.length > 0 ? (
                <div className="space-y-4">
                    {deals.map(deal => (
                        <button 
                            key={deal.id} 
                            onClick={() => onSelectDeal(deal)}
                            className="w-full text-left p-4 bg-brand-gray border border-brand-border rounded-lg hover:bg-brand-light-gray/50 hover:border-brand-primary/50 transition-all flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-light-gray rounded-md">
                                    <BriefcaseIcon className="w-6 h-6 text-brand-primary"/>
                                </div>
                                <div>
                                    <h2 className="font-bold text-brand-text">{deal.title}</h2>
                                    <p className="text-sm text-brand-text-secondary">Status: <span className="font-semibold capitalize">{deal.status}</span></p>
                                </div>
                            </div>
                            <ArrowRightIcon className="w-5 h-5 text-brand-text-secondary transition-transform group-hover:translate-x-1"/>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-brand-gray border border-brand-border rounded-lg">
                     <BriefcaseIcon className="w-12 h-12 mx-auto text-brand-text-secondary mb-4"/>
                    <p className="text-brand-text-secondary">Você não possui deals. Crie um para começar a rastrear o ROI.</p>
                </div>
            )}
        </div>
    );
};

export default ROIDealsListPage;
