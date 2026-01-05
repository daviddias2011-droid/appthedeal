
import React, { useState } from 'react';
// FIX: Corrected import path for types.
import { Deal } from '../types';

interface JobCreationModalProps {
  onClose: () => void;
  onAddDeal: (newDeal: Omit<Deal, 'id'>) => void;
  brandName: string;
}

const JobCreationModal: React.FC<JobCreationModalProps> = ({ onClose, onAddDeal, brandName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [expiresInHours, setExpiresInHours] = useState('');
  const [valueError, setValueError] = useState('');

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
    
    if (!title || !description || valueError) {
        return;
    }

    const newDeal: Omit<Deal, 'id'> = {
      title,
      description,
      value: numericValue,
      isFlashDeal,
      expiresInHours: isFlashDeal && expiresInHours ? parseInt(expiresInHours, 10) : undefined,
      brand: {
        name: brandName,
        logoUrl: `https://picsum.photos/seed/${brandName.split(' ').join('')}/40/40`,
      },
      status: 'active',
    };
    onAddDeal(newDeal);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text">&times;</button>
        <h2 className="text-2xl font-bold text-brand-text font-display mb-4">Publicar Novo Deal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Título do Deal</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Campanha de vídeo para..." className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Descrição</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Descreva os entregáveis, objetivos e detalhes da campanha de vídeo." className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Valor (BRL)</label>
            <input 
              type="number" 
              value={value} 
              onChange={handleValueChange} 
              className={`w-full bg-brand-light-gray border rounded-md p-2 focus:outline-none focus:ring-2 text-brand-text ${valueError ? 'border-red-500 focus:ring-red-500' : 'border-brand-border focus:ring-brand-primary'}`} 
              required 
              min="0.01" 
              step="0.01"
            />
             {valueError && <p className="text-red-400 text-sm mt-1">{valueError}</p>}
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-brand-text cursor-pointer">
              <input type="checkbox" checked={isFlashDeal} onChange={e => setIsFlashDeal(e.target.checked)} className="form-checkbox h-5 w-5 text-brand-primary bg-brand-light-gray border-brand-border rounded focus:ring-brand-primary" />
              É um Deal Relâmpago? (Urgente)
            </label>
          </div>
          {isFlashDeal && (
            <div>
              <label className="block text-sm font-bold text-brand-text-secondary mb-1">Expira em (horas)</label>
              <input type="number" value={expiresInHours} onChange={e => setExpiresInHours(e.target.value)} className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required min="1" />
            </div>
          )}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-brand-light-gray text-brand-text-secondary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors">Cancelar</button>
            <button type="submit" className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300">Publicar Deal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreationModal;
