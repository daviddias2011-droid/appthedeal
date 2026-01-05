
import React from 'react';
import { User, UserType, AlphaPost, AlphaComment } from '../types';
import AlphaFeed from './AlphaFeed';
import ClubAlphaAccess from './ClubAlphaAccess';

interface ClubAlphaHubProps {
    user: User;
    allUsers: User[];
    posts: AlphaPost[];
    comments: AlphaComment[];
    onAddPost: (text: string, linkUrl?: string, linkTitle?: string, linkImage?: string, topics?: string[]) => void;
    onMarkPostAsInteresting: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onViewProfile: (user: User) => void;
}

const ClubAlphaHub: React.FC<ClubAlphaHubProps> = (props) => {
    const { user, onAddPost } = props;

    // MASTER e membros Vetted entram direto. Outros vêem a trava.
    if (!user.isVetted && user.type !== UserType.Admin) {
        return <ClubAlphaAccess user={user} onAccess={() => {}} />;
    }
    
    return (
        <AlphaFeed 
            currentUser={user}
            allUsers={props.allUsers}
            posts={props.posts}
            comments={props.comments}
            onAddPost={onAddPost}
            onMarkPostAsInteresting={props.onMarkPostAsInteresting}
            onAddComment={props.onAddComment}
            onViewProfile={props.onViewProfile}
        />
    );
};

export default ClubAlphaHub;
