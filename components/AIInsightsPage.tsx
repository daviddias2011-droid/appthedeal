
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuitIcon, ZapIcon, SparklesIcon, MessageSquare, Send } from 'lucide-react';

const AIInsightsPage: React.FC = () => {
    const [dealTitle, setDealTitle] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGeneratePitch = async () => {
        if (!dealTitle || dealTitle.trim().length < 3) {
            setError('Digite o título ou objetivo do Deal.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `
                Você é o Assistente Alpha da THE DEAL.
                Sua única função agora é ajudar Criadores a escreverem um PITCH IRRECUSÁVEL para uma marca.
                O pitch deve ser: curto, focado em ROI, profissional e sofisticado.
                Use Markdown. Estruture em:
                1. Abertura de Impacto.
                2. Proposta de Valor (por que você?).
                3. Call to Action direta.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Gere um pitch de aplicação para o deal: ${dealTitle}`,
                config: { systemInstruction }
            });

            const text = response.text;
            if (text) {
                setResult(text);
            } else {
                throw new Error('Terminal ocupado.');
            }
        } catch (e: any) {
            setError("Terminal offline. Tente em instantes.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="bg-thedeal-gold/10 p-2 rounded-xl">
                        <SparklesIcon className="w-6 h-6 text-thedeal-gold" />
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter">AI Pitch <span className="text-thedeal-gold">Assist.</span></h1>
                </div>
                <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-[0.3em]">Sua aplicação irrecusável em 5 segundos</p>
            </header>

            <section className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest ml-1">Para qual Deal você vai aplicar?</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            value={dealTitle}
                            onChange={(e) => setDealTitle(e.target.value)}
                            placeholder="Ex: Campanha Sigapay Outubro..."
                            className="flex-1 bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-white font-bold outline-none focus:border-thedeal-gold transition-all"
                        />
                        <button 
                            onClick={handleGeneratePitch}
                            disabled={isLoading}
                            className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : <Send size={16} />}
                            Gerar Pitch
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}

                {result && (
                    <div className="pt-8 border-t border-white/5 animate-fade-in">
                        <div className="bg-black/60 border border-thedeal-gold/20 rounded-3xl p-8 relative">
                             <div className="absolute top-4 right-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-thedeal-success rounded-full animate-pulse"></div>
                                <span className="text-[8px] font-black text-thedeal-success uppercase tracking-widest">Sugestão Alpha</span>
                             </div>
                             <div className="prose prose-invert max-w-none text-thedeal-gray100 text-sm leading-relaxed font-medium">
                                <div className="whitespace-pre-wrap">{result}</div>
                             </div>
                             <button 
                                onClick={() => { navigator.clipboard.writeText(result); alert('Copiado!'); }}
                                className="mt-8 text-[9px] font-black text-thedeal-gold uppercase tracking-widest hover:text-white transition-colors"
                             >
                                Copiar Texto do Pitch
                             </button>
                        </div>
                    </div>
                )}
            </section>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <p className="text-[10px] font-bold text-thedeal-gray600 uppercase tracking-widest">
                 Dica: Use este texto na sua aplicação direta para aumentar em <span className="text-thedeal-gold">3x sua chance</span> de aprovação.
               </p>
            </div>
        </div>
    );
};

export default AIInsightsPage;
