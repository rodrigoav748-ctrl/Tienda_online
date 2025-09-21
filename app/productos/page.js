// app/productos/page.js
import pool from '../../lib/db';
import Link from 'next/link';

export default async function ProductosPage() {
  // Consulta a la base de datos
  const [rows] = await pool.query('SELECT * FROM productos');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Productos</h1>
      <ul>
        {rows.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>

      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Volver al inicio</button>
      </Link>
    </div>
  );
}