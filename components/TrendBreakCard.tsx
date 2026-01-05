import React from 'react';
// FIX: Corrected import path for types.
import { TrendReport } from '../types';
import { ZapIcon } from './Icons';

interface TrendBreakCardProps {
  report: TrendReport;
  onViewReport: (report: TrendReport) => void;
}

const TrendBreakCard: React.FC<TrendBreakCardProps> = ({ report, onViewReport }) => {
  return (
    <div className="bg-gradient-to-br from-brand-primary/10 to-brand-gray border border-brand-border rounded-lg p-6 hover:border-brand-primary/50 transition-all duration-300">
       <div className="flex items-center gap-3 mb-3">
        <div className="bg-brand-primary/10 p-2 rounded-full">
          <ZapIcon className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <h3 className="font-bold text-brand-primary text-sm uppercase tracking-wider font-display">RELATÓRIO EXCLUSIVO</h3>
          <p className="text-xs text-brand-text-secondary">{report.date}</p>
        </div>
      </div>
      <h4 className="text-lg font-bold text-brand-text mb-2 font-display">{report.title}</h4>
      <p className="text-sm text-brand-text-secondary mb-4">{report.summary}</p>
      <button onClick={() => onViewReport(report)} className="text-brand-primary font-bold hover:underline">Ler Relatório Completo &rarr;</button>
    </div>
  );
};

export default TrendBreakCard;