
import React, { useState, useEffect } from 'react';
import { User, Deal } from '../types';
import { CheckCircleIcon, SparklesIcon, CrownIcon } from './Icons';

interface VipProposalModalProps {
    creator: User;
    brand: User;
    onClose: () => void;
    onSubmit: (newDeal: Omit<Deal, 'id'>) => void;
}

const VipProposalModal: React.FC<VipProposalModalProps> = ({ creator, brand, onClose, onSubmit }) => {
    const [title, setTitle] = useState('Presença VIP em Evento Corporativo');
    const [description, setDescription] = useState('Necessito de presença confirmada para cobertura de stories e fotos no evento de lançamento...');
    const [selectedPackage, setSelectedPackage] = useState<'standard' | 'premium' | null>(null);
    const [customValue, setCustomValue] = useState<string>('');
    const [suggestedValue, setSuggestedValue] = useState(0);
    const [showCustomValue, setShowCustomValue] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Logic to update suggested price based on package
        if (selectedPackage === 'standard') setSuggestedValue(5000);
        else if (selectedPackage === 'premium') setSuggestedValue(12000);
        else setSuggestedValue(0);
        
        // Reset custom value when package changes
        setCustomValue('');
        setShowCustomValue(false);
    }, [selectedPackage]);

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPackage) return;

        setIsSubmitting(true);
        
        const finalValue = customValue ? parseFloat(customValue) : suggestedValue;

        setTimeout(() => {
            onSubmit({
                title,
                description: `[PACOTE ${selectedPackage.toUpperCase()}] ${description}`,
                value: finalValue,
                isFlashDeal: false,
                status: 'active',
                brand: {
                    name: brand.name,
                    logoUrl: brand.logoUrl || ''
                },
                creatorId: creator.id // Direct assignment
            });
            setIsSubmitting(false);
        }, 1500);
    };

    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1A2332] font-display">Nova Proposta Comercial</h2>
                        <p className="text-sm text-gray-500">Enviando para: <span className="font-bold text-[#1A2332]">{creator.name}</span></p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-[#1A2332] transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handlePublish} className="p-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título do Projeto</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#1A2332] font-medium focus:outline-none focus:ring-2 focus:ring-[#F4B400] transition-shadow"
                            required
                        />
                    </div>

                    {/* Briefing */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Objetivo & Briefing Resumido</label>
                        <textarea 
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-[#1A2332] focus:outline-none focus:ring-2 focus:ring-[#F4B400] transition-shadow resize-none"
                            required
                        />
                    </div>

                    {/* Format Selection */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Selecione o Formato</label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Option 1: Standard */}
                            <div 
                                onClick={() => setSelectedPackage('standard')}
                                className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                                    selectedPackage === 'standard' 
                                    ? 'border-orange-500 bg-orange-50 shadow-md transform -translate-y-1' 
                                    : 'border-gray-200 hover:border-orange-300 bg-white'
                                }`}
                            >
                                <div className="text-orange-600 font-bold uppercase text-[10px] tracking-widest mb-1">Padrão</div>
                                <div className="text-[#1A2332] font-bold text-lg mb-2">Entrada</div>
                                <ul className="space-y-1.5">
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-orange-400"></div> 1 Vídeo (Reels)
                                    </li>
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-orange-400"></div> 1 Story Sequencial
                                    </li>
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-orange-400"></div> Edição Nativa
                                    </li>
                                </ul>
                            </div>

                            {/* Option 2: Premium */}
                            <div 
                                onClick={() => setSelectedPackage('premium')}
                                className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 relative overflow-hidden ${
                                    selectedPackage === 'premium' 
                                    ? 'border-[#F4B400] bg-yellow-50 shadow-md transform -translate-y-1' 
                                    : 'border-gray-200 hover:border-[#F4B400] bg-white'
                                }`}
                            >
                                {selectedPackage === 'premium' && (
                                    <div className="absolute top-0 right-0 bg-[#F4B400] text-[#1A2332] text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
                                        RECOMENDADO
                                    </div>
                                )}
                                <div className="text-[#B45309] font-bold uppercase text-[10px] tracking-widest mb-1 flex items-center gap-1">
                                    <CrownIcon className="w-3 h-3" /> Premium
                                </div>
                                <div className="text-[#1A2332] font-bold text-lg mb-2">Embaixador</div>
                                <ul className="space-y-1.5">
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <SparklesIcon className="w-3 h-3 text-[#F4B400]" /> 5 Vídeos + 5 Stories
                                    </li>
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <SparklesIcon className="w-3 h-3 text-[#F4B400]" /> Presença em Evento
                                    </li>
                                    <li className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <SparklesIcon className="w-3 h-3 text-[#F4B400]" /> Exclusividade (30d)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Value & Calculation */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Sugerido (Mercado)</label>
                            {selectedPackage && !showCustomValue && (
                                <button 
                                    type="button" 
                                    onClick={() => setShowCustomValue(true)} 
                                    className="text-xs text-[#F4B400] font-bold hover:underline"
                                >
                                    Ajustar manualmente
                                </button>
                            )}
                        </div>
                        
                        {showCustomValue ? (
                            <input 
                                type="number" 
                                autoFocus
                                value={customValue}
                                onChange={e => setCustomValue(e.target.value)}
                                placeholder="Digite o valor..."
                                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-2xl font-bold text-[#1A2332] focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                            />
                        ) : (
                            <div className="text-4xl font-bold text-[#1A2332] tracking-tight">
                                {currencyFormatter.format(suggestedValue)}
                            </div>
                        )}
                        
                        {!showCustomValue && selectedPackage && (
                            <p className="text-xs text-gray-400 mt-2">
                                *Valor calculado com base no engajamento médio de {creator.name} e tabela de referência 2024.
                            </p>
                        )}
                    </div>

                    {/* Legal Clause */}
                    <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="bg-blue-100 p-1 rounded-full h-fit mt-0.5">
                            <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-800">Cláusula de Produção</h4>
                            <p className="text-xs text-blue-600/80 leading-relaxed mt-1">
                                O valor inclui custos de logística local e uso de imagem por 90 dias nas redes sociais da marca. Direitos de TV/OOH não inclusos.
                            </p>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-4 pt-2">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors w-1/3"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={!selectedPackage || isSubmitting}
                            className="flex-1 bg-gradient-to-r from-[#F4B400] via-[#FFE082] to-[#B45309] text-black font-black py-4 rounded-xl shadow-lg shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden animate-subtle-pulse bg-[length:200%_auto]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isSubmitting ? 'Processando...' : 'Publicar Oportunidade'}
                                {!isSubmitting && <CrownIcon className="w-5 h-5 text-black" />}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VipProposalModal;
