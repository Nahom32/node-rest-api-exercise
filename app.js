const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products.js')


app.use('/products', productRoutes);

module.exports = app;
