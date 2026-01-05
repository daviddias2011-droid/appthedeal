
import React, { useState, useRef, useEffect } from 'react';
// FIX: Corrected import path for types.
import { Deal } from '../types';
import { FireIcon, ClockIcon, ShareIcon, TrendingUpIcon } from './Icons';

interface DealCardProps {
  deal: Deal;
  onViewDetails: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onViewDetails }) => {
  const [isShareMenuOpen, setShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const dealUrl = `https://thedeal.app/deals/${deal.id}`;
    const encodedUrl = encodeURIComponent(dealUrl);
    const text = `Confira esta oportunidade na The Deal: "${deal.title}"`;
    const encodedText = encodeURIComponent(text);

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/sender/?url=${encodedUrl}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setShareMenuOpen(false);
  };

  return (
    <div className={`bg-brand-gray border border-brand-border rounded-lg p-6 transition-all duration-300 hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 ${deal.isFlashDeal ? 'border-brand-primary/50' : ''}`}>
      {deal.isFlashDeal && (
        <div className="flex items-center gap-2 text-brand-primary mb-3 font-bold animate-flash">
          <FireIcon className="w-5 h-5" />
          <span className="uppercase text-xs tracking-wider">Oportunidade Relâmpago</span>
          <div className="flex items-center gap-1 text-xs ml-auto bg-brand-primary/10 px-2 py-1 rounded-full">
            <ClockIcon className="w-3 h-3"/>
            <span>Expira em {deal.expiresInHours}h</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <img src={deal.brand.logoUrl} alt={`${deal.brand.name} logo`} className="w-12 h-12 rounded-full bg-brand-light-gray object-cover flex-shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-brand-text font-display leading-tight">{deal.title}</h3>
          <p className="text-sm text-brand-text-secondary">{deal.brand.name}</p>
        </div>
      </div>
      <p className="text-brand-text-secondary mb-4 text-sm line-clamp-2">{deal.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400 bg-[length:200%_auto] animate-background-pan">
            {currencyFormatter.format(deal.value)}
          </span>
          {deal.commissionRate && (
            <div className="mt-1 flex items-center gap-1.5 text-brand-emerald">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="text-xs font-bold">
                    + {deal.commissionRate}% variável
                </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
           <div className="relative" ref={shareMenuRef}>
                <button
                onClick={() => setShareMenuOpen(!isShareMenuOpen)}
                className="p-2 rounded-md text-brand-text-secondary hover:bg-brand-light-gray hover:text-brand-text transition-colors"
                aria-label="Compartilhar"
                >
                <ShareIcon className="w-5 h-5" />
            </button>
            {isShareMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-44 bg-brand-light-gray border border-brand-border rounded-md shadow-lg z-10 py-1 animate-fade-in">
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-gray"
                >
                  Compartilhar no X
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-gray"
                >
                  Compartilhar no LinkedIn
                </button>
              </div>
            )}
          </div>
            <button
            onClick={() => onViewDetails(deal)}
            className="bg-brand-light-gray text-brand-primary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors text-sm">
            Ver Detalhes
            </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
