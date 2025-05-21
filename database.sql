drop database if exists V8Coffee;
create database V8Coffee;
use V8Coffee;
-- Creación de tablas
CREATE TABLE Clientes (
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



CREATE TABLE Productos (
    id int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    procedimientos text,
    tamanio varchar(50),
    HC boolean, -- Frio = 0 // Caliente = 1
    precio decimal(10,2) NOT NULL
);


CREATE TABLE Pedidos (
    id int PRIMARY KEY AUTO_INCREMENT,
    Fecha DATETIME NOT NULL,
    id_Cliente int NOT NULL,
    id_Empleado int NOT NULL,
    total decimal(10,2) default 0,
    FOREIGN KEY (id_Cliente) REFERENCES Clientes(id),
    FOREIGN KEY (id_Empleado) REFERENCES Usuarios(id_Empleado)
);

CREATE TABLE PP (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_Producto int NOT NULL,
    id_Pedido int NOT NULL,
    estado boolean DEFAULT 0,
    extras varchar (70) DEFAULT 'N/A',
    FOREIGN KEY (id_Producto) REFERENCES Productos(id),
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id)
);

DELIMITER $$

CREATE TRIGGER ActualizarTotalPedido
AFTER INSERT ON PP
FOR EACH ROW
BEGIN
    -- Sumar el precio del producto al total del pedido
    UPDATE Pedidos
    SET total = total + (
        SELECT precio 
        FROM Productos 
        WHERE id = NEW.id_Producto
        LIMIT 1 -- Añade esto para evitar errores si hay múltiples filas
    )
    WHERE id = NEW.id_Pedido;
END $$

DELIMITER ;

-- Registros base
INSERT INTO Clientes (nombre, telefono) VALUES
('Juan Perez', '3121234567'),
('Maria Gomez', '3121234560'),
('Julian Juarez', '3122936134'),
('Carlos Perez', '3121234561'),
('Ian Gomez', '3121234564'),
('Cesar Juarez', '3122936132'),
('Angel Perez', '3121234562'),
('Javier Gomez', '3121234565'),
('Pollo Juarez', '3122936133');

INSERT INTO Usuarios (nombre, telefono, rol) VALUES
('Carlos Ruiz', '3121234568', 'Encargado'),
('Pollo Bermudez', '3121111111', 'Barista'),
('Angel Aguilar', '3122222222', 'Barista'),
('Ian', '3123333333', 'Cajero'),
('Ana Torres', '3121234566', 'Encargado'),
('Cesarin', '3124444444', 'Cajero');


INSERT INTO Productos (nombre, procedimientos, tamanio, HC, precio) VALUES
('Cappuccino Clásico', 'Preparado con doble shot de espresso', 'Mediano', 1, 45.00),
('Moka Blanco', 'Mezcla de chocolate blanco y espresso', 'Grande', 1, 55.00),
('Café Americano', 'Preparado con agua caliente y espresso', 'Mediano', 0, 35.00),
('Café Latte', 'Preparado con leche vaporizada y espresso', 'Grande', 1, 50.00),
('Café Frappé', 'Preparado con hielo y café y azúcar', 'Grande', 0, 60.00),
('Café Helado', 'Preparado con hielo y café', 'Mediano', 0, 40.00),
('Matcha latte', 'Preparado con chocolate y espresso', 'Mediano', 1, 50.00),
('Moka Blanco', 'Mezcla de chocolate blanco y espresso', 'Grande', 0, 55.00),
('Pastel de Chocolate', 'Pastel de chocolate con crema', 'Postre', 0, 30.00),
('Pastel de Fresa', 'Pastel de fresa con crema', 'Postre',0, 40.00),
('Galleta de Avena', 'Galleta de avena con pasas', 'Postre', 0, 10.00),
('Galleta de Chocolate', 'Galleta de chocolate con nuez', 'Postre', 0, 15.00),
('Brownie', 'Brownie de chocolate con nuez', 'Postre', 0, 25.00);

CREATE VIEW vista_ventas_totales AS
SELECT 
    SUM(total) AS ventas_totales
FROM Pedidos;

CREATE VIEW vista_promedio_diario AS
SELECT 
    ROUND(SUM(total) / 24, 2) AS promedio_diario
FROM Pedidos
WHERE Fecha BETWEEN '2025-06-01' AND '2025-06-24';

CREATE VIEW vista_producto_mas_vendido AS
SELECT 
    P.nombre AS producto,
    COUNT(*) AS cantidad_vendida
FROM PP
JOIN Productos P ON P.id = PP.id_Producto
GROUP BY P.nombre
ORDER BY cantidad_vendida DESC
LIMIT 1;

CREATE VIEW vista_mejor_dia AS
SELECT 
    DATE(Fecha) AS fecha,
    SUM(total) AS total_dia
FROM Pedidos
GROUP BY DATE(Fecha)
ORDER BY total_dia DESC
LIMIT 1;

CREATE VIEW vista_ventas_por_producto AS
SELECT 
    P.nombre AS producto,
    CASE 
        WHEN P.tamanio = 'Postre' THEN 'Comida'
        WHEN P.HC = 1 THEN 'Bebidas Calientes'
        WHEN P.HC = 0 THEN 'Panadería'
        ELSE 'Otro'
    END AS categoria,
    COUNT(*) AS cantidad_vendida,
    P.precio AS precio_unitario,
    ROUND(P.precio * COUNT(*), 2) AS total
FROM PP
JOIN Productos P ON P.id = PP.id_Producto
GROUP BY P.nombre, P.precio, categoria;

CREATE OR REPLACE VIEW vista_total_general_productos AS
SELECT 
    ROUND(SUM(total_por_producto), 2) AS total_general
FROM (
    SELECT 
        P.nombre,
        P.precio * COUNT(*) AS total_por_producto
    FROM PP
    JOIN Productos P ON P.id = PP.id_Producto
    GROUP BY P.nombre, P.precio
) AS subconsulta;

DELIMITER $$

CREATE PROCEDURE obtener_ventas_totales()
BEGIN
    SELECT 
        SUM(total) AS ventas_totales
    FROM Pedidos;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_promedio_diario(IN fecha_inicio DATE, IN fecha_fin DATE)
BEGIN
    SELECT 
        ROUND(SUM(total) / 24, 2) AS promedio_diario
    FROM Pedidos
    WHERE Fecha BETWEEN fecha_inicio AND fecha_fin;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_producto_mas_vendido()
BEGIN
    SELECT 
        P.nombre AS producto,
        COUNT(*) AS cantidad_vendida
    FROM PP
    JOIN Productos P ON P.id = PP.id_Producto
    GROUP BY P.nombre
    ORDER BY cantidad_vendida DESC
    LIMIT 1;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_mejor_dia()
BEGIN
    SELECT 
        DATE(Fecha) AS fecha,
        SUM(total) AS total_dia
    FROM Pedidos
    GROUP BY DATE(Fecha)
    ORDER BY total_dia DESC
    LIMIT 1;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_ventas_por_producto()
BEGIN
    SELECT 
        P.nombre AS producto,
        CASE 
            WHEN P.tamanio = 'Postre' THEN 'Comida'
            WHEN P.HC = 1 THEN 'Bebidas Calientes'
            WHEN P.HC = 0 THEN 'Panadería'
            ELSE 'Otro'
        END AS categoria,
        COUNT(*) AS cantidad_vendida,
        P.precio AS precio_unitario,
        ROUND(P.precio * COUNT(*), 2) AS total
    FROM PP
    JOIN Productos P ON P.id = PP.id_Producto
    GROUP BY P.nombre, P.precio, categoria;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE obtener_total_general_productos()
BEGIN
    SELECT 
        ROUND(SUM(total_por_producto), 2) AS total_general
    FROM (
        SELECT 
            P.nombre,
            P.precio * COUNT(*) AS total_por_producto
        FROM PP
        JOIN Productos P ON P.id = PP.id_Producto
        GROUP BY P.nombre, P.precio
    ) AS subconsulta;
END $$


DELIMITER ;

CALL obtener_ventas_totales();
CALL obtener_promedio_diario('2025-06-01', '2025-06-24');
CALL obtener_producto_mas_vendido();
CALL obtener_mejor_dia();
CALL obtener_ventas_por_producto();
CALL obtener_total_general_productos();

