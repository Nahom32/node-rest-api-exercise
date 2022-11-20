const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/',(req,res,next) =>{
    const productCreated = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST requests',
        product: productCreated
    })
});
router.patch('/:productId',(req,res,next)=>{
    // 
    res.status(200).json({
        message: 'Updated product'
    })
});
router.delete('/:productId', (req,res,next) =>{
    res.status(200).json({
        message: 'Delete Product'
    })
})

module.exports = router;
