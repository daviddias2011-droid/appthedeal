import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, CheckCircle, MoreHorizontal, Eye, Send, Trash2, UserPlus, UserMinus, ShieldCheck, Lock } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  isFollowing?: boolean;
  onFollow?: () => void;
  onDelete?: () => void;
  onAction?: (action: string) => void;
  isLocked?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isFollowing, onFollow, onDelete, onAction, isLocked }) => {
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleShare = () => {
    const text = `🔥 Confira esta oportunidade no THE DEAL: "${post.content.substring(0, 50)}..."`;
    navigator.clipboard.writeText(text);
    alert('Link de acesso copiado para sua área de transferência!');
  };

  return (
    <article className={`bg-thedeal-card border rounded-[2rem] overflow-hidden transition-all relative ${post.type === 'deal' ? 'border-thedeal-gold/40 shadow-2xl shadow-thedeal-gold/5' : 'border-thedeal-gray700'}`}>
      
      {/* Overlay de Bloqueio */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center animate-fade-in group">
          <div className="bg-thedeal-gold/10 p-4 rounded-full mb-4 border border-thedeal-gold/20 group-hover:scale-110 transition-transform">
            <Lock className="text-thedeal-gold w-8 h-8" />
          </div>
          <p className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Conteúdo Exclusivo para Membros</p>
          <button 
            onClick={() => onAction?.('upgrade')}
            className="bg-thedeal-gold text-black font-black text-[10px] px-8 py-3 rounded-xl hover:scale-105 transition shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest"
          >
            Desbloquear Agora
          </button>
        </div>
      )}

      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-thedeal-gold to-thedeal-goldDim p-0.5 shadow-lg">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full rounded-2xl object-cover border-2 border-thedeal-card" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm tracking-tight">{post.author.name}</h3>
              {post.author.verified && <CheckCircle className="w-3.5 h-3.5 text-thedeal-goldBright" />}
              <span className="text-[8px] bg-white/5 text-thedeal-gray400 border border-white/5 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{post.author.badge}</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-thedeal-gray600 text-[10px] font-bold uppercase tracking-widest">{post.timestamp}</p>
              {onFollow && (
                <button onClick={onFollow} className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${isFollowing ? 'text-thedeal-gray700' : 'text-thedeal-gold hover:text-thedeal-goldBright'}`}>
                   {isFollowing ? '· Seguindo' : '· Seguir'}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button onClick={() => setShowOptions(!showOptions)} className="text-thedeal-gray700 hover:text-white p-2"><MoreHorizontal size={20}/></button>
          {showOptions && (
            <div className="absolute right-0 top-10 w-48 bg-black border border-thedeal-gray700 rounded-2xl p-2 shadow-2xl z-50 animate-float-in">
               <button onClick={handleShare} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-white hover:bg-white/5 rounded-xl transition-all">
                 <Share2 size={14} className="text-thedeal-gold" /> Compartilhar
               </button>
               {onDelete && (
                 <button onClick={() => { onDelete(); setShowOptions(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-all">
                   <Trash2 size={14} /> Excluir Post
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-6">
        <p className={`text-thedeal-gray100 text-sm leading-relaxed whitespace-pre-line font-medium opacity-90 ${isLocked ? 'blur-sm select-none' : ''}`}>
          {post.content}
        </p>
      </div>

      {/* Contract Badge for Deals */}
      {post.type === 'deal' && (
        <div className="px-8 pb-6">
           <div className={`bg-thedeal-success/10 border border-thedeal-success/20 rounded-2xl p-4 flex items-center gap-3 ${isLocked ? 'opacity-20 grayscale' : ''}`}>
              <ShieldCheck className="text-thedeal-success" size={20} />
              <span className="text-[10px] font-black text-thedeal-success uppercase tracking-widest">Registro de Conformidade Validado e Capital Protegido</span>
           </div>
        </div>
      )}

      {/* Media Placeholder if image exists */}
      {post.image && (
        <div className={`w-full h-80 bg-zinc-900 border-y border-thedeal-gray700 overflow-hidden relative ${isLocked ? 'blur-md' : ''}`}>
          <img src={post.image} alt="Conteúdo" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Footer Actions */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-thedeal-gray700/30 bg-black/10">
        <div className="flex gap-8">
           <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 transition-all group ${liked ? 'text-thedeal-gold' : 'text-thedeal-gray700 hover:text-thedeal-gold'}`}>
             <Heart size={18} className={`${liked ? 'fill-thedeal-gold' : 'group-hover:scale-110 transition-transform'}`} />
             <span className="text-[10px] font-black uppercase tracking-widest">{post.stats.likes || post.stats.interests || 0}</span>
           </button>
           <button className="flex items-center gap-2 text-thedeal-gray700 hover:text-white transition-all group">
             <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">{post.stats.comments || post.stats.proposals || 0}</span>
           </button>
        </div>
        
        {post.type === 'deal' && post.ctaText && !isLocked && (
          <button 
            onClick={() => onAction?.('apply')}
            className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black text-[10px] font-black px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest active:scale-95"
          >
            {post.ctaText}
          </button>
        )}
      </div>
    </article>
  );
};

export default PostCard;