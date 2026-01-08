
import React, { useEffect } from 'react';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomePageProps {
  userName: string;
  onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName, onContinue }) => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A961', '#D4AF37', '#FFFFFF']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-thedeal-card border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden animate-float-in text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent"></div>
        
        <div className="w-20 h-20 bg-thedeal-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-thedeal-gold/20">
          <ShieldCheck className="text-thedeal-gold" size={40} />
        </div>
        
        <h1 className="text-4xl font-display font-black uppercase tracking-tighter leading-none mb-4">
          Solicitação <br/><span className="text-thedeal-goldBright">Recebida!</span>
        </h1>
        
        <p className="text-thedeal-gray400 text-sm md:text-base mb-10 leading-relaxed">
          Sua documentação foi enviada para o nosso comitê de curadoria Alpha. Agora, junte-se ao grupo de membros para receber atualizações e networking imediato.
        </p>

        <div className="space-y-4 mb-10">
          <a 
            href="https://chat.whatsapp.com/LtU8Bqsn7VQ6taTdflImTO" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest shadow-xl shadow-[#25D366]/20 hover:scale-105 transition-all"
          >
            <MessageCircle size={20} /> Entrar no Grupo de Membros
          </a>
          <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest">Sua aprovação será notificada no WhatsApp em até 48h.</p>
        </div>

        <button 
          onClick={onContinue}
          className="text-[10px] font-black uppercase text-thedeal-gray600 hover:text-white transition-colors tracking-[0.3em]"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
