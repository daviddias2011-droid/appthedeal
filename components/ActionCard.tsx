
import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: 'primary' | 'blue' | 'green' | 'purple';
}

const colorStyles = {
  primary: {
    border: 'border-brand-primary/40 hover:border-brand-primary/80',
    iconBg: 'bg-brand-primary text-brand-primary',
  },
  blue: {
    border: 'border-blue-400/40 hover:border-blue-400/80',
    iconBg: 'bg-blue-400 text-blue-400',
  },
  green: {
    border: 'border-green-400/40 hover:border-green-400/80',
    iconBg: 'bg-green-400 text-green-400',
  },
  purple: {
    border: 'border-purple-400/40 hover:border-purple-400/80',
    iconBg: 'bg-purple-400 text-purple-400',
  },
};

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, description, onClick, color }) => {
  const styles = colorStyles[color];
  const isPrimary = color === 'primary';
  
  return (
    <button 
        onClick={onClick} 
        className={`bg-brand-gray border-2 rounded-lg p-6 text-left transition-all flex flex-col aspect-square justify-center group ${styles.border}`}
    >
        <div className={`p-3 rounded-md bg-opacity-10 ${styles.iconBg} inline-block mb-4 transition-transform group-hover:scale-110`}>
            {icon}
        </div>
        <h3 className={`font-bold text-lg font-display ${isPrimary ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400' : 'text-brand-text'}`}>
            {title}
        </h3>
        <p className="text-sm text-brand-text-secondary mt-1">{description}</p>
    </button>
  );
};

export default ActionCard;
