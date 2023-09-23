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

// Checking the matchs of user's given text
function matches(msg: string){
  if(msg.match("joke")){
    return "Joke";
  }

  else if(msg.match(/summary|blog|article/)){
    return "Artical";
  }

  else if(msg.match("news")) {
    return "News";
  }

  else return "Sorry sir, I have no knowledge about that. Please ask me anything else"
};

io.on('connection', (socket: Socket) => {

  socket.on("happy", ()=>{
    socket.emit("mood", {msg: "Happy to hear, How can I help you?"});
  });

  socket.on("avarage", ()=>{
    socket.emit("mood", {msg: "How can I help you to better your mood?"});
  });

  socket.on("sad", () => {
    socket.emit("mood", { msg: "How can I help you to better your mood?" });
  });

  socket.on("send-msg", (msg: any) => {
    const replay = matches(msg.toLowerCase());
    socket.emit("response", {msg: replay});
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is listening on http://localhost:4000');
});
