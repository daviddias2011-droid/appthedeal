
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Eye, EyeOff, User
} from 'lucide-react';
import { UserType } from '../types';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
  onRedirectToValidation: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess, onRedirectToValidation }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<any>({
    fullName: '', email: '', password: '', confirmPassword: '', phone: '', 
    socialHandle: '', niche: '', motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('As chaves de segurança não coincidem.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register-member.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType: userType,
          niche: formData.niche,
          socialHandle: formData.socialHandle,
          motivation: formData.motivation
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao registrar no terminal.');
      }

      onRedirectToValidation();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in text-left">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Selecione seu <span className="text-thedeal-gold">Perfil Alpha</span></h2>
          <p className="text-thedeal-gray400 text-sm font-medium tracking-wide">Como você atuará no ecossistema?</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => setUserType(UserType.Creator)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"><Zap className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Criador</h3>
          </button>
          <button onClick={() => setUserType(UserType.Brand)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"><Building2 className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Marca</h3>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 animate-fade-in text-left">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
        {error && (
          <div className="mb-8 p-4 bg-thedeal-danger/10 border border-thedeal-danger/20 rounded-2xl flex items-center gap-3 animate-shake">
            <AlertCircle className="text-thedeal-danger shrink-0" size={18} />
            <p className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-8">
            <div className="flex items-center gap-3">
              <User className="text-thedeal-gold" size={24} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Identidade Alpha</h3>
            </div>
            <div className="space-y-6">
              <input name="fullName" placeholder="Nome Completo" required value={formData.fullName} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <input name="email" type="email" placeholder="Terminal ID (E-mail)" required value={formData.email} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Chave de Segurança" required value={formData.password} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white pr-14 outline-none focus:border-thedeal-gold transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-thedeal-gray600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <input name="confirmPassword" type="password" placeholder="Confirmar Chave" required value={formData.confirmPassword} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
            </div>
            <button type="submit" className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
              Próximo <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-thedeal-gold" size={24} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Perfil Profissional</h3>
            </div>
            <div className="space-y-6">
              <input name="socialHandle" placeholder={userType === UserType.Creator ? "@Instagram / TikTok" : "Site / Perfil da Empresa"} required value={formData.socialHandle} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <input name="niche" placeholder="Nicho de Atuação" required value={formData.niche} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <textarea name="motivation" placeholder="O que você busca na rede?" rows={4} required value={formData.motivation} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all resize-none" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Voltar</button>
              <button type="submit" disabled={loading} className="flex-1 bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
                {loading ? <Loader className="animate-spin" size={18} /> : 'Finalizar Cadastro'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
