
import React, { useState, useEffect } from 'react';
import { 
  Gift, Users, FileText, Award, Copy, Check, Zap, Star, 
  ShieldCheck, Instagram, MessageCircle, Mail, ArrowRight, MousePointer2, TrendingUp, Info, CheckCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReferralSystem, ReferralData } from '../lib/referral';
import { useAuth } from '../contexts/AuthContext';

export default function MissionsPanel() {
  const { profile } = useAuth();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailSending, setEmailSending] = useState(false);

  const loadData = async () => {
    if (!profile) return;
    let refData = ReferralSystem.getUserReferral(profile.id);
    if (!refData) {
      refData = ReferralSystem.generateCode(profile.id, profile.name);
    }
    setReferralData(refData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [profile]);

  const handleCopy = () => {
    if (!referralData) return;
    const link = `${window.location.origin}/cadastro?ref=${referralData.code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    if (!referralData) return;
    const link = `${window.location.origin}/cadastro?ref=${referralData.code}`;
    const text = encodeURIComponent(`🚀 Conheci o The Deal, uma plataforma onde criadores fecham contratos reais de R$ 2K-50K. Cadastra pelo meu link para a gente crescer juntos: ${link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaEmail = async () => {
    if (!profile || !referralData || emailSending) return;
    setEmailSending(true);
    try {
      const subject = encodeURIComponent("Convite para Rede Privada The Deal");
      const link = `${window.location.origin}/cadastro?ref=${referralData.code}`;
      const body = encodeURIComponent(`Olá! Conheci o The Deal, uma plataforma onde criadores fecham contratos reais de R$ 2K-50K. Cadastra pelo meu link para a gente crescer juntos: ${link}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (e) {
      alert('Ação processada.');
    } finally {
      setEmailSending(false);
    }
  };

  const dailyMissions = [
    { id: 'insta', name: 'Conectar Instagram', desc: 'Vincule sua conta e ganhe pontos instantâneos', points: 50, icon: <Instagram size={20} />, action: 'Conectar' },
    { id: 'perf', name: 'Completar Perfil 100%', desc: 'Bio, foto, nicho e portfólio comercial.', points: 30, icon: <FileText size={20} />, action: 'Completar' },
    { id: 'ip_course', name: 'Curso "Proteção de Ativos"', desc: 'Aprenda a proteger e licenciar suas criações.', points: 100, icon: <ShieldCheck size={20} />, action: 'Começar' },
  ];

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-thedeal-gold/20 border-t-thedeal-gold rounded-full animate-spin"></div>
      <p className="text-thedeal-gold uppercase font-black tracking-widest text-[10px]">Sincronizando Terminal...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in w-full pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">🎯 Missões & <span className="text-thedeal-gold">Indicações</span></h2>
           <p className="text-thedeal-gray400 text-sm font-medium mt-1">Ganhe pontos extras e ajude outros criadores a crescer na rede.</p>
        </div>
        <div className="bg-thedeal-gold/10 border border-thedeal-goldDim/30 p-6 rounded-3xl text-center shadow-2xl backdrop-blur-md min-w-[220px]">
           <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em] mb-1 opacity-70">Deal Score Atual</p>
           <p className="text-3xl font-black text-white">{profile?.total_points || 0} <span className="text-thedeal-gold text-sm font-bold">PTS</span></p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
          <Zap size={14} className="text-thedeal-gold" /> Missões Ativas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyMissions.map(m => (
            <div key={m.id} className="bg-thedeal-card border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-thedeal-gold/30 transition-all group shadow-xl">
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-thedeal-gold group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">{m.name}</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed mt-1">{m.desc}</p>
                  </div>
               </div>
               <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-thedeal-gold font-black text-xs">+{m.points} PONTOS</span>
                  <button className="text-[9px] font-black uppercase tracking-widest text-white px-5 py-2 bg-white/5 rounded-lg hover:bg-thedeal-gold hover:text-black transition-all">
                    {m.action}
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-thedeal-gray600 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
          <Users size={14} className="text-thedeal-gold" /> Hub de Expansão
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center group hover:border-thedeal-gold/20 transition-all">
                <MousePointer2 className="text-thedeal-gold mb-3 opacity-40" size={28} />
                <p className="text-3xl font-black text-white">{referralData?.clicks || 0}</p>
                <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">Cliques no Link</p>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center group hover:border-thedeal-gold/20 transition-all">
                <CheckCircle className="text-thedeal-gold mb-3 opacity-40" size={28} />
                <p className="text-3xl font-black text-white">{referralData?.signups || 0}</p>
                <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">Cadastros Efetuados</p>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center group hover:border-thedeal-gold/20 transition-all">
                <TrendingUp className="text-thedeal-gold mb-3 opacity-40" size={28} />
                <p className="text-3xl font-black text-white">{(referralData?.signups || 0) * 50}</p>
                <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest">Pontos Ganhos</p>
            </div>
        </div>

        <div className="bg-gradient-to-br from-[#141414] to-black border-2 border-thedeal-goldDim/20 rounded-[3rem] p-8 md:p-14 relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity hidden md:block">
              <ShieldCheck size={300} className="text-thedeal-gold" />
           </div>
           
           <div className="relative z-10 max-w-2xl space-y-8">
              <div className="space-y-4">
                 <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-tight">Seu Link de <br/><span className="text-thedeal-gold">Expansão</span></h3>
                 <div className="bg-black border border-white/10 rounded-[2rem] p-8 space-y-6">
                    <div className="space-y-2">
                       <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em] opacity-60">ID de Acesso Único</p>
                       <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white font-mono text-2xl flex items-center justify-center tracking-widest shadow-inner">
                            {referralData?.code || 'SINC...'}
                          </div>
                          <button onClick={handleCopy} className="bg-thedeal-goldBright text-black font-black px-8 py-5 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3">
                            {copied ? <Check size={18} strokeWidth={4} /> : <Copy size={18} />}
                            {copied ? 'Copiado' : 'Copiar Link'}
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={shareViaWhatsApp} className="flex items-center justify-center gap-3 py-4 bg-thedeal-success/10 border border-thedeal-success/20 text-thedeal-success rounded-xl hover:bg-thedeal-success hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
                   <MessageCircle size={16} /> WhatsApp
                </button>
                <button onClick={shareViaEmail} className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
                   <Mail size={16} className="text-thedeal-gold" /> E-mail Convite
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3 opacity-40">
                 <Info size={14} className="text-thedeal-gold" />
                 <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-[0.3em]">
                   Análises de novos membros levam até 48h úteis pela inteligência de dados.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
