const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Location = new mongoose.Schema({
  neighborhood: {type: String, required: true},
  messages: [{type: ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model('Location', Location);
