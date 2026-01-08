
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Eye, EyeOff, Instagram, ChevronLeft, CreditCard, Star, Clock, User, MessageCircle
} from 'lucide-react';
import { UserType } from '../types';
import { api } from '../lib/api';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const LINK_PAGAMENTO_MENSAL = "https://mpago.la/13NLfeG";
const LINK_PAGAMENTO_ANUAL = "https://mpago.li/1iwECoa";

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<any>({
    fullName: '', email: '', password: '', confirmPassword: '', phone: '', 
    plan: 'free', 
    period: 'monthly', 
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
    setLoading(true);
    setError(null);

    try {
      if (!formData.email || !formData.password || !formData.fullName) {
        throw new Error('Preencha os dados de identidade Alpha.');
      }
      if (formData.password.length < 6) throw new Error('A chave de segurança deve ter 6+ caracteres.');
      if (formData.password !== formData.confirmPassword) throw new Error('As chaves de segurança não coincidem.');

      // Validar existência via MySQL
      await api.post('/check_email.php', { email: formData.email });
      
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.socialHandle || !formData.niche || !formData.motivation) {
      setError('Complete todos os campos do seu perfil profissional.');
      return;
    }
    setStep(3);
  };

  const handlePlanSelection = (plan: 'free' | 'pro') => {
    setFormData({ ...formData, plan });
    if (plan === 'free') {
      finalizeRegistration();
    } else {
      setStep(4);
    }
  };

  const handlePeriodSelection = (period: 'monthly' | 'annual') => {
    setFormData({ ...formData, period });
    setStep(5);
  };

  const finalizeRegistration = async () => {
    setLoading(true);
    try {
      await api.post('/register.php', {
        ...formData,
        userType
      });
      onSuccess(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in">
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
    <div className="max-w-xl mx-auto px-4 py-10 animate-fade-in">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
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
            <button type="submit" disabled={loading} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
              {loading ? <Loader className="animate-spin" size={18} /> : 'Próximo'}
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
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Nível de <span className="text-thedeal-gold">Acesso</span></h3>
              <p className="text-thedeal-gray400 text-sm">Escolha seu protocolo de entrada na rede.</p>
            </div>
            <div className="grid gap-6">
              <button 
                onClick={() => handlePlanSelection('pro')}
                className="p-8 rounded-[2rem] border-2 border-thedeal-goldBright bg-thedeal-gold/10 text-left transition-all hover:scale-[1.02] shadow-xl shadow-thedeal-gold/10 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Zap className="text-thedeal-goldBright" size={32} />
                  <span className="bg-thedeal-gold text-black px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Recomendado</span>
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-2">Plano PRO</h4>
                <p className="text-thedeal-gray400 text-xs leading-relaxed mb-6">Acesso total à rede, contratos de performance de alto ticket e analytics de ROI Alpha.</p>
                <p className="text-thedeal-gold font-black text-xl">A partir de R$ 9,90 <span className="text-xs font-bold text-thedeal-gray600">/mês</span></p>
              </button>

              <button 
                onClick={() => handlePlanSelection('free')}
                className="p-8 rounded-[2rem] border-2 border-white/5 bg-black/40 text-left transition-all hover:border-white/20 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Clock className="text-thedeal-gray600" size={32} />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-2">Plano Grátis</h4>
                <p className="text-thedeal-gray400 text-xs leading-relaxed mb-6">Acesso limitado ao simulador e rede pública. Sujeito a análise manual de longa espera.</p>
                <p className="text-white font-black text-xl">R$ 0,00</p>
              </button>
            </div>
            <button onClick={() => setStep(2)} className="w-full text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest hover:text-white transition-colors">Voltar</button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Frequência de <span className="text-thedeal-gold">Expansão</span></h3>
              <p className="text-thedeal-gray400 text-sm">Selecione o ciclo de faturamento para seu nível PRO.</p>
            </div>
            <div className="grid gap-4">
              <button 
                onClick={() => handlePeriodSelection('monthly')}
                className="p-6 rounded-3xl border-2 border-white/5 bg-black/40 text-left hover:border-thedeal-gold transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-white font-black uppercase text-sm">Faturamento Mensal</h4>
                  <p className="text-thedeal-gold font-black text-lg">R$ 9,90 <span className="text-[10px] text-thedeal-gray600">/mês</span></p>
                </div>
                <ArrowRight className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
              </button>

              <button 
                onClick={() => handlePeriodSelection('annual')}
                className="p-6 rounded-3xl border-2 border-thedeal-gold/30 bg-thedeal-gold/5 text-left hover:border-thedeal-gold transition-all flex items-center justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-thedeal-gold text-black px-3 py-1 text-[8px] font-black uppercase tracking-widest">Melhor Valor</div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm">Faturamento Anual</h4>
                  <p className="text-thedeal-gold font-black text-lg">R$ 99,90 <span className="text-[10px] text-thedeal-gray600">/ano</span></p>
                  <p className="text-[9px] text-thedeal-success font-bold uppercase mt-1">Desconto Alpha Ativo</p>
                </div>
                <ArrowRight className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
              </button>
            </div>
            <button onClick={() => setStep(3)} className="w-full text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest hover:text-white transition-colors">Voltar aos planos</button>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in space-y-10 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20">
                <CreditCard className="text-thedeal-gold" size={36} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Finalizar <span className="text-thedeal-gold">Ativação</span></h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed px-4">
                Você será redirecionado para o ambiente seguro do Mercado Pago para processar seu pagamento {formData.period === 'monthly' ? 'mensal' : 'anual'}.
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => { window.open(formData.period === 'monthly' ? LINK_PAGAMENTO_MENSAL : LINK_PAGAMENTO_ANUAL, '_blank'); finalizeRegistration(); }}
                className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em] transition-all hover:scale-[1.02]"
              >
                <span>Pagar {formData.period === 'monthly' ? 'Mensalmente' : 'Anualmente'}</span>
                <ArrowRight size={20} />
              </button>
              
              <div className="flex items-center justify-center gap-6 opacity-30">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Locaweb MySQL</span>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(4)} className="text-[9px] font-black uppercase text-thedeal-gray600 tracking-widest hover:text-white transition-colors">Trocar periodicidade</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
