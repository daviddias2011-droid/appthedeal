// FIX: Created missing ReferralProgramCard.tsx component file.
import React from 'react';
import { UserPlusIcon } from './Icons';

const ReferralProgramCard: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-brand-gray to-brand-dark border border-brand-primary/50 rounded-lg p-6 shadow-lg shadow-brand-primary/10">
            <div className="flex items-center gap-4 mb-3">
                <div className="bg-brand-primary/10 p-3 rounded-full border border-brand-primary/30">
                    <UserPlusIcon className="w-8 h-8 text-brand-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-brand-primary font-display">Indique e Ganhe</h2>
                    <p className="text-brand-text-secondary">Convide marcas e criadores para o The Deal e receba comissões.</p>
                </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-4 rounded-md hover:brightness-110 transition-all duration-300">
                Ver meu link de indicação
            </button>
        </div>
    );
};

export default ReferralProgramCard;