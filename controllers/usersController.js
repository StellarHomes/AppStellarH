const User = require("../models/user");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const SECRET_KEY = "tu_secreto_super_seguro"; 

const UserController = {
  create: (req, res) => {
    const { email, name, lastname, phone, password } = req.body;

    if (!email || !name || !lastname || !phone || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Encriptar la contraseña antes de guardarla
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Error al encriptar la contraseña" });

      const newUser = { email, name, lastname, phone, password: hashedPassword };

      User.create(newUser, (err, result) => {
        if (err) {
          console.error("Error al crear usuario:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
        res.status(201).json({ message: "Usuario creado con éxito", id: result.insertId });
      });
    });
  },

  getAll: (req, res) => {
    User.getAll((err, results) => {
      if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
      res.json(results);
    });
  },

  getById: (req, res) => {
    const userId = req.params.id;
    User.getById(userId, (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener usuario" });
      if (!result.length) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(result[0]);
    });
  },

  update: (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    User.update(userId, updateData, (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar usuario" });
      res.json({ message: "Usuario actualizado con éxito" });
    });
  },

  delete: (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar usuario" });
      res.json({ message: "Usuario eliminado con éxito" });
    });
  },

  // ✅ Nueva función para login
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // Buscar el usuario en la base de datos
    User.getByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Comparar la contraseña ingresada con la almacenada
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ error: "Error al verificar la contraseña" });

        if (!match) {
          return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar token de autenticación
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "24h" });

        res.json({ message: "Login exitoso", token });
      });
    });
  }
};

module.exports = UserController;
