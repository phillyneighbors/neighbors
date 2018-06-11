import React, { Component } from 'react';
import moment from 'moment';
import classes from './ChatBox.css';
import Button from '../../../Components/UI/Button/Button';
import Avatar from '../../../Components/Avatar/Avatar';
import WindowHeader from '../../../Components/UI/WindowHeader/WindowHeader';
import io from 'socket.io-client';
let socket;
class ChatBox extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: '',
        message: '',
        messages: []
    };
    // what does this need to be set to for production
    this.socket = io('localhost:3001');

  }
  componentDidMount(){
    socket = io.connect('http://localhost:3001');
    // join a chat room for this location
    this.socket.on('connect', () => {
      this.socket.emit('ROOM', "conshy");
    })
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      console.log(data)
      let newMessages = [...this.state.messages, data]
      this.setState({
        messages: newMessages
      })
    });
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
    console.log("SENDING MESSAGE")
    this.socket.emit('SEND_MESSAGE', {room: 'conshy', newMessage: newMessage}, () => {
      console.log("MESSAGE SENT");
    })
  }

  render() {
    let messages = []
    if (this.state.messages) {
      messages = this.state.messages.map((message, i) => {
        console.log(message)
        return (
          <div key={i} className={classes.Message}>
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
