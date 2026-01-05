
import React from 'react';
// FIX: Corrected import path for types.
import { Deal, UserType } from '../types';
import { FireIcon, ClockIcon } from './Icons';

interface JobDetailsModalProps {
  deal: Deal;
  onClose: () => void;
  userType: UserType;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ deal, onClose, userType }) => {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const actionButtonText = userType === UserType.Creator ? "Aplicar para o Deal" : "Ver Candidatos";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-2xl relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        
        {/* FIX: Replaced `deal.isBurnRate` with `deal.isFlashDeal` to match the Deal type. */}
        {deal.isFlashDeal && (
            <div className="flex items-center gap-2 text-brand-primary mb-4 font-bold">
                <FireIcon className="w-5 h-5" />
                <span>ALERTA: BURN RATE</span>
                <div className="flex items-center gap-1 text-xs ml-auto bg-brand-primary/10 px-2 py-1 rounded-full">
                    <ClockIcon className="w-3 h-3"/>
                    <span>Expira em {deal.expiresInHours}h</span>
                </div>
            </div>
        )}

        <div className="flex items-center gap-4 mb-4">
            <img src={deal.brand.logoUrl} alt={`${deal.brand.name} logo`} className="w-16 h-16 rounded-full bg-brand-light-gray" />
            <div>
                <h2 className="text-2xl font-bold text-brand-text font-display">{deal.title}</h2>
                <p className="text-md text-brand-text-secondary">{deal.brand.name}</p>
            </div>
        </div>

        <div className="my-6">
            <h3 className="text-sm font-bold text-brand-text-secondary uppercase tracking-wider mb-2">Descrição</h3>
            <p className="text-brand-text">{deal.description}</p>
        </div>

        <div className="my-6">
            <h3 className="text-sm font-bold text-brand-text-secondary uppercase tracking-wider mb-2">Valor do Contrato</h3>
            <p className="text-3xl font-bold text-brand-primary">{currencyFormatter.format(deal.value)}</p>
        </div>

        <div className="flex justify-end mt-8">
            <button
            onClick={() => alert(`Ação: ${actionButtonText}`)}
            className="bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors"
            >
            {actionButtonText}
            </button>
        </div>

      </div>
    </div>
  );
};

export default JobDetailsModal;
