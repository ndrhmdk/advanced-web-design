const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Product API is running',
        endpoints: {
            products: '/api/products',
        },
    });
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
