import emailjs from '@emailjs/browser';

/**
 * Serviço de e-mail Alpha para notificações e fluxos de onboarding.
 */
export const EmailService = {
  init: () => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
    if (publicKey) emailjs.init(publicKey);
  },

  sendWelcomeEmail: async (userName: string, userEmail: string) => {
    try {
      return await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID || '',
        {
          to_name: userName,
          to_email: userEmail,
          message: "Seu terminal Alpha foi ativado. Inicie sua jornada de performance agora."
        }
      );
    } catch (error) {
      console.error("Erro ao enviar e-mail de boas-vindas:", error);
      return null;
    }
  },

  sendReferralInvitation: async (fromName: string, toEmail: string, referralCode: string) => {
    try {
      const inviteLink = `${window.location.origin}/cadastro?ref=${referralCode}`;
      return await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_REFERRAL_TEMPLATE_ID || '',
        {
          from_name: fromName,
          to_email: toEmail,
          invite_link: inviteLink,
          referral_code: referralCode
        }
      );
    } catch (error) {
      console.error("Erro ao enviar convite de indicação:", error);
      return null;
    }
  }
};