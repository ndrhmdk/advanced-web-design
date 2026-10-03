const pool = require('../config/database');

async function getProductsByType(type) {
    const [rows] = await pool.query(
        "SELECT * FROM products WHERE type = ?", [type]
    );
    return rows;
}

module.exports = {getProductsByType};
