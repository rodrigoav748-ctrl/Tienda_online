import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, password } = data;

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crea el nuevo usuario en la base de datos usando Prisma
    const newUser = await prisma.usuarios.create({
      data: {
        nombre,
        email,
        password_hash: hashedPassword,
        rol: 'cliente',
      },
      select: {
        id: true,
        nombre: true,
        email: true,
      }
    });

    return NextResponse.json(newUser, { status: 201 });
    
  } catch (error) {
    // Maneja el error específico de duplicado de email (código P2002 de Prisma)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 409 }
      );
    }

    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  } finally {
    // Cierra la conexión de la base de datos
    await prisma.$disconnect();
  }
}
