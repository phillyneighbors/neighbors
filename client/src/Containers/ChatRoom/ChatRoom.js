import React, { Component } from 'react';
import ChatBox from './ChatBox/ChatBox';
import Aux from '../../Components/HOC/Auxil';
import MapContainer from '../../Components/Map/Map';
import { connect } from 'react-redux';

class ChatRoom extends Component {
  state = {
    currentHoodCoords: [],
    allHoodCoords: []
  }

  render() {
    return (
      <Aux>
        <MapContainer
          neighborhood={this.props.neighborhood}
          lat={this.props.lat}
          lng={this.props.lng}
          geometry={this.props.geometry}
          // allHoodCoords={this.props.hoods}
        />
        <ChatBox
          neighborhood={this.props.neighborhood}
          activeUser={this.props.username}
          locationId={this.props.locationId}
          userId={this.props.userId}
          user={this.props.username}
          messages={this.props.chat}
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
  chat: state.chatReducer.chat,
});

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
