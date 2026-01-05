
import React from 'react';
// FIX: Corrected import path for types.
import { TrendReport } from '../types';
import { ZapIcon } from './Icons';

interface TrendReportModalProps {
  report: TrendReport;
  onClose: () => void;
}

const TrendReportModal: React.FC<TrendReportModalProps> = ({ report, onClose }) => {

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-3xl relative animate-fade-in max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-primary/10 p-2 rounded-full">
                <ZapIcon className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
                <h3 className="font-bold text-brand-primary text-sm uppercase tracking-wider font-display">RELATÓRIO EXCLUSIVO</h3>
                <p className="text-xs text-brand-text-secondary">{report.date}</p>
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-brand-text font-display mb-4">{report.title}</h2>
        
        <div className="my-6 prose prose-invert max-w-none text-brand-text-secondary leading-relaxed">
           <p>{report.fullText}</p>
        </div>

        <div className="flex justify-end mt-8">
            <button
            onClick={onClose}
            className="bg-brand-light-gray text-brand-text font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors"
            >
            Fechar
            </button>
        </div>
      </div>
    </div>
  );
};

export default TrendReportModal;
