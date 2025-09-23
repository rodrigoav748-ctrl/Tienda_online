import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true
  } : undefined
}

console.log('Configurando conexión a la base de datos:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  ssl: dbConfig.ssl ? 'enabled' : 'disabled'
})

const pool = mysql.createPool(dbConfig)

// Verificar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('Conexión a la base de datos establecida correctamente')
    connection.release()
    return true
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error)
    return false
  }
}

// Verificar que las tablas existen
async function verifyTables() {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query('SHOW TABLES')
    console.log('Tablas existentes:', rows)
    connection.release()
    return rows
  } catch (error) {
    console.error('Error al verificar las tablas:', error)
    return []
  }
}

// Ejecutar verificaciones iniciales
testConnection()
verifyTables()

export default pool