const mysql = require("mysql");

// Une connexion mysql

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "qwestbd",
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database Connected Successfully!!!");
});

module.exports = dbConn;
