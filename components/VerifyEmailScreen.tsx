
import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Loader, RefreshCw, AlertCircle, Briefcase, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

interface VerifyEmailScreenProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ email, onVerified, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const token = code.join('');
    if (token.length < 6) return;

    setLoading(true);
    setError(null);
    
    try {
      await api.post('/api/verificar-email.php', {
        email,
        token
      });
      onVerified();
    } catch (err: any) {
      setError(err.message || "Código inválido ou expirado.");
      setCode(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      await api.post('/api/reenviar-codigo.php', { email });
      setResendTimer(60);
      alert("Novo código enviado.");
    } catch (err: any) {
      alert("Erro ao reenviar: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col animate-fade-in font-sans selection:bg-thedeal-goldBright selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Briefcase size={18} className="text-black" />
              </div>
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
            <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
          </div>
          <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={14} /> Voltar
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-32">
        <div className="max-w-md w-full bg-thedeal-card border border-white/5 rounded-[3rem] p-10 md:p-12 text-center shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold/20 to-transparent"></div>
          <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="text-thedeal-gold" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Verificar <span className="text-thedeal-gold">E-mail</span></h2>
          <p className="text-thedeal-gray400 text-sm mb-10">Enviamos um código de segurança para:<br/><span className="text-white font-bold">{email}</span></p>
          <div className="flex justify-between gap-2 mb-10">
            {code.map((digit, i) => (
              <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} className="w-12 h-16 bg-black border-2 border-thedeal-gray700 rounded-xl text-center text-2xl font-black text-thedeal-gold focus:border-thedeal-gold outline-none" />
            ))}
          </div>
          {error && (
            <div className="flex items-center justify-center gap-2 mb-6 text-red-500 animate-shake">
              <AlertCircle size={14} />
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}
          <button onClick={handleVerify} disabled={loading || code.some(d => !d)} className="w-full bg-thedeal-gold text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest disabled:opacity-30">
            {loading ? <Loader className="animate-spin" size={20} /> : "Validar Acesso"}
          </button>
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
            <button onClick={handleResend} disabled={resendTimer > 0} className="text-[10px] font-black uppercase tracking-widest text-thedeal-gold disabled:text-thedeal-gray700 flex items-center justify-center gap-2 mx-auto">
              <RefreshCw size={12} /> {resendTimer > 0 ? `Reenviar em ${resendTimer}s` : "Reenviar Código"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailScreen;
