
import pool from '../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { memberId, missionId, points } = req.body;

  if (!memberId || !missionId) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }

  try {
    // 1. Verificar se a missão já foi concluída (opcional, dependendo da tabela log)
    // 2. Adicionar pontos
    const [result]: any = await pool.execute(
      'UPDATE members SET total_points = total_points + ? WHERE id = ?',
      [points, memberId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Membro não localizado.' });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return res.status(500).json({ error: 'Erro ao processar pontos.' });
  }
}
