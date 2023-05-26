const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookingSchema = new Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Places'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  numberOfRoomies: Number,
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;