const express = require('express')
const router = express.Router()
const { createReservation, getMyReservation, getAllReservation, updateReservationStatus, deleteReservation } = require('../controllers/reservationController')
const adminMiddleware = require('../middlewares/adminmiddleware')
const authmiddleware = require('../middlewares/authmiddleware')

router.post('/create',authmiddleware, createReservation)
router.get('/my',authmiddleware, getMyReservation)


router.get('/admin/get', authmiddleware, adminMiddleware, getAllReservation)
router.put('/admin/update/:id', authmiddleware, adminMiddleware, updateReservationStatus)


router.delete('/delete/:id', authmiddleware, deleteReservation)

module.exports = router