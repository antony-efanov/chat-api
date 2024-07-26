// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors({
  origin: ["http://localhost:3001", "https://chat-client-virid.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3001", "https://chat-client-virid.vercel.app"],
    methods: ["GET", "POST"],
    path: '/socket.io'
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
