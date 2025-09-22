import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Configuración de la base de datos
const dbConfig = process.env.MYSQL_URL || {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda'
};

export async function POST(req) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { nombre, email, password } = await req.json();

    if (!nombre || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'El usuario ya existe' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const [result] = await connection.execute(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    // Crear token JWT
    const token = jwt.sign(
      { userId: result.insertId, email: email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    await connection.end();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuario registrado exitosamente',
        token: token,
        usuario: { id: result.insertId, nombre, email }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en registro:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}