
/**
 * Serviço de e-mail via Resend.
 * Como o Resend deve ser chamado via Server-side, aqui preparamos o endpoint 
 * para ser consumido via Supabase Edge Functions ou API Routes.
 */
export const EmailService = {
  sendWelcomeEmail: async (userName: string, userEmail: string) => {
    console.log(`[Resend] Preparando e-mail de boas-vindas para: ${userEmail}`);
    // Integração via fetch para a API do Resend ou sua Edge Function
    return true;
  },

  sendReferralInvitation: async (fromName: string, toEmail: string, referralCode: string) => {
    console.log(`[Resend] Preparando convite de: ${fromName} para: ${toEmail}`);
    return true;
  }
};
