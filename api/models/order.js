const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId(),
    noOfOrders: {type: Number, required: true},
})

module.exports = mongoose.model('Order',orderSchema );