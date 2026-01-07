
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Instagram,
  ExternalLink,
  Unlink
} from 'lucide-react';
// FIX: Corrected imports - custom icons are in local './Icons' file, not 'lucide-react'.
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

    const [connections, setConnections] = useState([
        { id: 'instagram', name: 'Instagram', username: `@${user.username || 'membro'}`, connected: true, icon: Instagram }
    ]);

    const toggleSetting = (key: keyof typeof privacySettings) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDisconnect = (id: string) => {
        if (confirm(`Deseja realmente desconectar sua conta do ${id.charAt(0).toUpperCase() + id.slice(1)}? Isso pode afetar seu Deal Score.`)) {
            setConnections(prev => prev.map(c => c.id === id ? { ...c, connected: false, username: 'Não vinculado' } : c));
        }
    };

    const handleConnect = (id: string) => {
        alert(`Redirecionando para autenticação segura com ${id}...`);
        // Simulação de reconexão
        setConnections(prev => prev.map(c => c.id === id ? { ...c, connected: true, username: 'membro_vetted' } : c));
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-32 animate-fade-in px-4 text-left">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Configurações de <span className="text-thedeal-gold">Segurança.</span></h1>
                <p className="text-thedeal-gray400 text-sm font-medium mt-1">Gerencie seu terminal de acesso e conexões externas.</p>
            </header>

            {/* CONEXÕES EXTERNAS */}
            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Unlink className="w-4 h-4 text-thedeal-gold" />
                        Conexões Externas
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    {connections.map((conn) => (
                        <div key={conn.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group transition-all hover:border-white/10">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${conn.connected ? 'bg-thedeal-gold/10 text-thedeal-gold' : 'bg-white/5 text-thedeal-gray600'}`}>
                                    <conn.icon size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-white uppercase tracking-tight">{conn.name}</p>
                                        {conn.connected && <div className="w-1.5 h-1.5 bg-thedeal-success rounded-full animate-pulse"></div>}
                                    </div>
                                    <p className="text-[10px] text-thedeal-gray600 font-mono mt-0.5">{conn.username}</p>
                                </div>
                            </div>
                            
                            {conn.connected ? (
                                <button 
                                    onClick={() => handleDisconnect(conn.id)}
                                    className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    Desconectar
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleConnect(conn.id)}
                                    className="px-4 py-2 bg-thedeal-gold/10 text-thedeal-gold border border-thedeal-gold/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-thedeal-gold hover:text-black transition-all"
                                >
                                    Conectar
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <LockIcon className="w-4 h-4 text-thedeal-gold" />
                        Credenciais de Acesso
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-[9px] font-black text-thedeal-gray600 uppercase tracking-[0.3em] mb-2 ml-1">E-mail de Cadastro</label>
                        <div className="relative">
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled 
                                className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 pl-14 text-sm font-bold text-thedeal-gray600 opacity-70 cursor-not-allowed"
                            />
                            <LockIcon className="w-4 h-4 text-thedeal-gray700 absolute left-5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl">
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">Senha de Segurança</p>
                            <p className="text-[10px] text-thedeal-gray600 font-medium uppercase tracking-widest mt-1">Alterada há 3 meses</p>
                        </div>
                        <button className="bg-white/5 border border-white/10 text-white font-black py-2 px-6 rounded-xl hover:bg-white/10 transition-all text-[9px] uppercase tracking-widest">
                            Redefinir
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl">
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">2FA (Dois Fatores)</p>
                            <p className="text-[10px] text-thedeal-gray600 font-medium uppercase tracking-widest mt-1">Camada extra de proteção via app.</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('twoFactor')}
                            className={`w-12 h-6 rounded-full transition-all relative ${privacySettings.twoFactor ? 'bg-thedeal-success' : 'bg-thedeal-gray700'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${privacySettings.twoFactor ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <ShieldIcon className="w-4 h-4 text-thedeal-gold" />
                        Privacidade do Perfil
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-2xl">
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">Perfil Visível para Marcas</p>
                            <p className="text-[10px] text-thedeal-gray600 font-medium uppercase tracking-widest mt-1">Aparecer no radar de novas oportunidades.</p>
                        </div>
                        <button 
                            onClick={() => toggleSetting('profileVisible')}
                            className={`w-12 h-6 rounded-full transition-all relative ${privacySettings.profileVisible ? 'bg-thedeal-gold' : 'bg-thedeal-gray700'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${privacySettings.profileVisible ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <DeviceIcon className="w-5 h-5 text-thedeal-gold" />
                        Sessões do Terminal
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-thedeal-gold/10 rounded-xl flex items-center justify-center">
                                <DeviceIcon className="w-5 h-5 text-thedeal-gold" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white uppercase tracking-tight">Este Dispositivo</p>
                                <p className="text-[10px] text-thedeal-success font-black uppercase tracking-widest mt-0.5">Online agora • São Paulo, BR</p>
                            </div>
                        </div>
                        <button onClick={onLogout} className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                            Encerrar Outros
                        </button>
                    </div>
                </div>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 rounded-3xl p-8">
                <div className="flex items-start gap-4">
                    <TrashIcon className="w-6 h-6 text-red-500 mt-1" />
                    <div className="text-left">
                        <h2 className="text-lg font-black text-white uppercase tracking-tight">Protocolo de Exclusão</h2>
                        <p className="text-sm text-thedeal-gray400 mt-2 leading-relaxed">
                            A exclusão da conta é permanente e irreversível. Todos os seus dados, histórico de deals, certificados e acesso ao ClubAlpha serão destruídos.
                        </p>
                        <button className="mt-6 bg-red-500/10 border border-red-500/20 text-red-500 font-black py-3 px-8 rounded-xl hover:bg-red-500 hover:text-white transition-all text-[10px] uppercase tracking-[0.2em]">
                            Excluir Terminal de Acesso
                        </button>
                    </div>
                </div>
            </div>
            
            <footer className="text-center opacity-30 py-10 flex flex-col items-center gap-2">
                 <p className="text-[8px] font-black text-thedeal-gray600 uppercase tracking-[0.5em]">
                    THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO
                </p>
                <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-md">
                    A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
                </p>
            </footer>
        </div>
    );
};

export default SettingsPage;
