import React, { Component } from 'react';
import moment from 'moment';
import socket from '../../../utils/socket'
import classes from './ChatBox.css';
import Button from '../../../Components/UI/Button/Button';
import api from '../../../utils/apiRequests';
import Avatar from '../../../Components/Avatar/Avatar';
import WindowHeader from '../../../Components/UI/WindowHeader/WindowHeader';
class ChatBox extends Component {
  state = {
    chatHistory: [],
    message: '',
    client: socket()
  }

  componentDidMount() {
    console.log(this.props);
  }

  updateMessage = (event) => {
    let updatedMessage = event.target.value;
    this.setState({
      message: updatedMessage
    })
  }

  submitMessage = () => {
    let updatedChatHistory = [];
    if (this.state.chatHistory) {
      updatedChatHistory = [...this.state.chatHistory];
    }
    const newMessage = {text: this.state.message, UserId: this.props.userId, LocationId: this.props.locationId}
    const date = moment().format("ddd, MMM Do hh:mm a");
    const displayMessage = {text: this.state.message, user: this.props.user, date: date};
    updatedChatHistory.push(displayMessage)
    // post to db
    api.postMessage(newMessage)
    .then(response => {
      this.setState({
        message: '',
        chatHistory: updatedChatHistory
      })
    })
  }

  render() {
    let messages = []
    if (this.state.chatHistory) {
      messages = this.state.chatHistory.map(message => {
        return (
          <div className={classes.Message}>
            <Avatar context="chat" username={message.user}/>
            <span className={classes.MessageText}>{message.text}</span>
            <div className={classes.TimeStamp}>({message.date})</div>
          </div>

        )
      })
    }
    return (

      <div className={classes.ChatBox}>
        <br />
        <br />

        <div className={classes.Window}>
          <WindowHeader >{this.props.neighborhood} Chat</WindowHeader>
          {messages}
        </div>
        <div id="chatControls" className={classes.ChatControls}>
          <input className={classes.ChatInput} value={this.state.message} onChange={this.updateMessage}/>
          <Button clicked={this.submitMessage}>Send</Button>
        </div>
      </div>
    )
  }

}


export default ChatBox;
