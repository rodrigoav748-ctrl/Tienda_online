'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });

    const data = await res.json();
    if (data.success) {
      router.push('/tienda');
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Iniciar Sesión</h1>
      <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} style={{ margin: '10px', padding: '8px' }}/>
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} style={{ margin: '10px', padding: '8px' }}/>
      <button onClick={handleLogin} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', margin: '10px' }}>Iniciar Sesión</button>
      <button onClick={() => router.push('/registro')} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', margin: '10px' }}>Registrarse</button>
    </div>
  );
}
