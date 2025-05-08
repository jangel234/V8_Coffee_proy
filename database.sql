drop database if exists V8Coffee;
create database V8Coffee;
use V8Coffee;
-- Creación de tablas
CREATE TABLE Cliente (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    telefono varchar(10) NOT NULL
);

CREATE TABLE Usuarios (
    id_Empleado INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    telefono varchar(10)NOT NULL,
    rol varchar(50) NOT NULL
);

CREATE TABLE Insumos (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    costo decimal(10,2) NOT NULL
);

CREATE TABLE Productos (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    procedimientos text,
    tamanio varchar(50),
    HC int,
    precio decimal(10,2) NOT NULL
);

CREATE TABLE PI (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_Producto int NOT NULL,
    id_Insumo int NOT NULL,
    subtotal decimal(10,2),
    FOREIGN KEY (id_Producto) REFERENCES Productos (id),
    FOREIGN KEY (id_Insumo) REFERENCES Insumos (id)
);

CREATE TABLE Pedidos (
    id int PRIMARY KEY AUTO_INCREMENT,
    Fecha DATETIME NOT NULL,
    id_Cliente int NOT NULL,
    id_Empleado int NOT NULL,
    total decimal(10,2) NOT NULL,
    FOREIGN KEY (id_Cliente) REFERENCES Cliente(id),
    FOREIGN KEY (id_Empleado) REFERENCES Usuarios(id_Empleado)
);

CREATE TABLE PP (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_PI int NOT NULL,
    id_Pedido int NOT NULL,
    FOREIGN KEY (id_PI) REFERENCES PI(id),
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id)
);

-- Registros base
INSERT INTO Cliente (nombre, telefono) VALUES
('Juan Perez', '3121234567'),
('Maria Gomez', '3121234568'),
('Julian Juarez', '3122936134');

INSERT INTO Usuarios (nombre, telefono, rol) VALUES
('Carlos Ruiz', '3121234568', 'Encargado'),
('Pollo Bermudez', '3121111111', 'Barista'),
('Angel Aguilar', '3122222222', 'Barista'),
('Ian', '3123333333', 'Barista'),
('Ana Torres', '3121234566', 'Encargado'),
('Cesarin', '3124444444', 'Barista');

INSERT INTO Insumos (nombre, costo) VALUES
('Café molido', 15.50),
('Leche entera', 12.00),
('Chocolate en polvo', 8.75);

INSERT INTO Productos (nombre, procedimientos, tamanio, HC, precio) VALUES
('Cappuccino Clásico', 'Preparado con doble shot de espresso', 'Mediano', 250, 45.00),
('Mocha Blanco', 'Mezcla de chocolate blanco y espresso', 'Grande', 320, 55.00);

INSERT INTO PI (id_Producto, id_Insumo, subtotal) VALUES
(1, 1, 15.50),
(1, 2, 12.00),
(2, 1, 15.50),
(2, 3, 8.75);

INSERT INTO Pedidos (Fecha, id_Cliente, id_Empleado, total) VALUES
(NOW(), 1, 1, 100.00),
(NOW(), 2, 2, 120.50);

INSERT INTO PP (id_PI, id_Pedido) VALUES
(1, 1),
(3, 2);