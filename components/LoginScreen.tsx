
import React, { useState, useEffect } from 'react';
import { Briefcase, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onStartSignup: () => void;
  onBackToLanding: () => void;
  onForgotPassword: () => void;
  error: string | null;
  onGoToPrivacy: () => void;
  onGoToTerms: () => void;
  t: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onStartSignup, onBackToLanding, onForgotPassword, error, t }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (error) {
            setIsLoading(false);
        }
        const hasKey = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        setIsDemoMode(!hasKey);
    }, [error]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        onLogin(email, password);
    };

  return (
    <div className="min-h-screen flex flex-col bg-thedeal-bg relative text-thedeal-gray100 transition-colors duration-500 font-sans selection:bg-thedeal-goldBright selection:text-black">
       {/* Standardized Header */}
       <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBackToLanding}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Briefcase size={18} className="text-black" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                  <p className="text-[7px] md:text-[8px] font-bold uppercase text-thedeal-gold tracking-widest leading-tight">Onde influência vira contrato</p>
                </div>
              </div>
            </div>
            
            <button onClick={onBackToLanding} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} /> Voltar
            </button>
          </div>
       </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-32">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold/20 to-transparent"></div>
            
            <h2 className="text-2xl font-black tracking-tight text-white mb-10 text-center uppercase leading-none px-4">
              Seja bem vindo de volta
            </h2>

            {isDemoMode && (
              <div className="mb-6 p-4 bg-thedeal-gold/5 border border-thedeal-goldDim/20 rounded-2xl text-center">
                <p className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">
                  MODO DE SEGURANÇA ATIVO (DNS)
                </p>
                <p className="text-[8px] text-thedeal-gray400 uppercase mt-1">Acesse via credenciais de convidado ou demo.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-black uppercase tracking-widest text-thedeal-gray600 ml-1">Terminal ID (E-mail)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 focus:border-thedeal-gold outline-none text-white transition-all font-bold text-sm"
                  placeholder="NOME@CORPORATIVO.COM"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-thedeal-gray600">Chave de Segurança</label>
                  <button type="button" onClick={onForgotPassword} className="text-[9px] font-black text-thedeal-gold hover:underline uppercase tracking-widest">Esqueci</button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 focus:border-thedeal-gold outline-none text-white transition-all font-bold text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-thedeal-gray600 hover:text-thedeal-gold"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="animate-shake">
                  <p className="text-thedeal-danger text-[9px] text-center font-black uppercase tracking-widest bg-thedeal-danger/10 p-4 rounded-xl border border-thedeal-danger/20">
                    ERRO: {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px]"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                    <>
                      <span>AUTENTICAR ACESSO</span>
                      <Lock className="w-4 h-4" />
                    </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-thedeal-gray700/50 text-center">
              <p className="text-[9px] font-bold text-thedeal-gray600 mb-4 uppercase tracking-widest">Solicitar acesso à rede?</p>
              <button
                onClick={onStartSignup}
                className="w-full bg-thedeal-gold/10 border border-thedeal-gold/20 text-thedeal-gold font-black py-4 rounded-2xl hover:bg-thedeal-gold hover:text-black transition-all shadow-lg uppercase tracking-[0.2em] text-[10px]"
              >
                INICIAR VALIDAÇÃO DE PERFIL
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4 opacity-30">
          <p className="text-[8px] font-black text-thedeal-gray600 uppercase tracking-[0.5em]">
            THE DEAL • PROTOCOLO DE EXCLUSIVIDADE
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
