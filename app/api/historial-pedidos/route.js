import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

const prisma = new PrismaClient();

// Endpoint para obtener el historial de pedidos
export async function GET() {
  try {
    // Consulta los pedidos e incluye los detalles de cada uno,
    // y dentro de los detalles, incluye la información completa del producto.
    const historial = await prisma.pedidos.findMany({
      include: {
        detalle_pedidos: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    // Devuelve el historial como respuesta JSON
    return NextResponse.json(historial);
  } catch (error) {
    console.error('Error al obtener el historial de pedidos:', error);
    return NextResponse.json({ message: 'Error al obtener el historial de pedidos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}