const mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    database:"login_grud",
    user:"root",
    password:"root123",
})

module.exports = connection