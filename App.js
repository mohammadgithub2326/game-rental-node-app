const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const wishlistRouter = require('./routes/wishlist');
const orderRoutes = require('./routes/orderRoutes');
const cartRouter = require('./routes/cart');
const app = express();


// Middleware
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/v1', usersRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', wishlistRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', usersRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1',usersRouter);



// Define routes
// app.use('/api/rentals', require('./routes/rentals'));
// app.use('/api/auth', require('./routes/auth'));

module.exports = app;
