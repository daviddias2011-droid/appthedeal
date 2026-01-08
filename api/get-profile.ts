
import pool from '../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID do membro ausente.' });
  }

  try {
    const [rows]: any = await pool.execute(
      'SELECT id, full_name as name, email, user_type as type, niche, social_handle as username, is_vetted as isVetted, total_points, referral_code FROM members WHERE id = ? LIMIT 1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Membro não localizado.' });
    }

    const user = rows[0];
    user.isVetted = !!user.isVetted;

    return res.status(200).json(user);
  } catch (error: any) {
    console.error('API Error:', error.message);
    return res.status(500).json({ error: 'Erro de banco de dados.' });
  }
}
