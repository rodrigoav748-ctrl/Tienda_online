import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true
  }
};

async function seed() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión establecida con éxito');

    // Generar datos de prueba para categorías
    const categorias = [
      'Electrónica',
      'Ropa',
      'Hogar',
      'Deportes',
      'Libros'
    ];

    for (const categoria of categorias) {
      await connection.execute(
        'INSERT INTO categorias (nombre) VALUES (?)',
        [categoria]
      );
    }
    console.log('Categorías creadas');

    // Generar productos de prueba
    const productos = [
      ['Smartphone XYZ', 'Último modelo con cámara de alta resolución', 599.99, 1],
      ['Laptop Pro', 'Potente laptop para trabajo y gaming', 999.99, 1],
      ['Camiseta Básica', 'Camiseta de algodón 100%', 19.99, 2],
      ['Pantalón Casual', 'Pantalón cómodo para el día a día', 39.99, 2],
      ['Lámpara LED', 'Lámpara moderna de bajo consumo', 29.99, 3],
      ['Balón de Fútbol', 'Balón oficial tamaño 5', 24.99, 4],
      ['Best Seller', 'Libro más vendido del año', 14.99, 5]
    ];

    for (const [nombre, descripcion, precio, categoria_id] of productos) {
      await connection.execute(
        'INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, descripcion, precio, categoria_id]
      );
    }
    console.log('Productos creados');

    // Crear usuario admin de prueba
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.execute(
      'INSERT INTO usuarios (nombre, email, password_hash, es_admin) VALUES (?, ?, ?, ?)',
      ['Admin', 'admin@example.com', hashedPassword, true]
    );
    console.log('Usuario admin creado');

    await connection.end();
    console.log('Datos de prueba generados con éxito');
  } catch (error) {
    console.error('Error al generar datos de prueba:', error);
    process.exit(1);
  }
}

seed();