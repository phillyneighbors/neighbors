import * as actionTypes from '../actions/chatActions'

const initialState = {
  message: '',
  chat: [],
  neighborhood: '',
  lat: '',
  lng: '',
  geometry: []
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
        location: action.neighborhood,
        lat: action.lat,
        lng: action.lng,
        chat: action.chat,
        geometry: action.geometry
      }
    default:
      return state
  }
};

export default reducer;
