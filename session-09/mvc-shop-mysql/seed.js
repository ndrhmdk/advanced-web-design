const pool = require('./config/database');
const products = require('./products.json');
const legacyNames = ['Sample Women Top', 'Sample Men Shirt', 'Sample Jacket', 'Sample Shoes'];

async function seedDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [columns] = await connection.query("SHOW COLUMNS FROM products LIKE 'image'");
        if (!columns.length) {
            await connection.query('ALTER TABLE products ADD COLUMN image VARCHAR(255) NULL');
        }
        await connection.beginTransaction();
        for (const [index, product] of products.entries()) {
            const [rows] = await connection.query(
                'SELECT id FROM products WHERE name IN (?, ?) ORDER BY id LIMIT 1',
                [product.name, legacyNames[index]]
            );
            const values = [product.name, product.price, product.image, product.tag, product.type];
            if (rows.length) {
                await connection.query(
                    'UPDATE products SET name = ?, price = ?, image = ?, tag = ?, type = ? WHERE id = ?',
                    [...values, rows[0].id]
                );
            } else {
                await connection.query(
                    'INSERT INTO products (name, price, image, tag, type) VALUES (?, ?, ?, ?, ?)', values
                );
            }
        }
        await connection.commit();
        console.log('Cake products seeded successfully.');
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        if (connection) connection.release();
        await pool.end();
    }
}

seedDatabase();
