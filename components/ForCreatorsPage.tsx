
import React from 'react';
import { 
  ArrowRight, ChevronDown, Sparkles, TrendingUp, TrendingDown, Award, Repeat, 
  X, Check, Info, Calculator, Gift, Clock, Percent, PieChart, 
  Infinity, Shield, Briefcase, CheckCircle, DollarSign, ArrowLeft
} from 'lucide-react';

interface ForCreatorsPageProps {
  onBack: () => void;
  onGoToSignup: () => void;
  onGoToDiscover: () => void;
}

export default function ForCreatorsPage({ onBack, onGoToSignup, onGoToDiscover }: ForCreatorsPageProps) {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="min-h-screen bg-thedeal-bg text-thedeal-gray100 font-sans selection:bg-thedeal-goldBright selection:text-black overflow-x-hidden animate-fade-in text-left pb-32">
      
      {/* Standardized Header */}
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
            <button onClick={onGoToSignup} className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-bold px-6 py-2.5 rounded-xl text-[9px] transition-all shadow-lg shadow-thedeal-gold/20 uppercase tracking-widest">Começar Jornada</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-thedeal-bg via-thedeal-card to-thedeal-bg opacity-50"></div>
          <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0V0zm1 1h38v38H1V1z\' fill=\'%23C9A961\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-goldDim rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-thedeal-gold" />
            <span className="text-thedeal-gold text-xs font-bold uppercase tracking-wider">Para Criadores</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6 uppercase tracking-tighter">
            Pare de Trocar<br/>
            Conteúdo por Produto.<br/>
            <span className="bg-gradient-to-r from-thedeal-goldBright to-thedeal-gold bg-clip-text text-transparent italic">
              Conquiste Estabilidade.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-thedeal-gray100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium text-center">
            Esqueça permuta e "recebidos". Aqui você negocia Contratos de 12 meses,
            estabilidade financeira com marcas e licenciamento do seu formato original.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={onGoToSignup} className="group bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-10 py-4 rounded-xl text-lg transition-all shadow-2xl shadow-thedeal-gold/30 flex items-center justify-center gap-2 uppercase tracking-widest">
              <span>Começar Jornada</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onGoToDiscover} className="bg-white/5 hover:bg-white/10 border-2 border-thedeal-gray700 hover:border-thedeal-goldDim text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all backdrop-blur-sm uppercase tracking-widest">
              Ver Criadores
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-thedeal-gray700/30">
            <div className="text-center">
              <p className="text-3xl font-black text-thedeal-goldBright tracking-tighter uppercase leading-none">R$ 47K</p>
              <p className="text-[10px] text-thedeal-gray400 font-black uppercase tracking-widest mt-1">Média por criador/ano</p>
            </div>
            <div className="h-12 w-px bg-thedeal-gray700 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-white tracking-tighter uppercase leading-none">89%</p>
              <p className="text-[10px] text-thedeal-gray400 font-black uppercase tracking-widest mt-1">Fecham contratos fixos</p>
            </div>
            <div className="h-12 w-px bg-thedeal-gray700 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-thedeal-success tracking-tighter uppercase leading-none">3.2%</p>
              <p className="text-[10px] text-thedeal-gray400 font-black uppercase tracking-widest mt-1">Conversão média</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-center">
          <ChevronDown className="w-6 h-6 text-thedeal-gray400 mx-auto" />
        </div>
      </section>

      {/* SEÇÃO: O PROBLEMA */}
      <section className="py-24 px-6 bg-thedeal-card border-y border-thedeal-gray700/50 text-left">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">A Permuta Não Paga Suas Contas</h2>
            <p className="text-xl text-thedeal-gray400 max-w-3xl mx-auto font-medium leading-relaxed">
              Você tem audiência, gera vendas, mas continua trocando posts por mimos. 
              Enquanto isso, a marca lucra com seu talento sem te dar segurança.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-thedeal-bg border border-thedeal-danger/30 rounded-3xl p-8 hover:border-thedeal-danger/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-danger/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6 text-thedeal-danger" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Mimos Não São Salário</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                Você recebeu 10 produtos esse mês. Ótimo. E o aluguel? 
                E o mercado? Produtos não trazem estabilidade financeira.
              </p>
              <div className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">Receita recorrente zero</div>
            </div>

            <div className="bg-thedeal-bg border border-thedeal-danger/30 rounded-3xl p-8 hover:border-thedeal-danger/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-danger/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-thedeal-danger" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Cachê Sem LTV</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                R$ 500 por post único. A marca fatura alto e você é descartado. 
                Você precisa de contratos de 12 meses.
              </p>
              <div className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">Você precisa de estabilidade</div>
            </div>

            <div className="bg-thedeal-bg border border-thedeal-danger/30 rounded-3xl p-8 hover:border-thedeal-danger/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-danger/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-thedeal-danger" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Sem Ativos Reais</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                Você trabalha há anos, mas não tem nada que gere lucro constante. 
                Sua criação deve ser seu ativo de IP (Propriedade Intelectual).
              </p>
              <div className="text-thedeal-danger text-[10px] font-black uppercase tracking-widest">Licencie seu talento</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: A SOLUÇÃO */}
      <section className="py-24 px-6 bg-gradient-to-b from-thedeal-card to-thedeal-bg text-left">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Como Você Ganha no The Deal</h2>
            <p className="text-xl text-thedeal-gray400 max-w-3xl mx-auto font-medium leading-relaxed">
              Quando você entra na rede, você para de ser "prestador eventual" 
              da marca e conquista parcerias de longo prazo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-thedeal-card border border-thedeal-success/30 rounded-3xl p-8 hover:border-thedeal-success/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-success/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6 text-thedeal-success" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Receita Garantida</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                Negocie contratos de 12 meses com repasse mensal fixo. 
                Gere LTV para a marca e estabilidade para sua carreira.
              </p>
              <div className="flex items-center gap-2 text-thedeal-success text-[10px] font-black uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                <span>Receita recorrente garantida</span>
              </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-success/30 rounded-3xl p-8 hover:border-thedeal-success/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-success/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6 text-thedeal-success" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">LTV (Contrato Fixo)</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                Em marcas promissoras, garanta sua permanência no team. 
                Foco total em parcerias de longo prazo com ROI comprovado.
              </p>
              <div className="flex items-center gap-2 text-thedeal-success text-[10px] font-black uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>Segurança contratual</span>
              </div>
            </div>

            <div className="bg-thedeal-card border border-thedeal-success/30 rounded-3xl p-8 hover:border-thedeal-success/50 transition-all group">
              <div className="w-12 h-12 bg-thedeal-success/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Repeat className="w-6 h-6 text-thedeal-success" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">Licencie seu Formato</h3>
              <p className="text-thedeal-gray400 text-sm leading-relaxed mb-4 font-medium">
                Todo conteúdo que você cria é seu ativo. Licencie seu formato 
                para uso estratégico da marca e receba royalties sobre o IP.
              </p>
              <div className="flex items-center gap-2 text-thedeal-success text-[10px] font-black uppercase tracking-widest">
                <Infinity className="w-4 h-4" />
                <span>Royalties sobre IP</span>
              </div>
            </div>
          </div>

          <div className="bg-thedeal-card border border-thedeal-gray700 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 bg-thedeal-bg border-r border-thedeal-gray700/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-thedeal-danger/10 rounded-xl flex items-center justify-center">
                    <X className="w-5 h-5 text-thedeal-danger" />
                  </div>
                  <h4 className="text-lg font-black text-thedeal-gray100 uppercase tracking-tight">Modelo Antigo</h4>
                </div>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-start gap-4 font-medium text-thedeal-gray400">
                    <X className="w-5 h-5 text-thedeal-danger flex-shrink-0 mt-0.5" />
                    <span>Post avulso sem garantia de volta</span>
                  </li>
                  <li className="flex items-start gap-4 font-medium text-thedeal-gray400">
                    <X className="w-5 h-5 text-thedeal-danger flex-shrink-0 mt-0.5" />
                    <span>Marca lucra com seu rosto e te esquece</span>
                  </li>
                  <li className="flex items-start gap-4 font-medium text-thedeal-gray400">
                    <X className="w-5 h-5 text-thedeal-danger flex-shrink-0 mt-0.5" />
                    <span>Mês seguinte: zero receita.</span>
                  </li>
                </ul>
                <div className="pt-8 border-t border-thedeal-gray700/50">
                  <p className="text-[10px] text-thedeal-gray600 font-black uppercase tracking-widest mb-1">Cachê Volátil</p>
                  <p className="text-4xl font-black text-white tracking-tighter">R$ 2.000</p>
                </div>
              </div>

              <div className="p-10 md:p-14 bg-gradient-to-br from-thedeal-card to-black">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-thedeal-success/10 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-thedeal-success" />
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">Modelo THE DEAL</h4>
                </div>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-start gap-4 font-medium text-white">
                    <Check className="w-5 h-5 text-thedeal-success flex-shrink-0 mt-0.5" />
                    <span>Contrato de 12 meses garantido</span>
                  </li>
                  <li className="flex items-start gap-4 font-medium text-white">
                    <Check className="w-5 h-5 text-thedeal-success flex-shrink-0 mt-0.5" />
                    <span>Licenciamento do seu formato (IP)</span>
                  </li>
                  <li className="flex items-start gap-4 font-medium text-white">
                    <Check className="w-5 h-5 text-thedeal-success flex-shrink-0 mt-0.5" />
                    <span>Estabilidade financeira e LTV</span>
                  </li>
                </ul>
                <div className="pt-8 border-t border-thedeal-goldDim/30">
                  <p className="text-[10px] text-thedeal-gold font-black uppercase tracking-widest mb-1">Receita Garantida (Anual)</p>
                  <p className="text-4xl font-black text-thedeal-goldBright tracking-tighter">R$ 47.000</p>
                  <p className="text-[9px] text-thedeal-success font-black uppercase tracking-[0.2em] mt-2">+ Licenciamento Ativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: REQUISITOS PARA ENTRAR */}
      <section className="py-24 px-6 bg-thedeal-card border-y border-thedeal-gray700/50 text-left">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tight">Prove seu Valor</h2>
            <p className="text-lg text-thedeal-gray400 max-w-3xl mx-auto font-medium">
              A rede é aberta para Aspirantes, mas contratos Pro exigem mérito.
            </p>
          </div>

          <div className="bg-gradient-to-br from-thedeal-bg to-thedeal-card border-2 border-thedeal-gray700 rounded-3xl p-10 md:p-12 mb-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-thedeal-gold/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-thedeal-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Fatores de Deal Score</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Nicho Profissional', desc: 'Foco técnico: Finanças, Saúde, Tech, B2B, etc.' },
                { title: 'Consistência de ROI', desc: 'Histórico de resultados reais gerados para parceiros.' },
                { title: 'Engajamento de Valor', desc: 'Sua audiência deve confiar na sua recomendação.' },
                { title: 'Formatos Originais', desc: 'Criação de IPs únicos para licenciamento estratégico.' },
              ].map((req, i) => (
                <div key={req.title} className="bg-thedeal-bg/50 border border-thedeal-gray700 rounded-xl p-6 text-left">
                  <div className="flex items-start gap-3 mb-3">
                    <Check className="w-5 h-5 text-thedeal-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-tight">{req.title}</h4>
                      <p className="text-thedeal-gray400 text-sm leading-relaxed">{req.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-thedeal-card to-thedeal-bg pb-20">
        <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 uppercase tracking-tighter leading-none">
          Comece sua Jornada<br/>
          de Alta Performance.
        </h2>
        <button onClick={onGoToSignup} className="bg-thedeal-goldBright hover:bg-thedeal-gold text-black font-black px-16 py-6 rounded-2xl text-xl transition-all shadow-2xl shadow-thedeal-gold/30 inline-flex items-center gap-4 uppercase tracking-[0.2em] active:scale-95">
          <span>Começar Agora</span>
          <ArrowRight size={24} />
        </button>
        <div className="space-y-4 opacity-30 mt-20 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-thedeal-gray600">THE DEAL TODOS OS DIREITOS RESERVADOS CNPJ: 59.440.114/0001-03 | LEME - SÃO PAULO</p>
            <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
            </p>
        </div>
      </section>
    </div>
  );
}
