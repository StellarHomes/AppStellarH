const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.0.4',
  user: 'root',
  password: 'duvan1918',
  database: 'stellar_homes',
  connectTimeout: 10000, // 10 segundos para asegurar que no es problema de tiempo
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar:', err.code, err.message);
  } else {
    console.log('✅ ¡Conexión exitosa!');
  }
});
