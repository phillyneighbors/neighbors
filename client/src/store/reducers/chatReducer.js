import * as actionTypes from '../actions/actionTypes'

const initialState = {
  chat: [],
  neighborhood: '',
  lat: '',
  lng: '',
  geometry: [],
  locationId: '',
  hoodOpts: [],
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
        neighborhood: action.neighborhood,
        lat: action.lat,
        lng: action.lng,
        chat: action.chat,
        geometry: action.geometry,
        locationId: action.locationId
      }
    case actionTypes.SUBMIT_HOODS:
    console.log(action.geometry)
      return {
        ...state,
        geometry: action.hood.geometry,
        neighborhood: action.hood.neighborhood,
        chat: action.hood.chat.messages,
        hoodOpts: []
      }
    case actionTypes.GIVE_HOOD_OPTS:
      return {
        ...state,
        hoodOpts: action.hoods,
        lat: action.lat,
        lng: action.lng,
      }
    default:
      return state
  }
};

export default reducer;
