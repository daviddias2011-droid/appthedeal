
import React, { useState, useEffect } from 'react';
import { 
  FileText, Award, Copy, Check, Zap, 
  ShieldCheck, Instagram, MessageCircle, Mail, MousePointer2, TrendingUp, CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MissionsPanel() {
  const { profile } = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      const savedCode = localStorage.getItem(`thedeal_ref_${profile.id}`) || "ALPHA-" + profile.id;
      setReferralCode(savedCode);
    }
  }, [profile]);

  const handleCopy = () => {
    const link = `${window.location.origin}/cadastro?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dailyMissions = [
    { id: 'insta', name: 'Conectar Instagram', desc: 'Vincule sua conta para análise de perfil', points: 50, icon: <Instagram size={20} />, action: 'Conectar' },
    { id: 'perf', name: 'Completar Perfil', desc: 'Bio e portfólio comercial.', points: 30, icon: <FileText size={20} />, action: 'Completar' },
    { id: 'ip_course', name: 'Proteção de Ativos', desc: 'Aprenda a licenciar suas criações.', points: 100, icon: <ShieldCheck size={20} />, action: 'Começar' },
  ];

  return (
    <div className="space-y-12 animate-fade-in w-full pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
        <div>
           <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">🎯 Missões & <span className="text-thedeal-gold">Indicações</span></h2>
        </div>
        <div className="bg-thedeal-gold/10 border border-thedeal-goldDim/30 p-6 rounded-3xl text-center shadow-2xl backdrop-blur-md min-w-[220px]">
           <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em] mb-1 opacity-70">Deal Score Atual</p>
           <p className="text-3xl font-black text-white">{profile?.total_points || 10} <span className="text-thedeal-gold text-sm font-bold">PTS</span></p>
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
             <button className="mt-6 text-[9px] font-black uppercase tracking-widest text-white px-5 py-2 bg-white/5 rounded-lg hover:bg-thedeal-gold hover:text-black transition-all">
                {m.action}
             </button>
          </div>
        ))}
      </div>

      <div className="px-4">
        <div className="bg-gradient-to-br from-[#141414] to-black border-2 border-thedeal-goldDim/20 rounded-[3rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 max-w-2xl space-y-8 text-left">
              <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Seu Link de <br/><span className="text-thedeal-gold">Expansão</span></h3>
              <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white font-mono text-2xl flex items-center justify-center tracking-widest shadow-inner">
                    {referralCode}
                  </div>
                  <button onClick={handleCopy} className="bg-thedeal-goldBright text-black font-black px-8 py-5 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3">
                    {copied ? <Check size={18} strokeWidth={4} /> : <Copy size={18} />}
                    {copied ? 'Copiado' : 'Copiar Link'}
                  </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
