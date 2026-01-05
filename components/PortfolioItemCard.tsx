import React from 'react';
// FIX: Corrected import path for types.
import { PortfolioItem } from '../types';
import { VideoIcon, ImageIcon } from './Icons';

interface PortfolioItemCardProps {
    item: PortfolioItem;
    isCurrentUser: boolean;
    onEdit: (item: PortfolioItem) => void;
}

const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ item, isCurrentUser, onEdit }) => {
    
    const content = (
        <div className="group aspect-square bg-brand-gray border border-brand-border rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer">
            <div className="flex flex-col items-center justify-center text-brand-text-secondary transition-transform group-hover:scale-110">
                {item.type === 'video' ? <VideoIcon className="w-10 h-10"/> : <ImageIcon className="w-10 h-10"/>}
            </div>
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400">{item.metric}</p>
            </div>
        </div>
    );

    if(isCurrentUser) {
        return <button onClick={() => onEdit(item)}>{content}</button>;
    }

    return (
        <a href={item.contentUrl} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    );
};

export default PortfolioItemCard;