"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.send("Hello it's WS server ");
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
server.listen(3009, () => {
    console.log('listening on *:3009');
});
