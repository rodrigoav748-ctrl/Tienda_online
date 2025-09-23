
// Importa la conexión a la base de datos
import pool from '../../../lib/db';
// Importa bcrypt para hashear contraseñas
import bcrypt from 'bcryptjs';

// Endpoint para registrar un nuevo usuario
export async function POST(req) {
  try {
    console.log('Iniciando proceso de registro...');
    
    // Extrae los datos del cuerpo de la petición
    const { nombre, email, password } = await req.json();
    console.log('Datos recibidos:', { nombre, email, passwordLength: password?.length });

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !password) {
      console.log('Validación fallida: campos faltantes');
      return new Response(JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }), { status: 400 });
    }

  try {
    console.log('Hasheando contraseña...');
    // Hashea la contraseña antes de guardarla
    const password_hash = await bcrypt.hash(password, 10);

    console.log('Intentando insertar usuario en la base de datos...');
    // Inserta el nuevo usuario en la base de datos
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
      [nombre, email, password_hash]
    );

    console.log('Usuario insertado correctamente, obteniendo datos...');
    // Obtiene el usuario recién creado usando el id insertado
    const [rows] = await pool.query(
      'SELECT id, nombre, email FROM usuarios WHERE id = ?',
      [result.insertId]
    );
    const usuario = rows[0];
    console.log('Registro completado con éxito:', { userId: usuario.id });
    return new Response(JSON.stringify({ success: true, usuario }), { status: 200 });
  } catch (err) {
    // Maneja errores de la base de datos
    console.error('Error durante el registro:', err);
    let message = 'Error al registrar';
    if (err.code === 'ER_DUP_ENTRY') {
      message = 'El email ya está registrado';
    }
    return new Response(JSON.stringify({ success: false, message }), { status: 500 });
  }
}
