
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, Check, Copy, Trophy, Target, ShieldCheck, Loader, ArrowRight, Briefcase, Zap, Star, Users, Clock } from 'lucide-react';
import { ReferralSystem } from '../lib/referral';
import { useAuth } from '../contexts/AuthContext';
import { EmailService } from '../lib/emailjs';

interface MissionsPageProps {
  onBack: () => void;
  onRequireAuth: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBack, onRequireAuth }) => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (profile) {
      const ref = ReferralSystem.getUserReferral(profile.id) || ReferralSystem.generateCode(profile.id, profile.name);
      setReferralCode(ref.code);
    }
  }, [profile]);

  const handleGenerateCode = () => {
    if (!profile) {
      onRequireAuth();
      return;
    }
    // O código já é gerado no useEffect se logado
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(`🚀 Acabei de entrar no Hub de Missões do The Deal! Use meu código para análise prioritária: ${referralCode}\n\n${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if (profile) {
        EmailService.sendReferralInvitation(profile.name, profile.email, referralCode);
    }
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
           <p className="text-[#A0A0A0] text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed text-center">
             O acesso definitivo à rede é por mérito. Cumpra os requisitos técnicos e garanta sua vaga permanente no ecossistema.
           </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Users size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 01</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Convide 2 novos membros que sejam aprovados pela nossa curadoria.</p>
                </div>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Briefcase size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 02</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Conclua pelo menos 1 deal (contrato) oficial através do terminal The Deal.</p>
                </div>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Clock size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 03</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Mantenha seu perfil ativo e em conformidade por um período de 6 meses.</p>
                </div>
            </div>
        </section>

        {!profile ? (
            <div className="bg-[#141414] border border-white/5 p-12 rounded-[3rem] text-center space-y-8">
                <Lock className="text-thedeal-gold mx-auto" size={48} />
                <h3 className="text-2xl font-black uppercase text-white">Acesso Identificado Necessário</h3>
                <p className="text-thedeal-gray400 max-w-sm mx-auto">Para gerar seu código de expansão e participar das missões, você precisa estar logado no terminal.</p>
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

        <footer className="text-center opacity-30 pt-10 space-y-4">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
        </footer>
      </div>
    </div>
  );
};

export default MissionsPage;
