const db = require('../models');
const _ = require('underscore');
module.exports = {
  get: (params) => {
    // params is a list of potential neighborhoods from googePlaces api
    // we need to check if these neighborhoods are in our phillyHoods db
    return new Promise((resolve, reject) => {
      console.log(params.neighborhoods.split(","));
      const hoodsFromGoogle = params.neighborhoods.split(",");
      db.Hood.find({}).lean()
      .then(response => {
        // make an array of neighborhood names from the db
        const hoodsFromDb = response.map(hood => {
          return hood.properties.mapname;
        })
        // check them against the array from googlePlaces
        const hoods = _.intersection(hoodsFromGoogle, hoodsFromDb);
        // if there is more than one grab the last one -- google gives their
        // places results in order of least to most specific
        const hood = response.find((obj) => { return obj.properties.mapname === hoods[hoods.length - 1]; });
        // const hoodCoords = response[].geometry.coordinates[0];
        // return resolve(hoodCoords);
        console.log(hood);
        resolve(hood)
      })
      .catch(err => {
        console.log("NO HOODS");
        reject(err)
      })
    })
  },
}
