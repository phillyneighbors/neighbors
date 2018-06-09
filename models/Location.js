const mongoose = require('mongoose');
const Location = new mongoose.Schema({
  neighborhood: {type: String, required: true},
})

module.exports.Location = mongoose.model('Location', Location);
