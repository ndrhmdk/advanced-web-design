const express = require('express');
const router = express.Router();

const products = [
    {id: 1, name: 'Robert Pattinson', networth: 300_000_000},
    {id: 2, name: 'Tom Holland', networth: 30_000_000},
    {id: 3, name: 'Taylor Swift', networth: 1_000_000_000}
]

router.get('/', (req, res) => {
    res.render('products', { products });
});

module.exports = router;