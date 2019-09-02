const Sequelize = require("sequelize");
exports.sequelize = new Sequelize("personDb", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
