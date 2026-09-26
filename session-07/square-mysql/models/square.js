const mysql = require('mysql2');

// create connection to MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

// save information of square to MySQL
const saveSquareData = (sideLength, perimeter, area) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO squares (sideLength, perimeter, area) VALUES (?, ?, ?);';
    pool.query(sql, [sideLength, perimeter, area], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getAllSquares = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM squares ORDER BY id DESC;';
    pool.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { saveSquareData, getAllSquares };
