'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegistro = async () => {
    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();
    if (data.success) {
      // Guarda el usuario en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      }
      alert('Usuario registrado correctamente');
      router.push('/cuenta');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Crear cuenta</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
      <button onClick={handleRegistro} className="login-button" style={{ width: '100%', marginBottom: 15 }}>Registrarse</button>
      <button onClick={() => router.push('/')} className="cancelar" style={{ width: '100%' }}>Volver al inicio</button>
    </div>
  );
}
