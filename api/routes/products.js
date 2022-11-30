const express = require('express');
const Product = require('../models/product')
const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+file.filename)
    }
})
const upload = multer({dest: 'uploads/'});

router.get('/',(req,res,next) =>{
    Product.find()
            .select('name price _id')
            .exec()
            .then(docs => {
                let response = {
                    count:docs.length,
                    products: docs.map(doc =>{
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response)
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
    .select('name _id price')
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
router.post('/',upload.single('productImage'),(req,res,next) =>{
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result=>{
        res.status(201).json({
            message: 'Handling POST requests',
            product: {
                message: 'Successfully Stored',
                type: 'GET',
                link:`localhost:3000/products/${product._id}`   
            }
        })
    }).catch(err => console.error(err))
    
});
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    let updateOps = {};
    for(let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, {$set: updateOps})
            .exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(404).json({
                    message : err.message
                })
            })
});
router.delete('/:productId', (req,res,next) =>{
    let id = req.params.productId
    let object = Product.findById(id)
    Product.remove({_id: id})
            .exec()
            .then(result =>{
                res.status(204).json({
                    message: 'Object deleted Successfully',
                    objectRemoved: object
                })
            })
            .catch(err =>{
                res.status(500).json({
                    message: err.message
                })
            })
})

module.exports = router;
