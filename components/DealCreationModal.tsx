
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types.
import { Deal, User } from '../types';
import { CheckCircleIcon, SparklesIcon, ZapIcon, BriefcaseIcon } from './Icons';

interface DealCreationModalProps {
  onClose: () => void;
  onAddDeal: (newDeal: Omit<Deal, 'id'>) => void;
  brand: User;
  initialData?: {
      title?: string;
      description?: string;
      presetPackage?: 'bronze' | 'silver' | 'gold';
  } | null;
}

type PackageTier = 'bronze' | 'silver' | 'gold';

const DealCreationModal: React.FC<DealCreationModalProps> = ({ onClose, onAddDeal, brand, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [suggestedValue, setSuggestedValue] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [customValue, setCustomValue] = useState(''); 
  const [showCustomValue, setShowCustomValue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      if (initialData) {
          setTitle(initialData.title || '');
          setDescription(initialData.description || '');
          setSelectedPackage(initialData.presetPackage || null);
      }
  }, [initialData]);

  // Simulating the "Uber Model" algorithm
  useEffect(() => {
      if (selectedPackage) {
          setIsCalculating(true);
          // Mock calculation logic based on package tier + brand "demand" (randomized slightly)
          setTimeout(() => {
              let base = 0;
              switch (selectedPackage) {
                  case 'bronze': base = 2500; break; // Standard entry
                  case 'silver': base = 5000; break; // Most popular
                  case 'gold': base = 12000; break; // Premium
              }
              setSuggestedValue(base);
              setIsCalculating(false);
          }, 800);
      } else {
          setSuggestedValue(0);
      }
  }, [selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !selectedPackage) {
        return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
        const finalValue = showCustomValue && customValue ? parseFloat(customValue) : suggestedValue;

        const newDeal: Omit<Deal, 'id'> = {
        title,
        description: `[Pacote ${selectedPackage.toUpperCase()}] ${description}`, // Prefix with package
        value: finalValue,
        isFlashDeal: false, // Default to standard deals now
        brand: {
            name: brand.name,
            logoUrl: brand.logoUrl || `https://picsum.photos/seed/${brand.name.split(' ').join('')}/40/40`,
        },
        status: 'active',
        };
        onAddDeal(newDeal);
        setIsSubmitting(false);
    }, 1500); // Simulate network delay
  };

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text">&times;</button>
        <h2 className="text-2xl font-bold text-brand-text font-display mb-2">Nova Proposta Comercial</h2>
        <p className="text-brand-text-secondary mb-6">Crie uma oportunidade profissional com termos claros.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Título do Projeto</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Campanha Q3 - Lançamento Fintech" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Objetivo & Briefing Resumido</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Descreva o objetivo comercial principal..." className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required></textarea>
          </div>

          <div>
              <label className="block text-sm font-bold text-brand-text-secondary mb-3">Selecione o Formato de Entrega</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    onClick={() => setSelectedPackage('bronze')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-[#B45309]/50 ${selectedPackage === 'bronze' ? 'border-[#B45309] bg-[#B45309]/10' : 'border-brand-border bg-brand-light-gray'}`}
                  >
                      <div className="text-[#B45309] font-bold uppercase text-xs mb-2 tracking-wider">Padrão</div>
                      <div className="text-brand-text font-bold text-lg mb-2">Entrada</div>
                      <ul className="text-xs text-brand-text-secondary space-y-1">
                          <li>• 1 Vídeo (Reels/TikTok)</li>
                          <li>• 1 Story Sequencial</li>
                          <li>• Edição Nativa</li>
                      </ul>
                  </div>

                  <div 
                    onClick={() => setSelectedPackage('silver')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-[#1A2332]/50 ${selectedPackage === 'silver' ? 'border-[#1A2332] bg-[#1A2332]/10' : 'border-brand-border bg-brand-light-gray'}`}
                  >
                      <div className="text-[#1A2332] font-bold uppercase text-xs mb-2 tracking-wider">Performance</div>
                      <div className="text-brand-text font-bold text-lg mb-2">Ideal</div>
                      <ul className="text-xs text-brand-text-secondary space-y-1">
                          <li>• 3 Vídeos Curtos</li>
                          <li>• Link na Bio (30 dias)</li>
                          <li>• Direitos de Uso (Ads)</li>
                      </ul>
                  </div>

                  <div 
                    onClick={() => setSelectedPackage('gold')}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-brand-primary/50 ${selectedPackage === 'gold' ? 'border-brand-primary bg-brand-primary/10' : 'border-brand-border bg-brand-light-gray'}`}
                  >
                      <div className="text-brand-primary font-bold uppercase text-xs mb-2 tracking-wider">Premium</div>
                      <div className="text-brand-text font-bold text-lg mb-2">Embaixador</div>
                      <ul className="text-xs text-brand-text-secondary space-y-1">
                          <li>• 5 Vídeos + 5 Stories</li>
                          <li>• Presença em Evento</li>
                          <li>• Exclusividade (30 dias)</li>
                      </ul>
                  </div>
              </div>
          </div>

          {/* Pricing Logic */}
          <div className="bg-brand-light-gray p-4 rounded-lg border border-brand-border">
              <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-brand-text">Valor Sugerido (Mercado)</label>
                  {!isCalculating && selectedPackage && (
                      <span className="text-xs text-brand-text-secondary flex items-center gap-1">
                          <SparklesIcon className="w-3 h-3 text-brand-primary"/>
                          Baseado em dados reais
                      </span>
                  )}
              </div>
              
              {isCalculating ? (
                  <div className="animate-pulse h-10 bg-brand-border rounded w-1/3"></div>
              ) : (
                  <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-brand-primary">
                          {suggestedValue > 0 ? currencyFormatter.format(suggestedValue) : 'R$ 0,00'}
                      </span>
                      {selectedPackage && (
                          <button type="button" onClick={() => setShowCustomValue(!showCustomValue)} className="text-xs text-brand-text-secondary underline mb-1 ml-2">
                              Ajustar manualmente
                          </button>
                      )}
                  </div>
              )}

              {showCustomValue && (
                  <div className="mt-3 animate-fade-in">
                      <label className="block text-xs font-bold text-brand-text-secondary mb-1">Valor Personalizado</label>
                      <input 
                        type="number" 
                        value={customValue} 
                        onChange={e => setCustomValue(e.target.value)} 
                        className="w-full bg-brand-gray border border-brand-border rounded-md p-2 text-sm text-brand-text" 
                        placeholder="Digite o valor..." 
                      />
                  </div>
              )}
          </div>

          <div className="bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/20">
              <div className="flex gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                      <h4 className="text-sm font-bold text-brand-primary mb-1">Cláusula de Produção Padrão</h4>
                      <p className="text-xs text-brand-text-secondary leading-relaxed">
                          O valor do criador inclui gravação e edição padrão. Produções especiais devem ser contratadas separadamente.
                      </p>
                  </div>
              </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-brand-border">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="bg-brand-light-gray text-brand-text-secondary font-bold py-3 px-6 rounded-md hover:bg-brand-border transition-colors disabled:opacity-50">Cancelar</button>
            <button 
                type="submit" 
                disabled={!selectedPackage || isSubmitting}
                className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-8 rounded-md hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-yellow-500/20"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publicando...
                    </>
                ) : 'Publicar Oportunidade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealCreationModal;
