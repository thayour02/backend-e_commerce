const express = require('express')

const router = express.Router()

const {addToCart,getCartByEmail,deleteCart,getCartById,updateCartQuantity } = require('../controller/cart')
const  userAuth  = require("../middleware/authMiddleware")
const { route } = require('./menus')

router.post('/add-to-carts',userAuth, addToCart)
router.get('/carts', userAuth, getCartByEmail)
router.delete('/carts/:id',userAuth, deleteCart)
router.get('/carts/:id', getCartById)
router.put('/carts/:id',userAuth,updateCartQuantity)




module.exports = router