const mongoose = require('mongoose');
const User = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: ObjectId, ref: 'User'},
})

module.exports = mongoose.model('User', User);
