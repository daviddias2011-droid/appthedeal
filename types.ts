
export enum UserType {
  Brand = 'brand',
  Creator = 'creator',
  Admin = 'admin',
}

// Added CreatorLevel enum
export enum CreatorLevel {
  Revelacao = 'revelacao',
  Destaque = 'destaque',
  Celebridade = 'celebridade',
}

// Added BrandLevel enum
export enum BrandLevel {
  Startup = 'startup',
  ScaleUp = 'scaleup',
  Enterprise = 'enterprise',
}

export interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

export interface Activity {
  id: string;
  type: 'deal_paid' | 'proposal_received' | 'mission_completed' | 'system' | 'dispute';
  message: string;
  timestamp: string;
  icon: string;
}

export interface User {
  id: any;
  name: string;
  username: string;
  email: string;
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
  total_points?: number;
  plan?: 'free' | 'pro';
  stats?: {
    activeDeals: number;
    matchScore: number;
    monthlyEarnings: number;
  };
  // FIX: Added location property to User interface
  location?: {
    lat: number;
    lon: number;
    city?: string;
  };
  // FIX: Added rating and reviews for Creator evaluation
  rating?: number;
  reviews?: number;
  // FIX: Added isSpecialist and level
  isSpecialist?: boolean;
  level?: CreatorLevel | BrandLevel;
}

// FIX: Expanded AppView to include all views used in the application
export type AppView = 'landing' | 'login' | 'invitation' | 'dashboard' | 'validation' | 'thank-you' | 'welcome' | 'admin-approval' | 'privacy' | 'terms' | 'for-brands' | 'for-creators' | 'how-it-works' | 'blog' | 'academy' | 'missions' | 'investor' | 'simulator' | 'discover' | 'pricing' | 'verify-email' | 'faq';

// FIX: Added 'in progress' and 'awaiting_signature' to DealStatus
export type DealStatus = 'active' | 'pending_delivery' | 'disputed' | 'completed' | 'cancelled' | 'awaiting_signature' | 'in progress';

export interface Deal {
  id: string;
  title: string;
  description: string;
  value: number;
  status: DealStatus;
  brand: {
    name: string;
    logoUrl: string;
  };
  creatorId?: number;
  matchScore?: number;
  deadline?: string;
  requirements?: string[];
  isFlashDeal?: boolean;
  expiresInHours?: number;
  briefing?: {
    deliverables: string[];
    targetAudience: string;
    toneOfVoice: string;
  };
  deadlineDays?: number;
  commissionRate?: number;
}

// FIX: Expanded DashboardTab to include all navigation tabs used in Header and components
export type DashboardTab = 'home' | 'my-deals' | 'marketplace' | 'create-deal' | 'messages' | 'profile' | 'settings' | 'admin' | 'feed' | 'discover' | 'explorar' | 'clubalpha' | 'presenca_vip' | 'pagamentos' | 'roi' | 'carteira' | 'mensagens' | 'perfil' | 'criadores' | 'empresas';

export interface AlphaPost {
  id: string;
  authorId: number;
  text: string;
  timestamp: string;
  interestingCount: number;
  topics?: string[];
}

export interface AlphaComment {
  id: string;
  postId: string;
  authorId: number;
  text: string;
  timestamp: string;
}

export interface PortfolioItem {
  id: string;
  creatorId: number;
  title: string;
  brandName: string;
  metric: string;
  imageUrl?: string;
  contentUrl: string;
  type: 'video' | 'image';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

// Added Post interface
export interface Post {
  id: number;
  type: 'deal' | 'content';
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    badge: string;
  };
  timestamp: string;
  content: string;
  image?: string;
  stats: {
    interests?: number;
    proposals?: number;
    likes?: number;
    comments?: number;
  };
  ctaText?: string;
}

// Added TrendReport interface
export interface TrendReport {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  date: string;
}

// Added Message interface
export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}

// Added Application interface
export interface Application {
  id: number;
  dealId: string;
  creatorId: number;
  status: 'pending' | 'accepted' | 'rejected';
  pitch: string;
  value: number;
  timestamp: string;
}

// Added GroundingChunk interface for SmartSearch
export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
}

// Added BlogPost interface
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
}

// Added TrackingMethod type
export type TrackingMethod = 'pixel' | 'landingpage' | 'cupom';
