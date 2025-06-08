const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/usuarios", (req, res) => {
  const userName = req.session.user.name || "Hugo Machado";
  res.render("usuarios", { userName: userName });
});


router.get("/usuarios/:id", (req, res) => {
  const userName = req.session.user.name;
  res.render("editaUsuario", { userName: userName });
});

router.get("/api/users/getUsers", userController.getAllUsers);
router.post("/api/users/new", userController.addUser);
router.post("/api/users/update", userController.update);
// router.post("/users/delete", userController.create);

module.exports = router;
