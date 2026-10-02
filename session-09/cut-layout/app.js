const express = require('express');
const path = require('path');

const pageRoutes = require('./routes/pageRoutes');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// activate public
app.use(express.static(path.join(__dirname, 'public')));

// EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', pageRoutes);
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
