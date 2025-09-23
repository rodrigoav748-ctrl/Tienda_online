// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from 'next/server';
// Importa el cliente de Prisma desde la carpeta donde se generó
import { PrismaClient } from '../../../lib/generated/prisma';
// Importa bcrypt para comparar contraseñas
import bcrypt from 'bcryptjs';

// Crea una única instancia del cliente de Prisma
const prisma = new PrismaClient();

// Endpoint para iniciar sesión de usuario
export async function POST(req) {
  // Extrae los datos del cuerpo de la petición
  const { email, password } = await req.json();

  // Validación básica
  if ((!email && !password) || !password) {
    return NextResponse.json(
      { success: false, message: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  try {
    // Busca el usuario por email o nombre usando el cliente de Prisma
    const user = await prisma.usuarios.findFirst({
      where: {
        OR: [
          { email: email },
          { nombre: email }
        ]
      }
    });

    if (!user) {
      // Usuario no encontrado
      return NextResponse.json({ success: false, message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verifica la contraseña usando bcrypt (esta parte no cambia)
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return NextResponse.json({ success: false, message: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Devuelve datos del usuario autenticado
    return NextResponse.json(
      {
        success: true,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      },
      { status: 200 }
    );
  } catch (err) {
    // Maneja errores de la base de datos
    console.error(err);
    return NextResponse.json({ success: false, message: 'Error al iniciar sesión' }, { status: 500 });
  } finally {
    // Cierra la conexión de la base de datos
    await prisma.$disconnect();
  }
}
