-- Usar la base de datos proporcionada por Railway
SET FOREIGN_KEY_CHECKS=0;

-- Eliminar tablas si existen
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
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
