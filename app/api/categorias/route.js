import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const categorias = await prisma.categorias.findMany();
    return NextResponse.json({ success: true, categorias });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error al obtener categorías" }, { status: 500 });
  }
}
