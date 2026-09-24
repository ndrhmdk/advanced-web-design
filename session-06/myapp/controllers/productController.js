const productModel = require('../models/productModel');

exports.getProducts = (req, res) => {
    const products = productModel.getAll();
    res.render('products', { products });
};

exports.getProductById = (req, res) => {
    const product = productModel.getById(req.params.id);
    if (product) {
        res.render('productDetail', { product });
    } else {
        res.status(404).render('productDetail', { product: null });
    }
};

exports.addProduct = (req, res) => {
    const photo = typeof req.body.photo === 'string' ? req.body.photo.trim() : '';
    if (photo) {
        try {
            const url = new URL(photo);
            if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol');
        } catch {
            return res.status(400).send('Please enter a valid HTTP or HTTPS image URL.');
        }
    }
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: Number(req.body.price),
        photo
    };
    productModel.add(newProduct);
    res.redirect('/products');
};
