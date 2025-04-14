const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usersController");

router.post("/users", UserController.create);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;
