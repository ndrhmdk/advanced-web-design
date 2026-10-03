const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/productModel');
const products = require('./products.json');
const legacyNames = ['Sample Women Top', 'Sample Men Shirt', 'Sample Jacket', 'Sample Shoes'];

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        for (const [index, product] of products.entries()) {
            await Product.findOneAndUpdate(
                { name: { $in: [product.name, legacyNames[index]] } },
                { $set: product },
                { upsert: true, runValidators: true }
            );
        }
        console.log('Cake products seeded successfully.');
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

seedDatabase();