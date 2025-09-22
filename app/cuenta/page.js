"use client";
import { useEffect, useState } from 'react';

export default function Cuenta() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <div className="container">
      <h1 className="title">Perfil de Usuario</h1>
      {usuario ? (
        <div>
          <div className="user-info user-info-centered">
            <div>
              <span className="user-label">Nombre:</span>
              <span className="user-value">{usuario.nombre}</span>
            </div>
            <div>
              <span className="user-label">Correo:</span>
              <span className="user-value">{usuario.email}</span>
            </div>
          </div>
          <button className="logout-button" onClick={cerrarSesion} style={{ marginBottom: 30 }}>Cerrar sesión</button>
          <a href="/tienda" className="realizar" style={{ backgroundColor: '#d9534f', color: 'white', display: 'inline-block', marginTop: 10, textDecoration: 'none' }}>Volver a la tienda</a>
        </div>
      ) : (
        <p>No hay usuario registrado.</p>
      )}
    </div>
  );
}
