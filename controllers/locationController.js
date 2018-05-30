const db = require('../models')
module.exports = {
  get: (param) => {
    return new Promise((resolve, reject) => {
      console.log("in location controller")
      db.Location.find(param)
      .then((locations, err) => {
        console.log("IN here")
        console.log(locations)
        if (locations){
          return resolve(locations[0]);
        }
        reject(err)
      });
    })
  },

  post: (location) => {
    console.log("location controller post: ", location)
    return new Promise((resolve, reject) => {
      db.Location.create(location)
      .then((location) => {
        console.log("posted from backend!")
        resolve(location)
      })
      .catch((err) => {
        console.log("ERROR")
        console.log(err)
        reject(err)
      })
    })
  }
}
