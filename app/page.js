

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e?.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: usuario, password })
    });
    const data = await res.json();
    if (data.success) {
      if (data.usuario && typeof window !== 'undefined') {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      }
      router.push('/tienda');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <img src="/logo.svg" alt="Logo Tienda" style={{ width: 80, marginBottom: 20 }} />
      <h1 className="title">Bienvenido a la Tienda Online</h1>
      <p style={{ color: '#888', marginBottom: 40, fontSize: '1.2em' }}>
        Ingresa para ver y comprar los mejores productos.
      </p>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Correo o nombre de usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <div className="separator">
        <Link href="/registro" className="link">¿No tienes cuenta? <span style={{color:'#FF4747'}}>Regístrate</span></Link>
      </div>
    </div>
  );
}
