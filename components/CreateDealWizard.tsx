
import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Camera, FileText, DollarSign, Calendar, Target, ShieldCheck, Briefcase } from 'lucide-react';
import { User, Deal } from '../types';

interface CreateDealWizardProps {
  onComplete: () => void;
  onCancel: () => void;
  brand: User;
}

const CreateDealWizard: React.FC<CreateDealWizardProps> = ({ onComplete, onCancel, brand }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: [] as string[],
    storiesCount: '',
    reelsCount: '',
    feedCount: '',
    description: '',
    hashtags: '',
    mentions: '',
    budget: '',
    deadline: '',
    niche: 'Moda'
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const toggleType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter(t => t !== type) : [...prev.type, type]
    }));
  };

  const handleFinish = () => {
    // Simulated saving
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 text-left animate-fade-in">
      <div className="bg-thedeal-card border border-thedeal-gray700 w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        <header className="p-10 border-b border-white/5 flex items-center justify-between shrink-0">
           <div>
             <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Novo <span className="text-thedeal-gold">Deal.</span></h2>
             <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mt-1">Passo {step} de 4: {['Formato', 'Briefing', 'Execução', 'Revisão'][step-1]}</p>
           </div>
           <button onClick={onCancel} className="p-3 text-thedeal-gray600 hover:text-white transition-colors bg-white/5 rounded-2xl"><X size={20}/></button>
        </header>

        <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8">O que você quer contratar?</h3>
              <div className="grid gap-4">
                {[
                  { id: 'stories', label: 'Instagram Stories', hasCount: true },
                  { id: 'reels', label: 'Instagram Reels', hasCount: true },
                  { id: 'feed', label: 'Post no Feed', hasCount: true },
                  { id: 'youtube', label: 'Vídeo YouTube', hasCount: false },
                  { id: 'tiktok', label: 'Post TikTok', hasCount: false },
                ].map(item => (
                  <div key={item.id} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.type.includes(item.id) ? 'border-thedeal-gold bg-thedeal-gold/5' : 'border-white/5 bg-black/40'}`} onClick={() => toggleType(item.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.type.includes(item.id) ? 'bg-thedeal-gold border-thedeal-gold' : 'border-thedeal-gray700'}`}>
                          {formData.type.includes(item.id) && <Check size={12} className="text-black" />}
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-widest ${formData.type.includes(item.id) ? 'text-white' : 'text-thedeal-gray600'}`}>{item.label}</span>
                      </div>
                      {item.hasCount && formData.type.includes(item.id) && (
                        <div className="flex items-center gap-3 animate-fade-in" onClick={e => e.stopPropagation()}>
                          <span className="text-[10px] font-black text-thedeal-gray600 uppercase">Qtde:</span>
                          <input 
                            type="number" 
                            min="1"
                            value={(formData as any)[`${item.id}Count`]}
                            onChange={e => setFormData({...formData, [`${item.id}Count`]: e.target.value})}
                            className="w-16 bg-black border border-thedeal-gray700 rounded-xl p-2 text-white text-xs font-black text-center" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Descrição do Briefing</label>
                 <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={6}
                  className="w-full bg-black border border-thedeal-gray700 rounded-[2rem] p-6 text-white text-sm font-medium focus:border-thedeal-gold outline-none transition-all resize-none"
                  placeholder="Descreva detalhadamente o que a marca busca neste deal..."
                 />
               </div>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Hashtags Obrigatórias</label>
                    <input type="text" value={formData.hashtags} onChange={e => setFormData({...formData, hashtags: e.target.value})} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-bold text-xs" placeholder="#marcaX #publi" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Menções Obrigatórias</label>
                    <input type="text" value={formData.mentions} onChange={e => setFormData({...formData, mentions: e.target.value})} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-bold text-xs" placeholder="@marcaX" />
                 </div>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Quanto quer pagar? (R$)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-thedeal-gold" size={18} />
                      <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 pl-12 text-white font-black text-lg focus:border-thedeal-gold transition-all" placeholder="5000" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Prazo de Entrega</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-thedeal-gold" size={18} />
                      <input type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 pl-12 text-white font-bold text-sm focus:border-thedeal-gold transition-all" />
                    </div>
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Nicho Preferencial</label>
                <select value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} className="w-full bg-black border border-thedeal-gray700 rounded-2xl p-5 text-white font-black uppercase tracking-widest text-xs outline-none appearance-none cursor-pointer focus:border-thedeal-gold">
                  {['Moda', 'Beleza', 'Fitness', 'Tech', 'Finanças', 'Geral'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10 animate-fade-in">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-thedeal-gold rounded-2xl flex items-center justify-center font-black text-xl text-black shadow-lg shadow-thedeal-gold/20">{brand.name.charAt(0)}</div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">Preview do Deal</h4>
                      <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Pronto para publicação</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                         <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Investimento</p>
                         <p className="text-2xl font-black text-white tracking-tighter">R$ {parseFloat(formData.budget).toLocaleString()}</p>
                       </div>
                       <div>
                         <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Prazo</p>
                         <p className="text-2xl font-black text-white tracking-tighter">{new Date(formData.deadline).toLocaleDateString('pt-BR')}</p>
                       </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">Entregáveis</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.type.map(t => (
                          <span key={t} className="bg-thedeal-gold/10 text-thedeal-gold text-[9px] font-black px-3 py-1.5 rounded-full border border-thedeal-gold/20 uppercase">
                            {(formData as any)[`${t}Count`] || 1}x {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                      <p className="text-xs text-thedeal-gray400 leading-relaxed font-medium italic">"{formData.description.substring(0, 150)}..."</p>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-4 px-4">
                 <ShieldCheck className="text-thedeal-success" size={20} />
                 <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">Seu deal será notificado para criadores compatíveis com o nicho <span className="text-white">{formData.niche.toUpperCase()}</span>.</p>
              </div>
            </div>
          )}
        </main>

        <footer className="p-10 border-t border-white/5 flex gap-4 shrink-0 bg-black/20">
          {step > 1 && (
            <button onClick={prevStep} className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <ArrowLeft size={16} /> Voltar
            </button>
          )}
          <button 
            onClick={step === 4 ? handleFinish : nextStep}
            className="flex-2 bg-thedeal-goldBright hover:bg-thedeal-gold text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-thedeal-gold/20 transition-all flex items-center justify-center gap-3 flex-[2]"
          >
            {step === 4 ? 'PUBLICAR DEAL AGORA' : 'PRÓXIMO PASSO'}
            <ArrowRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateDealWizard;
