
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send as SendIconLucide, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Olá. Sou o Assistente The Deal. Como posso auxiliar sua jornada de negócios e performance hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `
            Você é o Assistente The Deal, o suporte oficial da rede THE DEAL. 
            CONTEXTO:
            - THE DEAL é uma Rede Social Privada de Negócios e Performance.
            - Foco em Contratos Profissionais: Equity, Revenue Share, Royalties.
            - Linguagem: Executiva, sofisticada, direta, 100% em PORTUGUÊS (Brasil).
            - Regras: Acesso apenas por convite ou análise criteriosa.
            - Lote de Fundadores: 53 de 100 vagas preenchidas.
            - Missões The Deal: Plano para conquistar privilégios vitalícios na rede.
            - Requisitos Missão Principal: 2 convites, 6 meses na rede e 1 acordo fechado. Início 01/01/2026.
            - Diga que seu foco é apenas orientar membros ou candidatos sobre a rede The Deal.
            - Se o usuário perguntar sobre a Iguatemi, Sigapay, Zona Azul ou Shopee, confirme que são parceiros com oportunidades ativas no ecossistema.
            - NUNCA use as palavras 'Alpha' ou 'Protocolo'. Utilize 'Elite', 'Processo', 'Modelo' ou 'Sistema'.
          `,
        },
      });

      setMessages(prev => [...prev, { role: 'assistant', text: response.text || 'Processado. Deseja detalhes sobre nossos modelos de contrato?' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Terminal ocupado. Por favor, tente novamente em instantes.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-[600]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-thedeal-goldBright text-black p-4 rounded-full shadow-[0_20px_60px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center ring-4 ring-black/40"
        >
          <MessageCircle size={28} strokeWidth={2.5} />
        </button>
      ) : (
        <div className="bg-[#0f0f0f] border border-thedeal-gray700 rounded-3xl w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-float-in ring-1 ring-thedeal-gold/30">
          <header className="bg-thedeal-card p-5 border-b border-thedeal-gray700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-thedeal-gold/10 p-2 rounded-xl">
                <Sparkles className="text-thedeal-gold" size={18} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-none">Assistente The Deal</h3>
                <span className="text-thedeal-success text-[8px] font-black uppercase tracking-widest animate-pulse mt-1 block">Rede Protegida</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-thedeal-gray400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
              <X size={20} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-gradient-to-b from-thedeal-bg to-black">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed shadow-lg ${
                  m.role === 'user' 
                    ? 'bg-thedeal-gold text-black font-bold rounded-tr-none' 
                    : 'bg-thedeal-card border border-thedeal-gray700 text-thedeal-gray100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-thedeal-card border border-thedeal-gray700 p-4 rounded-2xl">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-thedeal-gold rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-thedeal-card border-t border-thedeal-gray700 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre a rede ou parceiros..."
              className="flex-1 bg-thedeal-bg border border-thedeal-gray700 rounded-2xl px-5 py-4 text-xs text-white focus:outline-none focus:border-thedeal-gold/50 transition-all placeholder:text-thedeal-gray600"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-thedeal-goldBright text-black p-4 rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-30 transition-all shadow-xl shadow-thedeal-gold/20"
            >
              <SendIconLucide size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
