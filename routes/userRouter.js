const express = require('express')
const router = express.Router()

const authmiddleware = require('../middlewares/authmiddleware')
const adminMiddleware = require('../middlewares/adminmiddleware')
const { RegisterUser, LoginUser, getAllUser} = require('../controllers/userController')

router.post('/register', RegisterUser)
router.post('/login', LoginUser )
router.get('/admin',authmiddleware, adminMiddleware, getAllUser )

module.exports = router;