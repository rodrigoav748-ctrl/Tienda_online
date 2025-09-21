
// Importa la conexión a la base de datos
import pool from '../../../lib/db';

// Endpoint para recibir mensajes de contacto
export async function POST(req) {
  // Extrae los datos del cuerpo de la petición
  const body = await req.json();
  const { nombre, mensaje } = body;

  // Inserta el mensaje en la base de datos
  await pool.query('INSERT INTO contactos (nombre, mensaje) VALUES (?, ?)', [nombre, mensaje]);

  // Devuelve respuesta de éxito
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}