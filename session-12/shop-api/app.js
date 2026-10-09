require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('./models');
const productRoutesFactory = require('./routes/productRoutes');

const app = express()
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.resolve(__dirname, process.env.UPLOAD_DIR || 'uploads');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g,'-');
        cb(null, `${base}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) 
        return cb(new Error('Only images allowed'), false);
    cb(null, true);
};

const upload = multer({storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter});

// mount routes with upload instance
app.use('/api/products', productRoutesFactory(upload));

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Only images allowed') {
        return res.status(400).json({ success: false, message: err.message });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
});

// simple homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// sync db and start
(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected.');

        const queryInterface = sequelize.getQueryInterface();
        const tableExists = await queryInterface.tableExists('products');
        if (!tableExists) {
            await sequelize.models.Product.sync();
        } else {
            // Alter sync rewrites legacy timestamp columns and fails when they
            // contain MySQL zero dates. Add only missing columns instead.
            const columns = await queryInterface.describeTable('products');
            const attributes = sequelize.models.Product.getAttributes();
            for (const [attribute, definition] of Object.entries(attributes)) {
                const column = definition.field || attribute;
                if (columns[column]) continue;

                const safeDefinition = { ...definition };
                if (column === 'createdAt' || column === 'updatedAt') {
                    safeDefinition.allowNull = true;
                }
                await queryInterface.addColumn('products', column, safeDefinition);
            }
        }
        console.log('DB synced.')

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exitCode = 1;
    }
})();
