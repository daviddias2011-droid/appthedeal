
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface LevelCardProps {
    title: string;
    description: string;
    cost: number;
    period?: string;
    isSelected: boolean;
    onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ title, description, cost, period, isSelected, onClick }) => {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const borderColor = isSelected ? 'border-brand-primary' : 'border-brand-border';
    const bgColor = isSelected ? 'bg-brand-primary/5' : 'bg-brand-gray';

    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-200 group ${borderColor} ${bgColor} hover:border-brand-primary/70`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-brand-text font-display">{title}</h3>
                    <p className="text-sm text-brand-text-secondary mt-1">{description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isSelected ? 'border-brand-primary bg-brand-primary' : 'border-brand-border group-hover:border-brand-text-secondary'}`}>
                    {isSelected && <CheckCircleIcon className="w-4 h-4 text-brand-dark" />}
                </div>
            </div>
            <div className="mt-4">
                <span className="text-2xl font-bold text-brand-primary">{currencyFormatter.format(cost)}</span>
                {cost > 0 && period && <span className="text-brand-text-secondary">/{period}</span>}
            </div>
        </button>
    );
};

export default LevelCard;
