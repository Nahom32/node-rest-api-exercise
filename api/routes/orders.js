const express = require('express');
const router = express.Router();

router.get('/:productId',(req,res,next) => {
    res.status(200).json({
        message: 'Orders were fetched',
        id: req.params.productId
    })
});

router.post('/:productId',function(req,res,next){
    let order = {
        id: req.body.id,
        noOrders: req.body.noOrders
    }
    res.status(201).json({
        message: 'Orders were created',
        id: req.params.productId
    })
});
module.exports = router;  


