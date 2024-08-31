// server.js
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.static('public'));
// class elementleri

const rooms=[]
// Socket.IO bağlantısı ve olay işleyiciler
io.on('connection', (socket) => {

  socket.on('createRoom', (data) => {
    console.log('Oda Bilgileri:', data);
    rooms.push(data)
  });
  socket.on('getRooms',()=>{
    console.log("mevcut odalar",rooms);
    socket.emit("rooms",rooms);
  })

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Sunucu port ${PORT} üzerinde çalışıyor`);
});
