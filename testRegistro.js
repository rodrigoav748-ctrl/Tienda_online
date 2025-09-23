import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function testRegistro() {
  const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa');

    // Datos de prueba
    const testUser = {
      nombre: 'Usuario Prueba',
      email: 'prueba@example.com',
      password: 'password123'
    };

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Intentar insertar usuario
    const [result] = await connection.query(
      "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'cliente')",
      [testUser.nombre, testUser.email, hashedPassword]
    );

    console.log('\nUsuario insertado:', {
      id: result.insertId,
      nombre: testUser.nombre,
      email: testUser.email
    });

    // Verificar que el usuario fue insertado
    const [usuarios] = await connection.query(
      'SELECT id, nombre, email, rol FROM usuarios WHERE email = ?',
      [testUser.email]
    );

    console.log('\nUsuario recuperado de la base de datos:');
    console.table(usuarios);

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testRegistro();