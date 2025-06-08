const express = require("express");
const path = require("path");
const router = express.Router();
const loginController = require("../controllers/loginController");
const sessionAuth = require("../middleware/sessionAuth");

router.get("/login", (req, res) => {
  if(req.session.user){
    return res.redirect("/");
  }
  res.render("login");
});

router.post("/api/login", loginController.login);
router.post("/api/logout", sessionAuth, loginController.logout);

module.exports = router;