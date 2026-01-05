
import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeftIcon, UserIcon } from './Icons';

interface ArticlePageProps {
    post: BlogPost | null;
    onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ post, onBack }) => {

    const renderMarkdown = (markdown: string) => {
        const elements: React.ReactNode[] = [];
        const lines = markdown.split('\n');
        let listItems: React.ReactNode[] = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc space-y-2 pl-6 mb-4">{listItems}</ul>);
                listItems = [];
            }
        };

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            if (line.startsWith('## ')) {
                flushList();
                elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-brand-primary font-display" dangerouslySetInnerHTML={{ __html: line.substring(3) }}></h2>);
            } else if (line.startsWith('### ')) {
                flushList();
                elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-2 text-white" dangerouslySetInnerHTML={{ __html: line.substring(4) }}></h3>);
            } else if (line.startsWith('· ')) {
                listItems.push(<li key={i} dangerouslySetInnerHTML={{ __html: line.substring(2) }} />);
            } else if (line.trim() !== '') {
                flushList();
                elements.push(<p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: line }} />);
            } else {
                 flushList();
            }
        }
        flushList();
        return elements;
    };


    if (!post) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4">
                <p className="text-brand-text-secondary">Artigo não encontrado.</p>
                <button onClick={onBack} className="mt-4 text-brand-primary font-bold hover:underline flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4"/> Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="bg-brand-dark text-brand-text min-h-screen">
             <div className="max-w-4xl mx-auto p-4 sm:p-8">
                <button onClick={onBack} className="flex items-center gap-2 text-brand-text-secondary hover:text-white mb-8 group">
                    <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1"/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
                </button>
                <article>
                    <header>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-bold uppercase bg-brand-light-gray text-brand-primary px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400 mb-4">{post.title}</h1>
                        <div className="flex items-center gap-3 text-brand-text-secondary">
                             <div className="w-8 h-8 rounded-full bg-brand-light-gray flex items-center justify-center">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <span>Por {post.author}</span>
                            <span>&bull;</span>
                            <span>{post.date}</span>
                        </div>
                    </header>
                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-lg my-8 border border-brand-border" />
                    <div className="prose prose-invert max-w-none text-brand-text-secondary text-lg leading-relaxed space-y-4">
                        {renderMarkdown(post.content)}
                    </div>
                </article>
             </div>
        </div>
    );
};

export default ArticlePage;
