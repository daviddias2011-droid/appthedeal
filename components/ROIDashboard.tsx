
import React, { useState } from 'react';
import { Deal, TrackingMethod } from '../types';
import PixelSetupWizard from './PixelSetupWizard';
import LandingPageBuilder from './LandingPageBuilder';
import CupomManager from './CupomManager';
import ROIAnalytics from './ROIAnalytics';
import { ArrowLeftIcon } from './Icons';


interface ROIDashboardProps {
  deal: Deal;
  onBack: () => void;
}

const ROIDashboard: React.FC<ROIDashboardProps> = ({ deal, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<TrackingMethod>('pixel');
  
  const MethodButton: React.FC<{
      method: TrackingMethod;
      icon: string;
      title: string;
      commission: number;
    }> = ({ method, icon, title, commission }) => (
    <button 
      className={`p-4 rounded-lg border-2 text-left w-full transition-all ${selectedMethod === method ? 'bg-brand-primary/10 border-brand-primary' : 'bg-brand-gray border-brand-border hover:border-brand-text-secondary'}`}
      onClick={() => setSelectedMethod(method)}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-bold text-brand-text">{title}</h4>
      <p className="text-sm font-bold text-brand-primary">{commission}% de comissão</p>
    </button>
  );

  return (
    <div className="roi-dashboard space-y-6 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-text mb-4 group">
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1"/>
          <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
      </button>

      <div className="text-center">
        <h2 className="text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary uppercase tracking-tighter">Rastreamento de ROI</h2>
        <p className="text-brand-text-secondary mt-1">Deal: <span className="font-bold text-brand-text">{deal.title}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MethodButton method="pixel" icon="🎯" title="Pixel Tracking" commission={15} />
        <MethodButton method="landingpage" icon="🚀" title="Landing Page" commission={12} />
        <MethodButton method="cupom" icon="💰" title="Cupons" commission={10} />
      </div>
      
      <div>
        {selectedMethod === 'pixel' && <PixelSetupWizard dealId={deal.id} />}
        {selectedMethod === 'landingpage' && <LandingPageBuilder dealId={deal.id} />}
        {selectedMethod === 'cupom' && <CupomManager dealId={deal.id} />}
      </div>
      
      <ROIAnalytics dealId={deal.id} method={selectedMethod} />
    </div>
  );
};

export default ROIDashboard;
