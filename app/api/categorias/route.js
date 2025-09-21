
// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from "next/server";
// Importa el cliente de MySQL con soporte para promesas
import mysql from "mysql2/promise";

// Función para manejar solicitudes GET a la API de categorías
export async function GET() {
  try {
    // Establece la conexión con la base de datos MySQL
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "tienda_online_mvp",
    });

    // Ejecuta la consulta para obtener todas las categorías
    const [rows] = await connection.execute("SELECT * FROM categorias");
    // Cierra la conexión
    await connection.end();

    // Devuelve la respuesta con las categorías obtenidas
    return NextResponse.json({ success: true, categorias: rows });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
