
import React, { useState } from 'react';
import { User, Deal, UserType } from '../types';
import { 
  Users, Activity, Globe, Clock, RefreshCcw, Trash2, ExternalLink, ShieldAlert
} from 'lucide-react';
import { USERS } from '../constants';

interface AdminDashboardProps {
    adminUser: User;
    allUsers: User[];
    allDeals: Deal[];
    // FIX: Added missing allApplications property to the interface.
    allApplications: any[];
    allTransactions: any[];
    onLogout: () => void;
    onUpdateUser: (data: any) => void;
    onDeleteUser: (id: any) => void;
    onDeleteDeal: (id: any) => void;
    onApproveApplication: (id: any) => void;
    onRejectApplication: (id: any) => void;
    onMarkAsWonka: (id: any, val: boolean) => void;
    onAddTransaction: (id: any, data: any) => void;
    onEnterUserView: () => void;
    onGoHome: () => void;
    language: string;
    toggleLanguage: () => void;
    theme: string;
    toggleTheme: () => void;
    t: any;
}

export default function AdminDashboard({ adminUser }: AdminDashboardProps) {
    const [leads, setLeads] = useState<any[]>([
        { id: '1', full_name: 'Marcos Roberto', email: 'marcos@tech.com', user_type: 'brand', niche: 'Tecnologia', motivation: 'Busco criadores para expansão de SaaS.' },
        { id: '2', full_name: 'Ana Silva', email: 'ana@creator.com', user_type: 'creator', niche: 'Finanças', motivation: 'Quero monetizar minha audiência de investidores.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 800);
    };

    const handleDelete = (id: string) => {
        if (!confirm('Excluir este lead?')) return;
        setLeads(leads.filter(l => l.id !== id));
    };

    return (
        <div className="space-y-12 animate-fade-in pb-20 p-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Candidaturas', value: leads.length, icon: Users, color: 'text-thedeal-gold' },
                    { label: 'Network Pulse', value: 'ALTO', icon: Activity, color: 'text-thedeal-goldBright' },
                    { label: 'Transacionado', value: 'R$ 4.2M', icon: Globe, color: 'text-white' },
                    { label: 'SLA de Aprovação', value: '48h', icon: Clock, color: 'text-thedeal-success' }
                ].map((stat, i) => (
                    <div key={i} className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group">
                        <stat.icon className="absolute -top-2 -right-2 w-20 h-20 text-thedeal-gold opacity-5" />
                        <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color} tracking-tighter leading-none`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-black/20">
                    <div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Terminal de Curadoria</h3>
                        <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em] mt-1">Dados em Modo Visualização (Offline)</p>
                    </div>
                    <button onClick={handleRefresh} className={`p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all ${isLoading ? 'animate-spin' : ''}`}>
                        <RefreshCcw size={20} className="text-thedeal-gold" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/40 text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">
                            <tr>
                                <th className="px-10 py-6">Membro</th>
                                <th className="px-10 py-6">Categoria</th>
                                <th className="px-10 py-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-10 py-6">
                                        <p className="text-sm font-bold text-white uppercase">{lead.full_name}</p>
                                        <p className="text-[11px] text-thedeal-gray600 font-mono">{lead.email}</p>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase border ${lead.user_type === 'brand' ? 'bg-thedeal-gold/10 text-thedeal-gold border-thedeal-gold/20' : 'bg-blue-600/10 text-blue-400 border-blue-600/20'}`}>
                                            {lead.user_type === 'brand' ? 'MARCA' : 'CRIADOR'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => handleDelete(lead.id)} className="p-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                                            <button className="bg-thedeal-goldBright text-black font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-xl">Aprovar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
