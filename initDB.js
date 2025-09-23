import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Cargar variables de entorno solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Verificar si tenemos todas las variables de entorno necesarias
const requiredEnvVars = ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('Faltan variables de entorno necesarias:', missingVars);
  console.log('Saltando la inicialización de la base de datos...');
  process.exit(0);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'railway',
  multipleStatements: true, // Importante para ejecutar múltiples queries
  ssl: {
    rejectUnauthorized: true
  }
};

// Debug: Mostrar configuración (sin mostrar la contraseña)
console.log('Configuración de la base de datos:', {
  ...dbConfig,
  password: dbConfig.password ? '***[password configured]***' : '***[NO PASSWORD]***'
});

console.log('Variables de entorno cargadas:', {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD ? '***' : 'no configurada'
});

async function initializeDatabase() {
  try {
    console.log('Intentando conectar a la base de datos con la siguiente configuración:');
    console.log({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: 'tienda_online_mvp'
    });

    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión exitosa a la base de datos');
    
    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, 'tienda_online_mvp.sql');
    const sqlContent = await fs.readFile(sqlPath, 'utf8');
    
    // Ejecutar el script SQL
    console.log('Iniciando la ejecución del script SQL...');
    await connection.query(sqlContent);
    console.log('Base de datos inicializada correctamente');

    await connection.end();
  } catch (error) {
    console.error('Error al inicializar la base de datos. Por favor verifica:');
    console.error('1. Que MySQL esté instalado y corriendo');
    console.error('2. Que las credenciales en el archivo .env sean correctas');
    console.error('3. Que el usuario tenga permisos para crear bases de datos');
    console.error('\nError detallado:', error);
    process.exit(1);
  }
}

// Ejecutar la inicialización
initializeDatabase();