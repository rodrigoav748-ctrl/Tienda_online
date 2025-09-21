// importarSQL.js
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function importarSQL() {
  try {
    // 1. Conexión a MySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password', 
      multipleStatements: true 
    });

    // 2. Leer el archivo .sql
    const sqlPath = path.join(process.cwd(), 'tienda_online_mvp.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // 3. Ejecutar el SQL
    await connection.query(sql);

    console.log('✅ Base de datos importada correctamente');
    await connection.end();
  } catch (err) {
    console.error('❌ Error importando SQL:', err);
  }
}

importarSQL();
