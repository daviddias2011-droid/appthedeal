
import { User, UserType, Post } from './types';

export const USERS: User[] = [
  { 
    id: 3, 
    name: 'Usuário Teste', 
    username: 'tester', 
    email: 'teste@thedeal.app', 
    password: '123456', 
    type: UserType.Creator, 
    phone: '11988887777', 
    isVetted: false, 
    dealsCompleted: 0, 
    followers: 5000, 
    following: 100, 
    balance: 0,
    niche: 'Performance',
    stats: { activeDeals: 0, matchScore: 85, monthlyEarnings: 0 }
  },
  { 
    id: 1, 
    name: 'Master Access', 
    username: 'master', 
    email: 'admin@thedeal.app', 
    password: 'password123', 
    type: UserType.Admin, 
    phone: '5500000000000', 
    isVetted: true, 
    dealsCompleted: 12, 
    followers: 1200, 
    following: 150, 
    balance: 45000,
    niche: 'Estrategista',
    stats: { activeDeals: 3, matchScore: 98, monthlyEarnings: 15000 }
  },
  { 
    id: 2, 
    name: 'Membro Verificado', 
    username: 'membro', 
    email: 'membro@thedeal.app', 
    password: 'password', 
    type: UserType.Creator, 
    phone: '1199999999', 
    isVetted: true, 
    dealsCompleted: 8, 
    followers: 34000, 
    following: 400, 
    balance: 12000,
    niche: 'Lifestyle',
    stats: { activeDeals: 2, matchScore: 89, monthlyEarnings: 12000 }
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    type: 'deal',
    author: {
      name: 'SIGAPAY',
      avatar: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/4c/ee/a44cee2c-07bd-af1c-3b5a-74aeeb451e50/Placeholder.mill/400x400bb-75.webp',
      verified: true,
      badge: 'MARCA'
    },
    timestamp: 'Agora',
    content: '💳 EXPANSÃO FINTECH 2026\nBuscamos criadores do nicho de finanças e tecnologia para promover soluções de pagamento digital. Foco em conversão de novos usuários e educação financeira.',
    stats: { interests: 89, proposals: 12 },
    ctaText: 'Ver Programa'
  },
  {
    id: 2,
    type: 'deal',
    author: {
      name: 'Iguatemi Imóveis',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRo_h_9fHHTStKN6kPal9_m-j0Guuqs_8NQ&s',
      verified: true,
      badge: 'MARCA'
    },
    timestamp: 'Premium',
    content: '🏢 CAMPANHA LUXURY LIVING\nOportunidade para criadores de lifestyle e business. Divulgação de empreendimentos de alto padrão. Exige-se perfil sofisticado e audiência qualificada.',
    stats: { interests: 45, proposals: 8 },
    ctaText: 'Ver Detalhes'
  },
  {
    id: 3,
    type: 'deal',
    author: {
      name: 'Zona Azul Brasil',
      avatar: 'https://zonaazulbrasil.com.br/wp-content/uploads/2018/02/cropped-LOGO.png',
      verified: true,
      badge: 'MARCA'
    },
    timestamp: 'Ativa agora',
    content: '🚗 CAMPANHA ESTACIONAMENTO DIGITAL\nBuscamos criadores para promover o app oficial de estacionamento rotativo. Campanha focada em utilidade e conversão direta.\n📍 Disponível para: SP, PR, RS e SC.',
    stats: { interests: 156, proposals: 42 },
    ctaText: 'Candidatar-se'
  },
  {
    id: 4,
    type: 'deal',
    author: {
      name: 'Shopee',
      avatar: 'https://www.pngmart.com/files/12/Shopee-Logo-Transparent-Background.png',
      verified: true,
      badge: 'MARCA'
    },
    timestamp: 'Destaque',
    content: '🛍️ PROGRAMA DE AFILIADOS SHOPEE 2026\nBuscamos criadores para o novo ciclo de performance. Comissões agressivas, cupons exclusivos e tracking de conversão em tempo real.',
    stats: { interests: 1205, proposals: 342 },
    ctaText: 'Ver Programa'
  }
];

export const TRENDING_TOPICS = ['#Performance', '#FintechDeals', '#RealEstate', '#VarejoDigital', '#LTVEconomy'];
