const express = require('express')

const router = express.Router()

const verifyAdmin = require('../middleware/adminMiddlware')

const {allMenu,addMenu,deleteMenu,updateMenu ,getMenuById} = require('../controller/menu')

router.get('/menus', allMenu)
router.post('/addMenu',verifyAdmin, addMenu)
router.delete('/delete-item/:id',verifyAdmin, deleteMenu)
router.get('/menu-item/:id',verifyAdmin, getMenuById)
router.put('/update-item/:id',verifyAdmin, updateMenu )


module.exports = router