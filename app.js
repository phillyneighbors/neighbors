var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var mongoose = require('mongoose')
var db = require('./models');
var app = express();
// socket setup
var io = socket_io();
app.io = io;

// socket.io events
io.on('connection', socket => {
  console.log("as user connected: ", socket.id);
  socket.on('JOIN', (room) => {
    console.log("JOIN: ",room)
    socket.join(room)
  });
  socket.on('SEND_MESSAGE', (data) => {
    console.log(data)
    socket.broadcast.to(data.room).emit('RECEIVE_MESSAGE', data);
  })
})


require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, (err, res) => {
  if (err){
    console.log('DB CONNECTION FAILED: '+err)
  }
  else{
    console.log('DB CONNECTION SUCCESS')
  }
})

// serve react files for production build
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/client/build', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
