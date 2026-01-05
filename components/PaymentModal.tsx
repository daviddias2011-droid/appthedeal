
import React, { useState } from 'react';
import { getStripe } from '../lib/stripe';
import { CheckCircle, Shield, Loader, Lock, CreditCard, ChevronRight, Zap, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PaymentModalProps {
    onClose: () => void;
}

type PlanType = 'pro-mensal' | 'elite-mensal';

export default function PaymentModal({ onClose }: PaymentModalProps) {
    const { profile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro-mensal');
    const [email, setEmail] = useState(profile?.email || '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const plans = [
        {
            id: 'pro-mensal' as PlanType,
            name: 'Plano Pro',
            price: 'R$ 29',
            period: '/mês',
            description: 'Acesso completo a deals de performance e ROI tracker.',
            icon: <Zap className="text-thedeal-gold" size={20} />,
            color: 'border-thedeal-gold/20'
        },
        {
            id: 'elite-mensal' as PlanType,
            name: 'Elite Fast Track',
            price: 'R$ 149',
            period: '/mês',
            description: 'Prioridade máxima em contratos de alto ticket e ClubAlpha.',
            icon: <Crown className="text-thedeal-goldBright" size={20} />,
            color: 'border-thedeal-goldBright/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
        }
    ];

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan: selectedPlan,
                    userEmail: email
                })
            });

            const { sessionId, error } = await response.json();

            if (error) throw new Error(error);

            const stripe = await getStripe();
            if (stripe) {
                const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
                if (redirectError) throw redirectError;
            }
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message || "Erro ao processar checkout Alpha.");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[1000] p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl relative shadow-[0_0_100px_rgba(201,169,97,0.15)] overflow-hidden" 
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-thedeal-gold to-transparent opacity-40"></div>
                
                <button onClick={onClose} className="absolute top-6 right-8 text-thedeal-gray600 hover:text-white transition-colors">
                    <XIcon size={24} />
                </button>

                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 px-4 py-1.5 rounded-full mb-4">
                        <CreditCard size={14} className="text-thedeal-gold" />
                        <span className="text-[10px] font-black text-thedeal-gold uppercase tracking-[0.2em]">Pagamento Seguro Alpha</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white font-display uppercase tracking-tighter leading-none">Evolua seu <span className="text-thedeal-gold">Acesso</span></h2>
                    <p className="text-thedeal-gray600 font-black uppercase text-[10px] tracking-[0.3em] mt-2">Escolha o protocolo de expansão para seu perfil</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {plans.map((plan) => (
                        <button
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`p-6 rounded-3xl border-2 text-left transition-all relative group flex flex-col justify-between h-full ${
                                selectedPlan === plan.id 
                                    ? 'border-thedeal-gold bg-thedeal-gold/5' 
                                    : 'border-white/5 bg-black/40 hover:border-white/20'
                            } ${plan.color}`}
                        >
                            {selectedPlan === plan.id && (
                                <div className="absolute top-4 right-4 text-thedeal-gold">
                                    <CheckCircle size={20} fill="currentColor" className="text-black" />
                                </div>
                            )}
                            
                            <div>
                                <div className="mb-4">{plan.icon}</div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">{plan.name}</h3>
                                <p className="text-thedeal-gray400 text-[11px] font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="mt-8">
                                <p className="text-2xl font-black text-white">{plan.price}<span className="text-sm font-bold text-thedeal-gray600">{plan.period}</span></p>
                            </div>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest ml-1">E-mail de Faturamento</label>
                        <input 
                            type="email" 
                            required
                            placeholder="EMAIL@CORPORATIVO.COM"
                            className="w-full bg-black/40 border border-thedeal-gray700 rounded-2xl p-5 text-sm font-bold text-white focus:border-thedeal-gold outline-none transition-all placeholder:text-thedeal-gray700"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errorMessage}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-thedeal-goldBright to-thedeal-gold text-black font-black py-6 rounded-2xl shadow-xl shadow-thedeal-gold/20 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" size={24} />
                        ) : (
                            <>
                                <Lock size={16} />
                                Iniciar Pagamento Seguro
                                <ChevronRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="flex items-center justify-center gap-6 opacity-30 pt-8">
                    <Shield className="text-thedeal-gold" size={16} />
                    <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-[0.4em]">Criptografia SSL • Gateway Stripe</p>
                </div>
            </div>
        </div>
    );
}

const XIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
