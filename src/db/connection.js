const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("Tentando conectar ao banco de dados:");
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`Username: ${process.env.DB_USERNAME}`);

const sequelizeInstance = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  logging: false,
  retry: {
    max: 10,
    timeout: 30000
  }
});

global.sequelizeInstance = sequelizeInstance;

module.exports = sequelizeInstance;