
import React, { useState, useEffect } from 'react';
import { 
  FileText, Award, Copy, Check, Zap, 
  ShieldCheck, Instagram, Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MissionsPanel() {
  const { profile, refreshProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCopy = () => {
    const code = profile?.referral_code || "ALPHA";
    const link = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompleteMission = async (missionId: string, points: number) => {
    if (!profile) return;
    setLoadingId(missionId);
    
    try {
      const response = await fetch('/api/complete-mission.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: profile.id,
          missionId: missionId,
          points: points
        })
      });

      const data = await response.json();
      if (data.success) {
        await refreshProfile(); // Atualiza os pontos na tela
        alert(`Missão concluída! +${points} pontos Alpha.`);
      } else {
        alert(data.error || "Missão já realizada.");
      }
    } catch (e) {
      alert("Erro ao conectar com o terminal.");
    } finally {
      setLoadingId(null);
    }
  };

  const dailyMissions = [
    { id: 'insta', name: 'Conectar Instagram', desc: 'Vincule sua conta para análise.', points: 50, icon: <Instagram size={20} /> },
    { id: 'perf', name: 'Completar Perfil', desc: 'Bio e portfólio comercial.', points: 30, icon: <FileText size={20} /> },
    { id: 'ip_course', name: 'Proteção de Ativos', desc: 'Aprenda a licenciar sua IP.', points: 100, icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="space-y-12 animate-fade-in w-full pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
           <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">🎯 Missões & <span className="text-thedeal-gold">Indicações</span></h2>
        </div>
        <div className="bg-thedeal-gold/10 border border-thedeal-goldDim/30 p-6 rounded-3xl text-center shadow-2xl backdrop-blur-md min-w-[220px]">
           <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em] mb-1 opacity-70">Deal Score Atual</p>
           <p className="text-3xl font-black text-white">{profile?.total_points || 0} <span className="text-thedeal-gold text-sm font-bold">PTS</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {dailyMissions.map(m => (
          <div key={m.id} className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-thedeal-gold/30 transition-all group shadow-xl">
             <div className="space-y-4 text-left">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-thedeal-gold group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">{m.name}</h4>
                <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">{m.desc}</p>
             </div>
             <button 
                onClick={() => handleCompleteMission(m.id, m.points)}
                disabled={loadingId === m.id}
                className="mt-6 text-[9px] font-black uppercase tracking-widest text-white px-5 py-2 bg-white/5 rounded-lg hover:bg-thedeal-gold hover:text-black transition-all flex items-center justify-center gap-2"
              >
                {loadingId === m.id ? <Loader size={12} className="animate-spin" /> : "Concluir"}
             </button>
          </div>
        ))}
      </div>

      <div className="px-4">
        <div className="bg-gradient-to-br from-[#141414] to-black border-2 border-thedeal-goldDim/20 rounded-[3rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 max-w-2xl space-y-8 text-left">
              <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Seu Link de <br/><span className="text-thedeal-gold">Expansão</span></h3>
              <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white font-mono text-2xl flex items-center justify-center tracking-widest shadow-inner uppercase">
                    {profile?.referral_code || "GERANDO..."}
                  </div>
                  <button onClick={handleCopy} className="bg-thedeal-goldBright text-black font-black px-8 py-5 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3">
                    {copied ? <Check size={18} strokeWidth={4} /> : <Copy size={18} />}
                    {copied ? 'Copiado' : 'Copiar Link'}
                  </button>
              </div>
              <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Ganhe 500 pontos por cada membro qualificado que entrar via seu link.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
