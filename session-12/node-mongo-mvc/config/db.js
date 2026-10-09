const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not set. Add it to your .env file.');
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

module.exports = connectDB;
