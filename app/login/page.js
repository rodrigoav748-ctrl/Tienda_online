
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [usuario, setUsuario] = useState(''); // Puede ser email o nombre
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Maneja el envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usuario, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Guarda el usuario autenticado en localStorage
        if (data.usuario && typeof window !== 'undefined') {
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }
        router.push('/tienda');
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      alert('Error de conexión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Correo o nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <div className="separator">
        <Link href="/registro" className="link">Registrarse</Link>
      </div>
    </div>
  );
}
