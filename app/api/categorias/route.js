// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from "next/server";
// Importa el cliente de Prisma desde la carpeta donde se generó
import { PrismaClient } from '../../lib/generated/prisma';

// Crea una única instancia del cliente de Prisma
const prisma = new PrismaClient();

// Función para manejar solicitudes GET a la API de categorías
export async function GET() {
  try {
    // Usa el cliente de Prisma para obtener todas las categorías
    const categorias = await prisma.categorias.findMany();
    // Devuelve la respuesta con las categorías obtenidas
    return NextResponse.json({ success: true, categorias });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    // Cierra la conexión de la base de datos
    await prisma.$disconnect();
  }
}