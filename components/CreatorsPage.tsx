
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import CreatorCard from './CreatorCard';
import { MapPinIcon } from './Icons';

interface CreatorsPageProps {
  creators: User[];
  onViewProfile: (creator: User) => void;
  currentUserLocation: { lat: number; lon: number } | null;
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

const CreatorsPage: React.FC<CreatorsPageProps> = ({ creators, onViewProfile, currentUserLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);

  const filteredCreators = useMemo(() => {
    let filtered = creators.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.niche?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showNearbyOnly && currentUserLocation) {
        const NEARBY_RADIUS_KM = 50; // 50km radius
        filtered = filtered.filter(creator => {
            if (creator.location) {
                const distance = getDistance(
                    currentUserLocation.lat,
                    currentUserLocation.lon,
                    creator.location.lat,
                    creator.location.lon
                );
                return distance <= NEARBY_RADIUS_KM;
            }
            return false;
        });
    }

    return filtered;

  }, [creators, searchTerm, showNearbyOnly, currentUserLocation]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display">Encontre Criadores</h1>
            <p className="text-brand-text-secondary mt-1">Descubra os melhores talentos para sua próxima campanha.</p>
        </div>
        <button 
            onClick={() => setShowNearbyOnly(prev => !prev)}
            disabled={!currentUserLocation}
            className={`flex items-center gap-2 font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${showNearbyOnly ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-light-gray text-brand-text-secondary hover:bg-brand-border'}`}
        >
            <MapPinIcon className="w-5 h-5"/>
            <span>Mostrar Apenas Próximos</span>
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome ou nicho..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text placeholder-brand-text-secondary"
      />

      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCreators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} onViewProfile={onViewProfile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-gray border border-brand-border rounded-lg">
          <p className="text-brand-text-secondary">Nenhum criador encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default CreatorsPage;
