const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "192.168.0.3",
  user: "root",
  password: "duvan1918",
  database: "stellar_homes",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a la BD:", err);
    return;
  }
  console.log("✅ Conexión a la base de datos MySQL exitosa!");
});

module.exports = connection;
