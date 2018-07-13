import googlePlaces from '../../utils/googlePlaces'; // consider just combining this with apiRequests
import api from '../../utils/apiRequests';
import * as actionTypes from './actionTypes';
// ACTION CREATORS
// receives payload from an action -- in this case username
export const updateMessage = (message) => {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    message,
  }
}
export const sendMessage = (message) => {
  return {
    type: actionTypes.SEND_MESSAGE,
    message,
  };
};

export const submitHoodsData = hood => {
  return {
    type: actionTypes.SUBMIT_HOODS,
    hood,
  }
}

export const giveHoodOptions = (hoods, lat, lng) => {
  return {
    type: actionTypes.GIVE_HOOD_OPTS,
    hoods,
    lat,
    lng,
  }
}

// Async action to lookup neighborhood from geoCoords
export const getLocation = (lat, lng) => {
  console.log("lat, lng ", lat, lng)
  return dispatch => {
    // googlePlaces.getNeighborhood for outside of philly -- we'll add cities as we go
    console.log("in here")
    googlePlaces.getNeighborhood(lat, lng)
    .then(result => {
      console.log(result.hoods, result.foundOne)
      if (result.foundOne) {
        dispatch(getHoodData(result.hoods[0]));
      }
      else { dispatch(giveHoodOptions(result.hoods, lat, lng))}
    })
    .catch(err => console.log(err))

  }
};

  export const getHoodData = name => {
    return dispatch => {
      api.getHoodData(name)
      .then(result => {
        console.log(result)
        dispatch(submitHoodsData(result))
      })
      .catch(err => {
        console.log("error getting neighborhood name")
        console.log(err)
      });

    }
  }

export const submitLocation = (location, lat, lng) => {
  return {
    type: actionTypes.GET_LOCATION,
    neighborhood: location.neighborhood,
    lat,
    lng,
    geometry: location.geometry,
    messages: location.chat,
    locationId: location.id
  };
}
