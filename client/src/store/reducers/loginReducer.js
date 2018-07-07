import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  userId: '',
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      // login authentication
      return {
        ...state,
        loggedIn: true,
        userId: action.user.userId,
        username: action.user.username,
      }
    default:
      return state
  }
};

export default reducer;
