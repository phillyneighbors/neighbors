const db = require('../models')

module.exports = {
  get: locationId => {
    return new Promise((resolve, reject) => {
      console.log("in message controller")
      db.Message.findAll({'$where': {location: locationId}})
      .then(messages => {
        resolve(messages)
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  post: data => {
    return new Promise((resolve, reject) => {
      console.log(data)
      db.Message.create({text: data.text, location: data.room, user: data.userId, date: data.date})
      .then((message) => {
        console.log("posted from backend!")
        resolve(message)
      })
      .catch((err) => {
        console.log("ERROR")
        console.log(err)
        reject(err)
      })
    })
  }
}
