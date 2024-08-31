const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // Replace with your frontend URL
  },
});

app.use(express.static("public"));

const rooms = [];

// Handler Functions
const handleCreateRoom = (data) => {
  rooms.push(data);
};

const handleGetRooms = (socket) => {
  socket.emit("rooms", rooms);
};

const handleJoinRoom = (playersName, roomId) => {
  const selectedRoom = rooms.find((room) => room.roomId === roomId);
  if (selectedRoom) {
      selectedRoom.players.red = {
        color: "red",
        health: 200,
        isTurnEnd: false,
        playerName: playersName
      };
      console.log("Updated rooms:", rooms);
      io.emit("rooms", rooms); // Broadcast to all clients
  }
};

// Socket.IO connection and event handlers
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("createRoom", handleCreateRoom);
  socket.on("getRooms", () => handleGetRooms(socket));
  socket.on("joinRoom", handleJoinRoom);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Handle player disconnection logic here
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
