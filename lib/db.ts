
import mysql from 'mysql2/promise';

/**
 * Singleton de conexão com MySQL Locaweb.
 * Utiliza Pool para gerenciar o limite de conexões simultâneas do plano.
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

export default pool;
