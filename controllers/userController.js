const db = require("../models");

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      console.log("in controller")
      db.User.findAll({})
      .then(users => {
        console.log("no error")
        console.log(users)
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  post: (params) => {
    return new Promise((resolve, reject) => {
      console.log("Logging in")
      console.log(params)
      // check to see if the username exists
      db.User.find({$where: {username: params.username}})
      .then(user => {
        // if the user is null create this user
        if (user === null) {
          console.log("user does not exit")
          db.User.create({
            username: params.username,
            password: params.password,
          })
          .then(user => {
            resolve({confirmation: "created new user", user: user});
          })
          .catch(err => {
            reject(err);
          })
        }
        else {
          // check the password
          console.log("User exists")
          console.log(user)
          if (user.password === params.password) {
            return resolve({confirmation: "logged in", user: user});
          }
          else {
            reject({confirmation: "incorrect password"})
          }
        }
      })
      .catch(err => {
        // This username is new so let's create a new user
        db.User.create(params)
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err);
        })
      })
    });
  }
}
