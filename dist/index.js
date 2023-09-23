"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    },
    serveClient: false
});
// Checking the matchs of user's given text
function matches(msg) {
    if (msg.match("joke")) {
        return "Joke";
    }
    else if (msg.match(/summary|blog|article/)) {
        return "Artical";
    }
    else if (msg.match("news")) {
        return "News";
    }
    else
        return "Sorry sir, I have no knowledge about that. Please ask me anything else";
}
;
io.on('connection', (socket) => {
    socket.on("happy", () => {
        socket.emit("mood", { msg: "Happy to hear, How can I help you?" });
    });
    socket.on("avarage", () => {
        socket.emit("mood", { msg: "How can I help you to better your mood?" });
    });
    socket.on("sad", () => {
        socket.emit("mood", { msg: "How can I help you to better your mood?" });
    });
    socket.on("send-msg", (msg) => {
        const replay = matches(msg.toLowerCase());
        socket.emit("response", { msg: replay });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(4000, () => {
    console.log('Server is listening on http://localhost:4000');
});
