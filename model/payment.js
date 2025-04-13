const mongoose  = require('mongoose')

const paymentschema = new mongoose.Schema({
    transactionId: {type:String},
    email: {type:String},
    price:{type:Number},
    quantity:{type:Number},
    status:{type:String},
    itemName:{type:Array},
    cartItem:{type:Array},
    menuItem:{type:Array},
    createdAt: { type: Date, default: Date.now },

},{Timestamp:true})

module.exports = mongoose.model('Payment', paymentschema);