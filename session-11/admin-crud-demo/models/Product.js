const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: DataTypes.DECIMAL(10, 2),
    image: DataTypes.STRING
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;
