
import React, { useState, useMemo } from 'react';
import { Deal, User, UserType } from '../types';
import DealCard from './DealCard';
import { MapPinIcon, PlusCircleIcon } from './Icons';

interface DealsPageProps {
  deals: Deal[];
  onViewDetails: (deal: Deal) => void;
  currentUserLocation: { lat: number; lon: number } | null;
  allUsers: User[];
  onAddDeal: () => void;
  userType: UserType;
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

const DealsPage: React.FC<DealsPageProps> = ({ deals, onViewDetails, currentUserLocation, allUsers, onAddDeal, userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);

  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(deal =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showNearbyOnly && currentUserLocation) {
        const NEARBY_RADIUS_KM = 50; // 50km radius
        filtered = filtered.filter(deal => {
            const brand = allUsers.find(u => u.name === deal.brand.name);
            if (brand && brand.location) {
                const distance = getDistance(
                    currentUserLocation.lat,
                    currentUserLocation.lon,
                    brand.location.lat,
                    brand.location.lon
                );
                return distance <= NEARBY_RADIUS_KM;
            }
            return false;
        });
    }

    return filtered;
  }, [deals, searchTerm, showNearbyOnly, currentUserLocation, allUsers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display">Explore Deals</h1>
            <p className="text-brand-text-secondary mt-1">Encontre as melhores oportunidades para você.</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowNearbyOnly(prev => !prev)}
                disabled={!currentUserLocation}
                className={`flex items-center gap-2 font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${showNearbyOnly ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-light-gray text-brand-text-secondary hover:bg-brand-border'}`}
            >
                <MapPinIcon className="w-5 h-5"/>
                <span>Apenas Próximos</span>
            </button>
            {userType === UserType.Brand && (
                 <button onClick={onAddDeal} className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-4 rounded-md hover:brightness-110 transition-all duration-300 flex items-center gap-2">
                    <PlusCircleIcon className="w-5 h-5"/>
                    <span>Publicar Deal</span>
                </button>
            )}
        </div>
      </div>
      
      <input
        type="text"
        placeholder="Buscar por título, marca ou palavra-chave..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text placeholder-brand-text-secondary"
      />

      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} onViewDetails={onViewDetails} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-gray border border-brand-border rounded-lg">
          <p className="text-brand-text-secondary">Nenhum deal encontrado com seus critérios de busca.</p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
