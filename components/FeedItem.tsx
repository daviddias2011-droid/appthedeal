import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, CheckCircle, MoreHorizontal, Sparkles, FileText, X, ShieldCheck } from 'lucide-react';

interface FeedItemProps {
  author: string;
  avatar: string;
  tag: string;
  content: string;
  imageUrl?: string;
  stats: string;
  time: string;
  isDeal?: boolean;
  onAction: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({ author, avatar, tag, content, imageUrl, stats, time, isDeal, onAction }) => {
  const [showContractExplanation, setShowContractExplanation] = useState(false);

  return (
    <article className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl overflow-hidden transition-all mb-8 group hover:border-thedeal-goldDim/40 cursor-pointer relative">
      {/* EXPLANATION MODAL */}
      {showContractExplanation && (
        <div className="absolute inset-0 z-50 bg-black/95 p-6 animate-fade-in flex flex-col justify-center text-center">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowContractExplanation(false); }}
            className="absolute top-4 right-4 text-thedeal-gray400 hover:text-white"
          >
            <X size={24} />
          </button>
          <div className="w-16 h-16 bg-thedeal-gold/10 rounded-full mx-auto flex items-center justify-center mb-6">
            <ShieldCheck className="text-thedeal-gold" size={32} />
          </div>
          <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-6">Certificado de Registro</h4>
          <div className="space-y-4 text-left max-w-sm mx-auto">
             {[
               { n: '01', t: 'Acordo Comercial', d: 'A marca e o criador estruturam os termos profissionais da parceria.' },
               { n: '02', t: 'Ativos Originais', d: 'Criação de conteúdos alinhados aos objetivos estratégicos.' },
               { n: '03', t: 'Registro & Rastreamento', d: 'Os ativos são validados e registrados na rede para monitoramento.' },
               { n: '04', t: 'Garantia de Pagamento', d: 'Remuneração protegida por custódia digital liberada após a entrega.' }
             ].map(step => (
               <div key={step.n} className="flex gap-4">
                  <span className="text-thedeal-gold font-black text-xs mt-1">{step.n}</span>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-widest">{step.t}</p>
                    <p className="text-thedeal-gray400 text-[10px] leading-relaxed">{step.d}</p>
                  </div>
               </div>
             ))}
          </div>
          <button 
             onClick={onAction}
             className="mt-8 bg-thedeal-gold text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest"
          >
            Iniciar Registro
          </button>
        </div>
      )}

      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thedeal-gold to-thedeal-goldDim p-0.5 shadow-lg">
            <img src={avatar} className="w-full h-full rounded-full object-cover border-2 border-thedeal-card" alt={author} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm tracking-tight">{author}</h3>
              <CheckCircle size={14} className="text-thedeal-goldBright" />
              <span className="text-[10px] bg-thedeal-gold/10 text-thedeal-gold border border-thedeal-goldDim/30 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">{tag}</span>
            </div>
            <p className="text-thedeal-gray400 text-[10px] uppercase font-bold tracking-widest mt-0.5">{time}</p>
          </div>
        </div>
        <button onClick={onAction} className="text-thedeal-gray400 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        <p className="text-thedeal-gray100 text-sm leading-relaxed whitespace-pre-line font-medium">
          {content}
        </p>
      </div>

      {/* Media */}
      {imageUrl && (
        <div className="w-full aspect-video bg-zinc-900 border-y border-thedeal-gray700 overflow-hidden" onClick={onAction}>
          <img src={imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Conteúdo" />
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-5 flex flex-col gap-4 border-t border-thedeal-gray700/30">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <button onClick={onAction} className="flex items-center gap-2 text-thedeal-gray400 hover:text-thedeal-gold transition-colors text-sm group/btn">
              <Heart size={20} className="group-hover:fill-thedeal-gold group-hover:text-thedeal-gold" />
              <span className="font-bold text-xs uppercase tracking-widest">Interesse</span>
            </button>
            <button onClick={onAction} className="flex items-center gap-2 text-thedeal-gray400 hover:text-white transition-colors text-sm">
              <MessageCircle size={20} />
              <span className="font-bold text-xs uppercase tracking-widest">Proposta</span>
            </button>
          </div>
          <button onClick={onAction} className="text-thedeal-gray400 hover:text-white">
            <Share2 size={18} />
          </button>
        </div>
        
        {isDeal && (
          <div className="flex flex-col sm:flex-row gap-3">
             <button 
                onClick={(e) => { e.stopPropagation(); setShowContractExplanation(true); }}
                className="flex-1 bg-white/5 border border-white/10 hover:border-thedeal-gold text-white text-[10px] font-black px-6 py-3.5 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 group/btn"
              >
                <ShieldCheck size={16} className="text-thedeal-gold" />
                <span>Certificado & Garantia</span>
              </button>
              <button 
                onClick={onAction}
                className="flex-1 bg-thedeal-goldBright hover:bg-thedeal-gold text-black text-[10px] font-black px-6 py-3.5 rounded-xl transition-all shadow-md uppercase tracking-widest active:scale-95"
              >
                Aplicar à Parceria
              </button>
          </div>
        )}
      </div>

      {/* Social Proof Stats */}
      <div className="px-5 py-3 bg-white/[0.02] border-t border-thedeal-gray700/20 flex items-center gap-2">
        <Sparkles size={12} className="text-thedeal-gold" />
        <span className="text-[10px] font-bold text-thedeal-gray400 uppercase tracking-widest">{stats}</span>
      </div>
    </article>
  );
};

export default FeedItem;