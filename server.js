const express = require("express"); 
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/userRoutes"); 

const port = process.env.PORT || 3000;
const host = "0.0.0.0"; // conexiones desde cualquier dispositivo

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable("x-powered-by");

app.set("port", port);

// Cargar rutas
app.use("/ApiApp", usersRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Bienvenido al backend" });
});

//  manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

// Iniciar servidor
server.listen(port, host, () => {
  console.log(`✅ Servidor iniciado en http://${host}:${port}`);
});

module.exports = app;
