
import React, { useState, useEffect } from 'react';
import { BellIcon } from './Icons';

const NotificationPermissionManager: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Verificação segura da API de Notificações
        if (typeof window !== 'undefined' && 'Notification' in window) {
            try {
                if (Notification.permission === 'default' && !sessionStorage.getItem('notification_banner_dismissed')) {
                    setShowBanner(true);
                }
            } catch (e) {
                console.warn('Ambiente restrito: Acesso à API de Notificações negado pelo navegador.');
            }
        }
    }, []);

    const handleRequestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                // Tenta instanciar apenas se for um construtor válido no ambiente atual
                try {
                    new Notification('THE DEAL', {
                        body: 'Protocolo de Notificações ativado com sucesso.',
                        icon: '/favicon.ico'
                    });
                } catch (err) {
                    console.log('Notificação visual enviada (construtor nativo não suportado neste frame).');
                }
            }
        } catch (e) {
            console.error('Erro ao solicitar permissão de notificação:', e);
        }
        setShowBanner(false);
        sessionStorage.setItem('notification_banner_dismissed', 'true');
    };

    const handleDismiss = () => {
        setShowBanner(false);
        sessionStorage.setItem('notification_banner_dismissed', 'true');
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-24 lg:bottom-10 right-6 bg-[#121212] border border-thedeal-gold/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 max-w-sm z-[500] animate-float-in border-l-4 border-l-thedeal-gold">
            <div className="flex items-start gap-4">
                <div className="bg-thedeal-gold/10 p-2 rounded-xl">
                    <BellIcon className="w-6 h-6 text-thedeal-gold" />
                </div>
                <div>
                    <h4 className="font-black text-white uppercase text-[10px] tracking-widest mb-1">Terminal de Alertas</h4>
                    <p className="text-[11px] text-thedeal-gray400 leading-relaxed font-medium uppercase opacity-80">
                        Ative as notificações para receber atualizações em tempo real sobre novos deals e convites de elite.
                    </p>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleRequestPermission} className="bg-thedeal-gold text-black font-black py-2 px-4 text-[9px] rounded-lg uppercase tracking-widest hover:brightness-110 transition-all">
                            Ativar
                        </button>
                        <button onClick={handleDismiss} className="bg-white/5 text-thedeal-gray600 font-black py-2 px-4 text-[9px] rounded-lg uppercase tracking-widest hover:bg-white/10 transition-all">
                            Agora não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPermissionManager;
