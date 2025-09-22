"use client";
import { useEffect, useState } from "react";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Aquí deberías hacer una petición a la API real de pedidos
    // Por ahora, simulamos con datos de localStorage
    const pedidosGuardados = localStorage.getItem("pedidos");
    if (pedidosGuardados) {
      setPedidos(JSON.parse(pedidosGuardados));
    }
  }, []);

  return (
    <div className="container" style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1 className="title">Tus Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {pedidos.map((pedido, idx) => (
            <li key={idx} style={{ marginBottom: 30, background: '#f9f9f9', borderRadius: 8, padding: 16 }}>
              <div><b>Pedido #{idx + 1}</b></div>
              <div>Fecha: {pedido.fecha || 'Reciente'}</div>
              <div>Total: {pedido.total}</div>
              <ul style={{ marginTop: 8 }}>
                {pedido.items.map((item, i) => (
                  <li key={i}>
                    {item.quantity} x {item.nombre} - {item.precio}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <a href="/tienda" className="realizar" style={{ display: 'inline-block', marginTop: 30, backgroundColor: '#007bff', color: 'white', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold' }}>
        Seguir comprando
      </a>
    </div>
  );
}
