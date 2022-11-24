const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');
const Product = require('../models/product')
router.get('/',(req,res,next) =>{
    Order.find()
        .select('_id noOfOrders product')
        .populate('product')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                order: docs.map(doc =>{
                    return {
                        id : doc._id,
                        product: doc.product,
                    }
                })
            })
        })
})
router.get('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    Order.findById(id)
        .select('_id product noOfOrders')
        .exec()
        .then(doc =>{
            res.status(200).json({
                _id: doc._id,
                product: doc.product,
                noOfOrders: doc.noOfOrders,
            })
        })

});

router.post('/',function(req,res,next){
    let order = new Order({
        _id:  new mongoose.Types.ObjectId(),
        product: req.body.product,
        noOfOrders: req.body.noOfOrders
    })
    order.save().then(doc => {
        res.status(201).json({
            message: 'Order has been sent',
            link: `localhost:3000/orders/${order._id}`
        })
    })
});
module.exports = router;  


