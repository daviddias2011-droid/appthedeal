
import React, { useState, useMemo, useRef, useEffect } from 'react';
// FIX: Corrected import path for types.
import { User, Message } from '../types';
import { UserIcon, MessageSquareIcon } from './Icons';

interface MessagingPageProps {
  currentUser: User;
  allUsers: User[];
  messages: Message[];
  onSendMessage: (receiverId: number, text: string) => void;
  activeConversationWith: number | null;
  onConversationSelect: (userId: number | null) => void;
}

const MessagingPage: React.FC<MessagingPageProps> = ({
  currentUser,
  allUsers,
  messages,
  onSendMessage,
  activeConversationWith,
  onConversationSelect,
}) => {
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConversationWith]);

  const conversations = useMemo(() => {
    const participants = new Set<number>();
    messages.forEach(msg => {
      if (msg.senderId === currentUser.id) participants.add(msg.receiverId);
      if (msg.receiverId === currentUser.id) participants.add(msg.senderId);
    });

    return Array.from(participants).map(userId => {
      const user = allUsers.find(u => u.id === userId);
      const lastMessage = messages
        .filter(msg => (msg.senderId === userId && msg.receiverId === currentUser.id) || (msg.senderId === currentUser.id && msg.receiverId === userId))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      return { user, lastMessage };
    }).sort((a,b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
  }, [messages, currentUser.id, allUsers]);

  const activeConversationMessages = useMemo(() => {
    if (!activeConversationWith) return [];
    return messages
      .filter(msg => 
        (msg.senderId === currentUser.id && msg.receiverId === activeConversationWith) ||
        (msg.senderId === activeConversationWith && msg.receiverId === currentUser.id)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages, currentUser.id, activeConversationWith]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessageText.trim() && activeConversationWith) {
      onSendMessage(activeConversationWith, newMessageText.trim());
      setNewMessageText('');
    }
  };
  
  const activeChatPartner = allUsers.find(u => u.id === activeConversationWith);

  return (
    <div className="flex h-full bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
      {/* Conversation List */}
      <aside className="w-1/3 border-r border-brand-border flex flex-col bg-brand-light-gray/30">
        <div className="p-4 border-b border-brand-border">
          <h2 className="text-xl font-bold text-brand-text font-display">Mensagens</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(({ user, lastMessage }) => user && (
            <div
              key={user.id}
              onClick={() => onConversationSelect(user.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${activeConversationWith === user.id ? 'bg-brand-primary/10 border-r-4 border-brand-primary' : 'hover:bg-brand-gray'}`}
            >
              <div className="w-12 h-12 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0 border border-brand-border">
                <UserIcon className="w-6 h-6 text-brand-text-secondary" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-brand-text truncate">{user.name}</p>
                <p className="text-sm text-brand-text-secondary truncate">{lastMessage?.text}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="w-2/3 flex flex-col bg-brand-gray">
        {activeConversationWith && activeChatPartner ? (
          <>
            <div className="p-4 border-b border-brand-border flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand-light-gray flex items-center justify-center border border-brand-border">
                    <UserIcon className="w-6 h-6 text-brand-text-secondary"/>
               </div>
               <h3 className="text-lg font-bold text-brand-text">{activeChatPartner.name}</h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeConversationMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.senderId === currentUser.id ? 'bg-brand-primary text-brand-dark' : 'bg-brand-light-gray text-brand-text border border-brand-border'}`}>
                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                    <p className={`text-xs mt-1 opacity-70 ${msg.senderId === currentUser.id ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-brand-border bg-brand-gray">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={e => setNewMessageText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                />
                <button type="submit" className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300">
                  Enviar
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-brand-text-secondary p-8">
            <MessageSquareIcon className="w-16 h-16 mb-4 opacity-50"/>
            <h3 className="text-xl font-bold text-brand-text">Selecione uma conversa</h3>
            <p>Escolha um contato na lista para ver as mensagens.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagingPage;
