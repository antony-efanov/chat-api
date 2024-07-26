// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package
const app = express();
const PORT = process.env.PORT || 3000;

// Setup CORS middleware
app.use(cors({
  origin: ["http://localhost:3001", "https://chat-client-khuc.onrender.com/"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.status(200).json('Welcome to the root of the application');
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3001", "https://chat-client-virid.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'], // Ensure both transports are enabled
  path: '/socket.io' // Make sure the path is correctly set
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
