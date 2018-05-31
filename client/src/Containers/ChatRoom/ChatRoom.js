import React, { Component } from 'react';
import classes from './ChatRoom.css';
import ChatBox from './ChatBox/ChatBox';
import Aux from '../../Components/HOC/Auxil';
import MapContainer from '../../Components/Map/Map';
import { connect } from 'react-redux';
import placesApi from '../../utils/googlePlaces';

class ChatRoom extends Component {
  state = {
    hoodCoords: []
  }
  componentDidMount() {
    placesApi.getHoodCoords(this.props.location)
    .then(coords => {
      console.log(coords)
      this.setState({hoodCoords: coords[0]})
    })
  }


  render() {
    return (
      <Aux>
        <MapContainer
          location={this.props.location}
          lat={this.props.lat}
          lng={this.props.lng}
          hoodCoords={this.state.hoodCoords}
        />
        <ChatBox
          location={this.props.location}
          activeUser={this.props.username}
          locationId={this.props.locationId}
          userId={this.props.userId}
          user={this.props.username}
        />
      </Aux>
    )
  }
}

const mapStateToProps = (state) => ({
  location: state.loginReducer.location,
  locationId: state.loginReducer.locationId,
  userId: state.loginReducer.userId,
  lat: state.loginReducer.lat,
  lng: state.loginReducer.lng,
  username: state.loginReducer.username
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
