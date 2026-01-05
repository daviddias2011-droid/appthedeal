
import React, { useState } from 'react';
import { KeyIcon, ShieldIcon, BrainCircuitIcon, MessageSquareIcon, ArrowRightIcon } from './Icons';
import { GoogleGenAI } from '@google/genai';

interface ArenaChatProps {
    onClose: () => void;
    onGoToSignup: () => void;
    onScrollToSection: (sectionId: string) => void;
    onShowCriteria: () => void;
}

const ArenaChat: React.FC<ArenaChatProps> = ({ onClose, onGoToSignup, onScrollToSection, onShowCriteria }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
        { role: 'assistant', text: 'Você encontrou um acesso restrito da Arena de Desafios do The Deal. Como posso auxiliar sua entrada na rede?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAssistantChat = async (userMsg: string) => {
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: userMsg,
                config: {
                    systemInstruction: "Você é o Assistente da Arena de Desafios do The Deal. Uma rede privada de negócios. Você deve ser discreto, executivo e focado em converter o interesse do usuário em uma solicitação de convite ou entendimento da rede. Não explique detalhes técnicos profundos. Mantenha o ar de exclusividade."
                }
            });
            const text = response.text;
            setMessages(prev => [...prev, { role: 'assistant', text: text || 'Entendido. Como posso ajudar mais?' }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', text: 'O terminal de assistência está processando muitas requisições. Como posso direcioná-lo agora?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-24 right-10 z-[300] w-[350px] bg-brand-gray border border-brand-gold/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-float-in">
            <header className="bg-brand-dark p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <KeyIcon className="w-4 h-4 text-brand-gold" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Arena de Desafios Access</span>
                </div>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto max-h-[300px] space-y-4 scrollbar-hide">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-brand-gold text-black font-bold' : 'bg-brand-dark border border-white/5 text-white/70'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-brand-dark border border-white/5 p-3 rounded-xl">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce"></div>
                                <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-brand-dark/50 border-t border-white/5 space-y-2">
                {messages.length === 1 && (
                    <div className="grid grid-cols-1 gap-2 mb-2">
                        <button onClick={onGoToSignup} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-left group">
                            <KeyIcon className="w-3 h-3 text-brand-gold" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">🔑 Solicitar convite</span>
                        </button>
                        <button onClick={() => onScrollToSection('como-funciona')} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-left group">
                            <BrainCircuitIcon className="w-3 h-3 text-brand-gold" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">🧠 Como a rede funciona</span>
                        </button>
                        <button onClick={onShowCriteria} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-left group">
                            <ShieldIcon className="w-3 h-3 text-brand-gold" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">🛡️ Critérios de entrada</span>
                        </button>
                    </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); if(inputValue.trim()) { handleAssistantChat(inputValue); setInputValue(''); } }} className="flex gap-2">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Falar com o assistente..." 
                        className="flex-1 bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-brand-gold transition-all"
                    />
                    <button type="submit" className="p-2 bg-brand-gold rounded-lg text-black hover:scale-105 transition-transform">
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ArenaChat;
