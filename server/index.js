const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

// untuk membuat server
const server = http.createServer(app);

// untuk memanggil server react 3000 dengan socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
});


// untuk memanggil socket.io dan mendeteksi bila ada user yang terhubung
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    });
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

const port = 3001;
server.listen(3001, () => {
    console.log(`Server listen on port ${port}`);
});