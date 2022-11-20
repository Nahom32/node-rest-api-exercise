const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');
app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req,res,next)=>{
    const error = new Error('404 not Found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
        message: error.message || 'Internal Server Error',
    }})
})
module.exports = app;
