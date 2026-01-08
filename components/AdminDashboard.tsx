
import React, { useState, useEffect } from 'react';
import { User, Deal, UserType, Application } from '../types';
import { 
  Users, Database, Globe, Server, Activity, Clock, ShieldAlert, RefreshCcw, Trash2, ExternalLink
} from 'lucide-react';
import { api } from '../lib/api';

interface AdminDashboardProps {
    adminUser: User;
    allUsers: User[];
    allDeals: Deal[];
    allApplications: Application[];
    allTransactions: any[];
    onLogout: () => void;
    onUpdateUser: (updatedData: Partial<User> & { id: number }) => void;
    onDeleteUser: (userId: number) => void;
    onDeleteDeal: (dealId: string) => void;
    onApproveApplication: (appId: number) => void;
    onRejectApplication: (appId: number) => void;
    onMarkAsWonka: (id: number, val: boolean) => void;
    onAddTransaction: (id: number, data: any) => void;
    onEnterUserView: () => void;
    onGoHome: () => void;
    language: string;
    toggleLanguage: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    t: any;
}

export default function AdminDashboard(props: AdminDashboardProps) {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/api/admin/leads.php');
            setLeads(data.leads || []);
        } catch (err) {
            console.error("Erro ao sincronizar leads via API:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
        // Polling interval since we lost Supabase Realtime
        const interval = setInterval(fetchLeads, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir permanentemente este lead da base de curadoria?')) return;
        try {
            await api.post('/api/admin/excluir-lead.php', { id });
            setLeads(leads.filter(l => l.id !== id));
        } catch (e) {
            alert('Falha ao excluir lead.');
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await api.post('/api/admin/aprovar-lead.php', { id });
            alert('Membro validado com sucesso!');
            fetchLeads();
        } catch (e) {
            alert('Erro ao aprovar membro.');
        }
    };

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Novas Candidaturas', value: leads.length, icon: Users, color: 'text-thedeal-gold' },
                    { label: 'Network Pulse', value: 'ALTO', icon: Activity, color: 'text-thedeal-goldBright' },
                    { label: 'Transacionado', value: 'R$ 4.2M', icon: Globe, color: 'text-white' },
                    { label: 'SLA de Aprovação', value: '48h', icon: Clock, color: 'text-thedeal-success' }
                ].map((stat, i) => (
                    <div key={i} className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                        <stat.icon className="absolute -top-2 -right-2 w-20 h-20 text-thedeal-gold opacity-5" />
                        <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color} tracking-tighter leading-none`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Leads Table */}
            <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-black/20">
                    <div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Fila de Curadoria Alpha</h3>
                        <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em] mt-1">Sincronizado com MySQL Master</p>
                    </div>
                    <button onClick={fetchLeads} className={`p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all ${isLoading ? 'animate-spin' : ''}`}>
                        <RefreshCcw size={20} className="text-thedeal-gold" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/40 text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">
                            <tr>
                                <th className="px-10 py-6">Membro</th>
                                <th className="px-10 py-6">Categoria</th>
                                <th className="px-10 py-6">Motivação</th>
                                <th className="px-10 py-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.length > 0 ? leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-thedeal-gray700 to-black border border-white/10 flex items-center justify-center font-black text-thedeal-gold shadow-lg">
                                                {lead.full_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase">{lead.full_name}</p>
                                                <p className="text-[11px] text-thedeal-gray600 font-mono">{lead.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase border ${lead.user_type === 'brand' ? 'bg-thedeal-gold/10 text-thedeal-gold border-thedeal-gold/20' : 'bg-blue-600/10 text-blue-400 border-blue-600/20'}`}>
                                            {lead.user_type === 'brand' ? 'MARCA' : 'CRIADOR'}
                                        </span>
                                        <p className="text-[10px] text-thedeal-gray400 font-black mt-2 uppercase tracking-widest">{lead.niche}</p>
                                    </td>
                                    <td className="px-10 py-6 max-w-xs">
                                        <p className="text-xs text-thedeal-gray400 leading-relaxed line-clamp-2 italic">"{lead.motivation}"</p>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            {lead.profile_url && <a href={lead.profile_url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl text-thedeal-gray600 hover:text-white transition-all"><ExternalLink size={16}/></a>}
                                            <button onClick={() => handleDelete(lead.id)} className="p-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                                            <button onClick={() => handleApprove(lead.id)} className="bg-thedeal-goldBright text-black font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-thedeal-gold/10 hover:scale-105 transition-all">Aprovar</button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-30">
                                            <ShieldAlert size={48} />
                                            <p className="text-xs font-black uppercase tracking-[0.5em]">Nenhum lead pendente no terminal.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
