
import React, { useState } from 'react';
import { User, Deal } from '../types';
import { BriefcaseIcon, CheckCircleIcon } from './Icons';

interface InviteToDealModalProps {
  creator: User;
  brand: User;
  deals: Deal[];
  onClose: () => void;
  onSendInvite: (dealId: string, creatorId: number) => void;
}

const InviteToDealModal: React.FC<InviteToDealModalProps> = ({ creator, brand, deals, onClose, onSendInvite }) => {
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  const handleSendInvite = () => {
    if (selectedDealId) {
      onSendInvite(selectedDealId, creator.id);
      setInviteSent(true);
      setTimeout(() => {
        onClose();
      }, 2000); // Close modal after 2 seconds
    }
  };
  
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-lg relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        <h2 className="text-2xl font-bold text-brand-text font-display mb-2">Convidar {creator.name}</h2>
        <p className="text-brand-text-secondary mb-4">Selecione um dos seus deals ativos para enviar um convite.</p>
        
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {deals.length > 0 ? deals.map(deal => (
                <button
                    key={deal.id}
                    onClick={() => setSelectedDealId(deal.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${selectedDealId === deal.id ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-border bg-brand-light-gray hover:border-brand-primary/50'}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-brand-text">{deal.title}</h3>
                            <p className="text-sm text-brand-primary font-bold">{currencyFormatter.format(deal.value)}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${selectedDealId === deal.id ? 'border-brand-primary bg-brand-primary' : 'border-brand-border group-hover:border-brand-text-secondary'}`}>
                            {selectedDealId === deal.id && <CheckCircleIcon className="w-4 h-4 text-brand-dark" />}
                        </div>
                    </div>
                </button>
            )) : (
                <div className="text-center p-6 bg-brand-light-gray rounded-md">
                    <p className="text-brand-text-secondary">Você não possui deals ativos para convidar.</p>
                </div>
            )}
        </div>

        <div className="flex justify-end gap-4 pt-6 mt-4 border-t border-brand-border">
          <button type="button" onClick={onClose} className="bg-brand-light-gray text-brand-text-secondary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors">Cancelar</button>
          <button 
            type="button" 
            onClick={handleSendInvite} 
            disabled={!selectedDealId || inviteSent}
            className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {inviteSent ? <><CheckCircleIcon className="w-5 h-5"/> Enviado!</> : 'Enviar Convite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteToDealModal;
