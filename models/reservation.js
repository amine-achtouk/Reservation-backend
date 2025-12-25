const mongoose = require('mongoose')

const resrvationSchema = new mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
    date : { type : Date, required : true},
    status : { type : String , enum : ['pending', 'approved', 'canceled'], default : 'pending'},
    description : { type : String }
})

module.exports = mongoose.model('Reservation', resrvationSchema)