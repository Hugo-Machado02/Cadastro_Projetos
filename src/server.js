const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routers/configRouters");
const path = require("path");
require("dotenv").config({ path: ".env" });
const create = require("./db/createTables");

create();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", apiRoutes);

const service = app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${service.address().port}`);
});
