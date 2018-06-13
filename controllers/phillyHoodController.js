const db = require('../models');
const _ = require('underscore');
const neighborhoods = require('./hoodsList');
module.exports = {
  get: (params) => {
    console.log("IN the philly hoods controller")
    // params is a list of potential neighborhoods from googePlaces api
    // we need to check if these neighborhoods are in our phillyHoods db
    return new Promise((resolve, reject) => {
      const hoodsFromGoogle = params.neighborhoods.split(",");
      const hoodNames = _.intersection(neighborhoods, hoodsFromGoogle);
      const hoodName = hoodNames[hoodNames.length - 1];
      // if there is more than one grab the last one -- google gives their
      // places results in order of least to most specific
      db.Hood.find({"properties.mapname": hoodName}, null)
      .exec((err, hood) => {
        console.log("RESP FROM DB")
        if (err) {
          console.log("ERR FROM DB: ", err)
          return reject(err);
        }
        if (hood[0]){
          hood = hood[0].summarize();
        }
        console.log("NO ERROR :", hood)
        resolve(hood)
      })
    })
  },
}
