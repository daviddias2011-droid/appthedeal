import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, Check, Copy, Trophy, Target, Loader, ArrowRight, Briefcase, Users, Clock, Instagram, Twitter, Video } from 'lucide-react';
import { api } from '../lib/api';
import { ReferralSystem } from '../lib/referral';
import { KwaiIcon } from './Icons';

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
      
      await api.post('/api/missoes/cadastro.php', {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        referral_code: referral.code
      });

      setReferralCode(referral.code);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao processar cadastro no terminal. Tente novamente.");
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
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 animate-fade-in text-left">
        <div className="max-w-md w-full bg-[#141414] border border-thedeal-gold/30 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-thedeal-gold"></div>
          
          <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20 animate-subtle-pulse">
            <Trophy className="text-thedeal-gold" size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Missão<br/><span className="text-thedeal-gold">Iniciada.</span></h2>
            <p className="text-[#A0A0A0] text-sm font-medium">Seu código exclusivo foi gerado. Compartilhe para acelerar sua aprovação.</p>
          </div>

          <div className="bg-black border border-white/10 p-8 rounded-3xl space-y-4 shadow-inner">
             <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">CÓDIGO ATIVADOR</p>
             <div className="text-3xl font-black tracking-[0.2em] text-white uppercase">{referralCode}</div>
             <button 
                onClick={handleCopy}
                className="w-full bg-thedeal-gold text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-thedeal-gold/10"
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
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        <p className="text-[7px] md:text-[8px] font-bold uppercase text-thedeal-gold tracking-widest leading-tight">Onde influência vira contrato</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
                  <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
                </button>
            </div>
        </div>
      </nav>

      <div className="max-w-4xl w-full space-y-12 pt-32 md:pt-40 pb-20 px-6">
        <header className="text-center space-y-4">
           <div className="inline-flex items-center gap-3 bg-thedeal-gold/10 border border-thedeal-gold/20 px-5 py-2 rounded-full mb-4">
              <Target size={14} className="text-thedeal-gold" />
              <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.3em]">HUB DE MISSÕES ALPHA</span>
           </div>
           <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
             CONQUISTE SEU <br/><span className="text-thedeal-gold">VITALÍCIO.</span>
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

        <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold/20 to-transparent"></div>
           <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-[#333]" placeholder="Nome do Candidato" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">CPF</label>
                    <div className="relative">
                      <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input name="cpf" required value={formData.cpf} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-[#333]" placeholder="000.000.000-00" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                      <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-[#333]" placeholder="(00) 00000-0000" />
                    </div>
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666666] ml-4 text-left block">E-mail Profissional</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404040]" size={20} />
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-6 pl-16 text-sm font-bold focus:border-thedeal-gold outline-none transition-all placeholder:text-[#333]" placeholder="voce@dominio.com.br" />
                </div>
              </div>
           </div>
           <div className="pt-6">
              <button type="submit" disabled={loading} className="w-full bg-thedeal-gold text-black font-black py-6 rounded-[1.5rem] uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-thedeal-gold/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4">
                {loading ? <Loader className="animate-spin" size={20} /> : <>Participar das Missões <ArrowRight size={20} /></>}
              </button>
           </div>
        </form>

        <footer className="py-20 text-center space-y-10 opacity-60 border-t border-white/5">
          <div className="flex justify-center gap-8">
            <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
            <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
            <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
            <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
          </div>
          <div className="space-y-4 opacity-30">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed text-center">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MissionsPage;