
import React from 'react';
import { Image, FileText, Send } from 'lucide-react';

interface NewPostInputProps {
  userAvatar?: string;
  onPublish?: (content: string) => void;
}

const NewPostInput: React.FC<NewPostInputProps> = ({ userAvatar, onPublish }) => {
  const [content, setContent] = React.useState('');

  const handlePublish = () => {
    if (content.trim()) {
      onPublish?.(content);
      setContent('');
    }
  };

  return (
    <div className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-5 mb-8 shadow-xl">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thedeal-gold to-thedeal-goldDim p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-cover bg-center border-2 border-thedeal-card" style={{ backgroundImage: `url(${userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'})` }}></div>
        </div>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe um deal ou procure parceiros..."
          className="flex-1 bg-thedeal-bg border border-thedeal-gray700 rounded-2xl px-5 py-4 text-thedeal-gray100 text-sm resize-none focus:border-thedeal-gold/50 focus:outline-none transition-all placeholder:text-thedeal-gray400/50"
          rows={3}
        />
      </div>
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-thedeal-gray700/30">
        <div className="flex gap-2">
          <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <Image className="w-5 h-5 text-thedeal-gray400 group-hover:text-thedeal-gold" />
          </button>
          <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all group">
            <FileText className="w-5 h-5 text-thedeal-gray400 group-hover:text-thedeal-gold" />
          </button>
        </div>
        <button 
          onClick={handlePublish}
          disabled={!content.trim()}
          className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black text-[10px] px-8 py-3 rounded-xl transition-all shadow-lg shadow-thedeal-gold/10 uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>Publicar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default NewPostInput;
