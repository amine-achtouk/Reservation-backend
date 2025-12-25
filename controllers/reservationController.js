const Reservation = require('../models/reservation')

const createReservation = async (req, res ) =>{
    try{
        const { date, description } = req.body;
        if(!date) return res.status(400).json({ message : 'Date is required'})
        
        const newReservation = await Reservation.create({
          user : req.user.id,
          date,
          description,
          status : 'pending',
        })
    res.status(201).json({ message : 'Successefuly to create Reservation', newReservation}) 
    }
    catch{
      res.status(500).json({ message : 'Server Error'})
    }
}




const getMyReservation = async (req, res)=>{
  try{
    const reservation = await Reservation.find({ user : req.user.id })

    res.status(200).json({reservation})  
  }
  catch{
    res.status(500).json({ message : 'Server Error'})
  }
}

const getAllReservation = async (req, res)=>{
  try{
     if( req.user.role !== 'admin'){
      return res.status(403).json({ message: 'Access denied' })
     } 

     const reservation = await Reservation.find().populate('user', 'username email')
     res.status(200).json(reservation)
  }
  catch{
     res.status(500).json({ message : 'Server Error'})
  }
}

const updateReservationStatus  = async (req, res) =>{
  try{
    const { status } = req.body
    const { id } = req.params

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const reservation = await Reservation.findById(id)
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }

    reservation.status = status
    await reservation.save()

        res.status(200).json({
      message: 'Reservation updated',
      reservation
    })
  }
  catch{
     res.status(500).json({ message : 'Server Error'})
  }
}


const deleteReservation = async (req, res) =>{
  try{
    const { id } = req.params
   
        const reservation = await Reservation.findById(id)
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }

        if (
      req.user.role !== 'admin' &&
      reservation.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Access denied' })
    }

    await reservation.deleteOne()

    res.status(200).json({ message: 'Reservation deleted' })
  }
  catch{
    res.status(500).json({ message : 'Server Error'})
  }
}


module.exports = { 
  createReservation,
  getMyReservation,
  getAllReservation,
  updateReservationStatus,
  deleteReservation
}