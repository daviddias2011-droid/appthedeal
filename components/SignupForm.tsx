
import React, { useState } from 'react';
import { 
  Loader, ArrowRight, Zap, Building2, User, CreditCard, ExternalLink, FileCheck, 
  MessageCircle, Mail, CheckCircle2, Star, AlertCircle, MapPin, BarChart3, ShieldCheck
} from 'lucide-react';
import { UserType } from '../types';

const SignupForm: React.FC<{ onBack: () => void; onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Identity
    fullName: '', location: '', socialHandle: '', niche: '',
    // Commercial
    donePaidJobs: '', maxContractValue: '', pricingMethod: '', refusedLowOffers: '',
    // Professional
    deadlineCommitment: '5', lostJobNoContract: '', readyForTerms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!formData.fullName || !formData.socialHandle || !formData.niche)) {
      setError('Por favor, preencha as informações de identidade profissional.'); return;
    }
    if (step === 2 && (!formData.donePaidJobs || !formData.maxContractValue)) {
      setError('A capacidade comercial é um critério essencial de avaliação.'); return;
    }
    setStep(prev => prev + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    // Simulação de processamento de protocolo de curadoria
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-fade-in text-center">
        <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Inicie sua <span className="text-thedeal-gold">Avaliação</span></h2>
        <p className="text-thedeal-gray600 font-bold uppercase text-[10px] tracking-[0.3em] mb-12">Selecione seu perfil de operação na rede</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => setUserType(UserType.Creator)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/5 border border-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-thedeal-gold group-hover:text-black transition-colors"><Zap size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Criador</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest leading-relaxed">Foco em Contratos de Performance e LTV</p>
          </button>
          <button onClick={() => setUserType(UserType.Brand)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/5 border border-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-thedeal-gold group-hover:text-black transition-colors"><Building2 size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Marca</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest leading-relaxed">Foco em ROI e Infraestrutura Comercial</p>
          </button>
        </div>
        <button onClick={onBack} className="mt-16 text-[10px] font-black uppercase text-thedeal-gray700 hover:text-white tracking-[0.4em] transition-colors">Retornar ao site institucional</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 animate-fade-in text-left">
      <div className="bg-thedeal-card border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        <div className="mb-10 flex justify-between items-center">
            <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Protocolo {step}/4</span>
            <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`h-1 w-6 rounded-full ${i <= step ? 'bg-thedeal-gold' : 'bg-thedeal-gray700'}`} />
                ))}
            </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <User className="text-thedeal-gold" size={20} /> Identidade Profissional
                </h3>
                <p className="text-[10px] text-thedeal-gray600 font-bold uppercase tracking-widest">Analisamos perfil, posicionamento e maturidade comercial.</p>
            </div>
            
            <div className="space-y-4 pt-4">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Nome Completo</label>
                    <input name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="Como no seu documento profissional" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Cidade / País</label>
                    <input name="location" required value={formData.location} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="Ex: São Paulo, Brasil" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Link Principal (Instagram / TikTok / YouTube)</label>
                    <input name="socialHandle" required value={formData.socialHandle} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="https://instagram.com/seuusuario" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Nicho Principal</label>
                    <input name="niche" required value={formData.niche} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="Ex: Tecnologia, Moda, Finanças" />
                </div>
            </div>
            
            {error && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center py-2">{error}</p>}
            
            <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-thedeal-gold transition-all">
                Avançar Protocolo <ArrowRight size={16}/>
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <BarChart3 className="text-thedeal-gold" size={20} /> Capacidade Comercial
                </h3>
                <p className="text-[10px] text-thedeal-gray600 font-bold uppercase tracking-widest">Entendemos influência como mídia profissional.</p>
            </div>

            <div className="space-y-5 pt-4">
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Já fechou publi paga?</label>
                    <select name="donePaidJobs" value={formData.donePaidJobs} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold appearance-none">
                        <option value="">Selecione</option>
                        <option value="sim">Sim, frequentemente</option>
                        <option value="raramente">Sim, esporadicamente</option>
                        <option value="nao">Ainda não</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Maior valor já recebido em um contrato (R$)</label>
                    <input name="maxContractValue" type="number" required value={formData.maxContractValue} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="Ex: 5000" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Como você costuma precificar?</label>
                    <input name="pricingMethod" value={formData.pricingMethod} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold transition-all" placeholder="Ex: Tabela fixa, CPM, Performance" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Já recusou propostas por valor ou falta de contrato?</label>
                    <select name="refusedLowOffers" value={formData.refusedLowOffers} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold appearance-none">
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
            </div>

            {error && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center py-2">{error}</p>}

            <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-white/10 text-thedeal-gray600 font-black py-5 rounded-2xl text-[10px] uppercase">Retornar</button>
                <button type="submit" className="flex-[2] bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest">Avançar Protocolo</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <ShieldCheck className="text-thedeal-gold" size={20} /> Postura Profissional
                </h3>
                <p className="text-[10px] text-thedeal-gray600 font-bold uppercase tracking-widest">Avaliamos confiabilidade e ética de operação.</p>
            </div>

            <div className="space-y-6 pt-4">
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Compromisso com prazos (1 a 5)</label>
                    <input name="deadlineCommitment" type="range" min="1" max="5" value={formData.deadlineCommitment} onChange={handleChange} className="w-full accent-thedeal-gold" />
                    <div className="flex justify-between text-[8px] font-black text-thedeal-gray700 uppercase">
                        <span>Ocasional</span>
                        <span>Inflexível</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Já perdeu job por falta de contrato?</label>
                    <select name="lostJobNoContract" value={formData.lostJobNoContract} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold appearance-none">
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-thedeal-gray600 ml-1">Está disposto a seguir termos e entregas claras?</label>
                    <select name="readyForTerms" value={formData.readyForTerms} onChange={handleChange} className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white text-sm outline-none focus:border-thedeal-gold appearance-none">
                        <option value="">Selecione</option>
                        <option value="sim">Sim, obrigatoriamente</option>
                        <option value="talvez">Depende da proposta</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border border-white/10 text-thedeal-gray600 font-black py-5 rounded-2xl text-[10px] uppercase">Retornar</button>
                <button type="submit" className="flex-[2] bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest">Finalizar Protocolo</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="space-y-8 text-center py-4 animate-float-in">
            <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20">
                <Star className="text-thedeal-gold" size={36} />
            </div>
            <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Avaliação Final</h3>
                <p className="text-sm text-thedeal-gray400 leading-relaxed font-medium">
                    Seu perfil será analisado pela curadoria do THE DEAL. A resposta não é automática. Se aprovado, você receberá o convite oficial para entrada.
                </p>
            </div>
            
            <div className="bg-black/40 border border-white/5 p-6 rounded-3xl text-left space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-thedeal-gold animate-pulse" />
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Aguardando Auditoria Humana</p>
                </div>
                <p className="text-[9px] text-thedeal-gray600 uppercase font-bold leading-relaxed">
                    Nossos analistas verificarão a integridade das suas métricas sociais e o alinhamento comercial com as marcas parceiras.
                </p>
            </div>

            <button 
              onClick={handleFinish}
              disabled={loading}
              className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl shadow-xl flex items-center justify-center gap-4 uppercase text-xs tracking-widest hover:scale-[1.02] transition-all"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : "ENVIAR PARA ANÁLISE"}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center opacity-40">
        <p className="text-[8px] font-black text-thedeal-gray600 uppercase tracking-[0.6em]">THE DEAL • INFRAESTRUTURA PRIVADA DE CONTRATOS</p>
      </div>
    </div>
  );
};

export default SignupForm;
