import axios from 'axios';
// import hoods from 'philly-hoods'; -- not working
const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';

require('dotenv').config();
export default {
  getNeighborhood: (lat, lng) => {
    return new Promise((resolve, reject) => {
      console.log(lat, lng)
      axios.get(corsApiUrl + baseUrl, {
        params: {
          location: [lat, lng].join(","),
          type: 'neighborhood', // this seems to not work outside of philly
          radius: 1000,
          key: process.env.REACT_APP_PLACES_KEY,
        }
      })
      .then((response) => {
        // check to see if this location is a philly neighborhood
        const potentialHoods = response.data.results.map(hood => {
          return hood.name;
        });
        console.log(potentialHoods);
        if (potentialHoods.length > 1) {
          console.log('found 2');
          return resolve({hoods: potentialHoods, foundOne: false})
        }
        else {
          axios.get('/api/phillyHood', {properties: {name: potentialHoods[0]}})
          .then(response => {
            // this location already exists
            console.log("the location already exiss")
            console.log(response);
            return resolve(response.data.results, true);
          })
          .catch(err => {
            console.log("ERROR GETTING PLACES: ", err)
            reject(err)
          });
        }
      });
    });
  }
}
