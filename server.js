
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
  password: 'angxd.com', // your password
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

//obtener usuarios
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

// login
app.post('/login', (req, res) => {
  const { usuario, telefono } = req.body;

  if (!usuario || !telefono) {
    return res.status(400).json({ error: 'Usuario y telefono requeridos' });
  }

  connection.query(
    'SELECT * FROM Usuarios WHERE nombre = BINARY ? AND telefono = BINARY ?',
    [usuario, telefono],
    (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

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

  // if (!nombre) {
  //   return res.status(400).json({ error: 'No llego el nombre del cliente' });
  // }

  const query = "SELECT * FROM Cliente WHERE nombre LIKE ?";
  const valor = `${nombre}%`;

  connection.query(
    query,
    [valor],
    (error, results) => {
      if (error) return res.status(500).json({ error: error.message });

      if (results.length === 0) {
        return res.json({ });
      }

      const clients = results;

      res.json({clients});
    }
  );
});


//obtener productos
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM Productos', (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
  