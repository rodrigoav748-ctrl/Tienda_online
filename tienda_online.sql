-- Elimina la base de datos si ya existe para empezar de cero
DROP DATABASE IF EXISTS tienda_online_mvp;

-- Crea la base de datos
CREATE DATABASE tienda_online_mvp;

-- Selecciona la base de datos para su uso
USE tienda_online_mvp;

-- Tabla para las categorías de productos
-- PK: id
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla para los usuarios (clientes y administradores)
-- PK: id
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'cliente'
);

-- Tabla para los productos
-- PK: id
-- FK: categoria_id
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo BIGINT UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- Tabla para los pedidos de los usuarios
-- PK: id
-- FK: usuario_id
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    total DECIMAL(10,2) DEFAULT 0,
    direccion_envio VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de unión para los detalles de cada pedido
-- PK: id
-- FK: pedido_id, producto_id
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
);

-- Tabla para las transacciones de venta (opcional)
-- PK: id
-- FK: usuario_id, producto_id
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
);

-- Inserción de datos de prueba para que las consultas funcionen
INSERT INTO categorias (nombre) VALUES
('Dulces'), ('Bebidas'), ('Papeleria'), ('Otros');

INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Rodrigo', 'rodrigo@email.com', 'hash_demo', 'cliente'),
('Admin', 'admin@email.com', 'hash_demo', 'admin');

INSERT INTO productos (codigo, nombre, precio, stock, categoria_id) VALUES
(7790040613607, 'alfajor bonobon blanco(40g)', 650, 100, 1),
(7790040613608, 'alfajor bonobon chocolate(40g)', 650, 100, 1),
(7790040613609, 'alteza bocado(140g)', 1650, 50, 1),
(7790040613610, 'ambronuss(100g)', 1000, 50, 1),
(7790040613611, 'ambrosito (25g)', 300, 200, 1),
(7790040613612, 'banderines 18 sep', 0, 50, 4),
(7790040613613, 'barra de silicona', 300, 100, 4),
(7790040613614, 'bigTime strong(11g)', 450, 100, 1),
(7790040613615, 'bonobon blanco(15g)', 300, 100, 1),
(7790040613616, 'bonobon coco(15g)', 300