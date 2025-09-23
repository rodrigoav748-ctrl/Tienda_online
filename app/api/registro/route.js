import pool from '../../../lib/db';import pool from '../../../lib/db';

import bcrypt from 'bcryptjs';

// Importa bcrypt para hashear contraseñas// Importa la conexión a la base de datos

export async function POST(req) {

  try {import bcrypt from 'bcryptjs';import pool from '../../../lib/db';

    console.log('Iniciando proceso de registro...');

    const body = await req.json();// Importa bcrypt para hashear contraseñas

    const { nombre, email, password } = body;

    // Endpoint para registrar un nuevo usuarioimport bcrypt from 'bcryptjs';

    console.log('Datos recibidos:', { nombre, email, passwordLength: password?.length });

export async function POST(req) {

    if (!nombre || !email || !password) {

      console.log('Validación fallida: campos faltantes');  try {// Endpoint para registrar un nuevo usuario

      return new Response(

        JSON.stringify({     console.log('Iniciando proceso de registro...');export async function POST(req) {

          success: false, 

          message: 'Todos los campos son obligatorios'       try {

        }), 

        { status: 400 }    // Extrae los datos del cuerpo de la petición    console.log('Iniciando proceso de registro...');

      );

    }    const { nombre, email, password } = await req.json();    



    console.log('Hasheando contraseña...');    console.log('Datos recibidos:', { nombre, email, passwordLength: password?.length });    // Extrae los datos del cuerpo de la petición

    const password_hash = await bcrypt.hash(password, 10);

    const { nombre, email, password } = await req.json();

    console.log('Intentando insertar usuario en la base de datos...');

    const [result] = await pool.query(    // Validar que todos los campos estén presentes    console.log('Datos recibidos:', { nombre, email, passwordLength: password?.length });

      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',

      [nombre, email, password_hash]    if (!nombre || !email || !password) {

    );

      console.log('Validación fallida: campos faltantes');    // Validar que todos los campos estén presentes

    console.log('Usuario insertado correctamente, obteniendo datos...');

    const [rows] = await pool.query(      return new Response(JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }), { status: 400 });    if (!nombre || !email || !password) {

      'SELECT id, nombre, email FROM usuarios WHERE id = ?',

      [result.insertId]    }      console.log('Validación fallida: campos faltantes');

    );

      return new Response(JSON.stringify({ success: false, message: 'Todos los campos son obligatorios' }), { status: 400 });

    const usuario = rows[0];

    console.log('Registro completado con éxito:', { userId: usuario.id });    try {    }

    

    return new Response(      console.log('Hasheando contraseña...');

      JSON.stringify({ success: true, usuario }), 

      { status: 200 }      // Hashea la contraseña antes de guardarla  try {

    );

      const password_hash = await bcrypt.hash(password, 10);    console.log('Hasheando contraseña...');

  } catch (error) {

    console.error('Error durante el registro:', error);    // Hashea la contraseña antes de guardarla

    const message = error.code === 'ER_DUP_ENTRY' 

      ? 'El email ya está registrado'      console.log('Intentando insertar usuario en la base de datos...');    const password_hash = await bcrypt.hash(password, 10);

      : 'Error al registrar';

            // Inserta el nuevo usuario en la base de datos

    return new Response(

      JSON.stringify({ success: false, message }),       const [result] = await pool.query(    console.log('Intentando insertar usuario en la base de datos...');

      { status: 500 }

    );        'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',    // Inserta el nuevo usuario en la base de datos

  }

}        [nombre, email, password_hash]    const [result] = await pool.query(

      );      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',

      [nombre, email, password_hash]

      console.log('Usuario insertado correctamente, obteniendo datos...');    );

      // Obtiene el usuario recién creado usando el id insertado

      const [rows] = await pool.query(    console.log('Usuario insertado correctamente, obteniendo datos...');

        'SELECT id, nombre, email FROM usuarios WHERE id = ?',    // Obtiene el usuario recién creado usando el id insertado

        [result.insertId]    const [rows] = await pool.query(

      );      'SELECT id, nombre, email FROM usuarios WHERE id = ?',

      const usuario = rows[0];      [result.insertId]

      console.log('Registro completado con éxito:', { userId: usuario.id });    );

      return new Response(JSON.stringify({ success: true, usuario }), { status: 200 });    const usuario = rows[0];

    } catch (err) {    console.log('Registro completado con éxito:', { userId: usuario.id });

      // Maneja errores de la base de datos    return new Response(JSON.stringify({ success: true, usuario }), { status: 200 });

      console.error('Error durante el registro:', err);  } catch (err) {

      let message = 'Error al registrar';    // Maneja errores de la base de datos

      if (err.code === 'ER_DUP_ENTRY') {    console.error('Error durante el registro:', err);

        message = 'El email ya está registrado';    let message = 'Error al registrar';

      }    if (err.code === 'ER_DUP_ENTRY') {

      return new Response(JSON.stringify({ success: false, message }), { status: 500 });      message = 'El email ya está registrado';

    }    }

  } catch (error) {    return new Response(JSON.stringify({ success: false, message }), { status: 500 });

    console.error('Error al procesar la solicitud:', error);  }

    return new Response(JSON.stringify({ success: false, message: 'Error al procesar la solicitud' }), { status: 400 });}

  }
}