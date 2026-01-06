
import React from 'react';
import { Clock, CheckCircle, ArrowLeft, TrendingUp, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AguardandoAprovacaoProps {
  onBackToLanding: () => void;
  onLogout: () => void;
}

const AguardandoAprovacao: React.FC<AguardandoAprovacaoProps> = ({ onBackToLanding, onLogout }) => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20 animate-fade-in">
      <div className="max-w-2xl w-full bg-[#141414] border border-[#404040] rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
        
        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-[#D4AF37]/5">
          <ShieldCheck className="w-10 h-10 text-[#D4AF37]" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tighter mb-4">
          Status de <span className="text-[#D4AF37]">Qualificação.</span>
        </h1>
        
        <p className="text-[#A0A0A0] mb-10 text-lg font-medium leading-relaxed">
          Prezado(a) <span className="text-white font-bold">{profile?.name}</span>, sua identidade comercial está em fase de auditoria. Nossa inteligência está validando seus ativos para estabelecer seu **Deal Score inicial**.
        </p>
        
        <div className="bg-[#0a0a0a] border border-[#404040] rounded-2xl p-8 mb-10 text-left">
          <h3 className="text-white font-black uppercase text-xs tracking-widest mb-6">Fases da Validação Técnica</h3>
          <ul className="text-[#A0A0A0] text-sm space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
              </div>
              <div>
                <p className="text-white font-bold uppercase text-[10px] tracking-widest">01. Verificação de Autenticidade</p>
                <p className="text-[11px] mt-1 opacity-60">Cruzamento de dados históricos e integridade de métricas sociais.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-white font-bold uppercase text-[10px] tracking-widest">02. Análise de Potencial de LTV</p>
                <p className="text-[11px] mt-1 opacity-60">Cálculo de taxa de conversão e aderência a contratos de longa duração.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              </div>
              <div>
                <p className="text-white font-bold uppercase text-[10px] tracking-widest">03. Auditoria de Propriedade Intelectual</p>
                <p className="text-[11px] mt-1 opacity-60">Validação da originalidade de formatos para licenciamento comercial.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={onBackToLanding}
            className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors bg-[#D4AF37]/5 py-4 rounded-xl border border-[#D4AF37]/20"
          >
            Acompanhar pelo Site Institucional
          </button>
          <button 
            onClick={onLogout}
            className="text-[10px] font-black uppercase tracking-widest text-[#666666] hover:text-red-500 transition-colors"
          >
            Encerrar Sessão de Verificação
          </button>
        </div>
        
        <div className="space-y-4 opacity-30 mt-12 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </div>
      </div>
    </div>
  );
};

export default AguardandoAprovacao;
