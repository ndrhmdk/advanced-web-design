const express = require('express');
const path = require('node:path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// import router
const celebRouter = require('./routes/celeb');

// attach router into the app
app.use('/celebs', celebRouter);
app.get('/', (req, res) => res.redirect('/celebs'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
