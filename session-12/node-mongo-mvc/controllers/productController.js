const Product = require('../models/Product');

/** CREATE: create new product */
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/** READ: get product list */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/** READ: get by ID */
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) 
            return res.status(404).json({ message: 'Cannot find product.' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** UPDATE: update/edit product */
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, {new: true});
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** DELETE: delete product */
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted product.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Search products by category and/or maximum price */
exports.searchProducts = async (req, res) => {
    try {
        const { category, maxPrice } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (maxPrice !== undefined) {
            const price = Number(maxPrice);
            if (!Number.isFinite(price) || price < 0) {
                return res.status(400).json({ message: 'maxPrice must be a non-negative number.' });
            }
            filter.price = { $lte: price };
        }

        res.json(await Product.find(filter));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Sort products by price */
exports.sortProducts = async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        res.json(await Product.find().sort({ price: order }));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Return one page of products */
exports.paginateProducts = async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page, 10) || 1;
        const limit = Number.parseInt(req.query.limit, 10) || 5;
        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'page and limit must be positive integers.' });
        }

        const data = await Product.find().skip((page - 1) * limit).limit(limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Calculate average product price for each category */
exports.avgPriceByCategory = async (req, res) => {
    try {
        const result = await Product.aggregate([
            { $group: { _id: '$category', avgPrice: { $avg: '$price' } } },
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Increase prices in a category by 10% */
exports.increasePrice = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return res.status(400).json({ message: 'category is required.' });
        }

        const result = await Product.updateMany({ category }, { $mul: { price: 1.1 } });
        res.json({ message: 'Prices increased by 10%.', modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** Delete all products in a category */
exports.deleteByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return res.status(400).json({ message: 'category is required.' });
        }

        const result = await Product.deleteMany({ category });
        res.json({ message: `Deleted ${result.deletedCount} products in ${category}.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
