const { Product } = require('../models');
const path = require('path');
const fs = require('fs');
const UPLOAD_DIR = path.resolve(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');

module.exports = {
    create: async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const parsedPrice = Number(price);
            if (!name || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
                return res.status(400).json({ success: false, message: 'Name and a non-negative price are required' });
            }
            const imageFile = req.file ? req.file.filename : null;

            const product = await Product.create({
                name, price: parsedPrice, description, image: imageFile
            });

            return res.status(201).json({ 
                success: true, 
                product 
            });
        } catch (error) {
            if (req.file) {
                const filePath = path.join(UPLOAD_DIR, path.basename(req.file.filename));
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    list: async (req, res) => {
        try {
            const products = await Product.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.json({ success: true, products });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false, 
                message: error.message
            });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({success: false, message: 'Not found'});

            return res.json({ success: true, product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        let uploadedFile = req.file;
        try {
            const { name, price, description } = req.body;
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ success: false, message: 'Not found' });

            const oldImage = product.image;
            if (uploadedFile) {
                product.image = uploadedFile.filename;
            }
            if (name !== undefined) product.name = name;
            if (price !== undefined) {
                const parsedPrice = Number(price);
                if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
                    return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
                }
                product.price = parsedPrice;
            }
            if (description !== undefined) product.description = description;

            await product.save();
            if (uploadedFile && oldImage) {
                const oldPath = path.join(UPLOAD_DIR, path.basename(oldImage));
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            return res.json({ success: true, product });
        } catch (error) {
            if (uploadedFile) {
                const newPath = path.join(UPLOAD_DIR, path.basename(uploadedFile.filename));
                if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
            }
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({success: false, message: 'Not found'});
            if (product.image) {
                const filePath = path.join(UPLOAD_DIR, path.basename(product.image));
                if (fs.existsSync(filePath)) 
                    fs.unlinkSync(filePath);
            }

            await product.destroy();
            return res.json({success: true, message: 'Deleted'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({success: false, message: error.message});
        }
    }
};
