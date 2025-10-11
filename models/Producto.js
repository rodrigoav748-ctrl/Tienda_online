import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Producto || mongoose.model("Producto", ProductoSchema);
