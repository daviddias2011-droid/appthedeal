
import React, { useState } from 'react';
import { 
    BriefcaseIcon, ShieldIcon, ZapIcon, TrendingUpIcon, HandshakeIcon,
    ArrowRightIcon, SparklesIcon
} from './Icons';
import { Language } from '../translations';

interface LegacyLandingPageProps {
  onGoToDemo: () => void;
  onGoToSignup: (role: 'creator' | 'brand') => void;
  onGoToPrivacy: () => void;
  onGoToTerms: () => void;
  language: Language;
  t: any;
}

export default function LegacyLandingPage({ onGoToDemo, onGoToSignup, t }: LegacyLandingPageProps) {
    const [reach, setReach] = useState(100000);
    const [conversion, setConversion] = useState(1);
    const [ticket, setTicket] = useState(100);

    const tradModel = 2000;
    const dealModel = (reach * (conversion / 100) * ticket * 0.15) + 1500;
    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans overflow-x-hidden">
            <nav className="fixed top-0 left-0 w-full z-[100] h-16 bg-white border-b border-gray-200 flex items-center">
                <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={onGoToDemo}>
                        <div className="bg-[#0077B5] p-1 rounded-sm"><BriefcaseIcon className="w-5 h-5 text-white" /></div>
                        <span className="text-lg font-black tracking-tight text-[#0077B5]">THE DEAL</span>
                    </div>
                    <button onClick={() => onGoToSignup('creator')} className="bg-[#0077B5] hover:bg-[#005E93] text-white px-4 py-1.5 rounded-full text-sm font-bold transition-all">Pedir Convite</button>
                </div>
            </nav>
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            <ShieldIcon className="w-3 h-3" /> {t.headerSlogan}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1E293B] leading-[1.1] tracking-tight">{t.heroTitle}</h1>
                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed">{t.heroSubtitle}</p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button onClick={() => onGoToSignup('creator')} className="bg-[#0077B5] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#005E93] transition-all flex items-center justify-center gap-2">
                                {t.requestInviteCreator} <ArrowRightIcon className="w-5 h-5" />
                            </button>
                            <button onClick={onGoToDemo} className="border-2 border-gray-300 text-gray-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all">Ver Aplicativo</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
