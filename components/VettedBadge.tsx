
import React from 'react';
// FIX: Corrected import path for types.
import { UserType } from '../types';
import { CrownIcon } from './Icons';

interface PartnerBadgeProps {
  userType: UserType;
}

const PartnerBadge: React.FC<PartnerBadgeProps> = ({ userType }) => {
  const baseClasses = "inline-flex items-center gap-2 font-bold py-1 px-3 rounded-full text-xs uppercase tracking-wider";
  const colorClasses = "bg-brand-primary/10 border border-brand-primary/30";
  const text = userType === UserType.Brand ? 'Marca Parceira' : 'Criador Parceiro';

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <CrownIcon className="w-4 h-4 text-brand-primary" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400 bg-[length:200%_auto] animate-background-pan">{text}</span>
    </div>
  );
};

export default PartnerBadge;