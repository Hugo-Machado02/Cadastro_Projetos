const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/usuarios", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/usuarios.html"));
});

router.get("/api/users/getUsers", userController.getAllUsers);
router.post("/api/users/new", userController.addUser);
// router.post("/api/users/update", userController.update);
//router.post("/users/delete", userController.create);

module.exports = router;
