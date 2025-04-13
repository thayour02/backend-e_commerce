const payment = require('../model/payment')
const Payment = require ('../model/payment')
const Cart = require("../model/cart")
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const stripe = require("stripe")(process.env.STRIPE_KEY);
require('dotenv').config()

//stripe
const PaymentIntent = async(req,res)=>{
    const {price } = req.body;
    const amount = price * 100  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: "Payment failed" }); // This is correct
    }
  }

  // payment info
const CreatePayment = async(req,res)=>{
    const payment = req.body
    try {
        const pay = await Payment.create(payment);
  
        // Delete cart items
        const cartId = pay.menuItem.map(id => new mongoose.Types.ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartId } });
    
        res.status(200).json(pay)
        // res.status(200).json(deleteCartRequest)

    } catch (error) {
        throw new Error(error)
    }
}

const getOrder = async(req,res)=>{
    const email = req.query.email;
    const query = {email:email}

    try {
        const decodedEmail = req.decoded.email;

        if(email !== decodedEmail){
             res.status(403).json({message:'forbidden fruit'})
        }
        const result = await Payment.find(query).sort({createdAt: -1}).exec();

        res.status(200).json(result);
    } catch (error) {
        
    }
}

const updateOrder = async (req, res) => {
  const orderId = req.params.id

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(orderId, 
     { status: 'order confirm' }, // update
      { new: true,runValidators:true} // return the updated document
    );

    if (!updatedPayment) {
      return res.status(404).json(
        {  message: "Payment not found for this email"}
      );
    }
    res.status(200).json({updatedPayment, success:true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteOrder = async(req,res)=>{
  try {
    const orderId = req.params.id

    const order = await Payment.findByIdAndDelete(orderId)

    if(!order){
      return res.status(404).send('order not found')
    }
    res.status(200).json({
      success:true,
      message:'order deleted successfully'
    })
  } catch (error) {
    throw new Error(error)
  }
}


const getPayment = async(req,res)=>{
  try {
    const payments = await Payment.find({}, 'price'); 

    // Extract prices from Payment query and calculate total
    const totalPrice = payments.reduce((sum, item) => sum + Number(item.price), 0);

    res.status(200).json({
      totalPrice,
      price:payments
    })
  } catch (error) {
    throw new Error(error)
  }
}



module.exports ={ CreatePayment,getOrder,PaymentIntent,getPayment,updateOrder,deleteOrder}