import { connectDB } from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await Usuario.findOne({ email });
    if (!user) throw new Error("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "2h" });

    return Response.json({ msg: "Login exitoso", token });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
