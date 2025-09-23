import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.NODE_ENV === 'production'
}

// Solo mostrar la configuración en desarrollo
if (process.env.NODE_ENV !== 'production') {
  console.log('Configuración DB:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    environment: process.env.NODE_ENV || 'development'
  })
}

const pool = mysql.createPool(dbConfig)

export default pool