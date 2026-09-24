const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET: product list
router.get('/', productController.getProducts);

// GET: product details by ID
router.get('/:id', productController.getProductById);

// POST: add new product
router.post('/', productController.addProduct);

module.exports = router;