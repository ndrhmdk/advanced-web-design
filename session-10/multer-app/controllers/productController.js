const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

// 1. show product list
exports.getAllProducts = async (req, res) => {
    try {
        const { q } = req.query;
        let filter = {};
        if (q) filter.name = { $regex: q.trim(), $options: 'i'};
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.render('index', { products, searchQuery: q || '' });
    } catch (err) {
        res.status(500).send('Error while loading product list:', err.message);
    }
};

// 2. new product form
exports.showAddProductForm = (req, res) => {
    res.render('add');
};

// 3. adding new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-product.png';

        const newProduct = new Product({ name, price, quantity, image });
        await newProduct.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send('Cannot add product:', err.message);
    }
};

// 4. edit form
exports.showEditProductForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Cannot find product.');
        res.render('edit', { product });
    } catch (err) {
        res.status(500).send('Server error:', err.message);
    }
}

// 5. update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const updateData = { name, price, quantity };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { returnDocument: 'after', runValidators: true });
        if (!product) return res.status(404).send('Cannot find product.');
        res.redirect('/');
    } catch (err) {
        res.status(400).send('Cannot update product', err.message);
    }
};

// 6. delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Cannot find product.');

        if (product.image && !product.image.includes('default')) {
            const filePath = path.join(__dirname, '../public', product.image.replace(/^\//, ''));
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                if (err.code !== 'ENOENT') throw err;
            }
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Cannot delete product: ' + err.message);
    }
};

// 7. product details
exports.showProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Cannot find product');
        res.render('show', { product });
    } catch (err) {
        res.status(500).send('Server error:', err.message);
    }
};
