
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import BrandCard from './BrandCard';
import { BriefcaseIcon } from './Icons';

interface BrandsPageProps {
  brands: User[];
  onViewProfile: (brand: User) => void;
}

const BrandsPage: React.FC<BrandsPageProps> = ({ brands, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = useMemo(() => {
    return brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.niche?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display flex items-center gap-3">
          <BriefcaseIcon className="w-8 h-8 text-brand-primary"/>
          Explore Marcas Parceiras
        </h1>
        <p className="text-brand-text-secondary mt-1">Conecte-se com as empresas que estão moldando o futuro.</p>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome ou nicho..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-brand-light-gray border border-brand-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text placeholder-brand-text-secondary"
      />

      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} onViewProfile={onViewProfile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-gray border border-brand-border rounded-lg">
          <p className="text-brand-text-secondary">Nenhuma marca encontrada com seus critérios de busca.</p>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
