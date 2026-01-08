
import pool from '../../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Protocolo não permitido.' });
  }

  const { fullName, email, password, userType, niche, socialHandle, motivation } = req.body;

  // Validação básica de segurança
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Dados de identidade incompletos.' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO members (full_name, email, password, user_type, niche, social_handle, motivation, is_vetted, total_points) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 10)',
        [fullName, email.toLowerCase(), password, userType, niche, socialHandle, motivation]
      );

      return res.status(201).json({ 
        success: true, 
        message: 'Membro registrado no terminal MySQL com sucesso.',
        id: (result as any).insertId 
      });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error('Database Error:', error.message);
    
    // Erro de e-mail duplicado no MySQL
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Este Terminal ID (E-mail) já está em uso na rede.' });
    }
    
    return res.status(500).json({ error: 'Falha crítica na comunicação com o servidor de dados.' });
  }
}
