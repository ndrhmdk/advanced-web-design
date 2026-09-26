const Product = require('../models/productModel');

const productController = {
    getProducts: (req, res) => {
        Product.getAllProducts((error, products) => {
            if (error) return res.status(500).json({error: "Database query error."});
            return res.render('products', {products});
        });
    },

    showAddProductForm: (req, res) => {
        return res.render('formProduct', {product: {}});
    },

    addProduct: (req, res) => {
        const productData = req.body;
        Product.createProduct(productData, (error) => {
            if (error) return res.status(500).json({error: 'Failed to add product.'});
            return res.redirect('/api/products');
        });
    }
};

module.exports = productController;
