
import React, { useState } from 'react';
import { User } from '../types';

interface CreateAlphaPostProps {
    currentUser: User;
    onAddPost: (text: string, linkUrl?: string, linkTitle?: string, linkImage?: string, topics?: string[]) => void;
}

const CreateAlphaPost: React.FC<CreateAlphaPostProps> = ({ currentUser, onAddPost }) => {
    const [text, setText] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkTitle, setLinkTitle] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const [topics, setTopics] = useState('');

    const MAX_CHARS = 280;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const topicArray = topics.split(',').map(t => t.trim()).filter(t => t.startsWith('#') && t.length > 1);
            onAddPost(
                text.trim(), 
                showLinkInput ? linkUrl.trim() : undefined, 
                showLinkInput ? linkTitle.trim() : undefined,
                showLinkInput ? linkImage.trim() : undefined,
                topicArray.length > 0 ? topicArray : undefined
            );
            setText('');
            setLinkUrl('');
            setLinkTitle('');
            setLinkImage('');
            setTopics('');
            setShowLinkInput(false);
        }
    };

    const charsLeft = MAX_CHARS - text.length;
    const charColor = charsLeft < 20 ? (charsLeft < 10 ? 'text-red-500' : 'text-yellow-500') : 'text-brand-text-secondary';

    return (
        <div className="bg-brand-gray border border-brand-border rounded-lg p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-light-gray flex-shrink-0" />
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={MAX_CHARS}
                        className="w-full bg-transparent text-brand-text text-lg placeholder-brand-text-secondary resize-none focus:outline-none"
                        placeholder="O que está acontecendo no mercado?"
                        rows={3}
                    />
                </div>
                 {showLinkInput && (
                    <div className="mt-3 space-y-2 animate-fade-in border-t border-brand-border pt-3">
                        <div className="bg-brand-light-gray/50 rounded-md p-3 space-y-2 border border-brand-border">
                             <input 
                                type="url" 
                                value={linkUrl} 
                                onChange={e => setLinkUrl(e.target.value)} 
                                placeholder="URL do Link (https://...)" 
                                className="w-full bg-brand-gray rounded p-2 text-sm text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary border border-brand-border"
                            />
                            <input 
                                type="text" 
                                value={linkTitle} 
                                onChange={e => setLinkTitle(e.target.value)} 
                                placeholder="Título do Link (Opcional)" 
                                className="w-full bg-brand-gray rounded p-2 text-sm text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary border border-brand-border"
                            />
                             <input 
                                type="url" 
                                value={linkImage} 
                                onChange={e => setLinkImage(e.target.value)} 
                                placeholder="URL da Imagem (Opcional)" 
                                className="w-full bg-brand-gray rounded p-2 text-sm text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary border border-brand-border"
                            />
                        </div>
                    </div>
                )}
                <div className="mt-3">
                     <input 
                        type="text" 
                        value={topics} 
                        onChange={e => setTopics(e.target.value)} 
                        placeholder="Adicione tópicos: #SaaS, #PerformanceMarketing..." 
                        className="w-full bg-brand-light-gray rounded-md p-2 text-sm text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-1 focus:ring-brand-primary border border-brand-border"
                    />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-brand-border">
                    <button type="button" onClick={() => setShowLinkInput(prev => !prev)} className="text-sm text-brand-text-secondary hover:text-brand-text px-3 py-1 rounded-md hover:bg-brand-light-gray transition-colors">
                        {showLinkInput ? 'Remover Link' : 'Adicionar Link'}
                    </button>
                    <div className="flex items-center">
                        <span className={`text-sm font-bold mr-4 ${charColor}`}>{charsLeft}</span>
                        <button 
                            type="submit"
                            disabled={!text.trim() || text.length > MAX_CHARS}
                            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Postar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAlphaPost;
