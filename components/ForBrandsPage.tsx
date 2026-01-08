
import React from 'react';
import { 
  TrendingDown, TrendingUp, Users, AlertCircle, Target, DollarSign, 
  Shield, CheckCircle, Lock, X, Check, Info, ArrowRight, Briefcase, Building2, Calculator, ArrowLeft
} from 'lucide-react';

interface ForBrandsPageProps {
  onBack: () => void;
  onGoToSignup: () => void;
}

const ForBrandsPage: React.FC<ForBrandsPageProps> = ({ onBack, onGoToSignup }) => {
  const WHATSAPP_LINK = "https://wa.me/5519994497796?text=Olá! Sou uma marca e gostaria de solicitar uma demonstração da plataforma THE DEAL.";
  const handleRequestDemo = () => window.open(WHATSAPP_LINK, '_blank');

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 animate-fade-in font-sans selection:bg-thedeal-goldBright selection:text-black text-left pb-32">
      {/* Standardized Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Briefcase size={18} className="text-black" />
              </div>
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
            <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-thedeal-gray400 hover:text-white transition-colors">Voltar</button>
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-bold px-6 py-2.5 rounded-xl text-[9px] transition-all shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest">Entrar Agora</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-goldDim/30 rounded-full px-5 py-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-thedeal-gold animate-pulse"></div>
          <span className="text-thedeal-gold text-[10px] font-black tracking-[0.2em] uppercase">PARA MARCAS DE ALTA PERFORMANCE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight leading-none">
          Pare de comprar posts. <br/>
          <span className="bg-gradient-to-r from-thedeal-goldBright to-thedeal-gold bg-clip-text text-transparent italic">Construa ativos de LTV.</span>
        </h1>
        <p className="text-xl text-thedeal-gray400 max-w-3xl mx-auto font-medium leading-relaxed">
          Infraestrutura completa para marcas que buscam ROI real através de contratos de longo prazo e licenciamento de IP com criadores validados.
        </p>
      </header>

      {/* Seção "O Problema" */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-left">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">O Fim da Era da Vaidade</h2>
          <p className="text-xl text-thedeal-gray400 max-w-3xl mx-auto font-medium leading-relaxed">
            As marcas estão cansadas de gastar orçamentos imensos em campanhas que geram curtidas, mas não geram retenção e lucro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 group hover:border-thedeal-gold transition-all">
            <div className="w-12 h-12 bg-thedeal-gold/10 rounded-xl flex items-center justify-center mb-6">
              <TrendingDown className="w-6 h-6 text-thedeal-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Cachê Sem Retorno</h3>
            <p className="text-thedeal-gray400 text-sm leading-relaxed">Campanhas isoladas morrem em 24h. No The Deal, focamos em LTV para que você retenha o cliente.</p>
          </div>

          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 group hover:border-thedeal-gold transition-all">
            <div className="w-12 h-12 bg-thedeal-gold/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-thedeal-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Parcerias Frágeis</h3>
            <p className="text-thedeal-gray400 text-sm leading-relaxed">Criadores que postam apenas por dinheiro não geram confiança. Você precisa de contratos de 12 meses.</p>
          </div>

          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-3xl p-8 group hover:border-thedeal-gold transition-all">
            <div className="w-12 h-12 bg-thedeal-gold/10 rounded-xl flex items-center justify-center mb-6">
              <AlertCircle className="w-6 h-6 text-thedeal-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Engajamento Vazio</h3>
            <p className="text-thedeal-gray400 text-sm leading-relaxed">Métricas infladas drenam o orçamento. Nossa IA valida a performance real de cada ativo da rede.</p>
          </div>
        </div>
      </section>

      {/* Seção Benefícios */}
      <section className="py-24 px-6 bg-thedeal-card border-y border-thedeal-gray700/50 text-left">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 uppercase tracking-tight">
                ROI como prioridade, <br/>
                <span className="text-thedeal-gold italic">não como bônus.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Check, title: "Curadoria de Elite", text: "Acesso apenas a criadores que entregam performance comercial e funil de vendas." },
                  { icon: Shield, title: "Segurança Contratual", text: "Pagamentos via custódia liberados apenas após a validação final." },
                  { icon: Target, title: "Licenciamento de IP", text: "Formatos originais protegidos e licenciados para uso estratégico em anúncios." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-thedeal-success/10 p-1 rounded">
                      <item.icon className="w-5 h-5 text-thedeal-success" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase text-sm tracking-tight">{item.title}</h4>
                      <p className="text-thedeal-gray400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-thedeal-bg border border-thedeal-gray700 p-8 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-thedeal-gold/10 rounded-xl flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-thedeal-gold" />
                </div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">Simulador de ROI & LTV</h4>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-thedeal-gray600 mb-2">
                    <span>Investimento Contratual</span>
                    <span className="text-white">R$ 10.000</span>
                  </div>
                  <div className="h-1.5 bg-thedeal-gray700 rounded-full overflow-hidden">
                    <div className="h-full bg-thedeal-gold w-1/3"></div>
                  </div>
                </div>
                <div className="pt-6 border-t border-thedeal-gray700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-[10px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">CAC Projetado</p>
                      <p className="text-xl font-black text-white">R$ 12,40</p>
                    </div>
                    <div className="bg-thedeal-gold/10 p-4 rounded-xl">
                      <p className="text-[10px] font-black text-thedeal-gold uppercase tracking-widest mb-1">LTV Estimado</p>
                      <p className="text-xl font-black text-thedeal-goldBright">R$ 42K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-thedeal-card to-thedeal-bg pb-20">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 uppercase tracking-tighter leading-none">
          Sua Marca merece <br/> contratos de elite.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onGoToSignup} className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-12 py-5 rounded-2xl text-lg transition-all shadow-2xl shadow-thedeal-gold/20 uppercase tracking-[0.2em]">
            Entrar Agora
          </button>
          <button onClick={handleRequestDemo} className="bg-white/5 hover:bg-white/10 border-2 border-thedeal-gray700 text-white font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-widest transition-all">
            Agendar Demo
          </button>
        </div>
        <div className="space-y-4 opacity-30 mt-20">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600 text-center">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] text-center max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </div>
      </section>
    </div>
  );
};

export default ForBrandsPage;
