// app/productos/page.js
export const dynamic = 'force-dynamic';
import pool from '../../lib/db';
import Link from 'next/link';

export default async function ProductosPage() {
  let productos = [];
  
  try {
    // Intenta consultar la base de datos
    const [rows] = await pool.query('SELECT * FROM productos');
    productos = rows;
  } catch (error) {
    console.log('Error conectando a la BD (normal durante build):', error.message);
    // Durante el build, retorna datos vacíos o de ejemplo
    productos = [];
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Productos</h1>
      
      {productos.length === 0 ? (
        <div>
          <p>No se pudieron cargar los productos en este momento.</p>
          <p>Esto es normal durante el proceso de construcción.</p>
        </div>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      )}

      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Volver al inicio</button>
      </Link>
    </div>
  );
}