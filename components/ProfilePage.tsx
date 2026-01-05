
import React, { useState } from 'react';
import { User, UserType, PortfolioItem, Deal } from '../types';
import PartnerBadge from './PartnerBadge';
import { StarIcon, ArrowLeftIcon, UserIcon, PencilIcon, MessageSquareIcon, CheckCircleIcon, PlusCircleIcon, InstagramIcon, TwitterIcon, LinkedinIcon, AcademicCapIcon, UserPlusIcon, SettingsIcon, BriefcaseIcon, ShareIcon } from './Icons';
import DealCard from './DealCard';
import PortfolioItemCard from './PortfolioItemCard';

interface ProfilePageProps {
  user: User;
  isCurrentUser: boolean;
  currentUserType: UserType;
  portfolioItems: PortfolioItem[];
  deals: Deal[];
  onBack?: () => void;
  onEditProfile: () => void;
  onAddPortfolio: () => void;
  onEditPortfolio: (item: PortfolioItem) => void;
  onInviteToJob: (user: User) => void;
  onViewDealDetails: (deal: Deal) => void;
  onSendMessage: (user: User) => void;
}

const formatNumber = (num: number = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num;
}

const Rating: React.FC<{rating?: number, reviews?: number}> = ({ rating = 0, reviews = 0}) => {
    if (reviews === 0) return null;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                 {[...Array(5)].map((_, i) => (
                    <div key={i}>
                        <StarIcon isFilled={i < Math.round(rating)} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-brand-primary' : 'text-brand-border'}`} />
                    </div>
                ))}
            </div>
            <span className="text-brand-text-secondary text-sm font-bold">{rating.toFixed(1)}</span>
            <span className="text-brand-text-secondary text-sm">({reviews} avaliações)</span>
        </div>
    )
}

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 font-bold text-sm rounded-md transition-colors ${isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-text-secondary hover:bg-brand-light-gray/50'}`}>
        {label}
    </button>
)

const SpecialistBadge: React.FC = () => (
    <div className="inline-flex items-center gap-2 font-bold py-1 px-3 rounded-full text-xs uppercase tracking-wider bg-purple-400/10 border border-purple-400/30 text-purple-400">
        <AcademicCapIcon className="w-4 h-4" />
        <span>Especialista Verificado</span>
    </div>
);


const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const { user, isCurrentUser, currentUserType, portfolioItems, deals, onBack, onEditProfile, onAddPortfolio, onEditPortfolio, onInviteToJob, onViewDealDetails, onSendMessage } = props;
  
  const creatorInitialTab = 'portfolio';
  const brandInitialTab = 'deals_ativos';
  const [activeTab, setActiveTab] = useState(user.type === UserType.Creator ? creatorInitialTab : brandInitialTab);
  
  const [interestSent, setInterestSent] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const myPortfolio = portfolioItems.filter(item => item.creatorId === user.id);
  
  const creatorDeals = deals.filter(d => d.creatorId === user.id);
  const inProgressDeals = creatorDeals.filter(d => d.status === 'in progress');
  const completedDealsAsCreator = creatorDeals.filter(d => d.status === 'completed');

  const brandDeals = deals.filter(d => d.brand.name === user.name);
  const activeDealsAsBrand = brandDeals.filter(d => d.status === 'active');
  const completedDealsAsBrand = brandDeals.filter(d => d.status === 'completed');

  const isBrandViewing = currentUserType === UserType.Brand;

  const handleShareProfile = () => {
      const url = `https://thedeal.app/${user.username}`;
      navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      });
  };

  const handleDemonstrateInterest = () => {
      setInterestSent(true);
      onSendMessage(user);
  }

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  const renderContent = () => {
    if (user.type === UserType.Creator) {
        switch (activeTab) {
            case 'portfolio':
                return (
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                        {myPortfolio.map((item) => (
                            <PortfolioItemCard
                                key={item.id}
                                item={item}
                                isCurrentUser={isCurrentUser}
                                onEdit={onEditPortfolio}
                            />
                        ))}
                        {isCurrentUser && (
                            <button onClick={onAddPortfolio} className="group aspect-square bg-transparent border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-brand-gray hover:border-brand-primary/50 text-brand-text-secondary hover:text-brand-text transition-colors">
                                <PlusCircleIcon className="w-8 h-8"/>
                                <span className="font-bold mt-2 text-sm">Adicionar Mídia</span>
                            </button>
                        )}
                    </div>
                );
            case 'deals_andamento':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        {inProgressDeals.length > 0 ? (
                            inProgressDeals.map(deal => <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails}/>)
                        ) : (
                            <p className="text-brand-text-secondary text-center lg:col-span-2 py-8">Nenhum deal em andamento.</p>
                        )}
                    </div>
                );
            case 'historico':
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        {completedDealsAsCreator.length > 0 ? (
                            completedDealsAsCreator.map(deal => <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails}/>)
                        ) : (
                            <p className="text-brand-text-secondary text-center lg:col-span-2 py-8">Nenhum deal concluído ainda.</p>
                        )}
                    </div>
                );
            default: return null;
        }
    }
    
    if (user.type === UserType.Brand) {
        switch(activeTab) {
            case 'deals_ativos':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        {activeDealsAsBrand.length > 0 ? (
                            activeDealsAsBrand.map(deal => <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails}/>)
                        ) : (
                            <div className="lg:col-span-2 text-center py-10 bg-brand-gray border border-brand-border rounded-lg">
                                <p className="text-brand-text-secondary">{isCurrentUser ? 'Você não tem' : 'Esta marca não tem'} deals ativos no momento.</p>
                            </div>
                        )}
                    </div>
                );
            case 'historico':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        {completedDealsAsBrand.length > 0 ? (
                            completedDealsAsBrand.map(deal => <DealCard key={deal.id} deal={deal} onViewDetails={onViewDealDetails} />)
                        ) : (
                            <div className="lg:col-span-2 text-center py-10 bg-brand-gray border border-brand-border rounded-lg">
                                 <p className="text-brand-text-secondary">Nenhum deal concluído ainda.</p>
                            </div>
                        )}
                    </div>
                );
            case 'sobre':
                return (
                    <div className="bg-brand-gray border border-brand-border rounded-lg p-6 animate-fade-in">
                        <h3 className="text-xl font-bold font-display text-brand-text mb-2">Sobre a {user.name}</h3>
                        <p className="text-brand-text-secondary">{user.bio}</p>
                        {currentUserType === UserType.Creator && (
                            <div className="mt-6 pt-4 border-t border-brand-border">
                                <h4 className="font-bold text-brand-text">O que buscamos em Criadores</h4>
                                <p className="text-brand-text-secondary text-sm mt-1">
                                    Estamos sempre em busca de criadores de conteúdo que entendam de performance, funil de vendas e ROI. Se você gera resultados reais, queremos conversar. Demonstre seu interesse!
                                </p>
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    }
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <header className="flex flex-col items-center text-center gap-4 relative">
        <div className="w-32 h-32 rounded-full border-4 border-brand-light-gray bg-brand-dark flex items-center justify-center overflow-hidden shadow-2xl relative group">
            {user.type === UserType.Brand && user.logoUrl ? (
                <img src={user.logoUrl} alt={`${user.name} logo`} className="w-full h-full object-cover" />
            ) : user.type === UserType.Brand ? (
                <BriefcaseIcon className="w-16 h-16 text-brand-text-secondary"/>
            ) : user.logoUrl ? (
                <img src={user.logoUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
                <UserIcon className="w-16 h-16 text-brand-text-secondary"/>
            )}
            
            {isCurrentUser && (
                <button onClick={onEditProfile} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PencilIcon className="w-6 h-6 text-white" />
                </button>
            )}
        </div>
        
        <div className="w-full">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display">{user.name}</h1>
                <p className="text-sm font-black text-brand-text-secondary uppercase tracking-widest -mt-1">@{user.username}</p>
                 {user.isSpecialist && <SpecialistBadge />}
                 {user.isVetted && !user.isSpecialist && <PartnerBadge userType={user.type} />}
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
                {user.niche && <div className="text-xs font-bold uppercase bg-brand-light-gray text-brand-text-secondary px-2 py-1 rounded">{user.niche}</div>}
                 {isCurrentUser ? (
                    <div className="flex gap-2">
                        <button onClick={onEditProfile} className="flex items-center gap-1.5 text-sm bg-brand-light-gray text-brand-text-secondary font-bold py-2 px-4 rounded-md hover:bg-brand-border hover:text-brand-text transition-colors">
                            <PencilIcon className="w-3.5 h-3.5"/>
                            Editar Perfil
                        </button>
                        <button onClick={handleShareProfile} className={`flex items-center gap-1.5 text-sm font-bold py-2 px-4 rounded-md transition-all ${copied ? 'bg-brand-emerald text-white' : 'bg-brand-primary text-brand-dark hover:brightness-110'}`}>
                            {copied ? <CheckCircleIcon className="w-3.5 h-3.5" /> : <ShareIcon className="w-3.5 h-3.5" />}
                            {copied ? 'Copiado!' : 'Compartilhar'}
                        </button>
                    </div>
                 ) : (
                     <div className="flex items-center justify-center gap-3">
                        <button onClick={handleShareProfile} className="p-2.5 rounded-md bg-brand-light-gray text-brand-text-secondary hover:text-brand-text transition-all">
                             <ShareIcon className="w-5 h-5"/>
                        </button>
                        {isBrandViewing && user.type === UserType.Creator && (
                            <>
                                <button onClick={() => onInviteToJob(user)} className="bg-[#F4B400] text-[#1A2332] font-bold py-2 px-4 rounded-md hover:brightness-105 transition-colors shadow-sm">
                                    Convidar para Deal
                                </button>
                                <button onClick={() => onSendMessage(user)} className="border-2 border-[#1A2332] text-[#1A2332] font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                                    <MessageSquareIcon className="w-4 h-4"/>
                                    Mensagem
                                </button>
                            </>
                        )}
                        {currentUserType === UserType.Creator && user.type === UserType.Creator && (
                            <button
                                onClick={handleFollowToggle}
                                className={`font-bold py-2 px-4 rounded-md transition-colors flex items-center gap-2 ${
                                    isFollowing
                                    ? 'bg-brand-primary/10 text-brand-primary'
                                    : 'border-2 border-[#1A2332] text-[#1A2332] hover:bg-gray-100'
                                }`}
                            >
                                {isFollowing ? (
                                    <><CheckCircleIcon className="w-5 h-5" /> Seguindo</>
                                ) : (
                                    <><UserPlusIcon className="w-5 h-5" /> Seguir</>
                                )}
                            </button>
                        )}
                        {!isBrandViewing && user.type === UserType.Brand && (
                            <button 
                                onClick={handleDemonstrateInterest} 
                                disabled={interestSent}
                                className="bg-[#F4B400] text-[#1A2332] font-bold py-2 px-4 rounded-md hover:brightness-105 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {interestSent ? <><CheckCircleIcon className="w-5 h-5"/> Interesse Enviado</> : 'Demonstrar Interesse'}
                            </button>
                        )}
                     </div>
                 )}
            </div>
            
             <div className="flex items-center justify-center gap-6 mt-6 text-brand-text flex-wrap">
                <div className="flex flex-col"><span className="font-black text-xl">{user.dealsCompleted}</span> <span className="text-[10px] uppercase font-bold text-brand-text-secondary tracking-widest">Deals</span></div>
                <div className="w-px h-8 bg-brand-border hidden sm:block"></div>
                <div className="flex flex-col"><span className="font-black text-xl">{formatNumber(user.followers)}</span> <span className="text-[10px] uppercase font-bold text-brand-text-secondary tracking-widest">Seguidores</span></div>
                <div className="w-px h-8 bg-brand-border hidden sm:block"></div>
                <div className="flex flex-col"><span className="font-black text-xl">{formatNumber(user.following)}</span> <span className="text-[10px] uppercase font-bold text-brand-text-secondary tracking-widest">Seguindo</span></div>
            </div>
            {user.type === UserType.Creator && <div className="mt-4 flex justify-center"><Rating rating={user.rating} reviews={user.reviews} /></div>}
            {user.type === UserType.Creator && <p className="text-brand-text-secondary mt-4 max-w-xl mx-auto text-sm leading-relaxed">{user.bio}</p>}
        </div>
      </header>
      
      <div className="border-b border-brand-border">
        <nav className="flex items-center justify-center gap-4 -mb-px">
            {user.type === UserType.Creator && (
                <>
                    <TabButton label="Portfólio" isActive={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
                    <TabButton label="Deals em Andamento" isActive={activeTab === 'deals_andamento'} onClick={() => setActiveTab('deals_andamento')} />
                    <TabButton label="Histórico" isActive={activeTab === 'historico'} onClick={() => setActiveTab('historico')} />
                </>
            )}
            {user.type === UserType.Brand && (
                <>
                    <TabButton label="Deals Ativos" isActive={activeTab === 'deals_ativos'} onClick={() => setActiveTab('deals_ativos')} />
                    <TabButton label="Histórico de Deals" isActive={activeTab === 'historico'} onClick={() => setActiveTab('historico')} />
                    <TabButton label="Sobre a Marca" isActive={activeTab === 'sobre'} onClick={() => setActiveTab('sobre')} />
                </>
            )}
        </nav>
      </div>

      <main className="mt-6">
        {renderContent()}
      </main>

    </div>
  );
};

export default ProfilePage;
