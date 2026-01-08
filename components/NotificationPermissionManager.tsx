
import React, { useState, useEffect } from 'react';
import { BellIcon } from './Icons';

const NotificationPermissionManager: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            if (Notification.permission === 'default' && !sessionStorage.getItem('notification_banner_dismissed')) {
                setShowBanner(true);
            }
        }
    }, []);

    const handleRequestPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            new Notification('THE DEAL', {
                body: 'Ótimo! Agora você receberá as notificações importantes.',
                icon: '/vite.svg'
            });
        }
        setShowBanner(false);
        sessionStorage.setItem('notification_banner_dismissed', 'true');
    };

    const handleDismiss = () => {
        setShowBanner(false);
        sessionStorage.setItem('notification_banner_dismissed', 'true');
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-16 sm:bottom-4 right-4 bg-brand-light-gray border border-brand-border rounded-lg shadow-lg p-4 max-w-sm z-50 animate-fade-in">
            <div className="flex items-start gap-3">
                <div className="bg-brand-primary/10 p-2 rounded-full">
                    <BellIcon className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                    <h4 className="font-bold text-white">Fique por dentro</h4>
                    <p className="text-sm text-brand-text-secondary mt-1">
                        Ative as notificações para não perder nenhuma oportunidade ou mensagem importante.
                    </p>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleRequestPermission} className="bg-brand-primary text-brand-dark font-bold py-1 px-3 text-sm rounded-md hover:brightness-110">
                            Ativar
                        </button>
                        <button onClick={handleDismiss} className="bg-brand-gray text-brand-text-secondary font-bold py-1 px-3 text-sm rounded-md hover:bg-brand-border">
                            Agora não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPermissionManager;
