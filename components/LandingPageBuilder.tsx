
import React from 'react';

const LandingPageBuilder: React.FC<{ dealId: string }> = ({ dealId }) => {
    return (
        <div className="bg-brand-gray border border-brand-border rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-text mb-4 font-display">Construtor de Landing Page para Deal #{dealId}</h3>
            <p className="text-brand-text-secondary">Editor para criar landing pages otimizadas para conversão.</p>
            <div className="mt-6 p-4 bg-brand-light-gray/20 rounded-md text-center border border-brand-border">
                <p className="text-brand-text-secondary">Componente de construção em desenvolvimento.</p>
            </div>
        </div>
    );
};

export default LandingPageBuilder;
