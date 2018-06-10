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
        axios.get('/api/phillyHood', {params: {neighborhoods: potentialHoods.join(",")}})
        .then(response => {
            // this location already exists
            console.log("the location already exiss")
            console.log(response);
            return resolve(response.data.results);
        })
        .catch(err => {
          reject(err)
        });
      });
    });
  }
}
