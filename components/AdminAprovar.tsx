
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Check, X, Loader, ArrowLeft } from 'lucide-react';

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
      const profiles = await api.get('/get_pending_profiles.php');
      setPending(profiles || []);
    } catch (error) {
      console.error('Erro ao carregar pendentes do MySQL:', error);
    } finally {
      setLoading(false);
    }
  };

  const aprovar = async (userId: string) => {
    setProcessing(userId);
    try {
      await api.post('/update_profile_status.php', {
        userId,
        status: 'verified',
        is_vetted: 1
      });
      alert('✅ Usuário aprovado na Rede The Deal!');
      loadPending();
    } catch (error) {
      alert('Erro ao aprovar usuário no banco.');
      console.error(error);
    } finally {
      setProcessing(null);
    }
  };

  const rejeitar = async (userId: string) => {
    setProcessing(userId);
    try {
      await api.post('/update_profile_status.php', {
        userId,
        status: 'rejected',
        is_vetted: 0
      });
      alert('❌ Usuário rejeitado.');
      loadPending();
    } catch (error) {
      alert('Erro ao rejeitar usuário no banco.');
      console.error(error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-thedeal-bg flex flex-col items-center justify-center">
        <Loader className="w-10 h-10 text-thedeal-gold animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-thedeal-gold">Acessando Banco Locaweb...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thedeal-bg py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-thedeal-gray400 hover:text-white mb-4 group transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar ao Início</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                  Controle de <span className="text-thedeal-gold">Acesso.</span>
                </h1>
                <p className="text-thedeal-gray400 mt-2 font-medium">Gerenciamento MySQL de solicitações pendentes.</p>
            </div>
            <div className="bg-thedeal-gold/10 border border-thedeal-gold/20 px-6 py-3 rounded-2xl">
                <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">Pendentes</p>
                <p className="text-2xl font-black text-white">{pending.length}</p>
            </div>
        </header>

        {pending.length === 0 ? (
          <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-20 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-thedeal-gray600" size={32} />
              </div>
              <p className="text-thedeal-gray400 font-black uppercase tracking-[0.3em] text-xs">Nenhum cadastro aguardando revisão no momento.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pending.map((user) => (
              <div
                key={user.id}
                className="bg-thedeal-card border border-white/5 rounded-3xl p-8 hover:border-thedeal-gold/20 transition-all shadow-2xl relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-thedeal-gold to-black rounded-2xl flex items-center justify-center font-black text-xl text-black shadow-xl">
                            {user.full_name?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{user.full_name}</h3>
                            <p className="text-thedeal-gold text-[10px] font-black uppercase tracking-widest">{user.email}</p>
                        </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                    <button
                      onClick={() => aprovar(user.id)}
                      disabled={processing === user.id}
                      className="flex-1 md:w-40 bg-thedeal-success text-black px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-thedeal-success/10 disabled:opacity-50"
                    >
                      {processing === user.id ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      Aprovar
                    </button>
                    <button
                      onClick={() => rejeitar(user.id)}
                      disabled={processing === user.id}
                      className="flex-1 md:w-40 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                    >
                      {processing === user.id ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                      Rejeitar
                    </button>
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
