import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";

export async function GET() {
  try {
    await connectDB();
    const productos = await Producto.find();
    return new Response(JSON.stringify(productos), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const nuevoProducto = await Producto.create(data);
    return new Response(JSON.stringify(nuevoProducto), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
