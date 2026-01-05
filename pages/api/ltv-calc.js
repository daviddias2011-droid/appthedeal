export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { followers, engagement, contractType } = req.body;

  try {
    // Lógica de negócio protegida no servidor
    const baseCpm = 65;
    const reach = (followers * engagement) / 100;
    let multiplier = 1.0;

    if (contractType === 'mensal') multiplier = 1.4;
    if (contractType === 'performance') multiplier = 2.1;
    if (contractType === 'revshare') multiplier = 3.2;

    const projectedMonthly = (reach / 1000) * baseCpm * multiplier;

    res.status(200).json({
      projectedLtv: projectedMonthly * 12,
      confidenceScore: 0.89,
      currency: 'BRL'
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no processamento matemático.' });
  }
}