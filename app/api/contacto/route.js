// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

// Crea una única instancia del cliente de Prisma
const prisma = new PrismaClient();

// Endpoint para recibir mensajes de contacto
export async function POST(req) {
  try {
    // Extrae los datos del cuerpo de la petición
    const body = await req.json();
    const { nombre, mensaje } = body;

    // Usa Prisma Client para crear un nuevo registro en la tabla de contactos
    await prisma.contactos.create({
      data: {
        nombre,
        mensaje,
      },
    });

    // Devuelve una respuesta de éxito
    return NextResponse.json({ success: true, message: "Mensaje de contacto recibido" }, { status: 200 });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error
    console.error('Error al insertar el mensaje de contacto:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    // Cierra la conexión de la base de datos
    await prisma.$disconnect();
  }
}