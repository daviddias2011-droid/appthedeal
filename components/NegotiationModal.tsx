
import React, { useState } from 'react';
// FIX: Corrected import path for types.
import { Deal } from '../types';

interface NegotiationModalProps {
  deal: Deal;
  onClose: () => void;
  onSubmit: (value: number, message: string) => void;
}

const NegotiationModal: React.FC<NegotiationModalProps> = ({ deal, onClose, onSubmit }) => {
  const [value, setValue] = useState(deal.value.toString());
  const [message, setMessage] = useState('');
  const [valueError, setValueError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      const numericValue = parseFloat(newValue);
      if (newValue && (isNaN(numericValue) || numericValue <= 0)) {
          setValueError('O valor deve ser um número positivo.');
      } else {
          setValueError('');
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) {
        setValueError('O valor deve ser um número positivo.');
        return;
    }
    if (valueError) return;

    setIsSubmitting(true);
    // Simulate network delay for better UX
    setTimeout(() => {
        onSubmit(numericValue, message);
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(onClose, 2000); // Close after showing success message
    }, 1000);
  };

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        
        {isSuccess ? (
            <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 bg-green-400/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-2">Proposta Enviada!</h3>
                <p className="text-brand-text-secondary">A marca será notificada sobre seus termos.</p>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-bold text-brand-text font-display mb-2">Negociar Termos</h2>
                <p className="text-brand-text-secondary mb-4">Proposta para o deal: <span className="font-bold text-brand-text">{deal.title}</span></p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-brand-text-secondary mb-1">Valor Proposto (BRL)</label>
                    <p className="text-xs text-brand-text-secondary mb-2">Valor original: {currencyFormatter.format(deal.value)}</p>
                    <input 
                        type="number" 
                        value={value} 
                        onChange={handleValueChange} 
                        className={`w-full bg-brand-light-gray border rounded-md p-2 focus:outline-none focus:ring-2 text-brand-text ${valueError ? 'border-red-500 focus:ring-red-500' : 'border-brand-border focus:ring-brand-primary'}`}
                        required 
                        min="0.01"
                        step="0.01"
                        disabled={isSubmitting}
                    />
                    {valueError && <p className="text-red-400 text-sm mt-1">{valueError}</p>}
                </div>
                <div>
                    <label className="block text-sm font-bold text-brand-text-secondary mb-1">Mensagem (Opcional)</label>
                    <textarea 
                        value={message} 
                        onChange={e => setMessage(e.target.value)} 
                        rows={4} 
                        className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                        placeholder="Ex: Gostaria de incluir a entrega de um vídeo adicional neste valor."
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} disabled={isSubmitting} className="bg-brand-light-gray text-brand-text-secondary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={isSubmitting} className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300 disabled:opacity-75 flex items-center">
                        {isSubmitting ? 'Enviando...' : 'Enviar Proposta'}
                    </button>
                </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default NegotiationModal;
