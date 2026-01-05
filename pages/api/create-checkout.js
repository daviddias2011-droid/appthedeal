
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, userEmail } = req.body;

  const prices = {
    'pro-mensal': {
      amount: 2900, // R$ 29,00
      name: 'Plano Pro Mensal',
      level: 'Pro'
    },
    'elite-mensal': {
      amount: 14900, // R$ 149,00
      name: 'Plano Elite Fast Track',
      level: 'Elite'
    }
  };

  if (!prices[plan]) {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  const planData = prices[plan];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: planData.name,
              description: 'The Deal - Acesso acelerado ao ecossistema Alpha'
            },
            unit_amount: planData.amount
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pagamento/cancelado`,
      customer_email: userEmail,
      metadata: {
        email: userEmail, // IMPORTANTE: Passar o email para o webhook ler depois
        target_level: planData.level,
        plan_id: plan
      }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro no Stripe:', error);
    res.status(500).json({ error: 'Erro ao criar checkout' });
  }
}
