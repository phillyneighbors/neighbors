const mongoose = require('mongoose');
const Message = new mongoose.Schema({
  text: {type: String, required: true},
  user: {type: ObjectId, ref: 'User'},
  location: {type: ObjectId, ref: 'Location'},
})

module.exports.Message = mongoose.model('Message', Message);
