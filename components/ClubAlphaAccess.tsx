// FIX: Created missing ClubAlphaAccess.tsx component file and fixed imports.
import React from 'react';
import { User, UserType } from '../types';
import { CrownIcon } from './Icons';

interface ClubAlphaAccessProps {
    user: User;
    onAccess: () => void;
}

const ClubAlphaAccess: React.FC<ClubAlphaAccessProps> = ({ user, onAccess }) => {
    const dealsNeeded = user.type === UserType.Brand ? 3 : 5;
    const ratingNeeded = 4.7;
    
    const progress = (user.dealsCompleted / dealsNeeded) * 100;

    if (user.isVetted) {
        return (
             <button onClick={onAccess} id="alpha-hub" className="w-full text-left bg-gradient-to-br from-brand-gray to-brand-dark border border-brand-primary/50 rounded-lg p-6 shadow-lg shadow-brand-primary/10 hover:border-brand-primary/80 transition-all">
                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                    <div className="bg-brand-primary/10 p-3 rounded-full border border-brand-primary/30">
                        <CrownIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-primary font-display">ClubAlpha: Acesso Exclusivo</h2>
                        <p className="text-brand-text-secondary">
                            Você tem acesso à rede privada de deals de alto valor e parceiros de elite.
                        </p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-brand-text font-semibold">Clique para explorar a rede de elite.</p>
                </div>
            </button>
        )
    }

    const renderBrandView = () => (
        <>
            <p className="text-brand-text mb-4">
                O ClubAlpha é o nosso nível de elite. Acesso a projetos secretos, comissões premium e oportunidades de co-marketing. Para garantir a qualidade, o acesso é liberado após a conclusão de <strong>{dealsNeeded} deals</strong>.
            </p>
            <div className="w-full bg-brand-gray rounded-full h-2.5 mb-2 border border-brand-border">
                <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-right font-bold text-brand-text">
                {user.dealsCompleted} de {dealsNeeded} Deals Concluídos
            </p>
        </>
    );
    
    const renderCreatorView = () => {
        const ratingProgress = ((user.rating || 0) / ratingNeeded) * 100;
        return (
            <>
                <p className="text-brand-text mb-4">
                    O ClubAlpha é o nosso nível de elite, onde os deals mais valiosos são fechados. O acesso é liberado para criadores que demonstram consistência e performance. Os critérios são:
                </p>
                <ul className="list-disc list-inside text-brand-text-secondary mb-4 space-y-1">
                    <li>Concluir pelo menos <strong>{dealsNeeded} deals</strong>.</li>
                    <li>Manter uma avaliação média de <strong>{ratingNeeded} estrelas</strong> ou mais.</li>
                </ul>

                <div className="space-y-3">
                    <div>
                        <p className="text-sm font-bold text-brand-text mb-1">Progresso de Deals: {user.dealsCompleted} / {dealsNeeded}</p>
                         <div className="w-full bg-brand-gray rounded-full h-2.5 border border-brand-border">
                            <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-brand-text mb-1">Avaliação Média: {user.rating?.toFixed(1) || 'N/A'} / {ratingNeeded.toFixed(1)}</p>
                         <div className="w-full bg-brand-gray rounded-full h-2.5 border border-brand-border">
                            <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${ratingProgress}%` }}></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    return (
        <div id="alpha-hub" className="bg-gradient-to-br from-brand-gray to-brand-dark border border-brand-primary/50 rounded-lg p-6 mb-8 shadow-lg shadow-brand-primary/10">
            <div className="flex items-start md:items-center gap-4 mb-3 flex-col md:flex-row">
                <div className="bg-brand-primary/10 p-3 rounded-full border border-brand-primary/30">
                    <CrownIcon className="w-8 h-8 text-brand-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-brand-primary font-display">ClubAlpha: O Nível dos Gênios</h2>
                    <p className="text-brand-text-secondary">
                        O programa exclusivo para os criadores que consistentemente entregam o maior ROI.
                    </p>
                </div>
            </div>
            {user.type === UserType.Brand ? renderBrandView() : renderCreatorView()}
        </div>
    );
};

export default ClubAlphaAccess;
