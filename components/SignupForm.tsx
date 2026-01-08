
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Eye, EyeOff, Star, User, CreditCard, ExternalLink, HelpCircle
} from 'lucide-react';
import { UserType } from '../types';
import { api } from '../lib/api';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const LINK_PAGAMENTO_CRIADOR = "https://mpago.li/1iwECoa";
const LINK_PAGAMENTO_MARCA = "https://mpago.la/13NLfeG";

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<any>({
    fullName: '', email: '', password: '', confirmPassword: '', phone: '', 
    socialHandle: '', niche: '',
    motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.email || !formData.password || !formData.fullName) {
      setError('Preencha os dados de identidade Alpha.');
      return;
    }
    if (formData.password.length < 6) {
      setError('A chave de segurança deve ter 6+ caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As chaves de segurança não coincidem.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.socialHandle || !formData.niche || !formData.motivation) {
      setError('Complete todos os campos do seu perfil profissional.');
      return;
    }
    setStep(3);
  };

  const finalizeRegistration = async () => {
    setLoading(true);
    try {
      await api.post('/api/cadastro.php', {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        user_type: userType,
        social_handle: formData.socialHandle,
        niche: formData.niche,
        motivation: formData.motivation,
        phone: formData.phone
      });
      onSuccess(); 
    } catch (err: any) {
      setError(err.message || 'Erro ao processar cadastro no servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in text-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Selecione seu <span className="text-thedeal-gold">Perfil Alpha</span></h2>
          <p className="text-thedeal-gray400 text-sm font-medium tracking-wide">Como você atuará no ecossistema?</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => setUserType(UserType.Creator)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"><Zap className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight text-center">Sou Criador</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Foco em Performance</p>
          </button>
          <button onClick={() => setUserType(UserType.Brand)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"><Building2 className="text-thedeal-gold" size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight text-center">Sou Marca</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Foco em ROI</p>
          </button>
        </div>
        <button onClick={onBack} className="mt-12 text-[10px] font-black uppercase text-thedeal-gray600 hover:text-white tracking-widest transition-colors">Voltar</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 animate-fade-in">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
        {error && (
          <div className="mb-8 p-4 bg-thedeal-danger/10 border border-thedeal-danger/20 rounded-2xl flex items-center gap-3 animate-shake">
            <AlertCircle className="text-thedeal-danger shrink-0" size={18} />
            <p className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        {step === 1 && (
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
            <button type="submit" className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
              Próximo
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-8">
            <div className="flex items-center gap-3">
              <Star className="text-thedeal-gold" size={24} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Perfil Profissional</h3>
            </div>
            <div className="space-y-6">
              <input name="socialHandle" placeholder={userType === UserType.Creator ? "@Instagram / TikTok" : "Site / Perfil da Empresa"} required value={formData.socialHandle} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <input name="niche" placeholder="Nicho de Atuação (Ex: Finanças, Saúde)" required value={formData.niche} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all" />
              <textarea name="motivation" placeholder="O que você busca na rede?" rows={4} required value={formData.motivation} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all resize-none" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Voltar</button>
              <button type="submit" className="flex-1 bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">Continuar</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-10 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20">
                <CreditCard className="text-thedeal-gold" size={36} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ativar <span className="text-thedeal-gold">Terminal</span></h3>
              <div className="bg-black/40 border border-white/5 p-6 rounded-3xl text-left">
                  <p className="text-white font-black uppercase text-lg">Plano {userType === UserType.Creator ? 'Criador' : 'Marca'}</p>
                  <p className="text-thedeal-gold font-black text-2xl mt-1">R$ {userType === UserType.Creator ? '297' : '497'}<span className="text-xs text-thedeal-gray600">/ano</span></p>
                  <ul className="mt-6 space-y-3">
                      <li className="flex gap-2 text-[10px] text-thedeal-gray400 font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Contrato + Escrow Ativo</li>
                      <li className="flex gap-2 text-[10px] text-thedeal-gray400 font-bold uppercase"><Check size={14} className="text-thedeal-gold" /> Taxa de 10% no sucesso</li>
                  </ul>
              </div>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => { window.open(userType === UserType.Creator ? LINK_PAGAMENTO_CRIADOR : LINK_PAGAMENTO_MARCA, '_blank'); finalizeRegistration(); }}
                className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em] transition-all hover:scale-[1.02]"
              >
                <span>Pagar e Ativar Acesso</span>
                <ArrowRight size={20} />
              </button>
              
              <div className="flex items-center justify-center gap-6 opacity-30">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Alpha Protocol</span>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest hover:text-white transition-colors">Voltar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
