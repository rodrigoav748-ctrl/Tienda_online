'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegistro = async () => {
    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, correo, password })
    });

    const data = await res.json();
    if (data.success) {
      alert('Usuario registrado correctamente');
      router.push('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Registrarse</h1>
      <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} style={{ margin: '10px', padding: '8px' }}/>
      <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} style={{ margin: '10px', padding: '8px' }}/>
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} style={{ margin: '10px', padding: '8px' }}/>
      <button onClick={handleRegistro} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', margin: '10px' }}>Registrarse</button>
      <button onClick={() => router.push('/')} style={{ padding: '10px 20px', margin: '10px' }}>Volver al inicio</button>
    </div>
  );
}
