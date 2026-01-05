
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
  plan?: 'free' | 'pro';
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
  status: 'active' | 'in progress' | 'completed' | 'awaiting_signature';
  creatorId?: number;
  deadlineDays?: number;
  briefing?: {
    deliverables: string[];
    targetAudience: string;
    toneOfVoice: string;
  };
}

export interface TrendReport {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  date: string;
}

export interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}

export interface Application {
  id: number;
  dealId: string;
  creatorId: number;
  status: 'pending' | 'approved' | 'rejected';
  pitch?: string;
  proposedValue?: number;
  createdAt: string;
}

export interface AlphaPost {
  id: string;
  authorId: number;
  text: string;
  timestamp: string;
  interestingCount: number;
  topics?: string[];
  linkUrl?: string;
  linkTitle?: string;
  linkImage?: string;
}

export interface AlphaComment {
  id: string;
  postId: string;
  authorId: number;
  text: string;
  timestamp: string;
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
  web?: {
    uri: string;
    title: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  slug: string;
}

export type TrackingMethod = 'pixel' | 'landingpage' | 'cupom';

export type AppView = 
  | 'landing' 
  | 'login' 
  | 'invitation' 
  | 'dashboard' 
  | 'validation' 
  | 'welcome' 
  | 'admin-approval' 
  | 'participe' 
  | 'simulator' 
  | 'blog' 
  | 'academy' 
  | 'for-brands' 
  | 'for-creators' 
  | 'how-it-works'
  | 'privacy'
  | 'terms'
  | 'investor'
  | 'discover'
  | 'blacklist'
  | 'missions'
  | 'mission-dashboard'
  | 'verify-email'
  | 'signup-complete'
  | 'pricing';

export type DashboardTab = 
  | 'feed' 
  | 'explorar' 
  | 'contratos' 
  | 'cursos' 
  | 'mensagens' 
  | 'simulador' 
  | 'empresas' 
  | 'perfil' 
  | 'painel' 
  | 'missoes'
  | 'clubalpha' 
  | 'deals' 
  | 'insights' 
  | 'presenca_vip' 
  | 'pagamentos' 
  | 'roi' 
  | 'carteira' 
  | 'criadores' 
  | 'for-brands'
  | 'discover'
  | 'blacklist'
  | 'planos';
