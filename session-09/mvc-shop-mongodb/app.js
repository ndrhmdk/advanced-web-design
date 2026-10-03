const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const routes = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.error('MongoDB connection error:', error));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
