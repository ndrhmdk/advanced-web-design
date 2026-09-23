const productModel = require('../models/productModel');

exports.getProducts = (req, res) => {
    const products = productModel.getAll();
    res.render('products', { products });
};

exports.getProductById = (req, res) => {
    const product = productModel.getById(req.params.id);
    if (product) {
        res.send(`<h1>${product.name}</h1><p>Giá: $${product.price}</p>`);
    } else {
        res.status(404).send('<h1>Không tìm thấy sản phẩm</h1>');
    }
};
