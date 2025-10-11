import { connectDB } from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { nombre, email, password } = await req.json();

    const hashed = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({ nombre, email, password: hashed });

    return Response.json({ msg: "Usuario registrado", usuario: nuevoUsuario });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
