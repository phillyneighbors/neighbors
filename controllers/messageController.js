const db = require('../models')

module.exports = {
  get: params => {
    return new Promise((resolve, reject) => {
      console.log("in message controller")
      db.Message.find(params)
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
      console.log(data.user)
      console.log(data.room)
      db.Message.create({text: data.text, location: data.room, user: data.user, date: data.date})
      .then((message) => {
        console.log("posted from backend!")
        console.log("MESSAGE: ", message)
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
