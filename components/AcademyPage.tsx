
import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Briefcase, PlayCircle, Clock, ArrowRight, Lock, ShieldCheck, ChevronRight, Instagram, Twitter, Video } from 'lucide-react';
import { KwaiIcon } from './Icons';

interface Lesson {
  id: string;
  title: string;
  isBonus?: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
  duracao: string;
  aulasCount: number;
  modulos: Module[];
}

interface AcademyPageProps {
    onBack: () => void;
    userIsLoggedIn: boolean;
    onRestrictedAction: () => void;
    t: any;
}

const COURSES: Course[] = [
    {
      id: 1,
      titulo: 'TIKTOK — O ALGORITMO DE VENDAS',
      descricao: 'Domine o maior canal de aquisição do mundo através de engenharia de retenção.',
      icone: '🏛️',
      duracao: '4h 30min',
      aulasCount: 9,
      modulos: [
        {
          title: 'Módulo 1: O Código Fonte (Entendendo o Terreno)',
          lessons: [
            { id: '1-1', title: 'A Nova TV: Por que o TikTok é o maior canal de aquisição do mundo.' },
            { id: '1-2', title: 'Psicologia do Scroll: O que faz o cérebro parar (e o que faz pular).' },
            { id: '1-3', title: 'Hackeando o For You: As métricas invisíveis que ditam o alcance.' }
          ]
        },
        {
          title: 'Módulo 2: A Engenharia do Gancho (Retenção)',
          lessons: [
            { id: '1-4', title: 'A Regra dos 3 Segundos: Como prender a atenção ou morrer tentando.' },
            { id: '1-5', title: 'Copywriting de 60 Segundos: A estrutura de roteiro que converte.' },
            { id: '1-6', title: 'Trendjacking: Como usar tendências fúteis para vender produtos sérios.' }
          ]
        },
        {
          title: 'Módulo 3: Viralização & Conversão (Ação)',
          lessons: [
            { id: '1-7', title: 'Polarização Estratégica: Usando opiniões fortes para gerar engajamento.' },
            { id: '1-8', title: 'A Ponte de Ouro: Transferindo tráfego do TikTok para o seu Funil de Vendas.' },
            { id: '1-9', title: 'Análise de Dados: Lendo o Analytics para prever o próximo viral.' }
          ]
        }
      ]
    },
    {
      id: 2,
      titulo: 'INSTAGRAM — POSICIONAMENTO PREMIUM',
      descricao: 'Transforme seu perfil em uma vitrine de alto valor e atraia marcas de elite.',
      icone: '📸',
      duracao: '3h 15min',
      aulasCount: 9,
      modulos: [
        {
          title: 'Módulo 1: A Vitrine de Milhões (Branding)',
          lessons: [
            { id: '2-1', title: 'Semiótica do Luxo: O que suas fotos dizem sobre o seu preço.' },
            { id: '2-2', title: 'Bio de Alta Performance: Transformando visitantes em leads em 5 segundos.' },
            { id: '2-3', title: 'Destaques Estratégicos: Construindo seu Pitch de Vendas automático.' }
          ]
        },
        {
          title: 'Módulo 2: Reels & Feed (Atração)',
          lessons: [
            { id: '2-4', title: 'O Feed Impecável: Grid estético vs. Grid que vende.' },
            { id: '2-5', title: 'Reels de Autoridade: Como educar sem ser chato (Edutainment).' },
            { id: '2-6', title: 'O Efeito Halo: Associando sua imagem a marcas de alto valor.' }
          ]
        },
        {
          title: 'Módulo 3: Stories & Direct (Fechamento)',
          lessons: [
            { id: '2-7', title: 'A Novela da Vida Real: Storytelling diário para gerar intimidade e confiança.' },
            { id: '2-8', title: 'O Script Secreto de Vendas nos Stories (Sequência de 24h).' },
            { id: '2-9', title: 'Direct Sniping: Como abordar marcas e fechar parcerias via DM sem parecer spam.' }
          ]
        }
      ]
    },
    {
      id: 3,
      titulo: 'YOUTUBE — O ATIVO DE LONGO PRAZO',
      descricao: 'Construa patrimônio digital e autoridade inquestionável com vídeos longos.',
      icone: '🎥',
      duracao: '5h 00min',
      aulasCount: 9,
      modulos: [
        {
          title: 'Módulo 1: Construção de Patrimônio Digital',
          lessons: [
            { id: '3-1', title: 'Vídeo como Imóvel: O conceito de conteúdo Evergreen (Renda Passiva).' },
            { id: '3-2', title: 'SEO para Decisores: Como ser encontrado por quem assina os cheques.' },
            { id: '3-3', title: 'O Jogo da Miniatura: Psicologia das Cores e CTR nas Thumbnails.' }
          ]
        },
        {
          title: 'Módulo 2: Retenção Cinematográfica',
          lessons: [
            { id: '3-4', title: 'O Método Netflix: Arquitetura de roteiros para vídeos longos.' },
            { id: '3-5', title: 'VSL Disfarçada: Como vender durante o conteúdo sem que percebam.' },
            { id: '3-6', title: 'Produção Lean: Setup de imagem e som "Pro" com baixo custo.' }
          ]
        },
        {
          title: 'Módulo 3: Monetização Omnicanal',
          lessons: [
            { id: '3-7', title: 'Além do AdSense: Criando esteiras de produtos próprios.' },
            { id: '3-8', title: 'Ecossistema Youtube + Newsletter + Comunidade.' },
            { id: '3-9', title: 'O Pitch Perfeito: Como integrar anunciantes organicamente no vídeo longo.' }
          ]
        }
      ]
    },
    {
      id: 4,
      titulo: 'ESTRATÉGIA & EQUITY (A JÓIA DA COROA)',
      descricao: 'O protocolo final para trocar cachê rápido por riqueza geracional.',
      icone: '💰',
      duracao: '6h 30min',
      aulasCount: 10,
      modulos: [
        {
          title: 'Módulo 1: De Creator a Executivo',
          lessons: [
            { id: '4-1', title: 'O Fim do "Influeciador": A Era do Creator como Sócio.' },
            { id: '4-2', title: 'CPF vs CNPJ: Estruturando seu negócio para receber investimento.' },
            { id: '4-3', title: 'O Mindset do Equity: Trocando cachê rápido por riqueza geracional.' }
          ]
        },
        {
          title: 'Módulo 2: Valuation e Precificação',
          lessons: [
            { id: '4-4', title: 'A Matemática da Influência: Calculando CAC, LTV e ROAS para marcas.' },
            { id: '4-5', title: 'Mídia Kit 2.0: Como apresentar números que brilham os olhos de investidores.' },
            { id: '4-6', title: 'Precificação Dinâmica: Quanto cobrar ((e quando cobrar Equity).' }
          ]
        },
        {
          title: 'Módulo 3: O Deal (Fechando Negócio)',
          lessons: [
            { id: '4-7', title: 'Due Diligence Simplificada: Como investigar a marca antes de virar sócio.', isBonus: true },
            { id: '4-8', title: 'Anatomia do Contrato: Cláusulas de Vesting, Cliff e Drag-Along explicadas.', isBonus: true },
            { id: '4-9', title: 'A Arte da Negociação High-Stakes: Vencendo na mesa de reunião.', isBonus: true },
            { id: '4-10', title: 'O Pós-Deal: Gestão de relacionamento e entregáveis para garantir o Upside.', isBonus: true }
          ]
        }
      ]
    }
];

const AcademyPage: React.FC<AcademyPageProps> = ({ onBack, userIsLoggedIn, onRestrictedAction, t }) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37]";

    const handleSelectCourse = (course: Course) => {
        if (!userIsLoggedIn) {
            onRestrictedAction();
            return;
        }
        setSelectedCourse(course);
    };

    const renderCourseDetail = (course: Course) => (
      <div className="max-w-4xl mx-auto animate-fade-in px-4">
        <button 
          onClick={() => setSelectedCourse(null)} 
          className="mb-10 flex items-center gap-3 text-thedeal-gray400 hover:text-thedeal-gold transition-colors font-black uppercase text-[10px] tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar ao Hub
        </button>

        <header className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="text-8xl md:text-9xl p-6 bg-thedeal-card border border-white/5 rounded-[3rem] shadow-2xl">
            {course.icone}
          </div>
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-gold/20 px-4 py-1 rounded-full">
              <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">Protocolo de Especialização</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight uppercase tracking-tighter">
              {course.titulo}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-thedeal-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-thedeal-gray400">{course.aulasCount} Aulas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-thedeal-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-thedeal-gray400">{course.duracao} Conteúdo</span>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-12 mb-20">
          {course.modulos.map((modulo, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-[11px] font-black uppercase text-thedeal-gold tracking-[0.4em] flex items-center gap-4">
                <span className="w-8 h-px bg-thedeal-gold/30"></span>
                {modulo.title}
              </h3>
              <div className="grid gap-3">
                {modulo.lessons.map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="p-6 bg-thedeal-card border border-white/5 rounded-2xl flex items-center justify-between group hover:border-thedeal-gold/30 transition-all cursor-not-allowed"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-black text-white/20 group-hover:text-thedeal-gold/40 transition-colors">
                        {lesson.id.split('-')[1].padStart(2, '0')}
                      </span>
                      <p className="text-sm md:text-base font-bold text-white/80 group-hover:text-white transition-colors">{lesson.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {lesson.isBonus && (
                        <span className="text-[8px] font-black text-thedeal-gold border border-thedeal-gold/20 px-2 py-0.5 rounded uppercase tracking-widest bg-thedeal-gold/5">Material Confidencial</span>
                      )}
                      <Lock size={16} className="text-thedeal-gray700 group-hover:text-thedeal-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-thedeal-card to-black border-2 border-thedeal-gold/20 p-10 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group mb-32">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={200} className="text-thedeal-gold" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">Área de Membros Restrita</h2>
          <p className="text-thedeal-gray400 mb-10 max-w-lg mx-auto font-medium">As aulas e briefings práticos estão disponíveis apenas para membros validados na rede The Deal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-thedeal-goldBright text-black font-black px-10 py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-thedeal-gold/20">Solicitar Acesso Alpha</button>
          </div>
        </section>
      </div>
    );

    return (
        <div className="min-h-screen bg-black text-[#F5F5F5] font-sans selection:bg-thedeal-gold selection:text-black animate-fade-in">
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-thedeal-bg/80 backdrop-blur-xl border-b border-thedeal-gray700 h-16 md:h-20 transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-thedeal-goldBright to-thedeal-gold rounded flex items-center justify-center">
                                <Briefcase size={18} className="text-black" />
                            </div>
                            <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
                        </div>
                        <p className="text-[7px] md:text-[8px] font-black uppercase text-thedeal-gold tracking-[0.3em] pl-0.5">Rede Social Privada</p>
                    </div>
                    
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                        <ArrowLeft size={14} className="text-thedeal-gold" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Voltar</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20 pt-32">
                {selectedCourse ? renderCourseDetail(selectedCourse) : (
                  <>
                    <header className="mb-24 text-center">
                        <div className="inline-flex items-center gap-2 bg-thedeal-gold/10 border border-thedeal-gold/20 px-4 py-1.5 rounded-full mb-8">
                            <Sparkles className="w-3 h-3 text-thedeal-gold animate-pulse" />
                            <span className="text-[9px] font-black text-thedeal-gold uppercase tracking-widest">The Deal Academia</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-none uppercase">
                            DOMINE O <br/>
                            <span className={goldTextClass}>MERCADO.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            Conhecimento estratégico que vira acordo real. Inteligência aplicada a negócios, sem enrolação.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8 mb-32">
                        {COURSES.map((modulo) => (
                            <div 
                              key={modulo.id} 
                              onClick={() => handleSelectCourse(modulo)}
                              className="p-10 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] hover:border-thedeal-gold/30 transition-all group cursor-pointer shadow-2xl relative overflow-hidden"
                            >
                                {!userIsLoggedIn && (
                                  <div className="absolute top-6 right-6 text-thedeal-gold/40">
                                    <Lock size={20} />
                                  </div>
                                )}
                                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{modulo.icone}</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-thedeal-gold transition-colors leading-tight">{modulo.titulo}</h3>
                                <p className="text-white/40 text-lg leading-relaxed mb-10 font-light line-clamp-2">{modulo.descricao}</p>
                                
                                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <PlayCircle className="w-5 h-5 text-thedeal-gold" />
                                            <span className="text-xs font-black uppercase tracking-widest text-white/60">{modulo.aulasCount} aulas</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-thedeal-gold" />
                                            <span className="text-xs font-black uppercase tracking-widest text-white/60">{modulo.duracao}</span>
                                        </div>
                                    </div>
                                    <button className="text-thedeal-gold group-hover:translate-x-2 transition-transform">
                                      {userIsLoggedIn ? <ChevronRight className="w-6 h-6"/> : <Lock className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                  </>
                )}
            </main>

            <footer className="py-20 border-t border-white/5 text-center space-y-10 px-6 opacity-60">
                <div className="flex justify-center gap-8">
                  <a href="https://www.instagram.com/thedealbrasil?igsh=eDE0NWI3eTl1Y3pt" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Instagram size={22} /></a>
                  <a href="https://x.com/TheDealBr" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Twitter size={22} /></a>
                  <a href="https://www.tiktok.com/@thedealbr?_r=1&_t=ZS-92u7SKxtzGy" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><Video size={22} /></a>
                  <a href="https://k.kwai.com/u/@thedeal/Ctxw0sJD" target="_blank" rel="noopener noreferrer" className="text-thedeal-gray400 hover:text-thedeal-gold transition-colors"><KwaiIcon className="w-5 h-5" /></a>
                </div>
                <div className="space-y-4 opacity-30">
                  <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.6em]">
                      THE DEAL ACADEMY • © 2025 • REDE PRIVADA
                  </p>
                  <p className="text-[7px] font-bold text-thedeal-gold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                      A REDE SOCIAL THE DEAL ESTÁ EM DESENVOLVIMENTO. PODEM OCORRER FALHAS, ENVIE PARA SUPORTE@THEDEAL.COM.BR
                  </p>
                </div>
            </footer>
        </div>
    );
};

export default AcademyPage;
