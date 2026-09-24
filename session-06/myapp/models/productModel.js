const products = [
    {id: 1, name: 'Laptop', price: 1500, photo: "https://laptopkimanh.vn/upload/image/product/2aoboqowsfmf7in79jaoovezhoaxjbuoz5t1hiam.jpg"},
    {id: 2, name: 'iPhone', price: 800, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiK1S4MMOHbrkzS5sM8p3FDo3JDpc967nmKWa0JcgMzA&s=10"},
    {id: 3, name: 'Headphone', price: 100, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPPWU049mWrCHUGw3u83RzY4AS6C_Fk-IXS4Tc9OXxw&s=10"}
];

// Get all products.
exports.getAll = () => products;

// Get a product by ID.
exports.getById = (id) => products.find(p => p.id == id);

// Add a new product.
exports.add = (product) => {
    products.push(product);
};
