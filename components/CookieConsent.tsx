import React, { useState, useEffect } from 'react';
import { ShieldIcon } from './Icons';

interface CookieConsentProps {
    onAccept: () => void;
    onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('thedeal_cookie_consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 1500);
        }
    }, []);

    if (!isVisible) return null;

    const handleAccept = () => {
        setIsVisible(false);
        onAccept();
        localStorage.setItem('thedeal_cookie_consent', 'accepted');
        // Trigger a custom event so other components can react immediately
        window.dispatchEvent(new Event('cookieConsentAccepted'));
    };

    return (
        <div className="fixed bottom-6 left-6 right-6 md:right-auto md:left-6 md:w-[480px] bg-[#121212] border border-brand-gold/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[500] animate-fade-in p-8 border-l-4 border-l-brand-gold">
            <div className="flex items-start gap-6">
                <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold flex-shrink-0">
                    <ShieldIcon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-3">Política de cookies</h4>
                    <p className="text-[11px] text-brand-text-secondary leading-relaxed mb-8 font-bold uppercase opacity-80">
                        Utilizamos tecnologias de rastreamento de performance para validar identidades e garantir a integridade jurídica das relações. Ao prosseguir, você autoriza o processamento técnico necessário para a eficiência da rede.
                    </p>
                    <div className="flex flex-col">
                        <button 
                            onClick={handleAccept}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E0A1] text-black font-black py-4 rounded uppercase tracking-[0.3em] text-[11px] hover:brightness-110 transition-all shadow-xl shadow-brand-gold/10"
                        >
                            Aceitar e Acessar Rede
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;