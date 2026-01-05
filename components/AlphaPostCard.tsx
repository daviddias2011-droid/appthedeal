
import React, { useState } from 'react';
import { AlphaPost, User, AlphaComment, UserType } from '../types';
import { LightbulbIcon, UserIcon, MessageSquareIcon, CrownIcon } from './Icons';

interface AlphaPostCardProps {
    post: AlphaPost;
    comments: AlphaComment[];
    allUsers: User[];
    currentUser: User;
    onMarkPostAsInteresting: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onViewProfile: (user: User) => void;
    onTopicClick: (topic: string) => void;
}

const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
}

// FIX: Converted to React.FC to properly handle React-specific props like 'key' when mapping over elements, 
// and included the missing 'currentUser' prop in the destructuring as defined in the interface.
const AlphaPostCard: React.FC<AlphaPostCardProps> = ({ post, comments, allUsers, onMarkPostAsInteresting, onAddComment, onViewProfile, onTopicClick, currentUser }) => {
    const author = allUsers.find(u => u.id === post.authorId);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    if (!author) return null;

    const isAuthorMaster = author.type === UserType.Admin;

    return (
        <div className={`bg-[#0A0A0A] border rounded-xl p-6 transition-all hover:bg-[#0D0D0D] ${isAuthorMaster ? 'border-[#F4B400]/40 bg-[#0A0A0A]/50 shadow-[0_0_20px_rgba(244,180,0,0.05)]' : 'border-white/5'}`}>
            <div className="flex items-start gap-4">
                <button onClick={() => onViewProfile(author)} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {author.logoUrl ? <img src={author.logoUrl} className="w-full h-full object-cover" alt={author.name}/> : <UserIcon className="w-6 h-6 text-gray-600" />}
                </button>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <button onClick={() => onViewProfile(author)} className={`text-sm font-bold hover:text-[#F4B400] transition-colors ${isAuthorMaster ? 'text-[#F4B400]' : 'text-white'}`}>
                            {author.name}
                        </button>
                        {isAuthorMaster && <CrownIcon className="w-3 h-3 text-[#F4B400]" />}
                        <span className="text-[10px] text-gray-600 font-medium tracking-widest uppercase">@{author.username} • {timeAgo(post.timestamp)}</span>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed mb-4 whitespace-pre-wrap">{post.text}</p>
                    
                    {post.topics && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.topics.map(t => (
                                <button key={t} onClick={() => onTopicClick(t)} className="text-[10px] font-black text-[#F4B400] hover:underline uppercase tracking-tighter">
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors group">
                            <MessageSquareIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold">{comments.length}</span>
                        </button>
                        <button onClick={() => onMarkPostAsInteresting(post.id)} className="flex items-center gap-2 text-gray-600 hover:text-[#F4B400] transition-colors group">
                            <LightbulbIcon className="w-4 h-4 group-hover:scale-125 transition-transform" />
                            <span className="text-xs font-bold">{post.interestingCount}</span>
                        </button>
                    </div>

                    {showComments && (
                        <div className="mt-6 space-y-4 animate-fade-in">
                            <form onSubmit={(e) => { e.preventDefault(); if(newComment.trim()) { onAddComment(post.id, newComment); setNewComment(''); } }} className="flex gap-3">
                                <input 
                                    value={newComment} 
                                    onChange={e => setNewComment(e.target.value)}
                                    placeholder="Adicionar insight..." 
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-[#F4B400]" 
                                />
                                <button type="submit" className="bg-[#F4B400] text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest">Enviar</button>
                            </form>
                            <div className="space-y-4 pt-4">
                                {comments.map(c => {
                                    const cAuthor = allUsers.find(u => u.id === c.authorId);
                                    return (
                                        <div key={c.id} className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex-shrink-0 flex items-center justify-center">
                                                <span className="text-[8px] text-gray-700 font-black">{cAuthor?.name.substring(0,1)}</span>
                                            </div>
                                            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                                                <p className="text-[10px] font-bold text-gray-400 mb-1">{cAuthor?.name}</p>
                                                <p className="text-xs text-gray-300 leading-relaxed">{c.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlphaPostCard;
