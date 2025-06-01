const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let rooms = {};

io.on('connection', (socket) => {
  console.log('New player:', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(socket.id);

    io.to(room).emit('room-update', rooms[room]);

    if (rooms[room].length === 4) {
      io.to(room).emit('start-game', "Game starting!");
    }
  });

  socket.on('disconnect', () => {
    for (let room in rooms) {
      rooms[room] = rooms[room].filter(id => id !== socket.id);
      if (rooms[room].length === 0) delete rooms[room];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
