// Importa la conexión a la base de datos
import pool from '../../../lib/db';

// Endpoint para obtener todos los productos
export async function GET() {
  try {
    // Consulta todos los productos en la base de datos
    const [rows] = await pool.execute('SELECT * FROM productos');
    // Devuelve los productos como respuesta JSON
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Maneja errores de la base de datos
    console.error('Error al obtener productos:', error);
    return new Response(JSON.stringify({ message: 'Error al obtener productos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}