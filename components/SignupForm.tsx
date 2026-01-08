
import React, { useState } from 'react';
import { 
  Loader, ArrowRight, Zap, Building2, User, CreditCard, ExternalLink, FileCheck, MessageCircle, Mail, CheckCircle2, Star, AlertCircle
} from 'lucide-react';
import { UserType } from '../types';

const LINK_PAGAMENTO_CRIADOR = "https://mpago.li/1EQHmNM";
const LINK_PAGAMENTO_MARCA = "https://mpago.li/27TLyFa";

const SignupForm: React.FC<{ onBack: () => void; onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [actionTaken, setActionTaken] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);
    }
  };

  const generateMessage = () => {
    return encodeURIComponent(
      `Olá! Sou ${formData.fullName} e acabei de realizar o pagamento para acesso THE DEAL.\n\n` +
      `*DADOS DO CADASTRO:*\n` +
      `- Perfil: ${userType === UserType.Creator ? 'Criador' : 'Marca'}\n` +
      `- E-mail: ${formData.email}\n` +
      `- Handle: ${formData.socialHandle}\n\n` +
      `*IMPORTANTE: ESTOU ANEXANDO O COMPROVANTE NESTA CONVERSA AGORA.*`
    );
  };

  const handleChannelAction = (type: 'wa' | 'mail') => {
    const message = generateMessage();
    setActionTaken(true);

    if (type === 'wa') {
      window.open(`https://wa.me/5519994497796?text=${message}`, '_blank');
    } else {
      const subject = encodeURIComponent(`Comprovante THE DEAL - ${formData.fullName}`);
      window.open(`mailto:suporte@thedeal.com.br?subject=${subject}&body=${message}`, '_self');
    }
  };

  const handleFinish = () => {
    setLoading(true);
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
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-thedeal-gold group-hover:text-black transition-colors"><Zap size={32} /></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sou Criador</h3>
            <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Contratos & Performance</p>
          </button>
          <button onClick={() => setUserType(UserType.Brand)} className="group p-10 bg-thedeal-card border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold transition-all text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-thedeal-gold group-hover:text-black transition-colors"><Building2 size={32} /></div>
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
                <p className="text-white font-black uppercase text-lg">Acesso Mensal {userType === UserType.Creator ? 'Criador' : 'Marca'}</p>
                <p className="text-thedeal-gold font-black text-3xl mt-1">R$ {userType === UserType.Creator ? '297' : '497'}</p>
                <p className="text-[10px] text-thedeal-gray600 uppercase font-bold mt-4 tracking-widest">O link de checkout seguro será aberto em uma nova aba.</p>
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
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="text-thedeal-gold" size={24} />
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Etapa Final: Validar</h3>
            </div>
            
            <p className="text-xs text-thedeal-gray400 font-medium leading-relaxed">Anexe o comprovante abaixo e selecione o canal para validação humana imediata.</p>

            <div className={`p-8 border-2 border-dashed rounded-3xl text-center transition-all ${fileSelected ? 'border-thedeal-success bg-thedeal-success/5' : 'border-thedeal-gray700 bg-black/20'}`}>
              <input type="file" id="proof-upload" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
              <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center gap-3">
                {fileSelected ? (
                  <>
                    <CheckCircle2 className="text-thedeal-success" size={40} />
                    <div className="space-y-1">
                      <p className="text-white font-black uppercase text-xs">{fileSelected.name}</p>
                      <p className="text-thedeal-success font-bold text-[9px] uppercase tracking-widest">Arquivo Carregado</p>
                    </div>
                  </>
                ) : (
                  <>
                    <FileCheck className="text-thedeal-gray600" size={40} />
                    <span className="text-[10px] font-black uppercase text-thedeal-gray400 tracking-[0.2em]">Carregar Comprovante de Pagamento</span>
                  </>
                )}
              </label>
            </div>

            {fileSelected && (
              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl flex gap-3 animate-fade-in">
                <AlertCircle className="text-orange-500 shrink-0" size={20} />
                <p className="text-[10px] text-orange-200 font-bold uppercase leading-relaxed tracking-wider">
                  Atenção: Ao abrir o WhatsApp ou E-mail, você deve <span className="text-white underline">anexar o arquivo manualmente</span> novamente na conversa.
                </p>
              </div>
            )}

            <div className={`space-y-3 transition-opacity ${!fileSelected ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest text-center">Agora, selecione o canal para enviar:</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleChannelAction('wa')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${actionTaken ? 'bg-white/5 text-white border border-white/10' : 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 hover:scale-105'}`}
                >
                  <div className="flex items-center gap-2"><MessageCircle size={18}/> WhatsApp</div>
                  <span className="text-[7px] opacity-70">Anexe o arquivo no chat</span>
                </button>
                <button 
                  onClick={() => handleChannelAction('mail')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${actionTaken ? 'bg-white/5 text-white border border-white/10' : 'bg-thedeal-gold text-black shadow-lg shadow-thedeal-gold/20 hover:scale-105'}`}
                >
                  <div className="flex items-center gap-2"><Mail size={18}/> E-mail</div>
                  <span className="text-[7px] opacity-70">Anexe o arquivo no e-mail</span>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleFinish}
                disabled={loading || !fileSelected || !actionTaken}
                className="w-full bg-thedeal-goldBright text-black font-black py-6 rounded-2xl uppercase text-[11px] tracking-[0.3em] disabled:opacity-20 disabled:grayscale transition-all shadow-2xl relative overflow-hidden group"
              >
                {loading ? <Loader className="animate-spin mx-auto" size={20}/> : (
                  <span className="flex items-center justify-center gap-3">
                    Confirmar que Enviei <CheckCircle2 size={18} />
                  </span>
                )}
                {!loading && fileSelected && actionTaken && (
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
