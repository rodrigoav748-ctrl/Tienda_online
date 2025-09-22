
// Importa la conexión a la base de datos
import pool from '../../../lib/db';
// Importa bcrypt para comparar contraseñas
import bcrypt from 'bcryptjs';

// Endpoint para iniciar sesión de usuario
export async function POST(req) {
  // Extrae los datos del cuerpo de la petición
  const { email, password } = await req.json();

  // Validación básica
  if ((!email && !password) || !password) {
    return new Response(JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }), { status: 400 });
  }

  try {
    // Busca el usuario por email o nombre
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? OR nombre = ?',
      [email, email]
    );

    if (rows.length === 0) {
      // Usuario no encontrado
      return new Response(JSON.stringify({ success: false, message: 'Usuario no encontrado' }), { status: 404 });
    }

    const user = rows[0];

    // Verifica la contraseña usando bcrypt
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return new Response(JSON.stringify({ success: false, message: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Devuelve datos del usuario autenticado (id, nombre, email, rol)
    return new Response(
      JSON.stringify({
        success: true,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      }),
      { status: 200 }
    );
  } catch (err) {
    // Maneja errores de la base de datos
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: 'Error al iniciar sesión' }), { status: 500 });
  }
}
