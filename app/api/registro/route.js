import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { nombre, email, password } = await req.json();

  if (!nombre || !email || !password) {
    return NextResponse.json({ success: false, message: "Todos los campos son obligatorios" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.usuarios.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ success: false, message: "El usuario ya existe" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.usuarios.create({
      data: { nombre, email, password_hash: hashedPassword, rol: 'cliente' }
    });

    return NextResponse.json({
      success: true,
      message: "Usuario registrado exitosamente",
      usuario: { id: newUser.id, nombre, email }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error en el servidor" }, { status: 500 });
  }
}
