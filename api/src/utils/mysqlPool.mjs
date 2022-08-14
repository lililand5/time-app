import mysql from 'mysql2'

const MYSQL_HOST = process.env.MYSQL_HOST || 'mysql'
const MYSQL_USER = process.env.MUSQL_HOST || 'root'
const MYSQL_PORT = process.env.MUSQL_PORT || '3306'
const MYSQL_PASSWORD = process.env.MUSQL_PASSWORD || 'password'
const MYSQL_DB = process.env.MUSQL_DB || 'admin'

// console.log(process.env.MYSQL_HOST)

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'MYSQL_HOST',
  port: 'MYSQL_PORT',
  user: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: 'MYSQL_DB',
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTimeTable = CREATE_TIMES_TABLE_SQL
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created')
      }
    })
    connection.release()
  }
})

export default pool
