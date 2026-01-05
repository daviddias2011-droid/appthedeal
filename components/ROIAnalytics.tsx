import React from 'react';
import { TrackingMethod } from '../types';

interface ROIAnalyticsProps {
    dealId: string;
    method: TrackingMethod;
}

const ROIAnalytics: React.FC<ROIAnalyticsProps> = ({ dealId, method }) => {
    return (
        <div className="mt-8 bg-brand-gray border border-brand-border rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 font-display">Análise de ROI</h3>
            <p className="text-brand-text-secondary">Métricas de performance para o Deal #{dealId} usando o método <span className="font-bold capitalize text-brand-primary">{method}</span>.</p>
            <div className="mt-6 p-4 bg-brand-dark rounded-md text-center">
                <p className="text-brand-text-secondary">Componente de análise de ROI em desenvolvimento.</p>
            </div>
        </div>
    );
};

export default ROIAnalytics;