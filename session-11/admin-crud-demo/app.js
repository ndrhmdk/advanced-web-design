const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/admin', adminRoutes);
app.get('/', (req, res) => res.redirect('/admin'));

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const count = await Product.count();
        const targetCount = 100;
        if (count < targetCount) {
            const demoData = [];
            for (let i = count + 1; i <= targetCount; i++) {
                demoData.push({
                    name: `Product ${String(i).padStart(3, '0')}`,
                    price: Math.floor(Math.random() * 1000) + 100,
                    image: 'default.jpg'
                });
            }
            await Product.bulkCreate(demoData);
            console.log(`Seeded ${demoData.length} products; table now has ${targetCount}.`);
        }
        console.log('Database connected.');
        app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
    } catch (err) {
        console.error('Startup failed:', err.message);
        await sequelize.close();
        process.exitCode = 1;
    }
}

if (require.main === module) start();
module.exports = app;
