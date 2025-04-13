const express = require("express")

const router = express.Router()

const { getAllUser,createUser, getAdmin,deleteUser, makeAdmin, getUserByEmail, updatedUser } = require("../controller/user")
const userAuth = require("../middleware/authMiddleware")
const verifyAdmin = require("../middleware/authMiddleware")

router.post('/create-user', createUser)
router.get('/get-user', userAuth, getAllUser)
router.get('/get-user-email', getUserByEmail)
router.get('/get-admin',userAuth, getAdmin)
router.delete("/delete-user/:id",userAuth,verifyAdmin, deleteUser)
router.put("/update-user/:id",userAuth,verifyAdmin, makeAdmin)
router.put('/update-user', userAuth, updatedUser)





module.exports = router