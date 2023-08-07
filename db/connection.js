// Import mysql2
const mysql = require('mysql2');

// Connect to database
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mica',
  database: 'company_db'
})

// Connection exported as module
module.exports = connect;