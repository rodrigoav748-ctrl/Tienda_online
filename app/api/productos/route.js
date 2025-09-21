
// Importa la conexión a la base de datos
import pool from '../../../lib/db';
// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from 'next/server';

// Endpoint para obtener todos los productos
export async function GET() {
  try {
    // Consulta todos los productos en la base de datos
    const [rows] = await pool.execute('SELECT * FROM productos');
    // Devuelve los productos como respuesta JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Maneja errores de la base de datos
    console.error('Error al obtener productos:', error);
    return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 });
  }
}
