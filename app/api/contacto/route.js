import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(req) {
  try {
    const { nombre, mensaje } = await req.json();
    if (!nombre || !mensaje) return NextResponse.json({ success: false, message: "Todos los campos son obligatorios" }, { status: 400 });

    await prisma.contactos.create({ data: { nombre, mensaje } });
    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error al enviar mensaje" }, { status: 500 });
  }
}
