import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon, MapPinIcon, MessageSquareIcon } from './Icons';
import { GroundingChunk, User, Deal, UserType } from '../types';

interface SmartSearchProps {
    userLocation: { lat: number; lon: number } | null;
    allUsers: User[];
    allDeals: Deal[];
}

const generateDataContext = (users: User[], deals: Deal[]): string => {
    const creators = users
        .filter(u => u.type === UserType.Creator)
        .slice(0, 50)
        .map(c => `- ${c.name}: Área ${c.niche || 'Geral'}, ${c.location?.city || 'Local não informado'}. Bio: "${c.bio?.substring(0, 50)}..."`)
        .join('\n');

    const brands = users
        .filter(u => u.type === UserType.Brand)
        .slice(0, 50)
        .map(b => `- ${b.name}: Empresa ${b.niche || 'Geral'}, ${b.location?.city || 'Local não informado'}.`)
        .join('\n');

    const activeDeals = deals
        .filter(d => d.status === 'active')
        .slice(0, 50)
        .map(d => `- Projeto: "${d.title}" da empresa ${d.brand.name}. Valor: R$${d.value}. Descrição: ${d.description.substring(0, 50)}...`)
        .join('\n');
    
    return `
DADOS DA REDE "THE DEAL":
PROFISSIONAIS:
${creators || 'Nenhum profissional listado.'}
EMPRESAS:
${brands || 'Nenhuma empresa listada.'}
PROJETOS ABERTOS:
${activeDeals || 'Nenhum projeto ativo.'}
    `;
};


const SmartSearch: React.FC<SmartSearchProps> = ({ userLocation, allUsers, allDeals }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query) {
            setError('Por favor, digite o que você busca.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');
        setSources([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const dataContext = generateDataContext(allUsers, allDeals);

            const fullPrompt = `
                Você é o Assistente de Conexões da rede 'THE DEAL'. 
                Sua função é conectar membros a oportunidades e perfis dentro da nossa base exclusiva.
                
                Instruções:
                1. Use linguagem executiva, direta e em Português.
                2. Baseie-se APENAS nos dados fornecidos abaixo para listar membros da rede.
                3. Use o Google Maps para localizar endereços ou proximidades se o usuário solicitar locais físicos.
                
                --- DADOS DA REDE ---
                ${dataContext}
                --- FIM DOS DADOS ---

                SOLICITAÇÃO DO MEMBRO: "${query}"
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
                config: {
                    tools: [{ googleMaps: {} }],
                    ...(userLocation && {
                        toolConfig: {
                            retrievalConfig: {
                                latLng: {
                                    latitude: userLocation.lat,
                                    longitude: userLocation.lon,
                                },
                            },
                        },
                    }),
                },
            });

            const text = response.text;
            const groundingChunks = (response as any).candidates?.[0]?.groundingMetadata?.groundingChunks;

            if (text) {
                setResult(text);
            } else {
                setResult("Não encontrei correspondências exatas na rede para sua busca agora.");
            }
            if (groundingChunks) {
                setSources(groundingChunks as GroundingChunk[]);
            }

        } catch (e: any) {
            console.error('Smart Search API Error:', e);
            setError("O terminal de busca inteligente está temporariamente indisponível.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section className="bg-gradient-to-r from-brand-gray to-brand-dark border border-brand-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-brand-primary/10 p-2 rounded-full">
                    <SparklesIcon className="w-5 h-5 text-brand-primary" />
                </div>
                <h2 className="text-xl font-bold text-white font-display">Assistente de Conexões</h2>
            </div>
            <p className="text-brand-text-secondary mb-6 text-sm">
                Encontre empresas, perfis ou oportunidades específicas. Ex: "Marcas de tecnologia em SP" ou "Projetos acima de 5k".
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="O que você busca na rede hoje?"
                    className="w-full bg-brand-light-gray/50 border border-brand-border rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder-brand-text-secondary"
                    disabled={isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-gradient-to-br from-yellow-400 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
                >
                    {isLoading ? 'Buscando...' : <><MessageSquareIcon className="w-4 h-4"/> Buscar</>}
                </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            {(result || sources.length > 0) && (
                <div className="mt-4 pt-4 border-t border-brand-border animate-fade-in">
                    <div className="text-brand-text whitespace-pre-wrap text-sm leading-relaxed">{result}</div>
                    
                    {sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {sources.map((source, index) => source.maps && (
                                <a key={index} href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs bg-brand-light-gray px-2 py-1 rounded text-blue-300 hover:text-white">
                                    <MapPinIcon className="w-3 h-3"/>
                                    {source.maps.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default SmartSearch;