const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const routes = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.error('MongoDB connection error:', error));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));