require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Product');

const names = ['Phone', 'Laptop', 'Headphones', 'Keyboard', 'Monitor', 'Mouse', 'Tablet', 'Charger'];
const categories = ['Phone', 'Computer', 'Accessories', 'Audio'];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const makeProduct = () => ({
    name: `${randomItem(names)} ${Math.floor(100 + Math.random() * 900)}`,
    price: Math.floor(100 + Math.random() * 49900),
    category: randomItem(categories),
    stock: Math.floor(Math.random() * 101),
});

const main = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not set. Add it to your .env file.');
    }

    const count = Number.parseInt(process.argv[2], 10) || 20;
    if (count < 1) {
        throw new Error('Seed count must be a positive integer.');
    }

    await mongoose.connect(mongoUri);
    const products = await Product.insertMany(Array.from({ length: count }, makeProduct));
    console.log(`Seeded ${products.length} products.`);
};

main()
    .catch((error) => {
        console.error('Seeding failed:', error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
