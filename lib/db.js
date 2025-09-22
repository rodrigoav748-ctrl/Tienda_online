import mysql from 'mysql2/promise'

// Configuración para Railway (producción) y desarrollo local
const dbConfig = process.env.MYSQL_URL || {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

let pool;

try {
  pool = mysql.createPool(dbConfig);
} catch (error) {
  console.log('Error creando pool de conexiones:', error.message);
  // En caso de error, pool será undefined
}

export default pool;