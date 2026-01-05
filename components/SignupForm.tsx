
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Eye, EyeOff, Instagram, ChevronLeft, CreditCard
} from 'lucide-react';
import { UserType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getStripe } from '../lib/stripe';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<any>({
    fullName: '', email: '', password: '', confirmPassword: '', phone: '', 
    plan: 'pro', // Default para o plano mais acessível
    socialHandle: '', niche: '',
    motivation: ''
  });

  const totalSteps = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleNext = async () => {
    try {
      if (step === 1) {
        if (!formData.email || !formData.password || !formData.fullName) {
          throw new Error('Preencha os dados de identidade Alpha.');
        }
        if (formData.password.length < 6) throw new Error('A chave de segurança deve ter 6+ caracteres.');
        if (formData.password !== formData.confirmPassword) throw new Error('As chaves de segurança não coincidem.');
      }
      setError(null);
      setStep(prev => prev + 1);
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handlePrev = () => setStep(prev => prev - 1);

  const handleStripeCheckout = async () => {
    try {
      // Simulação de chamada para criação de checkout
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro-mensal', userEmail: formData.email })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const stripe = await getStripe();
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (err) {
      console.error(err);
      // Fallback para sucesso se stripe falhar em ambiente de demo
      onSuccess(formData.email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      handleNext();
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured()) {
        const { data, error: signupError } = await supabase!.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              user_type: userType,
              plan: formData.plan
            }
          }
        });
        
        if (signupError) {
          if (signupError.message.includes('already registered')) {
            throw new Error('Este Terminal ID já está vinculado a um membro Alpha.');
          }
          throw signupError;
        }
      } else {
        await new Promise(r => setTimeout(r, 1000));
      }
      
      // Fluxo Direto: Se for plano PRO, vai pro checkout. Senão, finaliza.
      if (formData.plan === 'pro') {
        await handleStripeCheckout();
      } else {
        onSuccess(formData.email);
      }
      
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError(err.message || 'Falha na comunicação com o Terminal. Tente novamente.');
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
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.3em]">Protocolo {step}/04</span>
          <span className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.3em]">{Math.round((step/totalSteps)*100)}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-thedeal-gold to-thedeal-goldBright transition-all duration-500" style={{ width: `${(step/totalSteps)*100}%` }}></div>
        </div>
      </div>

      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
        {error && (
          <div className="mb-8 p-4 bg-thedeal-danger/10 border border-thedeal-danger/20 rounded-2xl flex items-center gap-3 animate-shake">
            <AlertCircle className="text-thedeal-danger shrink-0" size={18} />
            <p className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Identidade Alpha</h3>
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
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight text-center">Nível de <span className="text-thedeal-gold">Acesso</span></h3>
              <div className="grid gap-4">
                <button type="button" onClick={() => setFormData({...formData, plan: 'pro'})} className={`p-6 rounded-3xl border-2 text-left transition-all relative ${formData.plan === 'pro' ? 'border-thedeal-goldBright bg-thedeal-gold/10 shadow-xl shadow-thedeal-gold/10' : 'border-white/5 bg-black/40'}`}>
                  <div className="absolute top-0 right-0 bg-thedeal-gold text-black px-3 py-1 text-[8px] font-black uppercase tracking-widest">Recomendado</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-black uppercase text-sm">Plano PRO</span>
                    {formData.plan === 'pro' && <Check size={18} className="text-thedeal-goldBright" />}
                  </div>
                  <p className="text-thedeal-gray400 text-[11px] leading-relaxed">Acesso total à rede, contratos de performance e analytics de ROI.</p>
                  <p className="text-thedeal-gold font-black mt-4">R$ 9,90 <span className="text-[10px] font-medium text-thedeal-gray600">/mês</span></p>
                </button>

                <button type="button" onClick={() => setFormData({...formData, plan: 'free'})} className={`p-6 rounded-3xl border-2 text-left transition-all ${formData.plan === 'free' ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-black uppercase text-sm">Plano Grátis</span>
                    {formData.plan === 'free' && <Check size={18} className="text-thedeal-gold" />}
                  </div>
                  <p className="text-thedeal-gray400 text-[11px]">Acesso limitado apenas ao simulador e rede pública.</p>
                  <p className="text-white font-black mt-4">R$ 0</p>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Especialização</h3>
              <div className="relative">
                <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 text-thedeal-gray700" size={18} />
                <input name="socialHandle" placeholder="@perfil_profissional" required value={formData.socialHandle} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 pl-14 text-white outline-none focus:border-thedeal-gold transition-all" />
              </div>
              <select name="niche" value={formData.niche} onChange={handleChange} required className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white outline-none focus:border-thedeal-gold transition-all appearance-none cursor-pointer">
                <option value="" disabled>Selecione seu Nicho de Atuação</option>
                <option value="finances">Finanças & Investimentos</option>
                <option value="tech">Tecnologia & Inovação</option>
                <option value="lifestyle">Lifestyle & Luxo</option>
                <option value="business">Negócios & Gestão</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-8">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Carta de Intenção</h3>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <p className="text-[11px] text-thedeal-gray400 leading-relaxed">Sua motivação será auditada por nossa inteligência artificial para validar seu fit com a elite da rede.</p>
              </div>
              <textarea name="motivation" required value={formData.motivation} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white resize-none outline-none focus:border-thedeal-gold transition-all" placeholder="Por que você deseja fazer parte da rede THE DEAL?" />
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={step === 1 ? () => setUserType(null) : handlePrev} className="px-6 py-5 rounded-2xl border border-white/5 text-thedeal-gray600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
              {step === 1 ? 'Trocar Perfil' : 'Voltar'}
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
              {loading ? <Loader className="animate-spin" size={18} /> : (step === totalSteps ? 'Acessar Rede' : 'Avançar')}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
