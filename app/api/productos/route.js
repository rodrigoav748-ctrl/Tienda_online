import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const productos = await prisma.productos.findMany();
    return NextResponse.json({ success: true, productos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error al obtener productos" }, { status: 500 });
  }
}
