const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

router.post('/', productCtrl.createProduct);
router.get('/', productCtrl.getAllProducts);
router.get('/search', productCtrl.searchProducts);
router.get('/sort', productCtrl.sortProducts);
router.get('/page', productCtrl.paginateProducts);
router.get('/avg', productCtrl.avgPriceByCategory);
router.put('/increase', productCtrl.increasePrice);
router.delete('/delete-category', productCtrl.deleteByCategory);
router.get('/:id', productCtrl.getProductById);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;
