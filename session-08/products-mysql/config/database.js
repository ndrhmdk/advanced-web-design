const mysql = require('mysql2');
const { logger, colors } = require('../utils/logger');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
})

connection.connect((error) => {
    if (error) {
        logger.error(`Database connection failed: ${error.message}`);
        return;
    }
    logger.success(`Connected to MySQL Database ${process.env.DB_NAME}`);
    console.log(`${colors.magenta}Database host:${colors.reset} ${colors.bgBlue}${process.env.DB_HOST}${colors.reset}`);
})

module.exports = connection;