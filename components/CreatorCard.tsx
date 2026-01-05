
import React, { useState } from 'react';
// FIX: Corrected import path for types.
import { User, UserType, CreatorLevel } from '../types';
import { ArrowRightIcon, UserPlusIcon, CheckCircleIcon, StarIcon, UserIcon, AcademicCapIcon, SparklesIcon, CrownIcon } from './Icons';

interface CreatorCardProps {
  creator: User;
  connectMode?: boolean;
  onViewProfile: (creator: User) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, connectMode = false, onViewProfile }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };
  
  const buttonContent = () => {
    if(connectMode) {
      if(isConnected) {
        return <><CheckCircleIcon className="w-4 h-4" /> Conectado</>;
      }
      return <><UserPlusIcon className="w-4 h-4" /> Conectar</>;
    }
    return <>Ver Perfil <ArrowRightIcon className="w-4 h-4" /></>;
  }

  const buttonClasses = isConnected && connectMode
    ? "bg-brand-primary/10 text-brand-primary"
    : "bg-brand-light-gray text-brand-text hover:bg-brand-border";


  return (
    <div className="bg-brand-gray border border-brand-border rounded-lg p-4 text-center transition-all hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 flex flex-col">
       <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-brand-light-gray bg-brand-light-gray/50 flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-brand-text-secondary"/>
       </div>
      <div className="flex items-center justify-center gap-2">
        {/* FIX: Wrapped AcademicCapIcon in a span with a title attribute to provide a tooltip, fixing the prop type error. */}
        {creator.isSpecialist && <span title="Especialista Verificado"><AcademicCapIcon className="w-5 h-5 text-purple-400"/></span>}
        <h4 className="font-bold text-brand-text text-lg font-display">{creator.name}</h4>
      </div>
      {creator.niche && <p className="text-xs font-bold uppercase text-brand-text-secondary mb-1">{creator.niche}</p>}

      {creator.level && creator.type === UserType.Creator && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold my-2">
            {creator.level === CreatorLevel.Revelacao && (
                <>
                    <SparklesIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Revelação</span>
                </>
            )}
            {creator.level === CreatorLevel.Destaque && (
                <>
                    <StarIcon className="w-4 h-4 text-brand-primary" isFilled={true} />
                    <span className="text-brand-primary">Destaque</span>
                </>
            )}
            {creator.level === CreatorLevel.Celebridade && (
                <>
                    <CrownIcon className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400">Celebridade</span>
                </>
            )}
        </div>
      )}

      <div className="flex items-center justify-center gap-1 my-1">
        {creator.rating && creator.reviews > 0 ? (
            <>
                <StarIcon className="w-4 h-4 text-brand-primary"/>
                <span className="text-sm font-bold text-brand-text">{creator.rating.toFixed(1)}</span>
                <span className="text-xs text-brand-text-secondary">({creator.reviews})</span>
            </>
        ) : (
             <p className="text-sm text-brand-text-secondary h-5">{creator.dealsCompleted} deals concluídos</p>
        )}
      </div>

      <button 
        onClick={connectMode ? handleConnect : () => onViewProfile(creator)}
        disabled={isConnected && connectMode}
        className={`w-full mt-auto font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${buttonClasses}`}
      >
        {buttonContent()}
      </button>
    </div>
  );
};

export default CreatorCard;
