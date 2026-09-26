require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require('./routes/productRoutes');
const { logger, colors } = require('./utils/logger');

// ejs template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// product routes
app.use('/api', productRoutes);
app.get('/', (req, res) => {
    res.redirect('/api/products');
});

// port listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.success(`Server is running on port http://localhost:${PORT}`);
});
