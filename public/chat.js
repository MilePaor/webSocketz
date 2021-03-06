// make connection

var socket = io.connect('http://localhost:4000');

// query dom

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// emit events

btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});

handle.addEventListener('keypress', function () {
  socket.emit('typing', handle.value)
});

// listener for events

socket.on('chat', data => {
  handle.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';

})

socket.on('typing', data => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})