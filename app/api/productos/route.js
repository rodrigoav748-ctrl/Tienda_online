// Importa el cliente de Prisma desde la carpeta donde se generó
import { PrismaClient } from '../../lib/generated/prisma';

// Crea una única instancia del cliente de Prisma
const prisma = new PrismaClient();

// Endpoint para obtener todos los productos
export async function GET() {
  try {
    // Usa el cliente de Prisma para consultar todos los productos
    const productos = await prisma.productos.findMany();

    // Devuelve los productos como respuesta JSON
    return new Response(JSON.stringify(productos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Maneja los errores de la base de datos
    console.error('Error al obtener productos:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener productos' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    // Desconecta la base de datos
    await prisma.$disconnect();
  }
}