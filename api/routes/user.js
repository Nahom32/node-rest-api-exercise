const express = require('express');
const Product = require('../models/product')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
router.post('/signup',async (req,res,next)=>{
    let val = await User.find({email: req.body.email});
    console.log(typeof(val), val)
    if(val.length < 1){
        bcrypt.hash(req.body.password,10, async (err,hash)=>{
            if(err) {
                res.status(500).json({
                error: err.message
            })
        } else{
           
            const  user = await new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })
            try{
            await user.save().then(fin =>{
                res.status(201).json({
                    message: "User is created"
                })
            })
            
        } catch(e){
            res.status(404).json({
                message: "error message"
            })
        }
    }  
    })
    }else{
        return res.status(409).json({
            "message": "There is a conflict"
        })
    } 
}  
)
router.post("/login", (req,res,next) => {
    User.find({email:req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: "Authorization failed"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err, fin)=>{
                if (err){
                    return res.status(401).json({
                        message: "Authentication failed"
                    })
                }
                if (fin){
                    return res.status(200).json({
                        message: "Authentication passed"

                    })
                }
                res.status(401).json({
                    message: "Authentication failed"
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
router.delete('/:userId',(req,res,next)=>{
    User.remove({_id: req.params.userId}).exec().then(val => {
        res.status(204).json({
            message: "Object deleted."
        })
    }).catch(err =>{
        res.status(404).json({
            message: "The Object doesn't exist."
        })
    })
})
module.exports = router;
