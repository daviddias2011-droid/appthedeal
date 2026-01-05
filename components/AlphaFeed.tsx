import React, { useState, useMemo, useEffect } from 'react';
import { User, UserType, AlphaPost, AlphaComment } from '../types';
import CreateAlphaPost from './CreateAlphaPost';
import AlphaPostCard from './AlphaPostCard';
import { CrownIcon, TrendingUpIcon, BrainCircuitIcon, SparklesIcon } from './Icons';
import { TRENDING_TOPICS } from '../constants';
import { GoogleGenAI } from '@google/genai';

interface AlphaFeedProps {
    currentUser: User;
    allUsers: User[];
    posts: AlphaPost[];
    comments: AlphaComment[];
    onAddPost: (text: string, linkUrl?: string, linkTitle?: string, linkImage?: string, topics?: string[]) => void;
    onMarkPostAsInteresting: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onViewProfile: (user: User) => void;
}

type FeedTab = 'recent' | 'trending';

const AlphaFeed: React.FC<AlphaFeedProps> = ({ currentUser, allUsers, posts, comments, onAddPost, onMarkPostAsInteresting, onAddComment, onViewProfile }) => {
    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37] bg-[length:200%_auto] animate-background-pan";

    const [activeTab, setActiveTab] = useState<FeedTab>('recent');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [aiBriefing, setAiBriefing] = useState<string>('');
    const [isBriefingLoading, setIsBriefingLoading] = useState(false);
    
    const eliteMembers = allUsers.filter(u => u.isVetted && u.type !== UserType.Admin).slice(0, 5);

    useEffect(() => {
        if (!aiBriefing) {
            generateBriefing();
        }
    }, []);

    const generateBriefing = async () => {
        setIsBriefingLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const recentPostsText = posts.slice(0, 10).map(p => p.text).join('\n');
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Analise as atualizações recentes do The Deal Hub: "${recentPostsText}". 
                Resuma em 3 frases curtas e impactantes o clima da comunidade agora.`,
            });
            const text = response.text;
            setAiBriefing(text || 'A comunidade está focada em escalar resultados e parcerias estratégicas.');
        } catch (e) {
            setAiBriefing('Networking de alta qualidade acontecendo no hub agora.');
        } finally {
            setIsBriefingLoading(false);
        }
    };

    const sortedPosts = useMemo(() => {
        let postsToDisplay = [...posts];
        if (selectedTopic) postsToDisplay = postsToDisplay.filter(p => p.topics?.includes(selectedTopic));
        if (activeTab === 'trending') return postsToDisplay.sort((a, b) => b.interestingCount - a.interestingCount);
        return postsToDisplay.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [posts, activeTab, selectedTopic]);

    return (
        <div className="bg-[#0A0A0A] text-white min-h-full rounded-2xl border border-brand-border shadow-2xl overflow-hidden font-sans">
            <header className="p-8 border-b border-brand-border bg-brand-gray/50">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`text-3xl font-black font-display tracking-tighter uppercase ${goldTextClass}`}>The Deal Hub</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-text-secondary mt-1.5">Conectando a elite de criadores e marcas</p>
                    </div>
                </div>
            </header>

            <div className="p-8 bg-brand-dark/30 border-b border-brand-border">
                <div className="flex items-center gap-3 mb-4">
                    <SparklesIcon className="w-4 h-4 text-brand-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-text-secondary">The Deal <span className={goldTextClass}>Briefing</span></h3>
                </div>
                <div className="p-6 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                    {isBriefingLoading ? (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                            <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                        </div>
                    ) : (
                        <p className="text-md font-light text-brand-text leading-relaxed italic">
                            "{aiBriefing}"
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8">
                <main className="lg:col-span-3 space-y-6">
                    <CreateAlphaPost currentUser={currentUser} onAddPost={onAddPost} />

                    <div className="flex gap-8 border-b border-brand-border">
                        <button onClick={() => setActiveTab('recent')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'recent' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary hover:text-white'}`}>Recentes</button>
                        <button onClick={() => setActiveTab('trending')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'trending' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary hover:text-white'}`}>Em Alta</button>
                    </div>

                    <div className="space-y-6">
                        {sortedPosts.map(post => (
                            <AlphaPostCard 
                                key={post.id}
                                post={post}
                                comments={comments.filter(c => c.postId === post.id)}
                                allUsers={allUsers}
                                onMarkPostAsInteresting={onMarkPostAsInteresting}
                                onAddComment={onAddComment}
                                currentUser={currentUser}
                                onViewProfile={onViewProfile}
                                onTopicClick={setSelectedTopic}
                            />
                        ))}
                    </div>
                </main>

                <aside className="hidden lg:block space-y-8">
                    <div className="bg-brand-gray border border-brand-border rounded-xl p-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <TrendingUpIcon className="w-4 h-4 text-brand-primary"/>
                            Tópicos <span className={goldTextClass}>Hot</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                           {TRENDING_TOPICS.map(topic => (
                               <button key={topic} onClick={() => setSelectedTopic(topic)} className="text-[8px] font-black uppercase bg-brand-light-gray text-brand-text-secondary px-3 py-1.5 rounded-sm hover:text-brand-primary border border-brand-border transition-all tracking-widest">{topic}</button>
                           ))}
                        </div>
                    </div>

                    <div className="bg-brand-gray border border-brand-border rounded-xl p-6">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <CrownIcon className="w-4 h-4 text-brand-primary"/>
                            Membros <span className={goldTextClass}>Destaque</span>
                        </h3>
                        <ul className="space-y-6">
                            {eliteMembers.map(member => (
                                <li key={member.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => onViewProfile(member)}>
                                    <div className="w-10 h-10 rounded-full bg-brand-light-gray border border-brand-border flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {member.logoUrl ? <img src={member.logoUrl} className="w-full h-full object-cover" /> : <span className="text-[10px] font-black text-brand-text-secondary">{member.name.substring(0,1)}</span>}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white group-hover:text-brand-primary transition-colors">{member.name}</p>
                                        <p className="text-[8px] text-brand-text-secondary uppercase tracking-widest">{member.niche || 'Membro'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AlphaFeed;