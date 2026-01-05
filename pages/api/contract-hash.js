import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { dealId, creatorId, brandId, timestamp } = req.body;

  try {
    // Cria uma assinatura única para o contrato
    const rawString = `${dealId}-${creatorId}-${brandId}-${timestamp}-${process.env.API_KEY}`;
    const hash = crypto.createHash('sha256').update(rawString).digest('hex').substring(0, 12).toUpperCase();

    res.status(200).json({ 
      hash: `TD-${hash}-V3`,
      verified: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar selo de integridade.' });
  }
}