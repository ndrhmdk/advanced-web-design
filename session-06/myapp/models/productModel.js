const products = [
    {id: 1, name: 'Laptop', price: 1500},
    {id: 2, name: 'Điện thoại', price: 800},
    {id: 3, name: 'Tai nghe', price: 100}
];

// Get all products.
exports.getAll = () => products;

// Get a product by ID.
exports.getById = (id) => products.find(p => p.id == id);

// Add a new product.
exports.add = (product) => {
    products.push(product);
};
