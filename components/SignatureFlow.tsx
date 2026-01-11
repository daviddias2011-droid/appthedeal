
import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, CheckCircle, ArrowLeft, X, Shield, Lock, FileText } from 'lucide-react';

interface SignatureFlowProps {
  onComplete: () => void;
  onCancel: () => void;
  dealTitle: string;
  value: number;
}

const SignatureFlow: React.FC<SignatureFlowProps> = ({ onComplete, onCancel, dealTitle, value }) => {
  const [step, setStep] = useState<'preview' | 'signature' | 'success'>('preview');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: any) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
        canvasRef.current.getContext('2d')?.beginPath();
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleFinalConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setStep('success');
        setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in text-left">
      <div className="max-w-3xl w-full bg-thedeal-card border border-thedeal-gray700 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        <header className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between shrink-0">
           <div>
             <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">Formalização <span className="text-thedeal-gold">Jurídica.</span></h2>
             <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mt-2 tracking-[0.4em]">Alpha Protocol v3.0 • Escrow Ativo</p>
           </div>
           <button onClick={onCancel} className="p-3 text-thedeal-gray600 hover:text-white transition-colors bg-white/5 rounded-2xl"><X size={20}/></button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
          {step === 'preview' && (
            <div className="space-y-10 animate-fade-in">
              <div className="p-10 bg-black/40 border border-white/5 rounded-[2.5rem] font-mono text-[11px] leading-relaxed text-thedeal-gray100 space-y-6 shadow-inner">
                <div className="flex justify-between items-center pb-6 border-b border-white/5">
                   <p className="text-white font-black uppercase tracking-widest">Instrumento de Acordo Comercial</p>
                   <p className="text-thedeal-gold font-black">TD-REG-V3-{Math.floor(Math.random()*900000 + 100000)}</p>
                </div>
                <div className="space-y-4 pt-4">
                  <p>OBJETO: Prestação de serviços de criação, veiculação e licenciamento de conteúdo estratégico.</p>
                  <p>DEAL: <span className="text-white font-black underline decoration-thedeal-gold/30 underline-offset-4">{dealTitle.toUpperCase()}</span></p>
                  <p>VALOR: <span className="text-thedeal-success font-black">R$ {value.toLocaleString()},00</span></p>
                  <p>CONDIÇÃO: Capital alocado em custódia digital. Liberação vinculada à entrega técnica validada.</p>
                  <p>CLÁUSULA 01: O criador compromete-se com a conformidade técnica conforme o briefing registrado.</p>
                  <p>CLÁUSULA 02: A marca autoriza o licenciamento de IP conforme os termos TD-IP v2.0.</p>
                  <div className="pt-10 opacity-30 italic text-thedeal-gray600">[...] Continuação do contrato criptografado via terminal seguro para garantir a integridade dos dados [...]</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                 <button onClick={() => setStep('signature')} className="flex-1 bg-thedeal-gold text-black font-black py-6 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20 hover:scale-[1.02] transition-all">Aceitar Termos & Assinar</button>
              </div>
            </div>
          )}

          {step === 'signature' && (
            <div className="space-y-10 animate-fade-in">
              <div className="text-center space-y-2">
                 <h4 className="text-white font-black uppercase text-sm tracking-widest">Rubrica Digital Alpha</h4>
                 <p className="text-thedeal-gray400 text-xs font-medium tracking-wide uppercase">Desenhe sua assinatura no terminal seguro abaixo</p>
              </div>

              <div className="bg-black border-2 border-dashed border-thedeal-gray700 rounded-[2.5rem] overflow-hidden relative group shadow-inner">
                 <canvas 
                    ref={canvasRef}
                    width={800}
                    height={300}
                    className="w-full h-[250px] md:h-[300px] cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                 />
                 <button onClick={clearCanvas} className="absolute bottom-6 right-6 text-[9px] font-black uppercase text-thedeal-gray600 hover:text-white px-5 py-2 bg-white/5 border border-white/5 rounded-xl transition-all">Limpar Traço</button>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${agreement ? 'bg-thedeal-gold border-thedeal-gold' : 'border-thedeal-gray700 group-hover:border-thedeal-gold'}`}>
                    {agreement && <CheckCircle size={14} className="text-black" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                  <p className="text-[11px] font-bold text-thedeal-gray400 uppercase tracking-tight leading-relaxed">
                    Declaro que li os termos e concordo com o bloqueio do capital em custódia digital. Entendo que a quebra de contrato resultará na perda de reputação e Deal Score no ecossistema.
                  </p>
                </label>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setStep('preview')} className="w-1/3 bg-white/5 border border-white/10 text-white font-black py-6 rounded-2xl uppercase text-[10px] tracking-widest">Voltar</button>
                 <button 
                  onClick={handleFinalConfirm}
                  disabled={!agreement || isSubmitting}
                  className="flex-1 bg-thedeal-goldBright text-black font-black py-6 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl shadow-thedeal-gold/20 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3"
                 >
                   {isSubmitting ? 'Criptografando...' : 'Confirmar & Registrar Deal'}
                   {!isSubmitting && <ShieldCheck size={18} />}
                 </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 space-y-12 text-center animate-float-in">
               <div className="w-24 h-24 bg-thedeal-success/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-thedeal-success/5 animate-subtle-pulse">
                 <ShieldCheck className="text-thedeal-success" size={48} />
               </div>
               <div className="space-y-4">
                 <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">Acordo <span className="text-thedeal-success">Validado.</span></h3>
                 <p className="text-thedeal-gray400 text-lg font-medium leading-relaxed max-w-lg mx-auto">O capital foi bloqueado via smart-contract. Inicie a produção para processar o repasse.</p>
               </div>
               
               <div className="bg-black/40 border border-white/5 p-10 rounded-[2.5rem] space-y-8 text-left shadow-inner">
                  <h4 className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.4em]">Roteiro de Execução</h4>
                  <div className="space-y-6">
                    {[
                      { n: '01', t: 'Produção Alpha', d: 'Crie os ativos conforme o briefing técnico registrado.' },
                      { n: '02', t: 'Submissão de Prova', d: 'Envie o link do conteúdo postado via terminal para auditoria.' },
                      { n: '03', t: 'Liquidação Escrow', d: 'A marca valida e o sistema libera o pagamento automaticamente.' }
                    ].map(step => (
                      <div key={step.n} className="flex gap-5 items-start">
                        <div className="w-6 h-6 bg-thedeal-gold/10 border border-thedeal-gold/20 rounded-lg flex items-center justify-center font-black text-[10px] text-thedeal-gold shrink-0 mt-1">{step.n}</div>
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{step.t}</p>
                          <p className="text-xs text-thedeal-gray400 font-medium leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <button onClick={onComplete} className="w-full bg-thedeal-gold text-black font-black py-6 rounded-2xl uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-thedeal-gold/20">Acessar Painel de Controle do Deal</button>
            </div>
          )}
        </div>

        <footer className="p-8 bg-black/40 border-t border-white/5 text-center shrink-0">
           <div className="flex items-center justify-center gap-10 opacity-30">
              <div className="flex items-center gap-2">
                 <Shield size={14} className="text-thedeal-gold" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-white">Escrow Guard Ativo</span>
              </div>
              <div className="flex items-center gap-2">
                 <Lock size={14} className="text-thedeal-gold" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-white">Criptografia RSA-4096</span>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SignatureFlow;
