
import React from 'react';
import { Lock, X, ArrowRight, TrendingUp } from 'lucide-react';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
}

const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose, onSignup }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-thedeal-card border-2 border-thedeal-goldDim/30 rounded-2xl max-w-md w-full p-8 relative shadow-2xl shadow-thedeal-gold/10 text-center space-y-8 animate-float-in">
        <button onClick={onClose} className="absolute top-6 right-6 text-thedeal-gray400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full mx-auto flex items-center justify-center ring-4 ring-thedeal-goldDim/20">
          <TrendingUp className="w-10 h-10 text-thedeal-gold" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Inicie sua <span className="text-thedeal-goldBright">Jornada</span></h2>
          <p className="text-thedeal-gray400 text-sm font-medium leading-relaxed px-2">
            A porta está aberta para Aspirantes. Para visualizar contratos de 12 meses e o Hub Elite, você precisa provar seu valor e subir seu Deal Score. Comece agora.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={onSignup}
            className="w-full bg-gradient-to-r from-thedeal-goldBright to-thedeal-gold hover:from-thedeal-gold hover:to-thedeal-goldBright text-black font-bold py-4 rounded-xl shadow-lg shadow-thedeal-gold/20 flex items-center justify-center gap-2 transition-all active:scale-95 uppercase text-xs tracking-widest"
          >
            Prove seu Valor <ArrowRight size={16} />
          </button>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-thedeal-gold">
            Contratos reais esperam por quem performa.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="text-[10px] font-bold uppercase text-thedeal-gray700 hover:text-thedeal-gray400 transition-colors tracking-[0.2em]"
        >
          Continuar como Aspirante
        </button>
      </div>
    </div>
  );
};

export default AccessModal;
