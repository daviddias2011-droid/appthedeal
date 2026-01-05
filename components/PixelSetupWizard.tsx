
import React from 'react';

const PixelSetupWizard: React.FC<{ dealId: string }> = ({ dealId }) => {
    return (
        <div className="bg-brand-gray border border-brand-border rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-text mb-4 font-display">Configuração de Pixel para Deal #{dealId}</h3>
            <p className="text-brand-text-secondary">Wizard de 4 passos para configurar pixels:</p>
            <ol className="list-decimal list-inside space-y-2 mt-4 text-brand-text">
                <li>Seleção de plataformas (Facebook, TikTok, Google)</li>
                <li>Configuração de eventos (Page View, Purchase, etc.)</li>
                <li>Instruções de instalação do script gerado</li>
                <li>Validação da instalação</li>
            </ol>
            <div className="mt-6 p-4 bg-brand-light-gray/20 rounded-md text-center border border-brand-border">
                <p className="text-brand-text-secondary">Componente de configuração em desenvolvimento.</p>
            </div>
        </div>
    );
};

export default PixelSetupWizard;
