
import React, { useState } from 'react';
import { BrainCircuitIcon, ZapIcon } from './Icons';
import { GoogleGenAI } from '@google/genai';

const CreatorInsights: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt || prompt.trim().length < 5) {
            setError('Descreva um pouco mais o seu objetivo para gerar insights úteis.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            // FIX: Initialized GoogleGenAI using process.env.API_KEY directly as per guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = `
                Você é um Estrategista de Conteúdo Viral e Especialista em Retenção para plataformas de vídeo curto (TikTok, Reels).
                Seu objetivo não é apenas dar ideias, mas criar planos de ação focados em conversão e engajamento.

                Com base no tópico do usuário, gere:
                1.  Gancho Inicial (Hook): A frase exata dos primeiros 3 segundos para prender a atenção.
                2.  Estrutura de Roteiro: Um passo-a-passo (Problema -> Agitação -> Solução) focado em manter a retenção.
                3.  Call to Action (CTA): Uma chamada estratégica para venda ou lead, não apenas "curta e compartilhe".
                4.  Elemento Visual: Sugestão de B-roll ou edição para aumentar o valor de produção.

                Formate a resposta de forma clara e organizada, usando Markdown.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            // FIX: Access response.text property directly.
            const text = response.text;

            if (text) {
                setResult(text);
            } else {
                throw new Error('Não foi possível processar a resposta da inteligência.');
            }
        } catch (e: any) {
            console.error('Gemini API Error:', e);
            setError("Ocorreu um erro ao processar sua estratégia. Verifique sua conexão ou tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-brand-gray border border-brand-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
                <BrainCircuitIcon className="w-6 h-6 text-brand-primary" />
                <h2 className="text-2xl font-bold text-brand-text font-display">Estratégia Viral (IA)</h2>
            </div>
            <p className="text-brand-text-secondary mb-6 max-w-2xl">
                Transforme ideias vagas em roteiros de alta conversão. Nossa IA gera ganchos, estruturas de retenção e CTAs otimizados.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: App de produtividade para programadores"
                    className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary flex-grow text-brand-text placeholder-brand-text-secondary"
                    disabled={isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Criando...
                        </>
                    ) : (
                         <>
                            <ZapIcon className="w-5 h-5"/>
                            Gerar Roteiro
                         </>
                    )}
                </button>
            </div>
            {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20 mb-4">{error}</p>}

            {result && (
                <div className="mt-6 bg-brand-light-gray/20 p-4 rounded-md border border-brand-border animate-fade-in">
                    <h3 className="text-xl font-bold text-brand-primary mb-3 font-display">Plano de Conteúdo</h3>
                    <div className="text-brand-text whitespace-pre-wrap text-sm leading-relaxed font-sans prose prose-invert max-w-none">
                        {result}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CreatorInsights;
