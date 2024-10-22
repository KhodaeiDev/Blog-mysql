const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
  host: configs.db.host,
  database: configs.db.name,
  username: configs.db.user,
  password: configs.db.password,
  port: configs.db.port,
  dialect: configs.db.dialect,
  logging: configs.isProductions ? false : console.log,
});

module.exports = db;
