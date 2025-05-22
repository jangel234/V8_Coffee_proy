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

-- Simulación de pedidos realizados en distintos días de mayo de 2025
INSERT INTO Pedidos (Fecha, id_Cliente, id_Empleado)
VALUES 
('2025-05-01 10:30:00', 1, 4),
('2025-05-01 11:00:00', 2, 4),
('2025-05-02 09:45:00', 3, 4),
('2025-05-03 14:20:00', 4, 4),
('2025-05-03 15:10:00', 5, 4),
('2025-05-04 12:05:00', 6, 4),
('2025-05-04 13:55:00', 7, 4),
('2025-05-05 08:30:00', 8, 4),
('2025-05-05 09:00:00', 9, 4),
('2025-05-05 10:30:00', 1, 4);

-- Relación pedidos-productos
INSERT INTO PP (id_Producto, id_Pedido) VALUES
(1,1),(2,1),(3,2),(1,3),(4,4),(1,5),(1,6),(1,7),(5,8),(1,9),(1,10);

-- Pedidos prueba para la vista de venta por producto
INSERT INTO Pedidos (Fecha, id_Cliente, id_Empleado)
VALUES 
('2025-05-06 09:10:00', 2, 4),
('2025-05-06 10:30:00', 3, 4);

INSERT INTO PP (id_Producto, id_Pedido) VALUES
(3,11),(4,11),(2,12),(2,12),(2,12);


CREATE OR REPLACE VIEW ventas_por_mes AS
SELECT 
    DATE_FORMAT(Fecha, '%Y-%m') AS mes,
    SUM(total) AS total_ventas
FROM Pedidos
GROUP BY mes;

CREATE OR REPLACE VIEW promedio_diario_por_mes AS
SELECT 
    DATE_FORMAT(Fecha, '%Y-%m') AS mes,
    COUNT(DISTINCT DATE(Fecha)) AS dias_con_ventas,
    SUM(total) / COUNT(DISTINCT DATE(Fecha)) AS promedio_diario
FROM Pedidos
GROUP BY mes;

CREATE OR REPLACE VIEW producto_mas_vendido_mes AS
SELECT 
    mes,
    nombre_producto,
    cantidad
FROM (
    SELECT 
        DATE_FORMAT(p.Fecha, '%Y-%m') AS mes,
        pr.nombre AS nombre_producto,
        COUNT(*) AS cantidad,
        RANK() OVER (PARTITION BY DATE_FORMAT(p.Fecha, '%Y-%m') ORDER BY COUNT(*) DESC) AS rnk
    FROM PP
    JOIN Pedidos p ON p.id = PP.id_Pedido
    JOIN Productos pr ON pr.id = PP.id_Producto
    GROUP BY mes, pr.nombre
) ranked
WHERE rnk = 1;


CREATE OR REPLACE VIEW mejor_dia_venta_mes AS
SELECT 
    mes,
    dia,
    total_dia
FROM (
    SELECT 
        DATE_FORMAT(Fecha, '%Y-%m') AS mes,
        DATE(Fecha) AS dia,
        SUM(total) AS total_dia,
        RANK() OVER (PARTITION BY DATE_FORMAT(Fecha, '%Y-%m') ORDER BY SUM(total) DESC) AS rnk
    FROM Pedidos
    GROUP BY mes, dia
) ranked
WHERE rnk = 1;

CREATE OR REPLACE VIEW ventas_por_producto AS
SELECT 
    p.nombre AS producto,
    CASE 
        WHEN p.tamanio = 'Postre' THEN 'Postre'
        WHEN p.HC = 1 THEN 'Bebidas Calientes'
        WHEN p.HC = 0 THEN 'Bebidas Frías'
        ELSE 'Otro'
    END AS categoria,
    COUNT(pp.id) AS cantidad_vendida,
    p.precio,
    COUNT(pp.id) * p.precio AS total
FROM PP pp
JOIN Productos p ON pp.id_Producto = p.id
GROUP BY producto, categoria, p.precio;