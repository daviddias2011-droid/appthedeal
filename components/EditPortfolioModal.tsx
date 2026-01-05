
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types.
import { PortfolioItem } from '../types';

interface EditPortfolioModalProps {
  onClose: () => void;
  onSave: (updatedItem: PortfolioItem) => void;
  itemToEdit: PortfolioItem;
}

const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({ onClose, onSave, itemToEdit }) => {
  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('');
  const [metric, setMetric] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [type, setType] = useState<'video' | 'image'>('video');

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setBrandName(itemToEdit.brandName);
      setMetric(itemToEdit.metric);
      setImageUrl(itemToEdit.imageUrl || '');
      setContentUrl(itemToEdit.contentUrl);
      setType(itemToEdit.type);
    }
  }, [itemToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !brandName || !metric || !contentUrl) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    onSave({
      ...itemToEdit,
      title,
      brandName,
      metric,
      imageUrl: imageUrl || undefined,
      contentUrl,
      type,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-lg p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary text-2xl hover:text-brand-text">&times;</button>
        <h2 className="text-2xl font-bold text-brand-text font-display mb-4">Editar Item do Portfólio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Tipo de Conteúdo</label>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" value="video" checked={type === 'video'} onChange={() => setType('video')} className="form-radio h-4 w-4 text-brand-primary bg-brand-light-gray border-brand-border focus:ring-brand-primary"/>
                    <span className="text-brand-text">Vídeo</span>
                </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" value="image" checked={type === 'image'} onChange={() => setType('image')} className="form-radio h-4 w-4 text-brand-primary bg-brand-light-gray border-brand-border focus:ring-brand-primary"/>
                    <span className="text-brand-text">Imagem</span>
                </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Título do Trabalho</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Reel para Fintech+" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
           <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">URL do Conteúdo</label>
            <input type="text" value={contentUrl} onChange={e => setContentUrl(e.target.value)} placeholder="https://www.tiktok.com/seu-video" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
           <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">URL da Thumbnail (Opcional)</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://.../imagem.jpg" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Nome da Marca</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Ex: Fintech+" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Métrica Principal</label>
            <input type="text" value={metric} onChange={e => setMetric(e.target.value)} placeholder="Ex: +500k Views" className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text" required />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-brand-light-gray text-brand-text-secondary font-bold py-2 px-6 rounded-md hover:bg-brand-border transition-colors">Cancelar</button>
            <button type="submit" className="bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-2 px-6 rounded-md hover:brightness-110 transition-all duration-300">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolioModal;
