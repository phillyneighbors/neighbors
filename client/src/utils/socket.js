import io from 'socket.io-client';

export default () => {
  const socket = io.connect('http://localhost:3000');

  const registerHandler = (onMessageReceived) => {
    socket.on('message', onMessageReceived);
  }

  const unregisterHandler = () => {
    socket.off('message');
  }

  socket.on('error', (err) => {
    console.log('recevied socket error');
    console.log(err);
  });

  const register = (name, cb) => {
    socket.emit('reigester', name, cb);
  }

  const join = (neighborhoodChat, cb) => {
    socket.emit('join', neighborhoodChat, cb);
  }

  const leave = (neighborhoodChat, cb) => {
    socket.emit('leave', neighborhoodChat, cb);
  }

  const message = (neighborhoodChat, msg, cb) => {
    socket.emit('message', {neighborhoodChat, message: msg}, cb);
  }

  const getChatrooms = (cb) => {
    socket.emit('chatrooms', null, cb);
  }

  const getAvailableUsers = (cb) => {
    socket.emit('availableUsers', null, cb);
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler
  }
}
