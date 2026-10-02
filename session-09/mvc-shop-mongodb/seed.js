const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

const products = [
    {
        name: "Sample Women Top",
        price: 45,
        tag: "new",
        type: "new"
    },
    {
        name: "Sample Men Shirt",
        price: 55,
        type: "new"
    },
    {
        name: "Sample Jacket",
        price: 120,
        tag: "hot",
        type: "top"
    },
    {
        name: "Sample Shoes",
        price: 80,
        type: "top"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        
        await Product.deleteMany();

        await Product.insertMany(products);
        console.log('Product insered successfully.')
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.connection.close(); 
    }
}

seedDatabase();