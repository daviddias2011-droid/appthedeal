
import React, { useState } from 'react';
import { 
  AlertCircle, Loader, ArrowRight, ShieldCheck, Zap, Building2, Check, Lock, Eye, EyeOff, Instagram, ChevronLeft, CreditCard, Star, Clock, User, MessageCircle
} from 'lucide-react';
import { UserType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { EmailService } from '../lib/emailjs';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
  onRedirectToValidation: () => void;
}

const LINK_PAGAMENTO_MENSAL = "https://mpago.la/13NLfeG";
const LINK_PAGAMENTO_ANUAL = "https://mpago.li/1iwECoa";

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess, onRedirectToValidation }) => {
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
        throw new Error('Preencha os dados de identidade.');
      }
      if (formData.password.length < 6) throw new Error('A senha deve ter 6+ caracteres.');
      if (formData.password !== formData.confirmPassword) throw new Error('As senhas não coincidem.');

      if (isSupabaseConfigured()) {
        const { data: existingUser } = await supabase!
          .from('profiles')
          .select('email')
          .eq('email', formData.email.toLowerCase())
          .maybeSingle();
        
        if (existingUser) throw new Error('Este terminal ID (e-mail) já está registrado na rede.');
      }

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
    finalizeRegistration();
  };

  const finalizeRegistration = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data: authData, error: signupError } = await supabase!.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              user_type: userType,
              phone: formData.phone,
              social_handle: formData.socialHandle,
              niche: formData.niche
            }
          }
        });

        if (signupError) throw signupError;

        // Salvar perfil detalhado
        await supabase!.from('profiles').insert({
          id: authData.user?.id,
          full_name: formData.fullName,
          email: formData.email,
          user_type: userType,
          niche: formData.niche,
          motivation: formData.motivation,
          is_vetted: false,
          verification_status: 'pending'
        });

        // Enviar e-mail de boas-vindas via EmailJS
        await EmailService.sendWelcomeEmail(formData.fullName, formData.email);
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
            <button type="submit" disabled={loading} className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
              {loading ? <Loader className="animate-spin" size={18} /> : 'Próximo'}
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
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
              <button type="submit" disabled={loading} className="flex-1 bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-5 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest transition-all">
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
