const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbPath = process.env.DB_PATH || "database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../", dbPath),
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

module.exports = sequelize;
