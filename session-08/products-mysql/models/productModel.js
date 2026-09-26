const db = require('../config/database');

const Product = {
    getAllProducts: (callback) => {
        db.query('SELECT * FROM product', (error, results) => {
            if (error) return callback(error);
            return callback(null, results);
        });
    },

    createProduct: (productData, callback) => {
        db.query('INSERT INTO product (name, price, description) VALUES (?, ?, ?);',
            [productData.name, productData.price, productData.description],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    }
};

module.exports = Product