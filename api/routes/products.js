const express = require('express');
const Product = require('../models/product')
const mongoose = require('mongoose')
const router = express.Router();

router.get('/',(req,res,next) =>{
    Product.find()
            .exec()
            .then(docs => {
                if (docs) res.status(200).json(docs)
                else res.status(404).json({
                    message: 'Not found'
                })
                
            })
            .catch(err =>{
                res.status(500).json({
                    message: err.message
                })
            })
    
})
router.get('/:productId',(req,res,next)=>{
    id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc =>{
        
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json({
            error: err.message
        })
    })
});
router.post('/',(req,res,next) =>{
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result=>{
        console.log(result)
    }).catch(err => console.error(err))
    res.status(201).json({
        message: 'Handling POST requests',
        product: product
    })
});
router.patch('/:productId',(req,res,next)=>{
    // 
    res.status(200).json({
        message: 'Updated product'
    })
});
router.delete('/:productId', (req,res,next) =>{
    let id = req.params.productId
    let object = Product.findById(id)
    Product.remove({_id: id})
            .exec()
            .then(result =>{
                res.status(200).json({
                    object: object,
                    message: 'The above object is deleted',
                })
            })
            .catch(err =>{
                res.status(404).json({
                    message: err.message
                })
            })
})

module.exports = router;
