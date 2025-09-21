
// Importa NextResponse para manejar respuestas en Next.js
import { NextResponse } from 'next/server';

// Endpoint para obtener el historial de pedidos (mock)
export async function GET() {
  // Datos simulados de historial de pedidos
  const historial = [
    { id: 1, fecha: '28/08/2025', productos: ['soda (x2)', 'lapiz grafito (x1)'], total: 2250 },
    { id: 2, fecha: '25/08/2025', productos: ['barra de chocolate (x5)'], total: 6250 },
    { id: 3, fecha: '20/08/2025', productos: ['guirnalda copihue (x1)', 'cascabeles (x1)'], total: 2000 },
  ];
  // Devuelve el historial como respuesta JSON
  return NextResponse.json(historial);
}
