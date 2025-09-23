import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { nombre, email, password } = await req.json();

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Usar findUnique para verificar si el usuario ya existe
    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario usando Prisma
    const newUser = await prisma.usuarios.create({
      data: {
        nombre,
        email,
        password_hash: hashedPassword,
        rol: 'cliente',
      },
    });

    // Crear token JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario registrado exitosamente',
        token: token,
        usuario: { id: newUser.id, nombre, email },
      },
      { status: 200 }
    );
  } catch (error) {
    // Manejo de errores más específico, incluyendo errores de Prisma
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'El usuario ya existe' },
        { status: 409 }
      );
    }
    console.error('Error en registro:', error);
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  } finally {
    // Cierra la conexión de la base de datos
    await prisma.$disconnect();
  }
}
