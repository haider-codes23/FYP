const mongoose = require('mongoose');
const {Schema} = mongoose;

const placeSchema = new Schema({
  'owner': {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  'title': String,
  'address': String,
  'photos': [String],
  'description': String,
  'perks': [String],
  'extraInfo': String,
  'checkIn': Number,
  'checkOut': Number,
  'maxRoomies': Number

});

const PlaceModel = model('Places', placeSchema);

module.exports = PlaceModel;
