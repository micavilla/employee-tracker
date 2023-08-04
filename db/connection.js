const mysql = require('mysql2');

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mica',
  database: 'company_db'
})

module.exports = connect;