
import React, { useState } from 'react';
// FIX: Corrected import path for types.
import { Deal, User, UserType, DashboardTab } from '../types';
import { FireIcon, ClockIcon, BriefcaseIcon, CheckCircleIcon } from './Icons';

interface DealDetailsModalProps {
  deal: Deal;
  onClose: () => void;
  user: User;
  allUsers: User[];
  onContactBrand: (user: User) => void;
  onNegotiate: (deal: Deal) => void;
  onApply: (deal: Deal) => void;
  onNavigate: (tab: DashboardTab) => void;
}

const DealDetailsModal: React.FC<DealDetailsModalProps> = ({ deal, onClose, user, allUsers, onContactBrand, onNegotiate, onApply, onNavigate }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleApply = () => {
      setIsApplying(true);
      
      // Simulate network request
      setTimeout(() => {
        onApply(deal);
        setIsApplying(false);
        setIsApplied(true);
      }, 1500);
  }

  const actionButtonText = user.type === UserType.Creator 
    ? (isApplied ? "Aplicação Enviada" : (isApplying ? "Enviando..." : "Aplicar para o Deal"))
    : "Gerenciar Deal";

  const handleBrandAction = () => {
    onNavigate('deals');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-2xl relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        
        {deal.isFlashDeal && (
            <div className="flex items-center gap-2 text-brand-primary mb-4 font-bold animate-flash">
                <FireIcon className="w-5 h-5" />
                <span>DEAL RELÂMPAGO</span>
                <div className="flex items-center gap-1 text-xs ml-auto bg-brand-primary/10 px-2 py-1 rounded-full">
                    <ClockIcon className="w-3 h-3"/>
                    <span>Expira em {deal.expiresInHours}h</span>
                </div>
            </div>
        )}

        <div className="flex items-center gap-4 mb-4">
            <img src={deal.brand.logoUrl} alt={`${deal.brand.name} logo`} className="w-16 h-16 rounded-full bg-brand-light-gray object-cover" />
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

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
            {user.type === UserType.Creator && !isApplied && (
                <>
                 <button
                    onClick={() => {
                        const brand = allUsers.find(u => u.name === deal.brand.name);
                        if (brand) {
                            onContactBrand(brand);
                            onClose();
                        }
                    }}
                    disabled={isApplying}
                    className="w-full sm:w-auto bg-brand-light-gray text-brand-text-secondary font-bold py-3 px-6 rounded-md hover:bg-brand-border hover:text-brand-text transition-colors disabled:opacity-50"
                >
                    Contatar Marca
                </button>
                 <button
                    onClick={() => onNegotiate(deal)}
                    disabled={isApplying}
                    className="w-full sm:w-auto border-2 border-brand-primary/60 text-brand-primary font-bold py-3 px-6 rounded-md hover:bg-brand-primary/10 transition-colors disabled:opacity-50"
                >
                    Negociar Termos
                </button>
                </>
            )}
            <button
            onClick={user.type === UserType.Creator ? handleApply : handleBrandAction}
            disabled={(isApplied || isApplying) && user.type === UserType.Creator}
            className={`w-full sm:w-auto font-bold py-3 px-8 rounded-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isApplied ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark hover:brightness-110'}`}
            >
            {isApplying && (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isApplied && user.type === UserType.Creator && <CheckCircleIcon className="w-5 h-5" />}
            {actionButtonText}
            </button>
        </div>

      </div>
    </div>
  );
};

export default DealDetailsModal;
