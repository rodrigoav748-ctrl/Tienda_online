import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ["cliente", "admin"], default: "cliente" },
}, { timestamps: true });

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
