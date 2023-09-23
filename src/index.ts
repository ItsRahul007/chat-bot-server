import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./interface"

const app = express();
const server = http.createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*"
  },
  serveClient: false
});

io.on('connection', (socket: Socket) => {

  socket.on("happy", () => {
    socket.emit("mood", { msg: "Happy to hear, How can I help you?" });
  });

  socket.on("avarage", () => {
    socket.emit("mood", { msg: "How can I help you to better your mood?" });
  });

  socket.on("sad", () => {
    socket.emit("mood", { msg: "How can I help you to better your mood?" });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is listening on http://localhost:4000');
});
