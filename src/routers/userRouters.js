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
router.get("/api/users/getUsersActive", userController.getUsersActive);
router.get("/api/users/:id", userController.getUserId);
router.post("/api/users/new", userController.addUser);
router.put("/api/users/updateStatus/:id", userController.updateStatus);
router.put("/api/users/update/:id", userController.updateUser);
// router.post("/users/delete", userController.create);

module.exports = router;
