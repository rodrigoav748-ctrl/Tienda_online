import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.usuarios.findFirst({
      where: {
        OR: [{ email }, { nombre: email }]
      }
    });

    if (!user) return NextResponse.json({ success: false, message: "Usuario no encontrado" }, { status: 404 });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return NextResponse.json({ success: false, message: "Contraseña incorrecta" }, { status: 401 });

    return NextResponse.json({
      success: true,
      usuario: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error al iniciar sesión" }, { status: 500 });
  }
}
