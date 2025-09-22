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

const pool = mysql.createPool(dbConfig)

export default pool