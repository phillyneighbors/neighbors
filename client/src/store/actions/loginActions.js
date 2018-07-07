import api from '../../utils/apiRequests';
import * as actionTypes from './actionTypes';

// Asnyc action to check database for user
// after this action run userAuthenticated
export const userLogin = (username, password) => {
  return (dispatch, getState) => {
    api.userLogin(username, password)
    .then(response => {
      console.log(response)
      dispatch(userAuthenticated(response.data.result))
    })
  };
};

export const userAuthenticated = (user) => {
  // if result is successful login log the user in
  return {
    type: actionTypes.USER_LOGIN,
    user,
  };
};
