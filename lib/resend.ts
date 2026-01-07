
/**
 * Mock para desativação de backend conforme solicitado.
 */
export const EmailService = {
  sendWelcomeEmail: async (userName: string, userEmail: string) => true,
  sendReferralInvitation: async (fromName: string, toEmail: string, referralCode: string) => true
};
