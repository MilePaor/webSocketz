var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
const port = 4000;
var server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// static files
app.use(express.static('public'));
// socket setup
var io = socket(server);

io.on('connection', socket => {
  console.log('IO Connected. Socket id:', socket.id);

  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data)
  })
})