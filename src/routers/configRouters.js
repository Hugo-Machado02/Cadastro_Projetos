const express = require("express");
const path = require("path");
const router = express.Router();
const sessionAuth = require("../middleware/sessionAuth");
const authRouter = require("./authRouter");
const userRouter = require("./userRouters");
const projectRouter = require("./projectRouters");

router.get("/", sessionAuth, (req, res) => {
    const userName = req.session.user.name;
    res.render("home", { userName: userName });
});

router.use("/", authRouter);
router.use("/", sessionAuth, userRouter);
router.use("/", sessionAuth, projectRouter);

router.get("/test-service", (req, res) => {
  res.json({ return: "Servidor Rodando" });
});

router.use((req, res, next) => {
  res.render("404");
});

module.exports = router;
