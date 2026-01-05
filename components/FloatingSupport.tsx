import React, { useState, useEffect } from 'react';
import { KeyIcon, Trophy, ZapIcon, ShieldIcon, ArrowRightIcon } from './Icons';

interface FloatingSupportProps {
  onGoToSignup: () => void;
  onGoToArena: () => void;
  onShowCriteria: () => void;
  onGoToMissions: () => void;
}

const FloatingSupport: React.FC<FloatingSupportProps> = ({ onGoToSignup, onGoToArena, onShowCriteria, onGoToMissions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 400) {
        setIsVisible(true);
        if (!hasShownTooltip) {
           const timer = setTimeout(() => {
             setShowTooltip(true);
             setHasShownTooltip(true);
             setTimeout(() => setShowTooltip(false), 8000);
           }, 3000);
           return () => clearTimeout(timer);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownTooltip]);

  if (!isVisible) return null;

  const goldBtnClass = "bg-gradient-to-br from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37] text-black shadow-xl shadow-brand-gold/40 hover:scale-110 active:scale-95 transition-all duration-300";

  return (
    <div className="fixed bottom-8 right-8 z-[400] flex flex-col items-end gap-4 animate-fade-in">
      {/* Tooltip personalizado */}
      {showTooltip && !isOpen && (
        <div className="bg-brand-gold text-black px-6 py-3 rounded-2xl shadow-2xl animate-float-in relative mr-2 border border-black/10">
          <p className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Ainda não tem convite? Conquiste um</p>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-brand-gold rotate-45 border-b border-r border-black/10"></div>
        </div>
      )}

      {/* Menu de Ações */}
      {isOpen && (
        <div className="bg-[#121212] border border-brand-gold/20 rounded-2xl p-4 w-64 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-float-in mb-2 backdrop-blur-xl">
          <div className="space-y-2">
            <button 
              onClick={() => { onGoToMissions(); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Missões The Deal</span>
              </div>
              <ArrowRightIcon className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => { onGoToSignup(); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <KeyIcon className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Solicitar Acesso</span>
              </div>
              <ArrowRightIcon className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => { onShowCriteria(); setIsOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShieldIcon className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Critérios de Elite</span>
              </div>
              <ArrowRightIcon className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      )}

      {/* Botão Principal */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${goldBtnClass} w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden ring-4 ring-black/50 shadow-2xl`}
        aria-label="Menu de Missões"
      >
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
          <Trophy className="w-7 h-7" />
        </div>
        <div className={`absolute transition-transform duration-500 ${isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingSupport;