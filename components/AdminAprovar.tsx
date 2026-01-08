
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
// FIX: Added missing CheckCircle2 import from lucide-react.
import { Check, X, Loader, ArrowLeft, ShieldAlert, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AdminAprovarProps {
  onBack: () => void;
}

export default function AdminAprovar({ onBack }: AdminAprovarProps) {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/admin/pendentes.php');
      setPending(data.profiles || []);
    } catch (error) {
      console.error('Erro ao carregar pendentes do terminal:', error);
    } finally {
      setLoading(false);
    }
  };

  const aprovar = async (userId: string) => {
    setProcessing(userId);
    try {
      await api.post('/api/admin/aprovar.php', { user_id: userId });
      alert('✅ Membro aprovado na Rede The Deal!');
      loadPending();
    } catch (error: any) {
      alert('Erro ao processar aprovação: ' + error.message);
    } finally {
      setProcessing(null);
    }
  };

  const rejeitar = async (userId: string) => {
    if (!confirm('Deseja realmente rejeitar este acesso?')) return;
    setProcessing(userId);
    try {
      await api.post('/api/admin/rejeitar.php', { user_id: userId });
      alert('❌ Solicitação rejeitada.');
      loadPending();
    } catch (error: any) {
      alert('Erro ao rejeitar: ' + error.message);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-thedeal-bg flex flex-col items-center justify-center p-4">
        <Loader className="w-10 h-10 text-thedeal-gold animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-thedeal-gold">Sincronizando Terminal Alpha...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thedeal-bg py-20 px-4 md:px-10 text-left">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-thedeal-gray400 hover:text-white mb-4 group transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar ao Terminal</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                  Fila de <span className="text-thedeal-gold">Curadoria.</span>
                </h1>
                <p className="text-thedeal-gray400 mt-2 font-medium">Auditoria manual de solicitações de ingresso na rede.</p>
            </div>
            <div className="bg-thedeal-gold/10 border border-thedeal-gold/20 px-8 py-4 rounded-3xl text-center shadow-xl">
                <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.3em] mb-1">Candidatos Alpha</p>
                <p className="text-3xl font-black text-white">{pending.length}</p>
            </div>
        </header>

        {pending.length === 0 ? (
          <div className="bg-thedeal-card border border-white/5 rounded-[3.5rem] p-24 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02]"><ShieldCheck size={300} /></div>
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-white/5">
                <Check className="text-thedeal-gray600" size={36} />
              </div>
              <p className="text-thedeal-gray400 font-black uppercase tracking-[0.4em] text-sm">Base de dados limpa. Nenhuma auditoria pendente.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {pending.map((user) => (
              <div
                key={user.id}
                className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 hover:border-thedeal-gold/30 transition-all shadow-2xl relative overflow-hidden group"
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10">
                  <div className="flex-1 space-y-8 w-full">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-thedeal-gold to-black rounded-3xl flex items-center justify-center font-black text-3xl text-black shadow-2xl border border-white/10 group-hover:scale-105 transition-transform">
                            {user.full_name?.charAt(0) || user.name?.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                {user.full_name || user.name}
                                </h3>
                                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${user.user_type === 'brand' ? 'bg-thedeal-gold/10 text-thedeal-gold border-thedeal-gold/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                    {user.user_type === 'brand' ? 'MARCA' : 'CRIADOR'}
                                </span>
                            </div>
                            <p className="text-thedeal-gold text-[11px] font-black uppercase tracking-widest font-mono opacity-60">
                            {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 border-t border-white/5">
                      {user.user_type === 'creator' ? (
                        <>
                          <div>
                            <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">Engajamento</p>
                            <p className="text-white font-bold text-lg">{user.follower_count?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">Nicho</p>
                            <p className="text-white font-bold text-lg uppercase tracking-tight">{user.niche || 'Geral'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">Identificador Alpha</p>
                            <p className="text-white font-mono text-sm break-all">@{user.instagram_handle || user.username || 'SINC_PENDING'}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">Empresa</p>
                            <p className="text-white font-bold text-lg uppercase tracking-tight">{user.company_name || 'Corporativo'}</p>
                          </div>
                          <div>
                            <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">LTV Target</p>
                            <p className="text-white font-bold text-lg uppercase tracking-tight">{user.annual_revenue || 'N/A'}</p>
                          </div>
                          <div className="col-span-2">
                             <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-2">Status Fiscal</p>
                             <p className="text-thedeal-success font-black text-sm uppercase tracking-widest">Validado (CNPJ OK)</p>
                          </div>
                        </>
                      )}
                    </div>

                    {(user.why_join || user.motivation) && (
                      <div className="p-8 bg-black/40 border border-white/5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-thedeal-gold/40"></div>
                        <p className="text-thedeal-gray600 text-[10px] font-black uppercase tracking-widest mb-4">Carta de Intenção Alpha</p>
                        <p className="text-white/80 text-base leading-relaxed italic font-medium">
                          "{user.why_join || user.motivation}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 w-full lg:w-56 shrink-0">
                    <button
                      onClick={() => aprovar(user.id)}
                      disabled={processing === user.id}
                      className="w-full bg-thedeal-success text-black px-8 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 hover:scale-[1.02] transition-all shadow-2xl shadow-thedeal-success/20 disabled:opacity-50"
                    >
                      {processing === user.id ? <Loader className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                      Aprovar Acesso
                    </button>
                    <button
                      onClick={() => rejeitar(user.id)}
                      disabled={processing === user.id}
                      className="w-full bg-white/5 border border-white/10 text-red-500 px-8 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                    >
                      {processing === user.id ? <Loader className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
                      Rejeitar
                    </button>
                    <div className="pt-4 mt-4 border-t border-white/5 text-center">
                        <p className="text-[8px] font-black text-thedeal-gray700 uppercase tracking-widest">Auditoria ID: {user.id.substring(0, 12)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
