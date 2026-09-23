const express = require('express');
const path = require('node:path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import and attach the product router.
const productRouter = require('./routes/product');
app.use('/products', productRouter);
app.get('/', (req, res) => res.redirect('/products'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
