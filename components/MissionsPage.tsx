
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, Check, Copy, Trophy, Target, ShieldCheck, Loader, ArrowRight, Briefcase, Zap, Star, Users, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReferralSystem } from '../lib/referral';

interface MissionsPageProps {
  onBack: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tempId = `MISSION_${Date.now()}`;
      const referral = ReferralSystem.generateCode(tempId, formData.fullName);
      
      if (supabase) {
        const { error } = await supabase.from('leads').insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          motivation: `Cadastro via Missões. CPF: ${formData.cpf}. Referral Code: ${referral.code}`,
          status: 'pending'
        });

        if (error) console.warn("Supabase Error:", error.message);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setReferralCode(referral.code);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar cadastro no terminal. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(`🚀 Entrei nas Missões do The Deal! Use meu código: ${referralCode}\n\n${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 animate-fade-in text-left">
        <div className="max-w-md w-full bg-[#141414] border border-[#D4AF37]/30 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
          
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-[#D4AF37]/20">
            <Trophy className="text-[#D4AF37]" size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Missão<br/><span className="text-[#D4AF37]">Iniciada.</span></h2>
            <p className="text-[#A0A0A0] text-sm font-medium">Seu código exclusivo foi gerado.</p>
          </div>

          <div className="bg-black border border-white/10 p-8 rounded-3xl space-y-4 shadow-inner">
             <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">CÓDIGO ATIVADOR</p>
             <div className="text-3xl font-black tracking-[0.2em] text-white uppercase">{referralCode}</div>
             <button 
                onClick={handleCopy}
                className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
             >
               {copied ? <Check size={16} strokeWidth={4} /> : <Copy size={16} />}
               {copied ? 'Link Copiado' : 'Copiar Convite'}
             </button>
          </div>

          <div className="pt-4">
            <button onClick={onBack} className="text-[10px] font-black uppercase text-[#666666] hover:text-white tracking-[0.5em] transition-all">Voltar ao Início</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center animate-fade-in selection:bg-thedeal-gold selection:text-black text-left">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
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
              <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">REDE PRIVADA ALPHA</span>
           </div>
           
           <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
             MISSÕES <br/><span className="text-[#D4AF37]">THE DEAL.</span>
           </h1>
           
           <p className="text-[#A0A0A0] text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed text-center">
             Garanta sua vaga permanente no ecossistema através de objetivos claros e mérito profissional.
           </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Users size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 01</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Convide 2 novos membros que sejam aprovados pela curadoria.</p>
                </div>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Briefcase size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 02</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Conclua pelo menos 1 deal oficial através do terminal The Deal.</p>
                </div>
            </div>
            <div className="bg-thedeal-card border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4 group hover:border-thedeal-gold/30 transition-all">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-thedeal-gold"><Clock size={20} /></div>
                <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">Passo 03</h4>
                    <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">Mantenha seu perfil ativo e em conformidade por 6 meses.</p>
                </div>
            </div>
        </section>

        <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
           
           <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]" placeholder="Seu nome" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">CPF</label>
                    <div className="relative">
                      <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input name="cpf" required value={formData.cpf} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]" placeholder="000.000.000-00" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]" placeholder="(00) 00000-0000" />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">E-mail Profissional</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]" placeholder="seu@email.com" />
                </div>
              </div>
           </div>

           <div className="pt-6">
              <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-black font-black py-6 rounded-[1.5rem] uppercase text-[11px] tracking-[0.4em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4">
                {loading ? <Loader className="animate-spin" size={20} /> : <>Participar das Missões <ArrowRight size={20} /></>}
              </button>
           </div>
        </form>

        <div className="space-y-4 opacity-30 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS • © 2025</p>
        </div>
      </div>
    </div>
  );
};

export default MissionsPage;
