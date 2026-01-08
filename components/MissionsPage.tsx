
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Check, Copy, Trophy, Target, Briefcase, Zap, Users, Clock, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MissionsPageProps {
  onBack: () => void;
  onRequireAuth: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBack, onRequireAuth }) => {
  const { profile } = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (profile) {
      // Lógica simplificada sem dependência de lib/referral
      const savedCode = localStorage.getItem(`thedeal_ref_${profile.id}`);
      if (savedCode) {
        setReferralCode(savedCode);
      } else {
        const newCode = (profile.name.substring(0, 3) + Math.random().toString(36).substring(2, 6)).toUpperCase();
        localStorage.setItem(`thedeal_ref_${profile.id}`, newCode);
        setReferralCode(newCode);
      }
    }
  }, [profile]);

  const handleCopy = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(`🚀 Acabei de entrar no Hub de Missões do The Deal! Use meu código: ${referralCode}\n\n${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center animate-fade-in selection:bg-thedeal-gold selection:text-black text-left">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                </div>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
              <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
            </button>
        </div>
      </nav>

      <div className="max-w-4xl w-full space-y-12 pt-32 md:pt-40 pb-20 px-6">
        <header className="text-center space-y-4">
           <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-5 py-2 rounded-full mb-4">
              <Target size={14} className="text-[#D4AF37]" />
              <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">HUB DE MISSÕES ALPHA</span>
           </div>
           <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
             CONQUISTE SEU <br/><span className="text-[#D4AF37]">VITALÍCIO.</span>
           </h1>
        </header>

        {!profile ? (
            <div className="bg-[#141414] border border-white/5 p-12 rounded-[3rem] text-center space-y-8">
                <Lock className="text-thedeal-gold mx-auto" size={48} />
                <h3 className="text-2xl font-black uppercase text-white">Acesso Necessário</h3>
                <button onClick={onRequireAuth} className="bg-thedeal-gold text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Acessar Terminal</button>
            </div>
        ) : (
            <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
                <div className="bg-black border border-white/10 p-8 rounded-3xl space-y-4 shadow-inner">
                    <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">SEU CÓDIGO ATIVADOR</p>
                    <div className="text-3xl font-black tracking-[0.2em] text-white uppercase">{referralCode}</div>
                    <button 
                        onClick={handleCopy}
                        className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#D4AF37]/10"
                    >
                        {copied ? <Check size={16} strokeWidth={4} /> : <Copy size={16} />}
                        {copied ? 'Link Copiado' : 'Copiar Meu Link'}
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MissionsPage;
