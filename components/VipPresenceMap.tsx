import React, { useState, useMemo, useEffect } from 'react';
import { User, UserType } from '../types';
import { MapPinIcon, ArrowLeftIcon, CrownIcon, SearchIcon, RefreshIcon, ShieldIcon, StarIcon, ChevronRightIcon } from './Icons';

interface VipPresenceMapProps {
    users: User[];
    currentUserLocation: { lat: number; lng: number } | null;
    onSelectCreator: (creator: User) => void;
    onBack: () => void;
}

interface MapCreator extends User {
    mapX: number;
    mapY: number;
    distance?: string;
    realDistanceKm?: number;
}

const VipPresenceMap: React.FC<VipPresenceMapProps> = ({ users, onSelectCreator, onBack }) => {
    const [selectedCreator, setSelectedCreator] = useState<MapCreator | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [zoom, setZoom] = useState(14);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Erro ao obter geolocalização:", error);
                    // Fallback para SP se falhar
                    setUserCoords({ lat: -23.5505, lng: -46.6333 });
                }
            );
        }
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const mapPins = useMemo<MapCreator[]>(() => {
        return users
            .filter(u => u.type === UserType.Creator && u.isVetted)
            .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.niche?.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 15)
            .map((creator, index) => {
                const angle = (index / 15) * Math.PI * 2;
                const radius = 20 + Math.random() * 20;
                
                const lat = userCoords ? userCoords.lat + (Math.random() - 0.5) * 0.08 : -23.5505;
                const lng = userCoords ? userCoords.lng + (Math.random() - 0.5) * 0.08 : -46.6333;
                
                const dist = userCoords ? calculateDistance(userCoords.lat, userCoords.lng, lat, lng) : Math.random() * 10;

                return {
                    ...creator,
                    mapX: 50 + radius * Math.cos(angle),
                    mapY: 50 + radius * Math.sin(angle),
                    distance: `${dist.toFixed(1)}km`,
                    realDistanceKm: dist
                };
            });
    }, [users, userCoords, searchTerm, isRefreshing]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const openInGoogleMaps = (creator: MapCreator) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${creator.name}+${creator.niche || ''}`;
        window.open(url, '_blank');
    };

    return (
        <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-[#e5e3df] dark:bg-[#121212]">
            <div className="absolute top-6 left-6 z-20 w-full max-w-md px-4 sm:px-0">
                <div className="bg-brand-gray border border-brand-border rounded-lg shadow-2xl flex items-center p-2 group transition-all focus-within:ring-2 focus-within:ring-brand-primary">
                    <button onClick={onBack} className="p-2 hover:bg-brand-light-gray rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-brand-text-secondary" />
                    </button>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar criadores na região..." 
                        className="flex-1 bg-transparent border-none outline-none px-3 text-sm font-bold text-brand-text placeholder-brand-text-secondary"
                    />
                    <div className="w-px h-6 bg-brand-border mx-2"></div>
                    <button onClick={handleRefresh} className={`p-2 hover:bg-brand-light-gray rounded-full transition-colors ${isRefreshing ? 'animate-spin' : ''}`}>
                        <RefreshIcon className="w-5 h-5 text-brand-primary" />
                    </button>
                    <button className="p-2 bg-brand-primary rounded-lg ml-1 shadow-lg shadow-brand-primary/20">
                        <SearchIcon className="w-5 h-5 text-brand-dark" />
                    </button>
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['Todos', 'Estrelas', 'Proximidade', 'ROI'].map(f => (
                        <button key={f} className="whitespace-nowrap bg-brand-gray border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-text-secondary hover:border-brand-primary hover:text-brand-text transition-all shadow-md">
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`relative w-full h-full transition-all duration-1000 ${isRefreshing ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#F4B400 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 scale-[3]"></div>
                        <div className="w-5 h-5 bg-blue-500 border-2 border-white rounded-full shadow-2xl z-10"></div>
                    </div>
                </div>

                {mapPins.map((pin) => (
                    <div 
                        key={pin.id}
                        className="absolute transition-all duration-700 hover:z-30"
                        style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
                    >
                        <button 
                            onClick={() => setSelectedCreator(pin)}
                            className={`group relative -translate-x-1/2 -translate-y-full transition-all duration-300 ${selectedCreator?.id === pin.id ? 'scale-125' : 'hover:scale-110'}`}
                        >
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-[100%] blur-[2px]"></div>
                            <div className={`relative w-12 h-12 flex items-center justify-center transition-all ${selectedCreator?.id === pin.id ? 'text-brand-primary' : 'text-brand-text-secondary group-hover:text-brand-primary'}`}>
                                <MapPinIcon className="w-12 h-12 drop-shadow-xl" />
                                <div className="absolute top-2 w-7 h-7 rounded-full overflow-hidden bg-brand-dark border-2 border-current shadow-inner flex items-center justify-center">
                                    {pin.logoUrl ? (
                                        <img src={pin.logoUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[10px] font-black">{pin.name.charAt(0)}</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 right-6 z-20 flex flex-col gap-3">
                <div className="flex flex-col bg-brand-gray border border-brand-border rounded-lg shadow-2xl overflow-hidden">
                    <button onClick={() => setZoom(z => Math.min(z+1, 20))} className="p-3 hover:bg-brand-light-gray border-b border-brand-border text-brand-text font-black text-xl">+</button>
                    <button onClick={() => setZoom(z => Math.max(z-1, 1))} className="p-3 hover:bg-brand-light-gray text-brand-text font-black text-xl">-</button>
                </div>
                <button 
                    onClick={() => setMapMode(mapMode === 'standard' ? 'satellite' : 'standard')}
                    className="w-12 h-12 bg-brand-gray border border-brand-border rounded-lg shadow-2xl flex items-center justify-center overflow-hidden group"
                >
                    <div className={`w-full h-full transition-all flex items-center justify-center font-black text-[8px] uppercase tracking-tighter text-center leading-none ${mapMode === 'satellite' ? 'bg-blue-900 text-white' : 'text-brand-text-secondary'}`}>
                        {mapMode === 'satellite' ? 'Satel' : 'Map'}
                    </div>
                </button>
            </div>

            {selectedCreator && (
                <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-fade-in w-full max-w-lg">
                    <div className="bg-brand-gray border-2 border-brand-primary/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="p-6 flex items-start gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-brand-dark border border-brand-border overflow-hidden flex-shrink-0 shadow-xl">
                                {selectedCreator.logoUrl ? (
                                    <img src={selectedCreator.logoUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-brand-primary">
                                        {selectedCreator.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-black text-brand-text truncate uppercase tracking-tighter">{selectedCreator.name}</h3>
                                    <ShieldIcon className="w-4 h-4 text-brand-emerald" />
                                </div>
                                <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-3">{selectedCreator.niche || 'Performance'}</p>
                                
                                <div className="flex items-center gap-4 text-xs font-bold text-brand-text-secondary">
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="w-3 h-3 text-brand-primary" />
                                        <span>{selectedCreator.rating?.toFixed(1) || '5.0'}</span>
                                    </div>
                                    <div className="w-1 h-1 bg-brand-border rounded-full"></div>
                                    <div className="flex items-center gap-1">
                                        <MapPinIcon className="w-3 h-3 text-red-500" />
                                        <span>{selectedCreator.distance} de você</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCreator(null)} className="p-2 text-brand-text-secondary hover:text-brand-text">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => openInGoogleMaps(selectedCreator)}
                                className="flex items-center justify-center gap-2 bg-brand-light-gray hover:bg-brand-border py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-text transition-all"
                            >
                                <MapPinIcon className="w-4 h-4 text-brand-primary" /> Ver no Maps
                            </button>
                            <button 
                                onClick={() => onSelectCreator(selectedCreator)}
                                className="flex items-center justify-center gap-2 bg-brand-primary text-brand-dark py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-brand-primary/20"
                            >
                                <CrownIcon className="w-4 h-4" /> Proposta VIP
                            </button>
                        </div>

                        <div className="bg-brand-primary/10 px-6 py-2 border-t border-brand-primary/20 flex justify-between items-center">
                            <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em]">Disponibilidade: Imediata</span>
                            <span className="text-[8px] font-mono text-brand-primary opacity-60">TD-PROXIMITY: ACTIVE</span>
                        </div>
                    </div>
                </div>
            )}

            {isRefreshing && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-2 border-brand-primary rounded-full animate-ping opacity-30"></div>
                    <div className="absolute w-48 h-48 border-2 border-brand-primary rounded-full animate-ping opacity-20 delay-300"></div>
                    <div className="bg-brand-dark/80 backdrop-blur-md px-6 py-3 rounded-full border border-brand-primary/30 shadow-2xl">
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em] animate-pulse">Sincronizando Terminal...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VipPresenceMap;