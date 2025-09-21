
// Importa la conexión a la base de datos
import pool from '../../../lib/db';
// Importa bcrypt para hashear contraseñas
import bcrypt from 'bcryptjs';

// Endpoint para registrar un nuevo usuario
export async function POST(req) {
  // Extrae los datos del cuerpo de la petición
  const { nombre, email, password } = await req.json();

  // Validar que todos los campos estén presentes
  if (!nombre || !email || !password) {
    return new Response(JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }), { status: 400 });
  }

  // Hashea la contraseña antes de guardarla
  const password_hash = await bcrypt.hash(password, 10);

  try {
    // Inserta el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
      [nombre, email, password_hash]
    );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    // Maneja errores de la base de datos
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: 'Error al registrar' }), { status: 500 });
  }
}
