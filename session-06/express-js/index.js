const express = require('express');
const app = express()
const port = 3000;

// app.get('/vnuk', (req, res) => {
//     res.send("<h1 style='color: blue; font-size: 70px;'<i>Hello World!</i>");
// })

//ejs
app.set('view engine', 'ejs')

// import router
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

// attach router into the app
app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})