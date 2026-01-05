
import React from 'react';
// FIX: Corrected import path for types.
import { User } from '../types';
import { MessageSquareIcon } from './Icons';

interface MessageTemplateModalProps {
  currentUser: User;
  recipient: User;
  onClose: () => void;
  onSendMessage: (receiverId: number, text: string) => void;
}

const MessageTemplateModal: React.FC<MessageTemplateModalProps> = ({ currentUser, recipient, onClose, onSendMessage }) => {

  const templates = [
    `Olá ${recipient.name}, vi seu perfil e acredito que seria um ótimo fit para um projeto. Gostaria de conversar?`,
    `Olá ${recipient.name}, tenho interesse em colaborar. Podemos discutir oportunidades?`,
    `Olá ${recipient.name}, gostaria de discutir os próximos passos para um possível deal.`,
  ];

  const handleTemplateClick = (template: string) => {
    onSendMessage(recipient.id, template);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-lg relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        
        <div className="text-center">
            <MessageSquareIcon className="w-12 h-12 text-brand-primary mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-brand-text font-display mb-2">Iniciar Conversa com {recipient.name}</h2>
            <p className="text-brand-text-secondary mb-6">Para manter o foco e a segurança, escolha um modelo para começar.</p>
        </div>

        <div className="space-y-3">
            {templates.map((template, index) => (
                <button
                    key={index}
                    onClick={() => handleTemplateClick(template)}
                    className="w-full text-left p-4 bg-brand-light-gray border border-brand-border rounded-md hover:bg-brand-border hover:border-brand-primary/50 transition-colors"
                >
                    <p className="text-brand-text">{template}</p>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MessageTemplateModal;
