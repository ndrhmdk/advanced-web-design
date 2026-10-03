const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    tag: {
        type: String,
        default: null
    }, 
    type: {
        type: String,
        enum: ['new', 'top'],
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);