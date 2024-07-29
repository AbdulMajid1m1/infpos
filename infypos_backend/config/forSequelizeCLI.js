const config = require("./index.js");

module.exports = {
  dialect: "mssql",
  database: config.get("db.name"),
  username: config.get("db.username"),
  password: config.get("db.password"),
  host: config.get("db.host"),
};
