
import React, { useState } from 'react';
import { User } from '../types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedData: Partial<User>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    niche: user.niche || '',
    logoUrl: user.logoUrl || '',
    phone: user.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-brand-gray border border-brand-border rounded-3xl p-10 w-full max-w-xl relative shadow-[0_0_100px_rgba(244,180,0,0.1)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-8 text-brand-text-secondary text-3xl hover:text-brand-text">&times;</button>
        
        <div className="mb-10">
            <h2 className="text-3xl font-black text-brand-text font-display uppercase tracking-tighter">Editar <span className="text-brand-primary">Perfil</span></h2>
            <p className="text-brand-text-secondary font-black uppercase text-[9px] tracking-[0.4em] mt-1">Atualize sua identidade na rede</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
          {/* Avatar Preview & URL */}
          <div className="flex flex-col items-center gap-6 pb-8 border-b border-brand-border">
              <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-2 border-brand-primary p-1 shadow-2xl shadow-brand-primary/20 bg-brand-dark flex items-center justify-center overflow-hidden">
                    {formData.logoUrl ? (
                        <img src={formData.logoUrl} className="w-full h-full rounded-full object-cover" alt="Preview" />
                    ) : (
                        <span className="text-3xl font-black text-brand-text-secondary">{formData.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] text-white font-black tracking-widest">SYNC</span>
                  </div>
              </div>
              <div className="w-full space-y-2">
                <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">URL da Imagem de Perfil / Logo</label>
                <input type="text" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all" placeholder="Ex: https://instagram.com/p/foto.jpg" />
              </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">Nome de Exibição</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all" required />
            </div>
            <div className="space-y-2">
                <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">Nome de Usuário (@handle)</label>
                <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value.replace(/\s+/g, '').toLowerCase()})} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">Nicho de Performance</label>
                <input type="text" value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all" />
            </div>
            <div className="space-y-2">
                <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">WhatsApp / Telefone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em]">Bio / Proposta de Valor</label>
            <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full bg-brand-light-gray border border-brand-border rounded-xl p-4 text-xs font-bold text-brand-text focus:border-brand-primary outline-none transition-all resize-none" placeholder="Conte brevemente seu diferencial estratégico..." />
          </div>

          <div className="flex gap-4 pt-4 sticky bottom-0 bg-brand-gray pb-2">
            <button type="button" onClick={onClose} className="flex-1 py-5 font-black uppercase text-[10px] tracking-widest text-brand-text-secondary hover:text-brand-text transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 bg-brand-primary text-brand-dark py-5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
