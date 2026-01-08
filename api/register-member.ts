
import pool from '../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { fullName, email, password, userType, niche, socialHandle, motivation } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO members (full_name, email, password, user_type, niche, social_handle, motivation, is_vetted, total_points) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 10)',
      [fullName, email.toLowerCase(), password, userType, niche, socialHandle, motivation]
    );

    return res.status(201).json({ 
      success: true, 
      id: (result as any).insertId 
    });
  } catch (error: any) {
    console.error('Database Error:', error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Este e-mail já está registrado na rede.' });
    }
    return res.status(500).json({ error: 'Erro ao salvar dados no MySQL Locaweb.' });
  }
}
