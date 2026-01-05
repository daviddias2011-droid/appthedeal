
import React from 'react';
import MessagingPage from './MessagingPage';
import { User, Message } from '../types';

interface MessagingModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
    allUsers: User[];
    messages: Message[];
    onSendMessage: (receiverId: number, text: string) => void;
    activeConversationWith: number | null;
    onConversationSelect: (userId: number | null) => void;
}

const MessagingModal: React.FC<MessagingModalProps> = (props) => {
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={props.onClose}>
            <div className="bg-brand-dark border border-brand-border rounded-lg w-full max-w-4xl h-[90vh] relative animate-fade-in" onClick={e => e.stopPropagation()}>
                 <button onClick={props.onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-white z-10">&times;</button>
                 <div className="p-4 h-full">
                     <MessagingPage {...props} />
                 </div>
            </div>
        </div>
    );
};

export default MessagingModal;
