const { newProducts, topProducts } = require('../models/productModel');	
	
exports.getHomePage = (req, res) => {	
    res.render('layout', { newProducts, topProducts });	
};