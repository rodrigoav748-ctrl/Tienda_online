import pool from '../../../lib/db.js';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, password } = data;

    if (!nombre || !email || !password) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, 'cliente')",
      [nombre, email, hashedPassword]
    );

    return Response.json({ 
      id: result.insertId,
      nombre,
      email 
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
