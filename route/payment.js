const express = require('express')

const router = express.Router()

const {CreatePayment,getOrder, PaymentIntent, getPayment, updateOrder, deleteOrder }  = require('../controller/payment')
const userAuth = require('../middleware/authMiddleware')

router.post('/payment',userAuth, CreatePayment)
router.get('/get-order',userAuth, getOrder)
router.post('/create-payment-intent', PaymentIntent)
router.get('/get-revenue',userAuth, getPayment)
router.put('/confirm-order/:id',userAuth, updateOrder)
router.delete('/delete-order/:id',userAuth, deleteOrder)

module.exports = router