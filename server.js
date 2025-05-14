
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite que el navegador acceda a la API
app.use(express.json()); // Permite recibir JSON

// Configurar conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your user
  // password: 'angxd.com', // angel
  // password: 'nose', // ian
  // password: 'soygay23', // cesarin
   password: null, // pollo
  database: 'V8Coffee' // name of your database
});

// Conexion a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// solicitudes
// //
// //
// //

// login
app.post('/login', (req, res) => {
  const { usuario, telefono } = req.body;

  // validacion
  if (!usuario || !telefono) {
    return res.status(400).json({ error: 'Usuario y telefono requeridos' });
  }

  // conexion
  connection.query(
    'SELECT * FROM Usuarios WHERE nombre = BINARY ? AND telefono = BINARY ?',
    [usuario, telefono],
    (error, results) => {
      // posibles errores
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      //resultado 
      const user = results[0];

      res.json({
        success: true,
        message: 'Login exitoso',
        user
      });
    }
  );
});

// busequeda de clientes  --    nombre LIKE nombre%
app.post('/clients', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'No llego el nombre del cliente' });
  }

  // fusion de query con el nombre para que tome en cuenta el LIKE = xxx%
  const query = "SELECT * FROM Clientes WHERE nombre LIKE ?";
  const valor = `${nombre}%`;

  connection.query(
    query,
    [valor],
    (error, results) => {
      // posibles errores
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.json({ });
      }

      //resultados
      const clients = results;

      res.json({clients});
    }
  );
});

// registro nuevo cliente
app.post('/newClient', async (req, res) => {
  const { nombre, telefono } = req.body;

  // Validación básica
  // if (!nombre || !telefono) {
  //   return res.status(400).json({ error: 'Todos los campos son requeridos' });
  // }

  try {
    // consulta
    const [existing] = await connection.promise().query(
      'SELECT * FROM Clientes WHERE telefono = ?',
      [telefono]
    );

    //validacion
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Usuario ya existente' });
    }

    // Insertar nuevo usuario
    const [result] = await connection.promise().query(
      'INSERT INTO Clientes (nombre, telefono) VALUES (?, ?)',
      [nombre, telefono]
    );

    //respuesta
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: result.insertId
    });

    //error
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//obtener productos
app.get('/coldProducts', (req, res) => {
  // conexion
  connection.query('SELECT * FROM Productos WHERE HC = 0', (error, results) => {
    if (error) {
      //error
      res.status(500).json({ error: error.message });
      return;
    }
    // resultados en formato json
    res.json(results);
  });
});

app.get('/hotProducts', (req, res) => {
  // conexion
  connection.query('SELECT * FROM Productos WHERE HC = 1', (error, results) => {
    if (error) {
      //error
      res.status(500).json({ error: error.message });
      return;
    }
    // resultados en formato json
    res.json(results);
  });
});

app.get('/dessertProducts', (req, res) => {
  // conexion
  connection.query('SELECT * FROM Productos WHERE tamanio = "Postre"', (error, results) => {
    if (error) {
      //error
      res.status(500).json({ error: error.message });
      return;
    }
    // resultados en formato json
    res.json(results);
  });
});


/////////////////////////////////////// TEST PARA BACKEND ///////////////////////////////////////////////
//en desuso
// app.get('/users', (req, res) => {
//   connection.query('SELECT nombre FROM users', (error, results) => {
//     if (error) {
//       res.status(500).json({ error: error.message });
//       return;
//     }
//     res.json(results);
//   });
// });
app.post('/deleteClient', (req, res) => {
  const {telefono} = req.body;
  
  // Encontrar y eliminar el elemento
  connection.query(
    'DELETE FROM Clientes WHERE telefono = ?',
    [telefono],
    (error, results) => {
      // posibles errores
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Alv' });
      }


      res.json({
        success: true,
        message: 'Eliminacion Exitosa',
        results
      });
    }
  );
});

///////////////////////////////////////// FIN DE TEST ////////////////////////////////////////////////



// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
  