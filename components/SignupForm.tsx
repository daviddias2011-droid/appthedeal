
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Star, User, CreditCard, ExternalLink, FileCheck, MessageCircle, Mail
} from 'lucide-react';
import { UserType } from '../types';

const LINK_PAGAMENTO_CRIADOR = "https://mpago.li/1EQHmNM";
const LINK_PAGAMENTO_MARCA = "https://mpago.li/27TLyFa";

const SignupForm: React.FC<{ onBack: () => void; onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileSent, setFileSent] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', socialHandle: '', niche: '', motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      setError('Preencha seus dados de contato.'); return;
    }
    if (step === 2 && (!formData.socialHandle || !formData.niche)) {
      setError('Preencha seus dados profissionais.'); return;
    }
    setStep(prev => prev + 1);
  };

  const handleFinish = () => {
    setLoading(true);
    // Simula envio de dados e libera para tela de boas vindas
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in text-center">
        <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Selecione seu <span className="text-thedeal-gold">Perfil</span></h2>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <button onClick={() => setUserType(UserType.Creator)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto"><Zap className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Criador</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Performance & LTV</p>
          </button>
          <button onClick={() => setUserType(UserType.Brand)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto"><Building2 className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Marca</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">ROI & Estratégia</p>
          </button>
        </div>
        <button onClick={onBack} className="mt-12 text-[10px] font-black uppercase text-thedeal-gray600 hover:text-white tracking-widest">Voltar</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 animate-fade-in text-left">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="flex items-center gap-3 mb-4"><User className="text-thedeal-gold" size={24} /><h3 className="text-xl font-black text-white uppercase tracking-tight">Identificação</h3></div>
            <input name="fullName" placeholder="Nome Completo" required value={formData.fullName} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            <input name="email" type="email" placeholder="E-mail Profissional" required value={formData.email} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            <input name="phone" placeholder="WhatsApp (DDD)" required value={formData.phone} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            <button type="submit" className="w-full bg-thedeal-goldBright text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">Próximo <ArrowRight size={18}/></button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="flex items-center gap-3 mb-4"><Star className="text-thedeal-gold" size={24} /><h3 className="text-xl font-black text-white uppercase tracking-tight">Perfil Profissional</h3></div>
            <input name="socialHandle" placeholder={userType === UserType.Creator ? "@Instagram / TikTok" : "Site da Empresa"} required value={formData.socialHandle} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            <input name="niche" placeholder="Nicho (Ex: Tech, Moda, Finanças)" required value={formData.niche} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            <textarea name="motivation" placeholder="O que você busca na rede?" rows={3} value={formData.motivation} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all resize-none" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl text-[10px] uppercase">Voltar</button>
              <button type="submit" className="flex-1 bg-thedeal-goldBright text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest">Avançar para Pagamento</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-8 text-center">
            <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20"><CreditCard className="text-thedeal-gold" size={36} /></div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ativar <span className="text-thedeal-gold">Acesso</span></h3>
            <div className="bg-black/40 border border-white/5 p-6 rounded-3xl text-left">
                <p className="text-white font-black uppercase text-lg">Acesso Anual {userType === UserType.Creator ? 'Criador' : 'Marca'}</p>
                <p className="text-thedeal-gold font-black text-3xl mt-1">R$ {userType === UserType.Creator ? '297' : '497'}</p>
                <p className="text-[10px] text-thedeal-gray600 uppercase font-bold mt-4 tracking-widest">Liberação após envio do comprovante.</p>
            </div>
            <button 
              onClick={() => { window.open(userType === UserType.Creator ? LINK_PAGAMENTO_CRIADOR : LINK_PAGAMENTO_MARCA, '_blank'); setStep(4); }}
              className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl shadow-xl flex items-center justify-center gap-4 uppercase text-xs tracking-widest hover:scale-[1.02] transition-all"
            >
              <span>Ir para Pagamento Seguro</span> <ExternalLink size={20} />
            </button>
            <button onClick={() => setStep(2)} className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest">Voltar</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-4"><FileCheck className="text-thedeal-gold" size={24} /><h3 className="text-xl font-black text-white uppercase tracking-tight">Validar Pagamento</h3></div>
            <div className="bg-thedeal-gold/5 border border-thedeal-gold/20 p-6 rounded-2xl space-y-4">
              <p className="text-xs text-white font-bold leading-relaxed">Para liberar seu acesso, envie o comprovante de pagamento para um de nossos canais oficiais:</p>
              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/5519994497796?text=Olá! Segue comprovante de pagamento para acesso THE DEAL (${formData.email})`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#25D366] text-white p-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110">
                  <MessageCircle size={18}/> Enviar via WhatsApp
                </a>
                <a href={`mailto:suporte@thedeal.com.br?subject=Comprovante de Pagamento THE DEAL - ${formData.fullName}&body=Segue em anexo o comprovante para o e-mail ${formData.email}`} className="flex items-center gap-3 bg-white/5 text-white p-4 rounded-xl border border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/10">
                  <Mail size={18}/> Enviar via E-mail
                </a>
              </div>
            </div>
            <div className="p-6 border-2 border-dashed border-thedeal-gray700 rounded-2xl text-center">
              <input type="file" id="proof" className="hidden" onChange={() => setFileSent(true)} />
              <label htmlFor="proof" className="cursor-pointer flex flex-col items-center gap-2">
                <FileCheck className={fileSent ? "text-thedeal-success" : "text-thedeal-gray600"} size={32} />
                <span className="text-[10px] font-black uppercase text-thedeal-gray400">{fileSent ? "Comprovante Selecionado" : "Anexar Comprovante (Opcional)"}</span>
              </label>
            </div>
            <button 
              onClick={handleFinish}
              disabled={loading}
              className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin mx-auto" size={20}/> : "Já enviei o comprovante"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
