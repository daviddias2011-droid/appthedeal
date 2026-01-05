import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Protocol Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } else {
      // Fallback de desenvolvimento (não recomendado para produção real)
      event = JSON.parse(buf.toString());
    }
  } catch (err) {
    console.error(`❌ Erro de Autenticação de Webhook: ${err.message}`);
    return res.status(400).send(`Security Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const userEmail = session.metadata?.email;
    const targetLevel = session.metadata?.target_level || 'Pro';
    const dealScoreBonus = targetLevel === 'Elite' ? 1000 : 500;

    console.log(`🔔 Ativação de Protocolo Confirmada: ${userEmail} -> Nível: ${targetLevel}`);

    if (supabase && userEmail) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            is_vetted: true, 
            level: targetLevel, 
            total_points: dealScoreBonus,
            updated_at: new Date().toISOString()
          })
          .eq('email', userEmail);

        if (error) throw error;
        console.log(`✅ Acesso nível ${targetLevel} concedido com sucesso.`);
      } catch (dbError) {
        console.error('❌ Erro crítico de banco de dados no terminal:', dbError.message);
      }
    }
  }

  res.json({ status: 'verified', received: true });
}