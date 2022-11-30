const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');
const Product = require('../models/product')
router.get('/',(req,res,next) =>{
    Order.find()
        .select('_id noOfOrders product')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                order: docs.map(doc =>{
                    return {
                        id : doc._id,
                        product: doc.product,
                        noOfOrders: doc.noOfOrders,
                    }
                })
            })
        })
})
router.get('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    Order.findById(id)
        .select('_id product noOfOrders')
        .populate('product')
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
    Product.findById(req.body.product)
            .then(result =>{
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
            })})
            .catch(err =>{
                res.status(404).json({
                    message: "Not found"
                })
            })
    
});
router.delete('/:orderId', (req,res,next) =>{
    let id = req.params.orderId
    Order.remove({_id: id})
        .exec()
        .then(result => {
            res.status(204).json({
                message: "The requested object has been deleted"
            })
        })
        .catch(err =>{
            res.json({
                message: err.message
            })
        })
    

})

router.patch('/:orderId',(req,res,next)=>{
    id = req.params.orderId;
    let updateOps = {}
    for(let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Order.update({_id:id},{$set:updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Update is successful'
            })
        })


})
module.exports = router;  


