
import React, { useState } from 'react';
import { BrainCircuitIcon, ZapIcon } from './Icons';
import { GoogleGenAI } from '@google/genai';

const BrandInsights: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Por favor, insira um tópico para gerar insights.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            // FIX: Initialized GoogleGenAI using process.env.API_KEY directly as per guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const systemInstruction = `
                Você é um Consultor de Inteligência de Mercado Sênior especializado em campanhas B2B e B2C de alta performance.
                Seu objetivo é fornecer uma análise estratégica, não apenas dicas genéricas.

                Com base no mercado ou produto fornecido, gere:
                1. Tendência Emergente: O que está mudando no comportamento do consumidor desse nicho agora.
                2. Ângulo de Campanha: Uma abordagem criativa única para diferenciar a marca dos concorrentes.
                3. Sugestão de Influência: Que tipo de criador (arquetipo) funcionaria melhor para esse produto.
                4. KPI Principal: Qual métrica exata deve ser monitorada para medir o sucesso dessa estratégia.

                Formate a resposta de forma executiva, clara e profissional, usando Markdown.
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            // FIX: Access response.text property directly.
            const text = response.text;
            
            if (text) {
                setResult(text);
            } else {
                throw new Error("Resposta vazia da inteligência.");
            }
        } catch (e: any) {
            console.error('Brand Insights API Error:', e);
            setError("Erro ao processar inteligência de mercado. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-brand-gray border border-brand-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
                <BrainCircuitIcon className="w-6 h-6 text-brand-primary" />
                <h2 className="text-2xl font-bold text-brand-text font-display">Inteligência de Mercado</h2>
            </div>
            <p className="text-brand-text-secondary mb-6 max-w-2xl">
                Obtenha análises de tendências, sugestões de posicionamento e KPIs estratégicos para sua próxima campanha com nossa IA proprietária.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Mercado de suplementos esportivos premium"
                    className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary flex-grow text-brand-text placeholder-brand-text-secondary"
                    disabled={isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[170px]"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
                        </>
                    ) : (
                         <>
                            <ZapIcon className="w-5 h-5"/>
                            Gerar Relatório
                         </>
                    )}
                </button>
            </div>
            {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}

            {result && (
                <div className="mt-6 bg-brand-light-gray/20 p-4 rounded-md border border-brand-border animate-fade-in">
                    <h3 className="text-xl font-bold text-brand-primary mb-3 font-display">Relatório Estratégico</h3>
                     <div className="text-brand-text whitespace-pre-wrap text-sm leading-relaxed font-sans prose prose-invert max-w-none">
                        {result}
                    </div>
                </div>
            )}
        </section>
    );
};

export default BrandInsights;
