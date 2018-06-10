import * as actionTypes from '../actions/chatActions'

const initialState = {
  username: '',
  message: '',
  chatHisory: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_MESSAGE:
      return {
        ...state,
        username: action.message
      };
    case actionTypes.SEND_MESSAGE:
      return {
        ...state,
        password: action.message
      };
    case actionTypes.GET_LOCATION:
      return {
        ...state,
        location: action.location
      }
    default:
      return state
  }
};

export default reducer;
