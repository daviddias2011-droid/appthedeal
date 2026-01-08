
import pool from '../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.execute(
      'SELECT id, full_name as name, email, user_type as type, niche, social_handle as username, is_vetted as isVetted, total_points FROM members WHERE email = ? AND password = ? LIMIT 1',
      [email.toLowerCase(), password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas ou terminal não localizado.' });
    }

    const user = rows[0];
    // Ajuste de tipos booleanos vindo do MySQL (TINYINT)
    user.isVetted = !!user.isVetted;

    return res.status(200).json({ user });
  } catch (error: any) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ error: 'Erro de comunicação com o servidor de segurança.' });
  }
}
