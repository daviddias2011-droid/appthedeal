
/**
 * Sistema de Indicação (Referral) - THE DEAL
 * Gerencia a geração de códigos únicos e o rastreamento de conversões por indicação.
 */

export interface ReferralData {
  code: string;
  userId: string;
  createdAt: number;
  clicks: number;
  signups: number;
  rewards: Array<{
    userId: string;
    timestamp: number;
    points: number;
  }>;
}

export const ReferralSystem = {
  
  // Gerar código único baseado no nome e ID do usuário
  generateCode: (userId: string, userName: string): ReferralData => {
    const cleanName = userName
      .toLowerCase()
      .replace(/\s+/g, '')
      .substring(0, 8);
    
    const randomHash = Math.random().toString(36).substring(2, 6);
    const code = (cleanName + randomHash).toUpperCase();
    
    const referral: ReferralData = {
      code,
      userId,
      createdAt: Date.now(),
      clicks: 0,
      signups: 0,
      rewards: []
    };
    
    localStorage.setItem(`referral_data_${userId}`, JSON.stringify(referral));
    return referral;
  },
  
  // Registrar clique em um link de indicação
  trackClick: (code: string): void => {
    const referralData = ReferralSystem.getReferralByCode(code);
    if (referralData) {
      referralData.clicks++;
      localStorage.setItem(`referral_data_${referralData.userId}`, JSON.stringify(referralData));
    }
  },
  
  // Registrar novo cadastro vindo de uma indicação
  trackSignup: (code: string, newUserId: string) => {
    const referralData = ReferralSystem.getReferralByCode(code);
    if (referralData) {
      referralData.signups++;
      referralData.rewards.push({
        userId: newUserId,
        timestamp: Date.now(),
        points: 500 // Recompensa padrão de 500 pontos por membro qualificado
      });
      
      localStorage.setItem(`referral_data_${referralData.userId}`, JSON.stringify(referralData));
      
      // Persistir no histórico de pontos do usuário (se houver sistema de pontos global)
      const currentPoints = parseInt(localStorage.getItem(`user_points_${referralData.userId}`) || '0');
      localStorage.setItem(`user_points_${referralData.userId}`, (currentPoints + 500).toString());

      return { success: true, points: 500 };
    }
    return { success: false };
  },
  
  // Buscar dados de referral por código navegando pelo localStorage
  getReferralByCode: (code: string): ReferralData | null => {
    const allKeys = Object.keys(localStorage);
    for (const key of allKeys) {
      if (key.startsWith('referral_data_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '') as ReferralData;
          if (data.code === code.toUpperCase()) {
            return data;
          }
        } catch (e) {
          continue;
        }
      }
    }
    return null;
  },

  // Obter dados do usuário atual
  getUserReferral: (userId: string): ReferralData | null => {
    const data = localStorage.getItem(`referral_data_${userId}`);
    return data ? JSON.parse(data) : null;
  },

  // Capturar código da URL e salvar na sessão
  captureFromUrl: (): void => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      sessionStorage.setItem('pending_referral_code', refCode);
      ReferralSystem.trackClick(refCode);
    }
  }
};
