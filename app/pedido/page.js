"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Pedido() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.precio * item.quantity, 0));
  }, [cart]);

  const formatPrice = (price) =>
    price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1 className="title">Detalle del Pedido</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} className="product-item" style={{ marginBottom: 20 }}>
                <span>
                  <b>{item.quantity} x</b> {item.nombre}
                </span>
                <span>{formatPrice(item.precio * item.quantity)}</span>
                <button className="cancelar" onClick={() => removeItem(item.id)} style={{ marginLeft: 10 }}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total" style={{ marginTop: 30, fontSize: "1.2em" }}>
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            className="realizar"
            style={{ marginTop: 30, backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            onClick={() => {
              // Guardar pedido en localStorage (simulación)
              const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
              pedidos.push({
                items: cart,
                total: formatPrice(total),
                fecha: new Date().toLocaleString('es-CL')
              });
              localStorage.setItem('pedidos', JSON.stringify(pedidos));
              localStorage.removeItem('cart');
              window.location.href = '/pedidos';
            }}
          >
            Finalizar compra
          </button>
          <Link href="/tienda" className="back-button" style={{ marginTop: 30 }}>
            Seguir comprando
          </Link>
        </>
      )}
    </div>
  );
}
