
import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeftIcon, ArrowRightIcon, ZapIcon, BriefcaseIcon, Instagram, Twitter, Video } from 'lucide-react';
import { KwaiIcon } from './Icons';

interface BlogPageProps {
    posts: BlogPost[];
    onViewArticle: (slug: string) => void;
    onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onViewArticle, onBack }) => {
    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] via-[#FFE082] to-[#B45309]";
    
    return (
        <div className="min-h-screen bg-brand-dark text-brand-text">
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                <BriefcaseIcon size={18} className="text-black" />
                            </div>
                            <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        </div>
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                    </div>
                    
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                        <ArrowLeftIcon size={14} className="text-thedeal-gold" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Voltar</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20 pt-32">
                <header className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full mb-8">
                        <ZapIcon className="w-3 h-3 text-brand-primary animate-pulse" />
                        <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Intelligence Weekly</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black font-display tracking-tighter mb-8 leading-[0.9]">
                        Insights de <br/>
                        <span className={goldTextClass}>Alta Performance</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-brand-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
                        Explorando a economia de criadores e estratégias de ROI que amadores não conhecem.
                    </p>
                </header>

                {posts.length > 0 && (
                    <section 
                        onClick={() => onViewArticle(posts[0].slug)}
                        className="mb-24 relative group cursor-pointer overflow-hidden rounded-3xl border border-brand-border bg-brand-gray shadow-2xl"
                    >
                        <div className="grid lg:grid-cols-12 gap-0">
                            <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden">
                                <img src={posts[0].imageUrl} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <div className="lg:col-span-5 p-10 lg:p-20 flex flex-col justify-center">
                                <div className="flex gap-3 mb-8">
                                    {posts[0].tags.map(tag => (
                                        <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-brand-primary border border-brand-primary/30 px-3 py-1 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-black font-display mb-8 group-hover:text-brand-primary transition-colors leading-tight uppercase tracking-tighter">
                                    {posts[0].title}
                                </h2>
                                <p className="text-brand-text-secondary text-lg mb-10 line-clamp-3 font-light leading-relaxed">
                                    {posts[0].summary}
                                </p>
                                <div className="mt-auto flex items-center gap-4 text-brand-primary font-black uppercase text-xs tracking-[0.2em]">
                                    Acessar Conteúdo Completo
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <footer className="py-20 px-6 text-center space-y-10 opacity-60 border-t border-white/5 mt-20">
                    <div className="flex justify-center gap-8">
                      <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
                      <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
                      <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
                      <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
                    </div>
                    <div className="space-y-4 opacity-30">
                        <p className="text-[8px] font-black uppercase tracking-[0.5em]">THE DEAL • © 2026 • TODOS OS DIREITOS RESERVADOS</p>
                        <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                            A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default BlogPage;
