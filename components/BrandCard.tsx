
import React from 'react';
import { User, UserType, BrandLevel } from '../types';
import { ArrowRightIcon, BriefcaseIcon, ZapIcon, TrendingUpIcon, CrownIcon } from './Icons';

interface BrandCardProps {
  brand: User;
  onViewProfile: (brand: User) => void;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, onViewProfile }) => {
  return (
    <div className="bg-brand-gray border border-brand-border rounded-lg p-4 text-center transition-all hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 flex flex-col">
       <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-brand-light-gray bg-brand-dark flex items-center justify-center">
            <BriefcaseIcon className="w-10 h-10 text-brand-text-secondary"/>
       </div>
      <h4 className="font-bold text-brand-text text-lg font-display">{brand.name}</h4>
      {brand.niche && <p className="text-xs font-bold uppercase text-brand-text-secondary mb-1">{brand.niche}</p>}

      {brand.level && brand.type === UserType.Brand && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold my-2">
            {brand.level === BrandLevel.Startup && (
                <>
                    <ZapIcon className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Startup</span>
                </>
            )}
            {brand.level === BrandLevel.ScaleUp && (
                <>
                    <TrendingUpIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Scale-Up</span>
                </>
            )}
            {brand.level === BrandLevel.Enterprise && (
                <>
                    <CrownIcon className="w-4 h-4 text-brand-primary" />
                    <span className="text-brand-primary">Enterprise</span>
                </>
            )}
        </div>
      )}

      <p className="text-sm text-brand-text-secondary h-5 my-1">{brand.dealsCompleted} deals concluídos</p>

      <button 
        onClick={() => onViewProfile(brand)}
        className={`w-full mt-auto font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 bg-brand-light-gray text-brand-text hover:bg-brand-border`}
      >
        Ver Perfil <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BrandCard;
