const express = require("express");
const path = require("path");
const router = express.Router();
const projectController = require("../controllers/projectController")

router.get("/projetos", (req, res) => {
  const userName = req.session.user.name;
  res.render("projetos", { userName: userName });
});
router.get("/projetos/:id", (req, res) => {
  const userName = req.session.user.name;
  res.render("editaProjeto", { userName: userName });
});

router.get("/api/projetos/getProjetos", projectController.getAllProject);
router.get("/api/projects/:id", projectController.getProjectId);
router.post("/api/projetos/new", projectController.addProject);
router.put("/api/projects/update/:id", projectController.updateProject);
router.delete("/api/projetos/delete/:id", projectController.deleteProject);

module.exports = router;
