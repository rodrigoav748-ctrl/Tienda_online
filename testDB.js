import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  };

  try {
    console.log('Intentando conectar con la configuración:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });

    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa');

    // Probar una consulta simple
    const [rows] = await connection.query('SHOW TABLES');
    console.log('\nTablas en la base de datos:');
    console.table(rows);

    // Probar consulta a la tabla de productos
    const [productos] = await connection.query('SELECT COUNT(*) as total FROM productos');
    console.log('\nTotal de productos:', productos[0].total);

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testConnection();