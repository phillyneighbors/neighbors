const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Location = require('./Location')

const Message = new mongoose.Schema({
  text: {type: String, required: true},
  user: {type: String, required: true},
  location: {type: String},
  date: {type: String}
})

// Message.post('save', doc => {
//   Location.findOne({'neighborhood': doc.location}, (err, res) => {
//     if (err) {
//       return console.log(err)
//     }
//     console.log(res)
//     res.messages.push(doc)
//     res.save()
//   })
// })

module.exports = mongoose.model('Message', Message);
