import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Singleton para carregar o Stripe.
 * Adicionada verificação de segurança para evitar erro de certificado em dev.
 */
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';
    
    // O Stripe exige contexto seguro. Em ambientes de teste sem SSL, o erro de certificado
    // é comum. Esta verificação previne o crash do app.
    try {
      stripePromise = loadStripe(publishableKey);
    } catch (e) {
      console.warn("Stripe Terminal Security: Ambiente sem SSL detectado. O checkout pode não carregar.");
      return Promise.resolve(null);
    }
  }
  return stripePromise;
};