const pool = require('../config/database');

async function getProductsByType(type) {
    const [rows] = await pool.query(
        "SELECT * FROM products WHERE type = ?", ["new"]
    );
    return rows;
}

module.exports = {getProductsByType};