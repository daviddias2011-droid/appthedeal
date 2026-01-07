
/**
 * Mock para desativação de backend conforme solicitado.
 */
export const EmailService = {
  init: () => {},
  sendWelcomeEmail: async (userName: string, userEmail: string) => null,
  sendReferralInvitation: async (fromName: string, toEmail: string, referralCode: string) => null
};
