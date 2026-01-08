
import mysql from 'mysql2/promise';

/**
 * Configuração de conexão com MySQL Locaweb.
 * Nota: O uso de createPool é recomendado para gerenciar múltiplas conexões de forma eficiente.
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
