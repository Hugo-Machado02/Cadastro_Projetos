const express = require("express");
const path = require("path");
const router = express.Router();
const projectController = require("../controllers/projectController")

router.get("/projetos", (req, res) => {
  const userName = req.session.user.name;
  res.render("projetos", { userName: userName });
});

router.get("/api/projetos/getProjetos", projectController.getAllProject);
router.post("/api/projetos/new", projectController.addProject);

module.exports = router;
