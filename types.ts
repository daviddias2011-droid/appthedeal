
export enum UserType {
  Brand = 'brand',
  Creator = 'creator',
  Admin = 'admin',
}

export enum CreatorLevel {
  Revelacao = 'revelacao',
  Destaque = 'destaque',
  Celebridade = 'celebridade',
}

export enum BrandLevel {
  Startup = 'startup',
  ScaleUp = 'scaleup',
  Enterprise = 'enterprise',
}

export interface User {
  id: any;
  name: string;
  username: string;
  email: string;
  password?: string;
  type: UserType;
  phone: string;
  isVetted: boolean; 
  dealsCompleted: number;
  followers: number;
  following: number;
  balance: number;
  logoUrl?: string;
  niche?: string;
  bio?: string;
  location?: { lat: number; lon: number; city?: string };
  rating?: number;
  reviews?: number;
  isSpecialist?: boolean;
  level?: CreatorLevel | BrandLevel;
  stats?: {
    activeDeals: number;
    matchScore: number;
    monthlyEarnings: number;
  };
  referral_code?: string;
  total_points?: number;
  plan?: 'free' | 'pro' | 'alpha';
  isEmailVerified?: boolean;
}

export type PostType = 'deal' | 'social' | 'article';

export interface Post {
  id: number;
  type: PostType;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    badge: string;
  };
  timestamp: string;
  content: string;
  image?: string;
  link?: string;
  stats: {
    interests?: number;
    proposals?: number;
    likes?: number;
    comments?: number;
    views?: number;
    shares?: number;
  };
  ctaText?: string;
}

export type AppView = 'landing' | 'login' | 'invitation' | 'dashboard' | 'validation' | 'welcome' | 'admin-approval' | 'verify-email' | 'how-it-works' | 'missions' | 'academy' | 'simulator' | 'blog' | 'discover' | 'investor' | 'privacy' | 'terms' | 'thank-you' | 'pricing';

export interface PortfolioItem {
  id: number;
  creatorId: number;
  title: string;
  brandName: string;
  metric: string;
  imageUrl?: string;
  contentUrl: string;
  type: 'video' | 'image';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  value: number;
  isFlashDeal: boolean;
  expiresInHours?: number;
  commissionRate?: number;
  brand: {
    name: string;
    logoUrl: string;
  };
  // Fluxo MVP: pending (criado) -> approved (curadoria ok) -> payment_requested (link enviado) -> paid (confirmado) -> completed (finalizado)
  status: 'pending' | 'active' | 'approved' | 'payment_requested' | 'paid' | 'completed' | 'in progress' | 'awaiting_signature';
  creatorId?: number;
  deadlineDays?: number;
  briefing?: {
    deliverables: string[];
    targetAudience: string;
    toneOfVoice: string;
  };
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}

export type DashboardTab = 'painel' | 'feed' | 'explorar' | 'missoes' | 'cursos' | 'perfil' | 'roi' | 'carteira' | 'mensagens' | 'empresas' | 'criadores' | 'simulador' | 'pagamentos' | 'contratos' | 'presenca_vip' | 'discover' | 'planos' | 'clubalpha' | 'ai-assist';

export type TrackingMethod = 'pixel' | 'landingpage' | 'cupom';

export interface GroundingChunk {
    maps?: {
        uri: string;
        title: string;
    };
}

export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    date: string;
    summary: string;
    content: string;
    imageUrl: string;
    tags: string[];
}

export interface TrendReport {
    id: string;
    title: string;
    summary: string;
    fullText: string;
    date: string;
}

export interface AlphaPost {
    id: string;
    authorId: number;
    text: string;
    timestamp: string;
    interestingCount: number;
    topics?: string[];
    link?: {
        url: string;
        title?: string;
        image?: string;
    };
}

export interface AlphaComment {
    id: string;
    postId: string;
    authorId: number;
    text: string;
    timestamp: string;
}

export interface Application {
    id: number;
    dealId: string;
    userId: number;
    status: 'pending' | 'accepted' | 'rejected';
    message?: string;
    proposedValue?: number;
}
