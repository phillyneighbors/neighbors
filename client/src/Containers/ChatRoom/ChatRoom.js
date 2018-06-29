import React, { Component } from 'react';
import ChatBox from './ChatBox/ChatBox';
import Aux from '../../Components/HOC/Auxil';
import MapContainer from '../../Components/Map/Map';
import { connect } from 'react-redux';
import api from '../../utils/apiRequests';

class ChatRoom extends Component {
  state = {
    hoodCoords: []
  }
  componentDidMount() {
    api.getHoodCoords(this.props.location)
    .then(coords => {
      console.log(coords)
      this.setState({hoodCoords: coords[0]})
    })
  }

  render() {
    return (
      <Aux>
        <MapContainer
          neighborhood={this.props.neighborhood}
          lat={this.props.lat}
          lng={this.props.lng}
          hoodCoords={this.props.geometry}
        />
        <ChatBox
          neighborhood={this.props.neighborhood}
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
  neighborhood: state.chatReducer.neighborhood,
  locationId: state.chatReducer.locationId,
  userId: state.loginReducer.userId,
  geometry: state.chatReducer.geometry,
  lat: state.chatReducer.lat,
  lng: state.chatReducer.lng,
  username: state.loginReducer.username,
  chat: state.chatReducer.chat
});

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
