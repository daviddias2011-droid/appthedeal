
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
  Lock,
  ArrowLeft,
  Briefcase,
  // FIX: Added missing ShieldCheck import from lucide-react.
  ShieldCheck
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

interface BlacklistPageProps {
  onBack?: () => void;
}

export default function BlacklistPage({ onBack }: BlacklistPageProps) {
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

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleGoBack = () => {
    if (selectedReport) setSelectedReport(null);
    else if (showNewReport) setShowNewReport(false);
    else if (onBack) onBack();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 animate-fade-in">
      {/* Standard Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={handleGoBack}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Briefcase size={18} className="text-black" />
                    </div>
                    <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                </div>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
            </div>
            
            <div className="flex items-center gap-3">
                <button onClick={handleGoBack} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">
                  <ArrowLeft size={14} className="text-thedeal-gold" /> Voltar
                </button>
            </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {!selectedReport && !showNewReport && (
          <div className="space-y-12">
            <header className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-5 py-2 rounded-full mb-4">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Protocolo de Segurança Alpha</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                LISTA DE <span className="text-red-500">ALERTA.</span>
              </h1>
              <p className="text-thedeal-gray400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Transparência absoluta. Registro de irregularidades contratuais e denúncias verificadas pela elite da rede.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-thedeal-card border border-red-500/20 rounded-[2rem] p-8 shadow-2xl">
                <AlertTriangle className="text-red-500 mb-6" size={32} />
                <p className="text-4xl font-black text-white tracking-tighter">{reports.filter(r => r.status === 'verified').length}</p>
                <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest mt-2">Casos Verificados</p>
              </div>
              <div className="bg-thedeal-card border border-thedeal-gold/20 rounded-[2rem] p-8 shadow-2xl">
                <DollarSign className="text-thedeal-gold mb-6" size={32} />
                <p className="text-4xl font-black text-white tracking-tighter">R$ 35K</p>
                <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest mt-2">Valores em Disputa</p>
              </div>
              <div className="bg-thedeal-card border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                <Shield className="text-white/20 mb-6" size={32} />
                <p className="text-4xl font-black text-white tracking-tighter">100%</p>
                <p className="text-[10px] font-black uppercase text-thedeal-gray600 tracking-widest mt-2">Verificação Humana</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-thedeal-card p-4 rounded-3xl border border-white/5">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-thedeal-gray600" size={22} />
                <input
                  type="text"
                  placeholder="Filtrar por nome da marca ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-4 py-4 text-white font-bold focus:border-red-500/50 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowNewReport(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-red-500/10 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                Nova Denúncia <Plus size={18} />
              </button>
            </div>
      
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="bg-thedeal-card border border-thedeal-gray700 rounded-[2.5rem] p-8 hover:border-red-500/30 transition-all cursor-pointer group shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{report.brandName}</h3>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${ISSUE_TYPES[report.issueType].bg} ${ISSUE_TYPES[report.issueType].color} border ${ISSUE_TYPES[report.issueType].border}`}>
                          {ISSUE_TYPES[report.issueType].label}
                        </span>
                        {report.status === 'verified' && (
                          <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                            <Shield size={12} />
                            <span className="text-[9px] font-black uppercase">Verificado</span>
                          </div>
                        )}
                      </div>
                      <p className="text-thedeal-gray400 line-clamp-2 mb-6 font-medium italic opacity-80 leading-relaxed">
                        "{report.description}"
                      </p>
                      <div className="flex items-center gap-8 text-[10px] text-thedeal-gray600 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-thedeal-gold" />
                          {new Date(report.dateOccurred).toLocaleDateString('pt-BR')}
                        </span>
                        {report.contractValue && (
                          <span className="flex items-center gap-2">
                            <DollarSign size={14} className="text-thedeal-gold" />
                            {formatCurrency(report.contractValue)}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-thedeal-gold" />
                          {report.upvotes} Apoios
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-thedeal-gold font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Ver Evidências <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedReport && (
          <div className="space-y-8 animate-float-in max-w-4xl mx-auto">
              <div className="bg-thedeal-card border border-thedeal-gray700 rounded-[3rem] p-10 md:p-16 space-y-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">{selectedReport.brandName}</h2>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${ISSUE_TYPES[selectedReport.issueType].bg} ${ISSUE_TYPES[selectedReport.issueType].color}`}>
                        {ISSUE_TYPES[selectedReport.issueType].label}
                      </span>
                      <span className="text-[10px] text-thedeal-gray600 font-black uppercase tracking-widest">Protocolo: #{selectedReport.id}</span>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center min-w-[160px]">
                    <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Reputação Alpha</p>
                    <p className="text-red-500 font-black text-2xl uppercase tracking-tighter">Negativa</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 py-10 border-y border-white/5">
                   <div>
                     <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">Valor Estimado</p>
                     <p className="text-2xl font-black text-white tracking-tight">{selectedReport.contractValue ? formatCurrency(selectedReport.contractValue) : 'N/A'}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">Data do Ocorrido</p>
                     <p className="text-2xl font-black text-white tracking-tight">{new Date(selectedReport.dateOccurred).toLocaleDateString('pt-BR')}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-2">Apoios na Rede</p>
                     <p className="text-2xl font-black text-white tracking-tight">{selectedReport.upvotes} Membros</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase text-thedeal-gold tracking-[0.4em]">Relato Detalhado</h4>
                  <p className="text-thedeal-gray400 leading-relaxed text-lg font-medium opacity-90 italic">
                    "{selectedReport.description}"
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    {/* FIX: Included ShieldCheck which is now correctly imported. */}
                    <ShieldCheck className="text-thedeal-gold mt-1" size={24} />
                    <div>
                      <h5 className="text-sm font-black uppercase text-white mb-2 tracking-tight">Verificação de Conformidade</h5>
                      <p className="text-xs text-thedeal-gray400 leading-relaxed font-medium">
                        Este registro passou pela auditoria de evidências do The Deal. Capturas de tela, e-mails e contratos foram submetidos para validação deste status. O anonimato do denunciante é preservado conforme o Protocolo de Segurança Alpha.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="flex-1 bg-red-500/10 border border-red-500/30 text-red-500 font-black py-4 rounded-xl uppercase text-[10px] tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all">Apoiar Denúncia</button>
                  <button className="flex-1 bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all">Contestar (Marca)</button>
                </div>
              </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-30 flex flex-col items-center gap-2">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">
            THE DEAL BLACKLIST PROTOCOL • © 2025 • GOVERNANÇA ALPHA • V3.0
        </p>
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600 text-center">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
        <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
            A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
        </p>
      </footer>
    </div>
  );
}
