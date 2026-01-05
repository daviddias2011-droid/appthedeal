import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, Check, Copy, Trophy, Target, ShieldCheck, Loader, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ReferralSystem } from '../lib/referral';

interface MissionsPageProps {
  onBack?: () => void;
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
          motivation: `Cadastro simplificado via Hub de Missões. CPF: ${formData.cpf}. Referral Code: ${referral.code}`,
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
    navigator.clipboard.writeText(`🚀 Acabei de entrar no Hub de Missões do The Deal! Use meu código para análise prioritária: ${referralCode}\n\n${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full bg-[#141414] border border-[#D4AF37]/30 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
          
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-[#D4AF37]/20 animate-subtle-pulse">
            <Trophy className="text-[#D4AF37]" size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Missão<br/><span className="text-[#D4AF37]">Iniciada.</span></h2>
            <p className="text-[#A0A0A0] text-sm font-medium">Seu código exclusivo foi gerado. Compartilhe para acelerar sua aprovação.</p>
          </div>

          <div className="bg-black border border-white/10 p-8 rounded-3xl space-y-4 shadow-inner">
             <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">CÓDIGO ATIVADOR</p>
             <div className="text-3xl font-black tracking-[0.2em] text-white uppercase">{referralCode}</div>
             <button 
                onClick={handleCopy}
                className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#D4AF37]/10"
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-20 px-6 animate-fade-in">
      <div className="max-w-2xl w-full space-y-12">
        <header className="text-center space-y-4">
           <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4AF37] transition-all mb-8 group"
           >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Retornar</span>
           </button>
           
           <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-5 py-2 rounded-full mb-4">
              <Target size={14} className="text-[#D4AF37]" />
              <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">SISTEMA DE MISSÕES</span>
           </div>
           
           <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
             GARANTA SEU <br/><span className="text-[#D4AF37]">VITALÍCIO.</span>
           </h1>
           
           <p className="text-[#A0A0A0] text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed">
             Entre para o programa de expansão. Cadastre-se em segundos e receba seu código de acesso exclusivo.
           </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
           
           <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input 
                    name="fullName" 
                    required 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]"
                    placeholder="João Alberto da Silva"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4">CPF</label>
                    <div className="relative">
                      <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input 
                        name="cpf" 
                        required 
                        value={formData.cpf}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]"
                        placeholder="000.000.000-00"
                      />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4">Telefone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4">E-mail Profissional</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#333]"
                    placeholder="voce@empresa.com.br"
                  />
                </div>
              </div>
           </div>

           <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#D4AF37] text-black font-black py-6 rounded-[1.5rem] uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-[#D4AF37]/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <>Participar das Missões <ArrowRight size={20} /></>}
              </button>
           </div>
           
           <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-4 opacity-40">
              <ShieldCheck className="text-[#D4AF37]" size={18} />
              <p className="text-[10px] font-black uppercase text-[#666666] tracking-[0.3em]">Criptografia Ativa</p>
           </div>
        </form>

        <p className="text-center text-[9px] font-black uppercase text-[#404040] tracking-[0.5em]">
          THE DEAL NETWORK • © 2026 • SISTEMA PRIVADO
        </p>
      </div>
    </div>
  );
};

export default MissionsPage;