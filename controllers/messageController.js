const db = require('../models')

module.exports = {
  get: (locationId) => {
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

  post: (message, location) => {
    console.log(message)
    return new Promise((resolve, reject) => {
      db.Message.create({text: message, location: location})
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
