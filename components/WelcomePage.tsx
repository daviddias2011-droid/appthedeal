
import React, { useEffect } from 'react';
import { 
  CheckCircle2, Trophy, Star, Mail, ArrowRight, Sparkles, ShieldCheck, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomePageProps {
  userName: string;
  onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName, onContinue }) => {
  useEffect(() => {
    // Disparar celebração Alpha
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full bg-thedeal-card border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden animate-float-in">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-thedeal-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-thedeal-gold/20 shadow-2xl shadow-thedeal-gold/20 animate-subtle-pulse">
              <ShieldCheck className="text-thedeal-gold" size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
                Bem-vindo,<br/>
                <span className="text-thedeal-goldBright">{userName.split(' ')[0]}!</span>
              </h1>
              <p className="text-thedeal-gray400 text-sm md:text-lg font-medium uppercase tracking-[0.2em] opacity-60">
                Seu terminal foi ativado com sucesso.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-2 group hover:border-thedeal-gold/30 transition-all">
              <Zap className="text-thedeal-gold mx-auto" size={24} />
              <h3 className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Nível Atual</h3>
              <p className="text-lg font-black text-white uppercase">Aspirante</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-2 group hover:border-thedeal-gold/30 transition-all">
              <Star className="text-thedeal-gold mx-auto" size={24} />
              <h3 className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">Deal Score</h3>
              <p className="text-lg font-black text-white uppercase">10 Alpha</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-2 group hover:border-thedeal-gold/30 transition-all">
              <Mail className="text-thedeal-gold mx-auto" size={24} />
              <h3 className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest">E-mail</h3>
              <p className="text-lg font-black text-white uppercase">Enviado</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-left space-y-6">
            <h2 className="text-xs font-black uppercase text-thedeal-gold tracking-[0.4em] border-b border-white/5 pb-4">Próximos Passos de Expansão:</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-sm font-medium text-thedeal-gray400">
                <div className="w-5 h-5 rounded-full bg-thedeal-gold/20 flex items-center justify-center shrink-0"><CheckCircle2 className="text-thedeal-gold" size={12} /></div>
                <span>Conecte suas Redes Estratégicas <strong className="text-white">(+150 pts)</strong></span>
              </li>
              <li className="flex items-center gap-4 text-sm font-medium text-thedeal-gray400">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10"></div>
                <span>Complete seu Perfil Profissional <strong className="text-white">(+30 pts)</strong></span>
              </li>
              <li className="flex items-center gap-4 text-sm font-medium text-thedeal-gray400">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10"></div>
                <span>Adicione 3 Cases ao Portfólio <strong className="text-white">(+120 pts)</strong></span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <button 
              onClick={onContinue}
              className="w-full bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black py-6 rounded-2xl text-xs uppercase tracking-[0.3em] shadow-2xl shadow-thedeal-gold/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              Começar Minha Jornada Alpha
              <ArrowRight size={18} />
            </button>
            <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-[0.5em] flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-thedeal-gold" />
              Faltam 340 pontos para o nível PRO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
