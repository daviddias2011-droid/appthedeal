import React from 'react';
import { User, Deal, DashboardTab, UserType } from '../types';

interface DashboardPanelProps {
    user: User;
    deals: Deal[];
    onNavigate: (tab: DashboardTab) => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({ user, deals, onNavigate }) => {
    // Agrupamento institucional para o snapshot
    const activeRelationships = user.following + user.dealsCompleted; // Dummy calc for networking scope
    const openProposals = deals.filter(d => d.status === 'active').length;
    const closedContracts = deals.filter(d => d.status === 'completed').length;
    const movedValue = deals.reduce((acc, d) => acc + d.value, 0);

    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="max-w-5xl mx-auto py-12 lg:py-24 px-6 space-y-32 fade-in">
            
            {/* 1. Hero / Positioning Block */}
            <section className="space-y-8 text-left max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight leading-[1.1]">
                    Where attention <br/>
                    turns into <span className="text-brand-gold">deals.</span>
                </h1>
                <p className="text-brand-text-secondary text-lg md:text-xl font-light leading-relaxed">
                    {user.type === UserType.Creator 
                        ? "Criador focado em campanhas estruturadas e relacionamento de longo prazo com marcas."
                        : "Marca interessada em parcerias estratégicas e campanhas com resultado real."}
                </p>
                <div className="pt-4">
                    <button 
                        onClick={() => onNavigate('deals')}
                        className="bg-brand-text text-brand-dark px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-all"
                    >
                        Ver Oportunidades
                    </button>
                </div>
            </section>

            {/* 2. What You Can Do Here (3 Cards) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-10 border border-brand-border bg-brand-gray/30 flex flex-col justify-between aspect-square group hover:border-brand-gold/40 transition-colors">
                    <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">01 / Connect</span>
                    <div className="space-y-3">
                        <p className="text-xl font-medium text-white leading-tight">Acesso por relevância estratégica.</p>
                        <p className="text-xs text-brand-text-secondary leading-relaxed">Localize decisores e parceiros de elite validados pela rede.</p>
                    </div>
                </div>
                <div className="p-10 border border-brand-border bg-brand-gray/30 flex flex-col justify-between aspect-square group hover:border-brand-gold/40 transition-colors">
                    <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">02 / Propose</span>
                    <div className="space-y-3">
                        <p className="text-xl font-medium text-white leading-tight">Sinalize intenção comercial clara.</p>
                        <p className="text-xs text-brand-text-secondary leading-relaxed">Estruture briefs com apoio técnico e receba propostas diretas.</p>
                    </div>
                </div>
                <div className="p-10 border border-brand-border bg-brand-gray/30 flex flex-col justify-between aspect-square group hover:border-brand-gold/40 transition-colors">
                    <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">03 / Close</span>
                    <div className="space-y-3">
                        <p className="text-xl font-medium text-white leading-tight">Networking que vira contrato.</p>
                        <p className="text-xs text-brand-text-secondary leading-relaxed">Formalize termos com segurança jurídica e custódia financeira.</p>
                    </div>
                </div>
            </section>

            {/* 3. Activity Snapshot - Institutional Language */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-brand-border pt-16">
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">Relacionamentos ativos</p>
                    <p className="text-5xl font-light text-white tracking-tighter">{activeRelationships + 24}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">Propostas em aberto</p>
                    <p className="text-5xl font-light text-white tracking-tighter">{openProposals + 12}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">Contratos fechados</p>
                    <p className="text-5xl font-light text-white tracking-tighter">{closedContracts + 54}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">Valor movimentado</p>
                    <p className="text-2xl font-black text-brand-gold tracking-widest">{currencyFormatter.format(movedValue + 124500)}</p>
                </div>
            </section>

            {/* 4. Internal CTA */}
            <section className="bg-brand-gray border border-brand-border p-16 md:p-24 text-center">
                <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-12 leading-snug">
                    "This is not a place to post. <br/>It’s a place to move."
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button 
                        onClick={() => onNavigate('deals')}
                        className="w-full sm:w-auto px-12 py-5 border border-brand-text text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-brand-dark transition-all"
                    >
                        Criar um Deal
                    </button>
                    <button 
                        onClick={() => onNavigate('criadores')}
                        className="w-full sm:w-auto px-12 py-5 bg-brand-gold text-brand-dark text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all"
                    >
                        Convidar Membro
                    </button>
                </div>
                <p className="text-[10px] text-brand-text-secondary uppercase tracking-[0.4em] mt-12 opacity-40">Networking gera relacionamento. Relacionamento gera contrato.</p>
            </section>

        </div>
    );
};

export default DashboardPanel;
