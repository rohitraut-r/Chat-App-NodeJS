const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New websocket connection");


  socket.on('join', ({username, room})=>{
    socket.join(room)

    socket.emit("message", generateMessage('Welcome!'));
    socket.broadcast.emit("message", generateMessage("A new user has joined!"));
     
  })

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    );
    callback("Location shared!!");
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user disconnected!"));
  });
});

server.listen(port, () => {
  console.log("server started port 3000");
});
