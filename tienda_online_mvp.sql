-- Usar la base de datos proporcionada por Railway
SET FOREIGN_KEY_CHECKS=0;

-- Eliminar tablas si existen
DROP TABLE IF EXISTS pedidos_productos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    es_admin BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255)
);

-- Crear tabla de productos
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    categoria_id INT,
    imagen_url VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Crear tabla de pedidos
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    estado ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion_envio TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear tabla de relación pedidos-productos
CREATE TABLE pedidos_productos (
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (pedido_id, producto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar datos de ejemplo en categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Electrónica', 'Productos electrónicos y gadgets'),
('Ropa', 'Ropa y accesorios de moda'),
('Hogar', 'Artículos para el hogar y decoración'),
('Deportes', 'Equipamiento y ropa deportiva'),
('Libros', 'Libros y material de lectura');

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES
('Smartphone XYZ', 'Último modelo con cámara de alta resolución', 599.99, 50, 1),
('Laptop Pro', 'Potente laptop para trabajo y gaming', 999.99, 25, 1),
('Tablet Ultra', 'Tablet ligera y versátil', 299.99, 30, 1),
('Camiseta Básica', 'Camiseta de algodón 100%', 19.99, 100, 2),
('Pantalón Casual', 'Pantalón cómodo para el día a día', 39.99, 75, 2),
('Chaqueta Invierno', 'Chaqueta térmica resistente al agua', 89.99, 40, 2),
('Lámpara LED', 'Lámpara moderna de bajo consumo', 29.99, 60, 3),
('Juego de Sábanas', 'Sábanas de algodón egipcio', 49.99, 45, 3),
('Balón de Fútbol', 'Balón oficial tamaño 5', 24.99, 80, 4),
('Raqueta de Tenis', 'Raqueta profesional', 159.99, 20, 4),
('Best Seller 2025', 'Libro más vendido del año', 14.99, 150, 5),
('Diccionario Completo', 'Diccionario actualizado', 34.99, 70, 5);

-- Insertar usuario administrador de ejemplo (contraseña: admin123)
INSERT INTO usuarios (nombre, email, password_hash, es_admin) VALUES
('Admin', 'admin@example.com', '$2a$10$NB0S5H.wzgXw9E8k9QOxEuJFIE9GH8IZbNGsvHxVdxFs2K6BrfO6y', TRUE);

-- Insertar usuarios regulares de ejemplo (contraseña: user123)
INSERT INTO usuarios (nombre, email, password_hash) VALUES
('Juan Pérez', 'juan@example.com', '$2a$10$NB0S5H.wzgXw9E8k9QOxEuJFIE9GH8IZbNGsvHxVdxFs2K6BrfO6y'),
('María García', 'maria@example.com', '$2a$10$NB0S5H.wzgXw9E8k9QOxEuJFIE9GH8IZbNGsvHxVdxFs2K6BrfO6y');

-- Insertar pedidos de ejemplo
INSERT INTO pedidos (usuario_id, estado, direccion_envio, total) VALUES
(2, 'procesando', 'Calle Principal 123, Ciudad', 659.97),
(3, 'enviado', 'Avenida Central 456, Ciudad', 124.97);

-- Insertar detalles de pedidos
INSERT INTO pedidos_productos (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 599.99),
(1, 4, 3, 19.99),
(2, 7, 2, 29.99),
(2, 11, 3, 14.99);
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'cliente'
);

INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Rodrigo', 'rodrigo@email.com', 'hash_demo', 'cliente'),
('Admin', 'admin@email.com', 'hash_demo', 'admin');

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

INSERT INTO categorias (nombre) VALUES
('Dulces'),
('Bebidas'),
('Papeleria'),
('Otros');


CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo BIGINT UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

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
(7790040613616, 'bonobon coco(15g)', 300, 100, 1),
(7790040613617, 'bonobon frutilla(15g)', 300, 100, 1),
(7790040613618, 'cascabeles 5 unidades', 1000, 50, 1),
(7790040613619, 'celofan pliego transparente', 500, 100, 3),
(7790040613620, 'chinche mariposa 30 unidades', 1200, 50, 3),
(7790040613621, 'chocman(33g)', 300, 150, 1),
(7790040613622, 'chubi(20g)', 300, 150, 1),
(7790040613623, 'coca 3lt ret', 2500, 50, 2),
(7790040613624, 'cola fria 120 grs. artel', 1500, 50, 1),
(7790040613625, 'cola fria 40 grs. artel', 750, 50, 1),
(7790040613626, 'cola fria proarte 500 grs.', 3990, 30, 1);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    total DECIMAL(10,2) DEFAULT 0,
    direccion_envio VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO pedidos (usuario_id, total, estado, direccion_envio) VALUES
(1, 2500, 'pendiente', 'Av. Piña 123');

CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 2, 650),
(1, 2, 1, 650);


CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO ventas (usuario_id, producto_id, cantidad) VALUES
(1, 1, 2),
(1, 2, 1);
