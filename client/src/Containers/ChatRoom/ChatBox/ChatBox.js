import React, { Component } from 'react';
import moment from 'moment';
import classes from './ChatBox.css';
import Button from '../../../Components/UI/Button/Button';
import api from '../../../utils/apiRequests';
import Avatar from '../../../Components/Avatar/Avatar';
import WindowHeader from '../../../Components/UI/WindowHeader/WindowHeader';
class ChatBox extends Component {
  state = {
    chatHistory: [],
    message: '',
  }

  componentDidMount() {
    api.getMessages(this.props.locationId)
    .then(response => {
      console.log("chat history: ", chatHistory)
      let chatHistory = response.map(message => {
        // convert createdAT date to human readable date
        let createdAt = moment(message.createdAt).format("ddd, MMM Do hh:mm a")
        return ({user: message.User.name, text: message.text, date: createdAt});
      })
      this.setState({
        chatHistory,
      })
    })
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
    const displayMessage = {text: this.state.message, user: this.props.user, date: Date.now()}
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
          <WindowHeader >{this.props.location} Chat</WindowHeader>
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
