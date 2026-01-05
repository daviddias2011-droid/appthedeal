import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Singleton para carregar o Stripe.
 * Adicionada verificação de segurança para evitar erro de certificado em dev.
 */
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY)
      || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      || 'pk_test_placeholder';

    try {
      stripePromise = loadStripe(publishableKey as string);
    } catch (e) {
      console.warn('Stripe Terminal Security: ambiente sem SSL detectado ou chave ausente. O checkout pode não carregar.');
      return Promise.resolve(null);
    }
  }
  return stripePromise;
};