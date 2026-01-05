
import React, { useState } from 'react';
import { User } from '../types';
import { ShieldIcon, LockIcon, DeviceIcon, TrashIcon, CheckCircleIcon } from './Icons';

interface SettingsPageProps {
    user: User;
    onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onLogout }) => {
    const [privacySettings, setPrivacySettings] = useState({
        profileVisible: true,
        showDealValue: false,
        twoFactor: false
    });

    const toggleSetting = (key: keyof typeof privacySettings) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-20">
            <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-brand-border bg-brand-light-gray/30">
                    <h2 className="text-lg font-bold text-brand-text flex items-center gap-2">
                        <LockIcon className="w-5 h-5 text-brand-primary" />
                        Credenciais de Acesso
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-brand-text-secondary mb-1">E-mail de Cadastro</label>
                        <div className="relative">
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled 
                                className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 pl-10 text-brand-text-secondary opacity-70 cursor-not-allowed"
                            />
                            <LockIcon className="w-4 h-4 text-brand-text-secondary absolute left-3 top-3.5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-brand-text">Senha</p>
                            <p className="text-sm text-brand-text-secondary">Última alteração há 3 meses</p>
                        </div>
                        <button className="border border-brand-border text-brand-text font-bold py-2 px-4 rounded-md hover:bg-brand-light-gray transition-colors text-sm">
                            Alterar Senha
                        </button>
                    </div>
                    <div className="flex items-center justify-between border-t border-brand-border pt-4">
                        <div>
                            <p className="font-bold text-brand-text">Autenticação em Dois Fatores (2FA)</p>
                            <p className="text-sm text-brand-text-secondary">Adicione uma camada extra de segurança.</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('twoFactor')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.twoFactor ? 'bg-brand-primary' : 'bg-brand-border'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${privacySettings.twoFactor ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-brand-border bg-brand-light-gray/30">
                    <h2 className="text-lg font-bold text-brand-text flex items-center gap-2">
                        <ShieldIcon className="w-5 h-5 text-blue-400" />
                        Privacidade
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-brand-text">Perfil Visível para Empresas</p>
                            <p className="text-sm text-brand-text-secondary">Permitir que marcas encontrem seu perfil na busca.</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('profileVisible')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.profileVisible ? 'bg-brand-primary' : 'bg-brand-border'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${privacySettings.profileVisible ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between border-t border-brand-border pt-4">
                        <div>
                            <p className="font-bold text-brand-text">Mostrar Valor Médio de Deal</p>
                            <p className="text-sm text-brand-text-secondary">Exibir estimativa de valores no seu perfil público.</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('showDealValue')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.showDealValue ? 'bg-brand-primary' : 'bg-brand-border'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${privacySettings.showDealValue ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-brand-border bg-brand-light-gray/30">
                    <h2 className="text-lg font-bold text-brand-text flex items-center gap-2">
                        <DeviceIcon className="w-5 h-5 text-purple-400" />
                        Sessões Ativas
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-light-gray rounded-full flex items-center justify-center">
                                <DeviceIcon className="w-5 h-5 text-brand-text-secondary" />
                            </div>
                            <div>
                                <p className="font-bold text-brand-text">Este Dispositivo</p>
                                <p className="text-xs text-brand-text-secondary flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                                    Online agora • São Paulo, BR
                                </p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onLogout} className="text-sm text-red-400 font-bold hover:underline">
                        Sair de todas as outras sessões
                    </button>
                </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                <h2 className="text-lg font-bold text-red-600 mb-2">Zona de Perigo</h2>
                <p className="text-sm text-red-400 mb-4">A exclusão da conta é permanente e não pode ser desfeita. Todos os seus dados, histórico de deals e acesso ao ClubAlpha serão perdidos.</p>
                <button className="flex items-center gap-2 bg-red-100 text-red-600 font-bold py-2 px-4 rounded-md hover:bg-red-200 transition-colors text-sm">
                    <TrashIcon className="w-4 h-4" />
                    Excluir minha conta
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
