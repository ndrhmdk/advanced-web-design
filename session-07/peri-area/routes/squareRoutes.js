const express = require('express');
const router = express.Router();
const squareController = require('../controllers/squareController');

// GET: show form
router.get('/squareForm', squareController.showForm);
router.post('/squareCal', squareController.calculateSquare);

router.get('/about', (req, res) => {
    res.render('about', {name: "Trương Hoàng Mình Hiển"})
})

module.exports = router;