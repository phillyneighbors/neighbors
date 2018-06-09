import api from '../../utils/apiRequests';
import googlePlaces from '../../utils/googlePlaces';
// ACTION TYPES
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const SUBMIT_LOCATION = 'SUBMIT_LOCATION';

// ACTION CREATORS
// receives payload from an action -- in this case username
export const updateUsername = (username) => {
  return {
    type: UPDATE_USERNAME,
    username,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    password,
  };
};

// Async action to lookup neighborhood from geoCoords
export const submitLocation = (lat, lng) => {
  console.log("lat, lng ", lat, lng)
  return dispatch => {
    // googlePlaces.getNeighborhood for outside of philly -- we'll add cities as we go
    console.log("in here")
    googlePlaces.getNeighborhood(lat, lng)
    .then(result => {
      console.log("RESULT IN ACTION: ",result)
      const neighborhood = result.neighborhood;
      const locationId = result.id;
      dispatch(foundNeighborhood(neighborhood, locationId, lat, lng))
    })
    .catch(err => {
      console.log("error getting neighborhood name")
      console.log(err)
    });
  };
};

export const foundNeighborhood = (neighborhood, locationId, lat, lng) => {
  // parse neighborhood
  // it seems the last result is the most specific
  return {
    type: SUBMIT_LOCATION,
    neighborhood,
    locationId,
    lat,
    lng,
  };
};
// Asnyc action to check database for user
// after this action run userAuthenticated
export const userLogin = () => {
  return (dispatch, getState) => {
    const username = getState().loginReducer.username;
    const password = getState().loginReducer.password;
    api.userLogin(username, password)
    .then(response => {
      console.log(response)
      dispatch(userAuthenticated(response.data.result._id))
    })
  };
};

export const userAuthenticated = (userId) => {
  // if result is successful login log the user in
  return {
    type: USER_LOGIN,
    userId,
  };
};
