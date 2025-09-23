// importarSQL.js
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function importarSQL() {
  const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: true
    } : false,
    multipleStatements: true
  };

  try {
    console.log('Conectando a la base de datos...');
    console.log('Configuración:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });

    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa');

    // Leer el archivo SQL
    const sqlPath = path.join(process.cwd(), 'tienda_online_mvp.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Dividir el contenido en instrucciones individuales
    const instrucciones = sqlContent
      .split(';')
      .map(instruction => instruction.trim())
      .filter(instruction => instruction.length > 0);

    console.log(`Ejecutando ${instrucciones.length} instrucciones SQL...`);
    
    // Ejecutar cada instrucción por separado
    for (let i = 0; i < instrucciones.length; i++) {
      const instruccion = instrucciones[i];
      try {
        await connection.query(instruccion);
        console.log(`✅ Instrucción ${i + 1}/${instrucciones.length} ejecutada`);
      } catch (error) {
        console.error(`❌ Error en la instrucción ${i + 1}:`, error.message);
        console.error('SQL:', instruccion);
      }
    }

    console.log('✅ Importación completada');
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Ejecutar la importación
importarSQL();
