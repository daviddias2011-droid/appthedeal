import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock,
  Plus,
  Search,
  TrendingUp,
  CheckCircle,
  Flag,
  ArrowRight,
  Shield,
  Lock
} from 'lucide-react';

interface BlacklistReport {
  id: string;
  brandName: string;
  reporterType: 'creator' | 'brand';
  reporterName: string;
  issueType: 'non_payment' | 'late_payment' | 'contract_breach' | 'harassment' | 'fraud' | 'other';
  description: string;
  contractValue?: number;
  dateOccurred: string;
  status: 'pending' | 'verified' | 'disputed' | 'resolved';
  upvotes: number;
  evidence: boolean;
  createdAt: string;
}

const MOCK_REPORTS: BlacklistReport[] = [
  {
    id: '1',
    brandName: 'Empresa X Tecnologia',
    reporterType: 'creator',
    reporterName: 'Criador Anônimo #4521',
    issueType: 'non_payment',
    description: 'Contrato assinado em março/2024 para campanha de lançamento de produto. Entrega feita conforme briefing, mas pagamento nunca foi realizado. Múltiplas tentativas de contato ignoradas após 90 dias.',
    contractValue: 15000,
    dateOccurred: '2024-03-15',
    status: 'verified',
    upvotes: 47,
    evidence: true,
    createdAt: '2024-12-20'
  },
  {
    id: '2',
    brandName: 'Agência Y Marketing',
    reporterType: 'creator',
    reporterName: 'Criador Anônimo #3892',
    issueType: 'late_payment',
    description: 'Pagamento acordado para 30 dias após entrega. Realizado apenas após 120 dias e múltiplas cobranças. Sem comunicação proativa da marca sobre o atraso.',
    contractValue: 8500,
    dateOccurred: '2024-08-10',
    status: 'verified',
    upvotes: 23,
    evidence: true,
    createdAt: '2024-11-15'
  },
  {
    id: '3',
    brandName: 'Marca Z Cosmética',
    reporterType: 'creator',
    reporterName: 'Criador Anônimo #7821',
    issueType: 'contract_breach',
    description: 'Após aprovação do conteúdo, marca solicitou alterações não previstas em contrato sem aditivo. Ameaçou não pagar se alterações não fossem feitas gratuitamente.',
    contractValue: 12000,
    dateOccurred: '2024-09-22',
    status: 'pending',
    upvotes: 15,
    evidence: true,
    createdAt: '2024-12-28'
  },
  {
    id: '4',
    brandName: 'Startup W App',
    reporterType: 'brand',
    reporterName: 'Marca Verificada #2341',
    issueType: 'contract_breach',
    description: 'Criador não entregou conteúdo acordado após receber 50% de sinal. Bloqueou contatos e não devolveu valores. Tentativas de resolução amigável falharam.',
    contractValue: 6000,
    dateOccurred: '2024-10-05',
    status: 'verified',
    upvotes: 31,
    evidence: true,
    createdAt: '2024-11-30'
  }
];

const ISSUE_TYPES = {
  non_payment: { label: 'Não Pagamento', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  late_payment: { label: 'Atraso de Pagamento', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  contract_breach: { label: 'Quebra de Contrato', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  harassment: { label: 'Assédio/Abuso', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  fraud: { label: 'Fraude', color: 'text-red-600', bg: 'bg-red-600/10', border: 'border-red-600/30' },
  other: { label: 'Outros', color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/30' }
};

const STATUS_CONFIG = {
  pending: { label: 'Em Análise', icon: Clock, color: 'text-yellow-500' },
  verified: { label: 'Verificado', icon: CheckCircle, color: 'text-green-500' },
  disputed: { label: 'Contestado', icon: AlertTriangle, color: 'text-orange-500' },
  resolved: { label: 'Resolvido', icon: CheckCircle, color: 'text-blue-500' }
};

export default function BlacklistPage() {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [showNewReport, setShowNewReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<BlacklistReport | null>(null);

  const [newReport, setNewReport] = useState({
    brandName: '',
    issueType: 'non_payment' as const,
    description: '',
    contractValue: '',
    dateOccurred: '',
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.issueType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report: BlacklistReport = {
      id: Date.now().toString(),
      brandName: newReport.brandName,
      reporterType: 'creator',
      reporterName: `Criador Anônimo #${Math.floor(Math.random() * 9999)}`,
      issueType: newReport.issueType,
      description: newReport.description,
      contractValue: newReport.contractValue ? parseFloat(newReport.contractValue) : undefined,
      dateOccurred: newReport.dateOccurred,
      status: 'pending',
      upvotes: 0,
      evidence: false,
      createdAt: new Date().toISOString()
    };

    setReports([report, ...reports]);
    setShowNewReport(false);
    setNewReport({ brandName: '', issueType: 'non_payment', description: '', contractValue: '', dateOccurred: '' });
    alert('Denúncia enviada com sucesso! Nossa equipe irá analisar em até 48h.');
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  if (selectedReport) {
    return (
      <div className="min-h-screen bg-black text-white p-6 pb-32 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-8">
          <button 
            onClick={() => setSelectedReport(null)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            ← Voltar para lista
          </button>

          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-black uppercase mb-2">{selectedReport.brandName}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${ISSUE_TYPES[selectedReport.issueType].bg} ${ISSUE_TYPES[selectedReport.issueType].color}`}>
                    {ISSUE_TYPES[selectedReport.issueType].label}
                  </span>
                  {selectedReport.status === 'verified' && (
                    <div className="flex items-center gap-1 text-green-500">
                      <Shield size={14} />
                      <span className="text-xs font-black uppercase">Verificado The Deal</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-thedeal-gray600 font-black uppercase tracking-widest">Denunciante</p>
                <p className="text-sm font-bold">{selectedReport.reporterName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                <DollarSign className="text-thedeal-gold mb-2" size={20} />
                <p className="text-xs text-thedeal-gray600 font-black uppercase tracking-widest">Valor</p>
                <p className="text-lg font-black">{selectedReport.contractValue ? formatCurrency(selectedReport.contractValue) : 'N/A'}</p>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                <Calendar className="text-thedeal-gold mb-2" size={20} />
                <p className="text-xs text-thedeal-gray600 font-black uppercase tracking-widest">Data</p>
                <p className="text-sm font-bold">{new Date(selectedReport.dateOccurred).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                <TrendingUp className="text-thedeal-gold mb-2" size={20} />
                <p className="text-xs text-thedeal-gray600 font-black uppercase tracking-widest">Apoios</p>
                <p className="text-lg font-black">{selectedReport.upvotes}</p>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                <FileText className="text-thedeal-gold mb-2" size={20} />
                <p className="text-xs text-thedeal-gray600 font-black uppercase tracking-widest">Provas</p>
                <p className="text-sm font-bold">{selectedReport.evidence ? 'Sim' : 'Não'}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="text-xs font-black uppercase text-thedeal-gold tracking-[0.3em] mb-4">Relato Completo</h3>
              <p className="text-thedeal-gray400 leading-relaxed">{selectedReport.description}</p>
            </div>

            <div className="pt-6 border-t border-white/5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
              <div className="flex gap-4">
                <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-sm font-black uppercase text-yellow-500 mb-2">Protocolo de Segurança</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Esta denúncia foi submetida por um membro verificado da rede. O The Deal não arbitra disputas contratuais, mas fornece um registro público para proteger a comunidade. Marcas têm direito de resposta através do suporte oficial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showNewReport) {
    return (
      <div className="min-h-screen bg-black text-white p-6 pb-32 animate-fade-in">
        <div className="max-w-2xl mx-auto space-y-8">
          <button 
            onClick={() => setShowNewReport(false)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          >
            ← Cancelar
          </button>

          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Protocolo de Denúncia</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Nova Denúncia</h1>
            <p className="text-thedeal-gray400 text-sm">Todas as denúncias são anônimas e verificadas pela equipe The Deal</p>
          </header>

          <form onSubmit={handleSubmitReport} className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Nome da Marca/Empresa *</label>
              <input
                type="text"
                value={newReport.brandName}
                onChange={(e) => setNewReport({...newReport, brandName: e.target.value})}
                required
                placeholder="Ex: Empresa XYZ Ltda"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-thedeal-gold outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Tipo de Problema *</label>
              <select
                value={newReport.issueType}
                onChange={(e) => setNewReport({...newReport, issueType: e.target.value as any})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-thedeal-gold outline-none"
              >
                {Object.entries(ISSUE_TYPES).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Valor do Contrato</label>
                <input
                  type="number"
                  value={newReport.contractValue}
                  onChange={(e) => setNewReport({...newReport, contractValue: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-thedeal-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Data do Ocorrido *</label>
                <input
                  type="date"
                  value={newReport.dateOccurred}
                  onChange={(e) => setNewReport({...newReport, dateOccurred: e.target.value})}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-thedeal-gold outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Descrição Detalhada *</label>
              <textarea
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                required
                rows={6}
                placeholder="Descreva o que aconteceu: datas, valores, tentativas de contato, evidências..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-thedeal-gold outline-none resize-none"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex gap-3">
                <Lock className="text-thedeal-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-black uppercase text-white mb-2">Anonimato Garantido</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Sua identidade será protegida. A denúncia aparecerá como "Criador/Marca Anônimo" com ID único. Apenas a equipe The Deal terá acesso aos seus dados para verificação.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
            >
              Enviar Denúncia <Flag size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Transparência Total</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Lista de <span className="text-red-500">Alerta</span>
          </h1>
          <p className="text-thedeal-gray400 text-base max-w-2xl mx-auto">
            Registro público de denúncias verificadas. Protegendo criadores e marcas sérias através da transparência.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-thedeal-card border border-red-500/20 rounded-2xl p-6">
            <AlertTriangle className="text-red-500 mb-3" size={24} />
            <p className="text-3xl font-black">{reports.filter(r => r.status === 'verified').length}</p>
            <p className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Denúncias Verificadas</p>
          </div>
          <div className="bg-thedeal-card border border-yellow-500/20 rounded-2xl p-6">
            <Clock className="text-yellow-500 mb-3" size={24} />
            <p className="text-3xl font-black">{reports.filter(r => r.status === 'pending').length}</p>
            <p className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Em Análise</p>
          </div>
          <div className="bg-thedeal-card border border-thedeal-gold/20 rounded-2xl p-6">
            <DollarSign className="text-thedeal-gold mb-3" size={24} />
            <p className="text-3xl font-black">
              {formatCurrency(reports.reduce((acc, r) => acc + (r.contractValue || 0), 0))}
            </p>
            <p className="text-xs font-black uppercase text-thedeal-gray600 tracking-widest">Valor Total Reportado</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-thedeal-gray600" size={20} />
            <input
              type="text"
              placeholder="Buscar marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-thedeal-card border border-thedeal-gray700 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:border-thedeal-gold outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-thedeal-card border border-thedeal-gray700 rounded-xl px-4 py-3 text-white focus:border-thedeal-gold outline-none"
          >
            <option value="all">Todos os Tipos</option>
            {Object.entries(ISSUE_TYPES).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <button
            onClick={() => setShowNewReport(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Nova Denúncia
          </button>
        </div>

        <div className="space-y-4">
          {filteredReports.map((report) => {
            const StatusIcon = STATUS_CONFIG[report.status].icon;
            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="bg-thedeal-card border border-thedeal-gray700 rounded-2xl p-6 hover:border-red-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-black uppercase">{report.brandName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${ISSUE_TYPES[report.issueType].bg} ${ISSUE_TYPES[report.issueType].color}`}>
                        {ISSUE_TYPES[report.issueType].label}
                      </span>
                      {report.status === 'verified' && (
                        <div className="flex items-center gap-1 text-green-500">
                          <Shield size={12} />
                          <span className="text-xs font-black">Verificado</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-thedeal-gray400 line-clamp-2 mb-3">{report.description}</p>
                    <div className="flex items-center gap-6 text-xs text-thedeal-gray600 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(report.dateOccurred).toLocaleDateString('pt-BR')}
                      </span>
                      {report.contractValue && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {formatCurrency(report.contractValue)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        {report.upvotes} apoios
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-thedeal-gold font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Ver Detalhes <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-20">
            <ShieldAlert className="w-16 h-16 text-thedeal-gray700 mx-auto mb-4" />
            <p className="text-thedeal-gray600 font-bold">Nenhuma denúncia encontrada com esses filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}

