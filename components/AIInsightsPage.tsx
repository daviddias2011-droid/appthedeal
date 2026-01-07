
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuitIcon, ZapIcon, SparklesIcon } from './Icons';

const AIInsightsPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt || prompt.trim().length < 5) {
            setError('Descreva um pouco mais o seu objetivo (mínimo 5 caracteres).');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `
                Você é o Consultor de Estratégia e Criatividade da THE DEAL.
                Seu objetivo é gerar roteiros virais, conceitos de campanha e ganchos de retenção focados em ROI.
                Seja direto, executivo e inovador. Use Markdown para formatar.
                Estruture a resposta em:
                1. Conceito Central: A ideia base.
                2. Ganchos (Hooks): 3 opções de primeiros 3 segundos.
                3. Estrutura do Conteúdo: Roteiro passo-a-passo.
                4. CTA de Alta Conversão: Chamada para ação matadora.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Gere ideias de performance para: ${prompt}`,
                config: { systemInstruction }
            });

            const text = response.text;
            if (text) {
                setResult(text);
            } else {
                throw new Error('Nenhuma resposta gerada.');
            }
        } catch (e: any) {
            setError("Terminal indisponível. Verifique sua conexão.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-brand-primary/10 p-3 rounded-xl border border-brand-primary/30">
                        <BrainCircuitIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black font-display uppercase tracking-tighter">Ideias de Performance</h1>
                        <p className="text-[10px] text-brand-text-secondary font-black uppercase tracking-[0.4em]">Inteligência Criativa (Powered by Gemini)</p>
                    </div>
                </div>
            </header>

            <section className="bg-brand-gray border border-brand-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <SparklesIcon className="w-32 h-32 text-brand-primary" />
                </div>

                <div className="max-w-2xl relative z-10">
                    <h3 className="text-lg font-bold text-brand-text mb-4">O que você quer criar hoje?</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                            placeholder="Ex: Roteiro para curso de investimentos em dólar..."
                            className="flex-1 bg-brand-light-gray border border-brand-border rounded-xl p-4 text-brand-text focus:border-brand-primary outline-none transition-all font-bold"
                        />
                        <button 
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : <ZapIcon className="w-4 h-4" />}
                            Gerar Insights
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-[10px] font-black uppercase mt-3 tracking-widest">{error}</p>}
                </div>

                {result && (
                    <div className="mt-12 pt-12 border-t border-brand-border animate-fade-in">
                        <div className="prose prose-invert max-w-none text-brand-text-secondary leading-relaxed">
                            <div className="bg-brand-dark/50 border border-brand-border rounded-2xl p-8 shadow-inner">
                                <div className="text-brand-text whitespace-pre-wrap font-sans text-sm">
                                    {result}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <div className="grid md:grid-cols-3 gap-6 opacity-60">
                 <div className="p-6 bg-brand-gray border border-brand-border rounded-xl">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-primary mb-2">Sugestão</p>
                    <p className="text-xs font-bold text-brand-text">"Crie um roteiro focado em escassez para meu app de produtividade"</p>
                 </div>
                 <div className="p-6 bg-brand-gray border border-brand-border rounded-xl">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-primary mb-2">Sugestão</p>
                    <p className="text-xs font-bold text-brand-text">"Conceito de campanha para marca de suplementos veganos"</p>
                 </div>
                 <div className="p-6 bg-brand-gray border border-brand-border rounded-xl">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-primary mb-2">Sugestão</p>
                    <p className="text-xs font-bold text-brand-text">"Ganchos de retenção para unboxing de tech premium"</p>
                 </div>
            </div>
        </div>
    );
};

export default AIInsightsPage;
