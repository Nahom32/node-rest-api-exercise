const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId(),
    noOfOrders: Number,
})

module.exports = mongoose.model('Order',orderSchema );