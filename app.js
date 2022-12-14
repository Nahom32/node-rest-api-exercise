const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');
const userRoutes = require('./api/routes/user.js')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/shop',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user',userRoutes)
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
