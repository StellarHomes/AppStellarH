 const db = require("../config/config"); // ✅ Corrección de la ruta de conexión

const User = {
  create: (userData, callback) => {
    const query = "INSERT INTO users SET ?";
    db.query(query, userData, callback);
  },

  getAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },

  update: (id, userData, callback) => {
    const query = "UPDATE users SET ? WHERE id = ?";
    db.query(query, [userData, id], callback);
  },

  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = User;
